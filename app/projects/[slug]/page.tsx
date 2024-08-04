import ConfigApi from "@/api/config/api";
import IssuesApi from "@/api/core/issues";
import { container } from "@/components/primitives";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import ProjectHeader from "./_components/ProjectHeader";

interface IProps {
  params: { slug: string };
}

export default async function SingleProjectPage({ params }: IProps) {
  const infos = await ConfigApi.getProjectInfos(params.slug);

  return (
    <>
      <section className={container()}>
        <ProjectHeader
          name={infos.name}
          slug={infos.slug}
          description={infos.description}
          links={infos.links}
        />
      </section>
    </>
  );
}
