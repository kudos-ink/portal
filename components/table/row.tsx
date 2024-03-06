import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import Emoji from "@/components/emoji";
import MyImage from "@/components/ui/image";
import { useFilters } from "@/contexts/filters";
import { formatDate } from "@/utils/date";
import { getProjectUrls } from "@/utils/github";
import { findInterestsByProject, shuffleArray } from "@/utils/filters";
import { createUrl } from "@/utils/url";
import {
  GOOD_FIRST_ISSUE_KEY,
  GOOD_FIRST_ISSUE_LABELS,
  INTEREST_KEY,
  LANGUAGES_KEY,
} from "@/data/filters";
import { FilterKeys, FilterOption, Filters } from "@/types/filters";

const MAX_LABEL_WIDTH = 192;

interface IProjectProps {
  avatarSrc: string | null;
  name: string;
  organization: string;
  repository: string;
}
export const Project = ({
  avatarSrc,
  name,
  organization,
  repository,
}: IProjectProps) => {
  const { organizationUrl, repositoryUrl } = getProjectUrls(
    organization,
    repository,
  );
  return (
    <div className="flex md:gap-4">
      <Link
        className="w-fit"
        isExternal
        href={organizationUrl}
        color="foreground"
        title={`${name}'s organization on Github`}
      >
        <Project.Avatar alt={`${name} logo`} src={avatarSrc} />
      </Link>
      <div className="hidden md:flex flex-col w-36">
        <Link
          className="w-fit"
          isExternal
          href={organizationUrl}
          color="foreground"
          title={`${name}'s organization on Github`}
        >
          <h2 className="font-semibold truncate">{name}</h2>
        </Link>
        <Link
          className="w-fit"
          isExternal
          href={repositoryUrl}
          color="foreground"
          title={`${name}'s repository on Github`}
        >
          <p className="text-small text-default-500 truncate">{repository}</p>
        </Link>
      </div>
    </div>
  );
};

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
  project: string;
  repository: string;
  url: string;
  isCertified: boolean;
}
export const Content = ({
  title,
  project,
  repository,
  url,
  isCertified,
}: IContentProps) => {
  return (
    <div className="flex flex-col space-y-unit-1 md:space-y-0 lg:w-[270px] xl:w-[500px]">
      <Link
        className="w-fit flex gap-1 flex-grow relative"
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
      </Link>
      <span className="text-small text-default-500 max-w-48 truncate md:hidden">{`${project} / ${repository}`}</span>
    </div>
  );
};

interface ILabelsProps {
  gitLabels: string[];
  languages: string[];
  organization: string;
  repository: string;
}
export const Labels = ({
  gitLabels,
  languages,
  organization,
  repository,
}: ILabelsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { filters, updateFilter, filterOptions } = useFilters();

  const [visibleLabelCount, setVisibleLabelCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const isGoodFirstIssue = GOOD_FIRST_ISSUE_LABELS.some((name) =>
    gitLabels.includes(name),
  );
  const interests = findInterestsByProject(
    `${organization}/${repository}`,
    filterOptions.interests,
    filterOptions.repositories,
  );
  const fullLanguages = filterOptions.languages.filter(({ value }) =>
    languages.includes(value),
  );

  const labels = useMemo(() => {
    const goodFirstIssueLabels = getGoodFirstIssueLabel(isGoodFirstIssue);
    const languageAndInterestLabels = getLanguageAndInterestLabels(
      fullLanguages,
      interests,
    );
    return [...goodFirstIssueLabels, ...languageAndInterestLabels].filter(
      (name) => !isLabelFilteredOut(name, filters),
    );
  }, [filters, fullLanguages, interests, isGoodFirstIssue]);

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
        .map(({ emoji, name, type, value }, index) => (
          <Tooltip content="Add to filters" key={index}>
            <Chip
              color={type === GOOD_FIRST_ISSUE_KEY ? "danger" : "default"}
              className="mx-1 cursor-pointer"
              onClick={() => handleClick(type, [value])}
            >
              <div className="flex items-center gap-2">
                <Emoji emoji={emoji} className="text-xl" />
                &nbsp;
                {name}
              </div>
            </Chip>
          </Tooltip>
        ))}
      {labels.length > visibleLabelCount && (
        <Tooltip
          content={labels
            .slice(visibleLabelCount)
            .map(({ emoji, name }) => `${emoji} ${name}`)
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
    <Link
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
    <div className="text-small font-bold">Kudos Certified Issue</div>
    <a className="text-primary-500 underline" href="/#kudos-issue">
      Learn more
    </a>
  </div>
);

const getGoodFirstIssueLabel = (isGoodFirstIssue: boolean) => {
  return isGoodFirstIssue
    ? [
        {
          emoji: "🌟",
          name: "Good First Issue",
          type: GOOD_FIRST_ISSUE_KEY as FilterKeys,
          value: "true",
        },
      ]
    : [];
};

const getLanguageAndInterestLabels = (
  fullLanguages: FilterOption[],
  interests: FilterOption[],
) => {
  return shuffleArray([
    ...fullLanguages.map((name) => ({
      ...name,
      type: LANGUAGES_KEY as FilterKeys,
    })),
    ...interests.map((interest) => ({
      ...interest,
      type: INTEREST_KEY as FilterKeys,
    })),
  ]);
};

const isLabelFilteredOut = (name: FilterOption, filters: Filters) => {
  return (
    (filters[GOOD_FIRST_ISSUE_KEY] && name.value === "true") ||
    filters[INTEREST_KEY].some((option) => option.value === name.value) ||
    filters[LANGUAGES_KEY].some((option) => option.value === name.value)
  );
};
