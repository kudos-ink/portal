import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import MyImage from "@/components/ui/image";
import { formatDate } from "@/utils/date";
import { useState, useRef, useEffect } from "react";
import { getProjectUrls } from "@/utils/github";

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
  languages: string[]; //TODO: make it an enum type with available languages from filters
  url: string;
}
export const Content = ({
  title,
  project,
  repository,
  languages,
  url,
}: IContentProps) => {
  return (
    <div className="flex flex-col space-y-unit-1 md:space-y-0">
      <Link
        className="w-fit"
        isExternal
        href={url}
        color="foreground"
        title="Open task on Github"
      >
        <h3 className="font-semibold max-w-48 sm:truncate sm:max-w-80 lg:max-w-64 xl:max-w-96">
          {title}
        </h3>
      </Link>
      <span className="text-small text-default-500 max-w-48 truncate md:hidden">{`${project} / ${repository}`}</span>
      <div className="flex gap-1 mt-[1px]">
        {languages.map((language, idx) => (
          <Chip key={idx} className="mx-1" variant="bordered" size="sm">
            {language}
          </Chip>
        ))}
      </div>
    </div>
  );
};

interface ILabelsProps {
  labels: string[];
}
export const Labels = ({ labels }: ILabelsProps) => {
  const [visibleLabelCount, setVisibleLabelCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

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
  }, [labels]);

  return (
    <div
      ref={containerRef}
      className={`flex max-w-[${MAX_LABEL_WIDTH}px] overflow-hidden`}
    >
      {labels.slice(0, visibleLabelCount).map((label, index) => (
        <Chip className="mx-1" key={index}>
          {label}
        </Chip>
      ))}
      {labels.length > visibleLabelCount && (
        <div ref={indicatorRef} className="flex items-center ml-1 text-xs">
          +{labels.length - visibleLabelCount}
        </div>
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
