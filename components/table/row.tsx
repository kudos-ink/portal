"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Link as NuiLink } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { IconRepo } from "@/assets/icons";
import Emoji from "@/components/emoji";
import MyImage from "@/components/ui/image";
import { useFilters } from "@/contexts/filters";
import { TECHNOLOGY_KEY, PURPOSE_KEY } from "@/data/filters";
import { FilterKeys, IFilterOption, Filters } from "@/types/filters";
import { Repository } from "@/types/repository";
import { formatDate } from "@/utils/date";
import { shuffleArray } from "@/utils/filters";
import { createUrl } from "@/utils/url";
import {
  CARNIVAL_NEW_LISTED_ISSUES,
  CARNIVAL_WIP_ISSUES,
} from "@/data/carnival";

const MAX_LABEL_WIDTH = 192;

interface ILabelOption extends IFilterOption {
  type: FilterKeys;
}

interface IProjectProps {
  avatarSrc: string | null;
  slug: string;
  name: string;
  repository: Repository;
  withProjectData?: boolean;
}
export const Project = ({
  avatarSrc,
  slug,
  name,
  repository,
  withProjectData,
}: IProjectProps) => {
  if (!withProjectData) return <div />;
  return (
    <NuiLink
      className="flex md:gap-4 hover:text-primary"
      href={`/projects/${slug}`}
      color="foreground"
      title={`${name}'s project page`}
      as={Link}
    >
      <Project.Avatar alt={`${name} logo`} src={avatarSrc} />
      <div className="hidden md:flex flex-col justify-start items-start w-40">
        <h2 className="w-fit text-small font-semibold truncate hover:underline">
          {name}
        </h2>
        <p className="w-fit text-small !text-default-500 line-clamp-1">
          {repository.name}
        </p>
      </div>
    </NuiLink>
  );
};

interface IAvatarProps {
  alt: string;
  src: string | null;
}

const Avatar = ({ alt, src }: IAvatarProps) => {
  return (
    <div className="bg-foreground rounded-md min-w-[40px] min-h-[40px] sm:min-w-[45px] sm:min-h-[45px] shrink-0 flex items-center justify-center">
      {src !== null && (
        <MyImage
          className="border"
          src={src}
          alt={alt}
          radius="sm"
          height={38}
          width={38}
        />
      )}
    </div>
  );
};

Project.Avatar = Avatar;

interface IContentProps {
  id: number;
  title: string;
  projectName?: string;
  repositoryName: string;
  isCertified: boolean;
}
export const Content = ({
  id,
  title,
  projectName,
  repositoryName,
  isCertified,
}: IContentProps) => {
  const pathname = usePathname();
  const parsedTitle = DOMPurify.sanitize(marked.parseInline(title) as string);
  const isNewListed =
    pathname.includes("carnival") && CARNIVAL_NEW_LISTED_ISSUES.includes(id);
  const isWIP =
    pathname.includes("carnival") && CARNIVAL_WIP_ISSUES.includes(id);

  return (
    <div
      className={`flex flex-col ${projectName ? "lg:w-[270px] xl:w-[500px]" : "pl-2 gap-1"} ${isWIP ? " opacity-50" : " opacity-100"}`}
    >
      <span
        className={`text-small text-default-500 max-w-48 truncate ${projectName ? "md:hidden" : ""}`}
      >
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
      <div className="w-fit text-base flex gap-1 flex-grow relative">
        <h3
          className="mdc font-semibold max-w-48 sm:max-w-none leading-tight line-clamp-2 capitalize hover:text-primary hover:underline"
          dangerouslySetInnerHTML={{ __html: parsedTitle }} // Safely render sanitized HTML
        />
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
        {isNewListed && (
          <Tooltip content="New listing">
            <div className="hidden absolute -top-1 -left-8 md:block">
              <MyImage
                className="absolute flex-shrink-0 max-w-8 max-h-5 lg:mb-4"
                src="/new.gif"
                alt="New listed issue"
                radius="sm"
                height={30}
                width={40}
              />
            </div>
          </Tooltip>
        )}
        {isWIP && (
          <Tooltip content="A contributor is working on this issue">
            <div className="hidden absolute top-[1px] -left-10 md:block">
              <div className="text-xs font-bold bg-primary text-background rounded-sm px-1">
                WIP
              </div>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

interface ILabelsProps {
  gitLabels: string[];
  technologies: string[];
  purposes: string[];
  clickable: boolean;
}
export const Labels = ({
  gitLabels,
  technologies,
  purposes,
  clickable,
}: ILabelsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { filters, updateFilter, filterOptions } = useFilters();

  const [visibleLabelCount, setVisibleLabelCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const labels = useMemo(() => {
    const restTechnologies =
      filterOptions?.technologies?.filter(({ value }) =>
        technologies.includes(value),
      ) ?? [];
    const restPurposes =
      filterOptions?.purposes?.filter(({ value }) =>
        purposes.includes(value),
      ) ?? [];

    const technologyAndPurposeLabels = getTechnologyAndPurposeLabels(
      restTechnologies,
      restPurposes,
    );
    return technologyAndPurposeLabels.filter(
      (option) => !isLabelFilteredOut(option, filters),
    );
  }, [filters, filterOptions, technologies, purposes]);

  const handleClick = (key: FilterKeys, values: string[]) => {
    if (!clickable) return;

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
          <Tooltip content="Add to filters" key={index} isDisabled={!clickable}>
            <Chip
              color="default"
              className={`mx-1${clickable ? " cursor-pointer" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClick(type, [value]);
              }}
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

interface IApplyButtonProps {
  onOpen: () => void;
}
export const ApplyButton = ({ onOpen }: IApplyButtonProps) => {
  const handleClick = () => {
    onOpen();
  };

  return (
    <Button
      className="invisible group-hover:visible"
      color="primary"
      onPress={handleClick}
    >
      Apply
    </Button>
  );
};

export const KudosIssueTooltipContent = () => (
  <div className="px-1 py-2">
    <div className="text-small font-bold">Top Certified Contributions</div>
    <div className="text-tiny max-w-64">
      This issue belongs to the Kudos Carnival
    </div>
  </div>
);

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
  if (!filters) return false;
  return (
    filters[PURPOSE_KEY].some(({ value }) => value === option.value) ||
    filters[TECHNOLOGY_KEY].some(({ value }) => value === option.value)
  );
};
