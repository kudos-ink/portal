"use client";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { BugIcon, FeedbackIcon } from "@/assets/icons";
import { MyImage } from "@/components/ui/image";
import { SITE_CONFIG } from "@/data/config";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="static" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <MyImage
              src="/logo.svg"
              alt="Kudos Logo"
              radius="sm"
              height={45}
              width={45}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:block">
          <Chip variant="bordered">alpha</Chip>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            href={SITE_CONFIG.links.bugReport}
            target="_blank"
            aria-label="Bug report"
            title="Report a bug"
          >
            <Tooltip content="Report a bug">
              <Button
                size="sm"
                isIconOnly
                aria-label="Report a bug"
                variant="flat"
              >
                <BugIcon className="text-default-500" />
              </Button>
            </Tooltip>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <Tooltip content="Give us feedback">
              {/* add wrapper div workaround for tool tip */}
              <div className="hover:brightness-90">
                <DropdownTrigger>
                  <Button
                    size="sm"
                    isIconOnly
                    aria-label="Give us feedback"
                    variant="flat"
                  >
                    <FeedbackIcon className="text-default-500" />
                  </Button>
                </DropdownTrigger>
              </div>
            </Tooltip>
            <DropdownMenu aria-label="Feedback options">
              <DropdownItem
                key="contributor"
                href={SITE_CONFIG.links.contributorFeedback}
                target="_blank"
                description="How can we improve your experience as a contributor?"
              >
                Contributor
              </DropdownItem>

              <DropdownItem
                key="maintainer"
                href={SITE_CONFIG.links.maintainerFeedback}
                target="_blank"
                description="Let us know about your experience as a maintainer"
              >
                Project maintainer
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Link
            isExternal
            href={SITE_CONFIG.links.includeProject}
            target="_blank"
            aria-label="Include your project"
            title="Include your project"
          >
            <Tooltip content="Maintaining a project?">
              <Button className="font-semibold" color="primary" size="sm">
                Include your project
              </Button>
            </Tooltip>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
