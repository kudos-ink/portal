import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Link as NuiLink } from "@nextui-org/link";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Task } from "@/types/task";
import { Project } from "./row";
import { getIconSrc } from "@/utils/icons";

interface ITaskModalProps {
  task: Task;
}

export const TaskModal = ({ task }: ITaskModalProps) => {
  const { description, project, repository, title, url, isCertified } = task;
  const parsedTitle =
    title && DOMPurify.sanitize(marked.parseInline(title) as string);
  const parsedDescription =
    description &&
    DOMPurify.sanitize(marked.parse(description, { breaks: true }) as string);

  return (
    <ModalContent className="relative">
      <>
        <ModalHeader className="flex flex-col gap-1">
          {isCertified && (
            <div className="absolute w-full top-0 left-0 flex justify-between items-center gap-4 bg-primary px-6 py-2">
              <p className="text-background">
                ♨️ This task is part of Kudos Carnival!
              </p>
              <NuiLink
                href="/carnival"
                color="foreground"
                title="Kudos Weeks event page"
                as={Link}
              >
                <Button size="sm">Learn more</Button>
              </NuiLink>
            </div>
          )}
          <div className={isCertified ? "mt-20 md:mt-16 w-fit" : "w-fit"}>
            <NuiLink
              className="flex gap-4 hover:text-primary w-fit"
              href={`/projects/${project.slug}`}
              color="foreground"
              title={`${name}'s project page`}
              as={Link}
            >
              <Project.Avatar
                alt={`${project.name} logo`}
                src={project.avatar && getIconSrc(project.slug, project.avatar)}
              />
              <div className="flex flex-col justify-start items-start w-36">
                <h2 className="w-fit text-small font-semibold truncate hover:underline">
                  {project.name}
                </h2>
                <p className="w-fit text-small !text-default-500 truncate">
                  {repository.name}
                </p>
              </div>
            </NuiLink>
            {parsedTitle && (
              <h3
                className="mdc font-semibold leading-tight capitalize mt-4"
                dangerouslySetInnerHTML={{ __html: parsedTitle }} // Safely render sanitized HTML
              />
            )}
          </div>
        </ModalHeader>
        {parsedDescription && (
          <ModalBody>
            <ScrollShadow
              hideScrollBar
              className="w-full h-[200px] md:h-[320px] p-4 border border-gray-300 rounded-lg mb-4 shadow-sm"
            >
              <div
                className="mdc"
                dangerouslySetInnerHTML={{ __html: parsedDescription }}
              />
            </ScrollShadow>
          </ModalBody>
        )}
        <ModalFooter>
          <div className="flex flex-col items-center gap-8 text-center border-t-2 border-default">
            <div className="flex flex-col">
              <h4 className="font-semibold mt-4">
                Comment on GitHub with a detailed approach to solving it
              </h4>
              <p className="text-default-600">
                The better your explanation the more likely you are to get the
                assignment and collect Kudos!
              </p>
            </div>
            <NuiLink
              isExternal
              href={url}
              target="_blank"
              aria-label="Apply on Github"
              title="Apply on Github"
            >
              <Button className="font-semibold" color="primary">
                Apply on Github
              </Button>
            </NuiLink>
          </div>
        </ModalFooter>
      </>
    </ModalContent>
  );
};

export default TaskModal;
