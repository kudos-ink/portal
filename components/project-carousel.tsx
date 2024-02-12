import { fetchFilterOptions } from "@/lib/repository-metadata";
import { Link } from "@nextui-org/link";
import MyImage from "@/components/ui/image";

interface IProjectCarouselProps {}

export default async function ({}: IProjectCarouselProps) {
  const { repositories } = await fetchFilterOptions();
  const map = new Map();
  repositories.forEach((repository) => {
    map.set(
      repository.repository_url.toLocaleLowerCase().includes("polkadot")
        ? "/images/polkadot-logo.png"
        : repository.icon,
      {
        name: repository.name,
        repoUrl: repository.repository_url,
        slug: repository.name.toLocaleLowerCase().replaceAll(" ", "-"),
      },
    );
  });
  const repoMap = Array.from(map).concat(
    Array.from(map).map((item, index) => [
      item[0],
      { ...item[1], name: `${item[1].name}-duplicate-${index}` },
    ]),
  );

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden py-4  [mask-image:linear-gradient(90deg,_transparent_0%,_white_10%,_white_90%,_transparent_100%)]">
      <div className="flex items-center justify-center md:justify-start gap-4 hover:[animation-play-state:paused] animate-infinite-scroll ">
        {repoMap.map((repoPlusIcon) => {
          return (
            <Link
              className="w-fit"
              isExternal
              href={`/explore/open-contributions-for-${repoPlusIcon[1].slug}`}
              color="foreground"
              title={repoPlusIcon[1].name}
            >
              <MyImage
                className="min-w-12 bg-foreground"
                src={repoPlusIcon[0]}
                alt={` logo`}
                key={repoPlusIcon[1].repoUrl}
                width={75}
                height={75}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
