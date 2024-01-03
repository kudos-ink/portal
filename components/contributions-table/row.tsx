import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import MyImage from "@/components/ui/image";
import { formatDate } from "@/utils/date";
import { useState, useRef, useEffect } from "react";

const MAX_LABEL_WIDTH = 192;

interface IProjectProps {
  avatarSrc: string;
  name: string;
  repository: string;
}
export const Project = ({ avatarSrc, name, repository }: IProjectProps) => {
  return (
    <div className="flex gap-4">
      <Project.Avatar alt={`${name} logo`} src={avatarSrc} />
      <div className="flex flex-col w-36">
        <h2 className="font-semibold truncate">{name}</h2>
        <p className="text-small text-default-500 truncate">{repository}</p>
      </div>
    </div>
  );
};

interface IAvatarProps {
  alt: string;
  src: string;
}

const Avatar = ({ alt, src }: IAvatarProps) => {
  return (
    <div className="bg-foreground rounded-md min-w-[45px] shrink-0">
      <MyImage
        className="border"
        src={src}
        alt={alt}
        radius="sm"
        height={45}
        width={45}
      />
    </div>
  );
};

Project.Avatar = Avatar;

interface IContentProps {
  title: string;
  language: string; //TODO: make it an enum type with available languages from filters
}
export const Content = ({ title, language }: IContentProps) => {
  return (
    <div>
      <h3 className="font-semibold max-w-96 truncate">{title}</h3>
      <Chip className="mt-[1px]" variant="bordered" size="sm">
        {language}
      </Chip>
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

interface IOpenedDateProps {
  timestamp: string;
}
export const OpenedDate = ({ timestamp }: IOpenedDateProps) => {
  return <div className="">{formatDate(new Date(timestamp))}</div>;
};

interface IActionsProps {
  href: string;
}
export const Actions = ({ href }: IActionsProps) => {
  return <Link isBlock showAnchorIcon href={href} color="foreground" />;
};
