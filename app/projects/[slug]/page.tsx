import ConfigApi from "@/api/config/api";
import IssuesApi from "@/api/core/issues";
import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { DefaultFiltersProvider } from "@/components/providers/filters";
import { DEFAULT_PAGINATED_RESPONSE, DEFAULT_QUERY } from "@/data/fetch";
import { fetchProjectLabelFlags } from "@/lib/api/issues";
import { Issue, IssueQueryParams } from "@/types/issue";
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
  const infos = await ConfigApi.getProjectInfos(params.slug).catch((error) => {
    console.error(`Error fetching project infos for "${params.slug}":`, error);
    return null;
  });
  const query: IssueQueryParams = {
    projects: [params.slug],
  };
  const issues = (await IssuesApi.getIssues({
    ...DEFAULT_QUERY,
    ...query,
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
      {infos && (
        <section className={container()}>
          <ProjectHeader
            avatar={issues.data[0]?.project.avatar}
            name={infos.name}
            description={infos.description}
            links={infos.links}
          />
        </section>
      )}
      <section className={container() + " mt-6"}>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-grow md:basis-0">
            <ProjectMetrics metrics={metrics} stats={stats} />
          </div>
          <div className="md:basis-2/3">
            <ProjectInfos
              labels={labels}
              infos={[
                { title: "Networks", items: infos?.attributes.networks ?? [] },
                {
                  title: "Technologies",
                  items: infos?.attributes.technologies ?? [],
                },
                { title: "Purposes", items: infos?.attributes.purposes ?? [] },
                { title: "Layers", items: infos?.attributes.stackLevels ?? [] },
              ]}
            />
          </div>
        </div>
      </section>

      <DefaultFiltersProvider>
        <section className={container() + " mt-16"}>
          <div className="py-4 px-3 bg-default-100 border-small rounded-t-md">
            {infos && (
              <span className="text-lg font-bold">{`${infos.name} contributions`}</span>
            )}
          </div>
          <PaginatedTable
            initialItems={issues}
            query={query}
            pagination={DEFAULT_QUERY}
            withProjectData={false}
          />
        </section>
      </DefaultFiltersProvider>
    </>
  );
}
