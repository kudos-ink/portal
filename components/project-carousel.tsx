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

export default async function ({}: IProjectCarouselProps) {
  const { repositories } = await fetchFilterOptions();
  const map = new Map();
  repositories.forEach((repository) => {
    map.set(
      repository.project.toLocaleLowerCase() == "polkadot"
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

  let count = 0;
  let topRow: ProjectLogo[] = [];
  let bottomRow: ProjectLogo[] = [];
  map.forEach((repoData, repoIcon) => {
    if (count % 2 == 0) {
      topRow.push({
        ...repoData,
        repoIcon,
      });
    } else {
      bottomRow.push({
        ...repoData,
        repoIcon,
      });
    }
    count++;
  });
  count = 1;
  map.forEach((repoData, repoIcon) => {
    if (count % 2 == 0) {
      topRow.push({
        ...repoData,
        repoIcon,
        key: `${repoData.key}-duplicate`,
      });
    } else {
      bottomRow.push({
        ...repoData,
        repoIcon,
        key: `${repoData.key}-duplicate`,
      });
    }
    count++;
  });

  const topRowLogos = topRow.map((logo) => {
    return (
      <Link
        className="w-fit"
        isExternal
        href={`/explore/open-contributions-for-${logo.slug}`}
        color="foreground"
        title={logo.project}
        key={logo.key}
      >
        <div className="flex items-center space-x-2 justify-evenly">
          <MyImage
            className="min-w-12 bg-foreground"
            src={logo.repoIcon}
            alt={` logo`}
            width={75}
            height={75}
          />
          <div>{logo.project}</div>
        </div>
      </Link>
    );
  });

  const bottomRowLogos = bottomRow.map((logo) => {
    return (
      <Link
        className="w-fit"
        isExternal
        href={`/explore/open-contributions-for-${logo.slug}`}
        color="foreground"
        title={logo.project}
        key={logo.key}
      >
        <div className="flex items-center space-x-2 justify-evenly">
          <MyImage
            className="min-w-12 bg-foreground"
            src={logo.repoIcon}
            alt={` logo`}
            width={75}
            height={75}
          />
          <div>{logo.project}</div>
        </div>
      </Link>
    );
  });

  return (
    //group group-hover:[animation-play-state:paused] add to enable animation
    <div className="items-center">
      <div className="text-center">
        FUELING THE FUTURE OF OPEN SOURCE SOFTWARE
      </div>
      <div className="w-full overflow-hidden py-4 [mask-image:linear-gradient(90deg,_transparent_0%,_white_10%,_white_90%,_transparent_100%)]">
        <div className="inline-flex flex-nowrap items-center justify-center md:justify-start gap-x-20 animate-infinite-scroll">
          {topRowLogos}
        </div>
        <div className="inline-flex flex-nowrap items-center justify-center md:justify-start gap-x-20 animate-infinite-scroll">
          {bottomRowLogos}
        </div>
      </div>
    </div>
  );
}
