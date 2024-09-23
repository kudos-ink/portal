import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Link as NuiLink } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import Emoji from "@/components/emoji";
import MyImage from "@/components/ui/image";
import { useFilters } from "@/contexts/filters";
import { formatDate } from "@/utils/date";
import { shuffleArray } from "@/utils/filters";
import { createUrl } from "@/utils/url";
import {
  GOOD_FIRST_ISSUE_KEY,
  GOOD_FIRST_ISSUE_LABELS,
  TECHNOLOGY_KEY,
  PURPOSE_KEY,
} from "@/data/filters";
import { FilterKeys, IFilterOption, Filters } from "@/types/filters";
import { Repository } from "@/types/repository";
import { IconRepo } from "@/assets/icons";

const MAX_LABEL_WIDTH = 192;

interface ILabelOption extends IFilterOption {
  type: FilterKeys;
}

interface IProjectProps {
  avatarSrc: string | null;
  slug: string;
  name: string;
  repository: Repository;
}
export const Project = ({
  avatarSrc,
  slug,
  name,
  repository,
}: IProjectProps) => (
  <div className="flex md:gap-4">
    <Link
      className="w-fit"
      href={`/projects/${slug}`}
      color="foreground"
      title={`${name}'s project page`}
    >
      <Project.Avatar alt={`${name} logo`} src={avatarSrc} />
    </Link>
    <div className="hidden md:flex flex-col w-36">
      <Link
        className="w-fit"
        href={`/projects/${slug}`}
        color="foreground"
        title={`${name}'s project page`}
      >
        <h2 className="font-semibold truncate">{name}</h2>
      </Link>
      <NuiLink
        className="w-fit"
        isExternal
        href={repository.url}
        color="foreground"
        title={`${name}'s repository on Github`}
      >
        <p className="text-small text-default-500 truncate">
          {repository.name}
        </p>
      </NuiLink>
    </div>
  </div>
);

interface IAvatarProps {
  alt: string;
  src: string | null;
}

const Avatar = ({ alt, src }: IAvatarProps) => {
  return (
    <div className="bg-foreground rounded-md min-w-[45px] shrink-0">
      {src !== null && (
        <MyImage
          className="border"
          src={src}
          alt={alt}
          radius="sm"
          height={45}
          width={45}
        />
      )}
    </div>
  );
};

Project.Avatar = Avatar;

interface IContentProps {
  title: string;
  projectName?: string;
  repositoryName: string;
  url: string;
  isCertified: boolean;
}
export const Content = ({
  title,
  projectName,
  repositoryName,
  url,
  isCertified,
}: IContentProps) => {
  return (
    <div
      className={`flex flex-col space-y-unit-1 md:space-y-0 ${projectName ? "lg:w-[270px] xl:w-[500px]" : "pl-2"}`}
    >
      <span className="text-small text-default-500 max-w-48 truncate md:hidden">
        <div className="flex items-center gap-2">
          {projectName ? (
            `${projectName} / ${repositoryName}`
          ) : (
            <>
              <IconRepo size={12} />
              {repositoryName}
            </>
          )}
        </div>
      </span>
      <NuiLink
        className={`w-fit flex gap-1 flex-grow relative${projectName ? "" : " min-h-10"}`}
        isExternal
        href={url}
        color="foreground"
        title="Open task on Github"
      >
        <h3 className="font-semibold leading-tight line-clamp-2 capitalize">
          {title}
        </h3>
        {isCertified && (
          <Tooltip content={<KudosIssueTooltipContent />}>
            <div className="hidden absolute -top-1 -left-6 md:block">
              <MyImage
                className="flex-shrink-0 max-w-5 max-h-5 lg:mb-4"
                src="/kudos_certified.svg"
                alt="Kudos Certified"
                radius="sm"
                height={20}
                width={20}
              />
            </div>
          </Tooltip>
        )}
      </NuiLink>
    </div>
  );
};

interface ILabelsProps {
  gitLabels: string[];
  technologies: string[];
  purposes: string[];
}
export const Labels = ({ gitLabels, technologies, purposes }: ILabelsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { filters, updateFilter, filterOptions } = useFilters();

  const [visibleLabelCount, setVisibleLabelCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const isGoodFirstIssue = GOOD_FIRST_ISSUE_LABELS.some((name) =>
    gitLabels.includes(name),
  );
  const restTechnologies =
    filterOptions?.technologies?.filter(({ value }) =>
      technologies.includes(value),
    ) ?? [];
  const restPurposes =
    filterOptions?.purposes?.filter(({ value }) => purposes.includes(value)) ??
    [];

  const labels = useMemo(() => {
    const goodFirstIssueLabels = getGoodFirstIssueLabel(isGoodFirstIssue);
    const technologyAndPurposeLabels = getTechnologyAndPurposeLabels(
      restTechnologies,
      restPurposes,
    );
    return [...goodFirstIssueLabels, ...technologyAndPurposeLabels].filter(
      (option) => !isLabelFilteredOut(option, filters),
    );
  }, [filters, restTechnologies, restPurposes, isGoodFirstIssue]);

  const handleClick = (key: FilterKeys, values: string[]) => {
    updateFilter(key, values);
    const currentPath = pathname === "/" ? "/explore/" : pathname;
    const newUrl = createUrl(key, values, currentPath, filterOptions);
    router.replace(newUrl, { scroll: true });
  };

  useEffect(() => {
    const calculateVisibleLabels = () => {
      const container = containerRef.current;
      const indicator = indicatorRef.current;

      if (container) {
        let totalWidth = 0;
        let labelCount = 0;

        Array.from(container.children).forEach((child, index) => {
          if (index < labels.length) {
            // Ignore the indicator itself
            const childWidth = (child as HTMLElement).offsetWidth;
            if (totalWidth + childWidth <= MAX_LABEL_WIDTH) {
              labelCount++;
              totalWidth += childWidth;
            }
          }
        });

        if (indicator && labelCount < labels.length) {
          // Check if there's space for the indicator
          totalWidth += indicator.offsetWidth;
          if (totalWidth > MAX_LABEL_WIDTH && labelCount > 0) {
            labelCount--; // Decrease name count to fit the indicator
          }
        }

        setVisibleLabelCount(labelCount);
      }
    };

    calculateVisibleLabels();
    window.addEventListener("resize", calculateVisibleLabels);

    return () => {
      window.removeEventListener("resize", calculateVisibleLabels);
    };
  }, [labels.length]);

  return (
    <div
      ref={containerRef}
      className={`flex max-w-[${MAX_LABEL_WIDTH}px] overflow-hidden`}
    >
      {labels
        .slice(0, visibleLabelCount)
        .map(({ emoji, label, type, value }, index) => (
          <Tooltip content="Add to filters" key={index}>
            <Chip
              color={type === GOOD_FIRST_ISSUE_KEY ? "danger" : "default"}
              className="mx-1 cursor-pointer"
              onClick={() => handleClick(type, [value])}
            >
              <div className="flex items-center gap-2">
                {emoji && (
                  <>
                    <Emoji emoji={emoji} className="text-xl" />
                    &nbsp;
                  </>
                )}
                {label}
              </div>
            </Chip>
          </Tooltip>
        ))}
      {labels.length > visibleLabelCount && (
        <Tooltip
          content={labels
            .slice(visibleLabelCount)
            .map(({ emoji, label }) => `${emoji} ${label}`)
            .join("  -  ")}
        >
          <div ref={indicatorRef} className="flex items-center ml-1 text-xs">
            +{labels.length - visibleLabelCount}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

interface ITimeProps {
  timestamp: string;
}
export const Time = ({ timestamp }: ITimeProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date(timestamp));
  }, [timestamp]);

  return (
    <div className="w-14 text-center lg:text-right">{formatDate(date!)}</div>
  );
};

interface IExternalLinkProps {
  href: string;
  title: string;
}
export const ExternalLink = ({ href, title }: IExternalLinkProps) => {
  return (
    <NuiLink
      className="w-fit"
      isBlock
      isExternal
      showAnchorIcon
      href={href}
      color="foreground"
      title={title}
    />
  );
};

export const KudosIssueTooltipContent = () => (
  <div className="px-1 py-2">
    <div className="text-small font-bold">Top Certified Contributions</div>
    <div className="text-tiny max-w-64">
      Creators honour to have a well-detailed problem statement and an assigned
      mentor available
    </div>
  </div>
);

const getGoodFirstIssueLabel = (isGoodFirstIssue: boolean): ILabelOption[] => {
  return isGoodFirstIssue
    ? [
        {
          emoji: "🌟",
          label: "Good First Issue",
          type: GOOD_FIRST_ISSUE_KEY as FilterKeys,
          value: "true",
        },
      ]
    : [];
};

const getTechnologyAndPurposeLabels = (
  fullTechnologies: IFilterOption[],
  purposes: IFilterOption[],
): ILabelOption[] => {
  return shuffleArray([
    ...fullTechnologies.map((tech) => ({
      ...tech,
      type: TECHNOLOGY_KEY as FilterKeys,
    })),
    ...purposes.map((purpose) => ({
      ...purpose,
      type: PURPOSE_KEY as FilterKeys,
    })),
  ]);
};

const isLabelFilteredOut = (option: IFilterOption, filters: Filters) => {
  return (
    (filters[GOOD_FIRST_ISSUE_KEY] && option.value === "true") ||
    filters[PURPOSE_KEY].some(({ value }) => value === option.value) ||
    filters[TECHNOLOGY_KEY].some(({ value }) => value === option.value)
  );
};
