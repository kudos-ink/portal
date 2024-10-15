import { ReactNode } from "react";
import { IconWeb, IconDocs, IconRepo, IconSocial } from "@/assets/icons";
import DropdownLinks from "@/components/dropdown-links";
import MyImage from "@/components/ui/image";
import { LinkItem, ProjectLinks } from "@/types/project";
import { getIconSrc } from "@/utils/icons";

interface IProjectHeaderProps {
  avatar: string | null;
  name: string;
  slug: string;
  description: string;
  links: ProjectLinks;
}

const ProjectHeader = ({
  avatar,
  description,
  links,
  name,
  slug,
}: IProjectHeaderProps) => (
  <div className="flex flex-col space-y-unit-1">
    <div className="flex gap-4 items-center mb-2">
      {avatar && (
        <MyImage
          className="bg-foreground border min-w-[45px] min-h-[45px] shrink-0 flex items-center justify-center"
          src={getIconSrc(slug, avatar)}
          alt={`${name}'s Logo`}
          radius="sm"
          height={40}
          width={40}
        />
      )}
      <span className="text-3xl font-bold md:text-4xl">{name}</span>
    </div>
    <span className="leading-tight line-clamp-2 capitalize">{description}</span>
    <div className="flex flex-wrap gap-3 mt-6">
      {Object.entries(links).map(([key, items]) => (
        <Links
          key={key}
          icon={getIconByKey(key)}
          items={items}
          placeholder={key}
        />
      ))}
    </div>
  </div>
);

interface ILinksProps {
  icon: ReactNode;
  items: LinkItem[];
  placeholder: string;
}

const Links = ({ icon, items, placeholder }: ILinksProps) => {
  if (items.length === 0) {
    return null;
  }

  return <DropdownLinks icon={icon} items={items} placeholder={placeholder} />;
};

const getIconByKey = (key: string): ReactNode => {
  switch (key) {
    case "website":
      return <IconWeb size={16} />;
    case "docs":
      return <IconDocs size={16} />;
    case "repository":
      return <IconRepo size={16} />;
    case "social":
      return <IconSocial size={16} />;
    default:
      return null;
  }
};

export default ProjectHeader;
