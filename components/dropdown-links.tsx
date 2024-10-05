"use client";
import { ReactNode, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Link as NuiLink } from "@nextui-org/link";
import { LinkItem } from "@/types/project";

const DELAY = 200;

interface IDropdownLinksProps {
  icon: ReactNode;
  items: LinkItem[];
  placeholder: string;
}

const DropdownLinks = ({ icon, items, placeholder }: IDropdownLinksProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(null);

  return (
    <Dropdown
      isOpen={isOpen}
      radius="sm"
      placement="bottom-start"
      className="min-w-0 w-fit"
      classNames={{
        content: "p-0 border-divider",
      }}
    >
      <DropdownTrigger>
        <Button
          size="sm"
          aria-label={placeholder}
          color="default"
          variant="faded"
          className="capitalize"
          startContent={icon}
          onMouseEnter={() => {
            clearTimeout(timeoutId);
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            const id = setTimeout(() => setIsOpen(false), DELAY);
            setTimeoutId(id);
          }}
        >
          <p className="text-sm">{placeholder}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        color="default"
        variant="faded"
        className="p-1"
        // itemClasses={{
        //   base: [
        //     "rounded-md",
        //     "text-default-500",
        //     "transition-opacity",
        //     "data-[hover=true]:text-foreground",
        //     "data-[hover=true]:bg-default-100",
        //     "dark:data-[hover=true]:bg-default-50",
        //     "data-[selectable=true]:focus:bg-default-50",
        //     "data-[pressed=true]:opacity-70",
        //     "data-[focus-visible=true]:ring-default-500",
        //   ],
        // }}
        onMouseEnter={() => {
          clearTimeout(timeoutId);
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
      >
        {items.map(({ label, url }, idx) => (
          <DropdownItem key={idx}>
            <NuiLink
              isExternal
              showAnchorIcon
              href={url}
              color="foreground"
              title={`${label}'s link`}
            >
              <p className="text-sm">{label}</p>
            </NuiLink>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownLinks;
