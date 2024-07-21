import { Link } from "@nextui-org/link";
// import MyImage from "@/components/ui/image";
import ProjectApi from "@/api/core/projects";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { Project } from "@/types/project";

interface IProjectCarouselProps {}

function createCarousel(projects: Project[], keyPrefix: string) {
  if (projects.length % 2 !== 0) {
    projects.pop();
  }
  return projects.map(({ id, name, slug }, index) => {
    return (
      <Link
        aria-hidden="true"
        className={index % 2 == 0 ? "" : "mt-16 pt-16"}
        isExternal
        href={`/projects/${slug}`}
        color="foreground"
        title={name}
        key={`${keyPrefix}-${id}`}
      >
        <div className="flex items-center space-x-2 justify-evenly">
          {/* TODO: use tinified static logo */}
          {/* <MyImage
            className="rounded-md min-w-[45px] min-h-[45px] shrink-0 bg-foreground border"
            src={repo.repoIcon}
            alt={`${name} logo`}
            radius="sm"
            width={45}
            height={45}
            loading="eager"
          /> */}
          <div>{name}</div>
        </div>
      </Link>
    );
  });
}

export default async function ProjectCarousel({}: IProjectCarouselProps) {
  const { data } = await ProjectApi.getProjects().catch((error) => {
    console.error("Error fetching issues:", error);
    return DEFAULT_PAGINATED_RESPONSE;
  });

  const projectRowLogos = createCarousel(data, "1");
  const dupeRowLogos = createCarousel(data, "2");

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
