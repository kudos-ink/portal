import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import Emoji from "@/components/emoji";
import MyImage from "@/components/ui/image";
import { useFilters } from "@/contexts/filters";
import { formatDate } from "@/utils/date";
import { getProjectUrls } from "@/utils/github";
import {
  findInterestsByProject,
  findLanguages,
  shuffleArray,
} from "@/utils/filters";
import { createUrl } from "@/utils/url";
import { INTEREST_KEY, LANGUAGES_KEY } from "@/data/filters";
import { FilterKeys } from "@/types/filters";

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
}
export const Content = ({ title, project, repository, url }: IContentProps) => {
  return (
    <div className="flex flex-col space-y-unit-1 md:space-y-0">
      <Link
        className="w-fit"
        isExternal
        href={url}
        color="foreground"
        title="Open task on Github"
      >
        <h3 className="font-semibold max-w-48 sm:max-w-80 lg:max-w-64 xl:max-w-96 line-clamp-2 capitalize">
          {title}
        </h3>
      </Link>
      <span className="text-small text-default-500 max-w-48 truncate md:hidden">{`${project} / ${repository}`}</span>
    </div>
  );
};

interface ILabelsProps {
  languages: string[];
  organization: string;
  repository: string;
}
export const Labels = ({
  languages,
  organization,
  repository,
}: ILabelsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { filters, updateFilter } = useFilters();

  const [visibleLabelCount, setVisibleLabelCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const interests = findInterestsByProject(`${organization}/${repository}`);
  const fullLanguages = findLanguages(languages);

  const labels = useMemo(
    () =>
      shuffleArray(
        [
          ...fullLanguages.map((label) => ({
            ...label,
            type: LANGUAGES_KEY as FilterKeys,
          })),
          ...interests.map((interest) => ({
            ...interest,
            type: INTEREST_KEY as FilterKeys,
          })),
        ].filter(
          ({ value }) =>
            !filters[INTEREST_KEY].find((option) => option.value === value) &&
            !filters[LANGUAGES_KEY].find((option) => option.value === value),
        ),
      ),
    [filters, fullLanguages, interests],
  );

  const handleClick = (key: FilterKeys, values: string[]) => {
    updateFilter(key, values);
    const currentPath = pathname === "/" ? "/explore/" : pathname;
    const newUrl = createUrl(key, values, currentPath);
    router.replace(newUrl, { scroll: false });
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
            labelCount--; // Decrease label count to fit the indicator
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
              className="mx-1 cursor-pointer"
              onClick={() => handleClick(type, [value])}
            >
              <Emoji emoji={emoji} className="text-xl" />
              &nbsp;
              {label}
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
  return <div className="">{formatDate(new Date(timestamp))}</div>;
};

interface IExternalLinkProps {
  href: string;
  title: string;
}
export const ExternalLink = ({ href, title }: IExternalLinkProps) => {
  return (
    <Link
      isBlock
      isExternal
      showAnchorIcon
      href={href}
      color="foreground"
      title={title}
    />
  );
};
