"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Link as NuiLink } from "@nextui-org/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Tooltip } from "@nextui-org/tooltip";
import { BugIcon, ChevronDownIcon, FeedbackIcon } from "@/assets/icons";
import MyImage from "@/components/ui/image";
import { SITE_CONFIG } from "@/data/config";
import { Project } from "@/types/project";

export const FeedbackForms = () => {
  return (
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
  );
};

export const BugReport = () => (
  <NuiLink
    isExternal
    href={SITE_CONFIG.links.bugReport}
    target="_blank"
    aria-label="Bug report"
    title="Report a bug"
  >
    <Tooltip content="Report a bug">
      <Button size="sm" isIconOnly aria-label="Report a bug" variant="flat">
        <BugIcon className="text-default-500" />
      </Button>
    </Tooltip>
  </NuiLink>
);

export const CtaButton = () => (
  <NuiLink
    isExternal
    href={SITE_CONFIG.links.includeProject}
    target="_blank"
    aria-label="List your project"
    title="List your project"
  >
    <Tooltip content="Maintaining a project?">
      <Button className="font-semibold" color="primary" size="sm">
        List your project
      </Button>
    </Tooltip>
  </NuiLink>
);

export const ProjectDropDown = ({ projects }: { projects: Project[] }) => (
  <Dropdown>
    <DropdownTrigger>
      <Button variant="bordered" endContent={<ChevronDownIcon />}>
        All Projects
      </Button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Dynamic Actions"
      className="max-h-[50vh] overflow-y-auto"
      items={projects}
    >
      {({ avatar, id, name, slug }) => (
        <DropdownItem key={`${slug}-${id}`}>
          <NuiLink
            className="flex items-center gap-2"
            href={`/projects/${slug}`}
            color="foreground"
            title={`${name}'s project page`}
            as={Link}
          >
            <div className="bg-foreground rounded-md min-w-[40px] min-h-[40px] sm:min-w-[45px] sm:min-h-[45px] shrink-0 flex items-center justify-center">
              {avatar !== null && (
                <MyImage
                  className="border"
                  src={
                    name.toLocaleLowerCase() == "polkadot"
                      ? "/images/polkadot-logo.png"
                      : avatar
                  }
                  alt={`${name}'s avatar`}
                  radius="sm"
                  height={40}
                  width={40}
                />
              )}
            </div>
            <div className="capitalize">{name}</div>
          </NuiLink>
        </DropdownItem>
      )}
    </DropdownMenu>
  </Dropdown>
);
