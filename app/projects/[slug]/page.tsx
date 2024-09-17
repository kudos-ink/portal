import ConfigApi from "@/api/config/api";
import IssuesApi from "@/api/core/issues";
import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { DEFAULT_PAGINATED_RESPONSE, DEFAULT_QUERY } from "@/data/fetch";
import { fetchProjectLabelFlags } from "@/lib/api/issues";
import { Issue } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";
import ProjectHeader from "./_components/ProjectHeader";
import ProjectInfos from "./_components/ProjectInfos";
import ProjectMetrics from "./_components/ProjectMetrics";
import { constructProjectMetrics } from "./_helpers/metrics";
import { constructLabels } from "./_helpers/infos";

interface IProps {
  params: { slug: string };
}

export default async function SingleProjectPage({ params }: IProps) {
  const infos = await ConfigApi.getProjectInfos(params.slug);
  const issues = (await IssuesApi.getIssues({
    ...DEFAULT_QUERY,
    slug: params.slug,
  }).catch((error) => {
    console.error(`Error fetching issues for project "${params.slug}":`, error);
    return DEFAULT_PAGINATED_RESPONSE;
  })) as PaginatedCustomResponse<Issue>;

  const labelFlags = await fetchProjectLabelFlags(params.slug);
  const labels = constructLabels(labelFlags);
  const { metrics, stats } = await constructProjectMetrics(
    infos,
    issues.totalCount,
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
      <section className={container() + " mt-6"}>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-grow md:basis-0">
            <ProjectMetrics metrics={metrics} stats={stats} />
          </div>
          <div className="md:basis-2/3">
            <ProjectInfos
              labels={labels}
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
        </div>
      </section>
      <section className={container() + " mt-16"}>
        <div className="py-4 px-3 bg-default-100 border-small rounded-t-md">
          <span className="text-lg font-bold">{`${infos.name} contributions`}</span>
        </div>
        <PaginatedTable initialItems={issues} query={{}} slug={params.slug} />
      </section>
    </>
  );
}
