import ConfigApi from "@/api/config/api";
import IssuesApi from "@/api/core/issues";
import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import ProjectHeader from "./_components/ProjectHeader";
import ProjectInfos from "./_components/ProjectInfos";
import ProjectMetrics from "./_components/ProjectMetrics";

interface IProps {
  params: { slug: string };
}

export default async function SingleProjectPage({ params }: IProps) {
  const infos = await ConfigApi.getProjectInfos(params.slug);
  const issues = await IssuesApi.getIssuesByProject(params.slug).catch(
    (error) => {
      console.error(
        `Error fetching issues for project "${params.slug}":`,
        error,
      );
      return DEFAULT_PAGINATED_RESPONSE;
    },
  );

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
      <section className={container() + " pt-4"}>
        <div className="flex flex-col md:flex-row gap-2">
          <ProjectMetrics />
          <ProjectInfos
            labels={["Good First Issues", "Rewards", "Kudos Pick"]}
            infos={[
              { title: "Networks", items: infos.attributes.networks ?? [] },
              {
                title: "Technologies",
                items: infos.attributes.technologies ?? [],
              },
              { title: "Purposes", items: infos.attributes.purposes ?? [] },
              { title: "Layers", items: infos.attributes.stackLevels ?? [] },
            ]}
          />
        </div>
      </section>
      <section className={container() + " pt-16"}>
        <div className="py-4 px-3 bg-default-100 border-small rounded-t-md">
          <span className="text-lg font-bold">{`${infos.name} contributions`}</span>
        </div>
        <PaginatedTable initialItems={issues} query={{}} slug={params.slug} />
      </section>
    </>
  );
}
