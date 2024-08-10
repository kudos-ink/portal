import { ReactNode } from "react";
import { Button } from "@nextui-org/button";
import { Link as NuiLink } from "@nextui-org/link";
import { IconWeb, IconDocs, IconRepo, IconSocial } from "@/assets/icons";
import DropdownLinks from "@/components/dropdown-links";
import MyImage from "@/components/ui/image";
import { LinkItem, ProjectLinks } from "@/types/project";

interface IProjectHeaderProps {
  name: string;
  slug: string;
  description: string;
  links: ProjectLinks;
}

const ProjectHeader = ({
  description,
  links,
  name,
  slug,
}: IProjectHeaderProps) => (
  <div className="flex flex-col space-y-unit-1">
    <div className="flex gap-4 items-center mb-2">
      <MyImage
        className="bg-foreground border"
        src={`/project-icons/${slug}.png`}
        alt={`${name}'s Logo`}
        radius="sm"
        height={45}
        width={45}
      />
      <span className="text-3xl font-semibold">{name}</span>
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
  } else if (items.length === 1) {
    const { label, url } = items[0];
    return (
      <Button
        size="sm"
        aria-label={placeholder}
        color="default"
        variant="faded"
        startContent={icon}
      >
        <NuiLink
          isExternal
          showAnchorIcon
          href={url}
          color="foreground"
          title={`${label}'s link`}
        >
          <p className="text-sm">{label}</p>
        </NuiLink>
      </Button>
    );
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
