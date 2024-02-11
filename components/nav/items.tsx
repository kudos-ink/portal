import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Tooltip } from "@nextui-org/tooltip";
import { BugIcon, FeedbackIcon } from "@/assets/icons";
import { SITE_CONFIG } from "@/data/config";

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
  <Link
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
  </Link>
);

export const CtaButton = () => (
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
);
