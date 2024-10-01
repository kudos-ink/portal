import ConfigApi from "@/api/config/api";
import IssuesApi from "@/api/core/issues";
import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { DefaultFiltersProvider } from "@/components/providers/filters";
import Toolbar from "@/components/filters/toolbar";
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
      <section className={container() + " mt-6 !mb-16"}>
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
        {/* TODO: Add advance filters but make sure to only have the correct filters options from the query above (add props to DefaultFiltersProvider to support query) */}
        <Toolbar
          label={`${infos?.name ?? "Open"} contributions`}
          shouldUpdateRouter={false}
        />
        <section className={container()}>
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
