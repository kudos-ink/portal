import { fetchFilterOptions } from "@/lib/repository-metadata";
import { Link } from "@nextui-org/link";
import MyImage from "@/components/ui/image";

interface IProjectCarouselProps {}

type ProjectLogo = {
  repoIcon: string;
  project: string;
  repoUrl: string;
  slug: string;
  key: string;
};

function createCarousel(
  repoMap: Map<
    string,
    { project: string; repoUrl: string; slug: string; key: string }
  >,
  duplicate: boolean,
) {
  let projectRow: ProjectLogo[] = [];
  repoMap.forEach((repoData, repoIcon) => {
    if (duplicate) {
      projectRow.push({
        ...repoData,
        repoIcon,
        key: `${repoData.key}-duplicate`,
      });
    } else {
      projectRow.push({
        ...repoData,
        repoIcon,
      });
    }
  });
  if (projectRow.length % 2 !== 0) {
    projectRow.pop();
  }
  return projectRow.map((repo, index) => {
    return (
      <Link
        aria-hidden="true"
        className={index % 2 == 0 ? "" : "mt-16 pt-16"}
        isExternal
        href={`/explore/open-contributions-for-${repo.slug}`}
        color="foreground"
        title={repo.project}
        key={repo.key}
      >
        <div className="flex items-center space-x-2 justify-evenly">
          <MyImage
            className="rounded-md min-w-[45px] min-h-[45px] shrink-0 bg-foreground border"
            src={repo.repoIcon}
            alt={`${repo.project} logo`}
            radius="sm"
            width={45}
            height={45}
            loading="eager"
          />
          <div>{repo.project}</div>
        </div>
      </Link>
    );
  });
}

export default async function ProjectCarousel({}: IProjectCarouselProps) {
  const { repositories } = await fetchFilterOptions();
  const map = new Map();
  repositories.forEach((repository) => {
    map.set(
      repository.project?.toLowerCase() == "polkadot"
        ? "/images/polkadot-logo.png"
        : repository.icon,
      {
        project: repository.project,
        repoUrl: repository.repository_url,
        slug: repository.name.toLocaleLowerCase().replaceAll(" ", "-"),
        key: repository.name,
      },
    );
  });
  const projectRowLogos = createCarousel(map, false);
  const dupeRowLogos = createCarousel(map, true);

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
