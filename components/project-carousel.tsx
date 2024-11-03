import Link from "next/link";
import { Link as NuiLink } from "@nextui-org/link";
import MyImage from "@/components/ui/image";
import ProjectApi from "@/api/core/projects";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { Project } from "@/types/project";
import { getIconSrc } from "@/utils/icons";
import { getAllProjects } from "@/lib/api/projects";

interface IProjectCarouselProps {}

function createCarousel(projects: Project[], keyPrefix: string) {
  if (projects.length % 2 !== 0) {
    projects.pop();
  }
  return projects.map(({ avatar, id, name, slug }, index) => {
    const avatarSrc = getIconSrc(slug, avatar);
    return (
      <NuiLink
        aria-hidden="true"
        className={index % 2 == 0 ? "" : "mt-16 pt-16"}
        href={`/projects/${slug}`}
        color="foreground"
        title={`${name}'s project page`}
        as={Link}
        key={`${keyPrefix}-${id}`}
      >
        <div className="flex items-center space-x-2 justify-evenly">
          {avatarSrc && (
            <MyImage
              className="rounded-md p-0.5 min-w-[45px] min-h-[45px] shrink-0 bg-foreground border"
              src={avatarSrc}
              alt={`${name} logo`}
              radius="sm"
              width={45}
              height={45}
              loading="eager"
            />
          )}
          <div>{name}</div>
        </div>
      </NuiLink>
    );
  });
}

export default async function ProjectCarousel({}: IProjectCarouselProps) {
  const projects = await getAllProjects();
  const projectRowLogos = createCarousel(projects, "1");
  const dupeRowLogos = createCarousel(projects, "2");

  return (
    //group group-hover:[animation-play-state:paused] add to enable pausing animation
    <div className="flex flex-col">
      <div className="text-center uppercase tracking-wide font-semibold">
        Fueling the future of open source software
      </div>
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:linear-gradient(90deg,_transparent_0%,_white_10%,_white_90%,_transparent_100%)] group">
        <div
          aria-hidden="true"
          className="flex items-center justify-center md:justify-start gap-x-2 animate-infinite-scroll group-hover:[animation-play-state:paused] px-2"
        >
          {projectRowLogos}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center justify-center md:justify-start gap-x-2 animate-infinite-scroll group-hover:[animation-play-state:paused] px-2"
        >
          {dupeRowLogos}
        </div>
      </div>
    </div>
  );
}
