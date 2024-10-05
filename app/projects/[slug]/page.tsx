import ConfigApi from "@/api/config/api";
import IssuesApi from "@/api/core/issues";
import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { DefaultFiltersProvider } from "@/components/providers/filters";
import {
  CheckboxFilterConfig,
  DEFAULT_CHECKBOX_FILTERS,
  SelectFilterConfig,
} from "@/components/filters/config";
import Toolbar from "@/components/filters/toolbar";
import { DEFAULT_PAGINATED_RESPONSE, DEFAULT_QUERY } from "@/data/fetch";
import { KUDOS_ISSUE_KEY, TECHNOLOGY_KEY } from "@/data/filters";
import { fetchProjectLabelFlags } from "@/lib/api/issues";
import { Issue, IssueQueryParams } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";
import ProjectHeader from "./_components/ProjectHeader";
import ProjectInfos, { LayersMap } from "./_components/ProjectInfos";
import ProjectMetrics from "./_components/ProjectMetrics";
import { constructProjectMetrics } from "./_helpers/metrics";
import { constructLabels } from "./_helpers/infos";
import { KudosCertifiedIcon } from "@/assets/icons";
import { KudosIssueTooltipContent } from "@/components/table/row";

const SELECT_FILTERS: SelectFilterConfig[] = [
  { key: TECHNOLOGY_KEY, options: [] },
];

const CHECKBOX_FILTERS: CheckboxFilterConfig[] = [
  ...DEFAULT_CHECKBOX_FILTERS,
  {
    key: KUDOS_ISSUE_KEY,
    placeholder: "Kudos Issues Only",
    content: <KudosIssueTooltipContent />,
    icon: <KudosCertifiedIcon className="w-5 h-5" size={16} />,
  },
];

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
  const repositoryIds = Array.from(
    new Set(issues.data.map(({ repository }) => repository.id)),
  );

  const labelFlags = await fetchProjectLabelFlags(params.slug);
  const labels = constructLabels(labelFlags);
  const { metrics, stats } = await constructProjectMetrics(
    infos,
    issues.totalCount,
  );

  return (
    <>
      <section
        className={container() + " sm:gap-4 md:flex md:justify-between !mb-16"}
      >
        <div>
          {infos && (
            <ProjectHeader
              avatar={issues.data[0]?.project.avatar}
              name={infos.name}
              description={infos.description}
              links={infos.links}
            />
          )}
          <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
            <div className="flex-grow lg:basis-1/4">
              <ProjectMetrics metrics={metrics} stats={stats} />
            </div>
            <div className="lg:basis-2/3">
              <ProjectInfos
                labels={labels}
                infos={[
                  {
                    title: "Networks",
                    items: infos?.attributes.networks ?? [],
                  },
                  {
                    title: "Technologies",
                    items: infos?.attributes.technologies ?? [],
                  },
                  {
                    title: "Purposes",
                    items: infos?.attributes.purposes ?? [],
                  },
                  {
                    title: "Types",
                    items: infos?.attributes.types ?? [],
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:basis-1/2 lg:basis-1/4">
          <LayersMap
            isPlatform={infos?.attributes.stackLevels.includes("protocol")}
            isRuntime={infos?.attributes.stackLevels.includes("runtime")}
            isMessaging={infos?.attributes.stackLevels.includes("messaging")}
            isOffchain={infos?.attributes.stackLevels.includes("offchain")}
            isSmartContract={infos?.attributes.stackLevels.includes(
              "smart-contract",
            )}
          />
        </div>
      </section>

      <DefaultFiltersProvider repositoryIds={repositoryIds}>
        <Toolbar
          label={`${infos?.name ?? "Open"} contributions`}
          selectFilters={SELECT_FILTERS}
          checkboxFilters={CHECKBOX_FILTERS}
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
