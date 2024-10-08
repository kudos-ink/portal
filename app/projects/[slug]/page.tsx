import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { DefaultFiltersProvider } from "@/components/providers/filters";
import { SelectFilterConfig } from "@/components/filters/config";
import Toolbar from "@/components/filters/toolbar";
import KudosWeeksBanner from "@/components/kudos-weeks-banner";
import { DEFAULT_QUERY } from "@/data/fetch";
import { TECHNOLOGY_KEY } from "@/data/filters";
import { fetchProjectIssues } from "@/lib/api/issues";
import { fetchProjectInfo } from "@/lib/api/projects";
import { buildCheckboxFilters } from "@/lib/filters";
import { Issue, IssueQueryParams } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";
import ProjectHeader from "./_components/ProjectHeader";
import ProjectInfos, { LayersMap } from "./_components/ProjectInfos";
import ProjectMetrics from "./_components/ProjectMetrics";
import { constructProjectMetrics } from "./_helpers/metrics";
import { constructLabels } from "./_helpers/infos";

const SELECT_FILTERS: SelectFilterConfig[] = [
  { key: TECHNOLOGY_KEY, options: [] },
];

function getUniqueRepositoryIds(issues: PaginatedCustomResponse<Issue>) {
  return Array.from(
    new Set(issues.data.map(({ repository }) => repository.id)),
  );
}

interface IProps {
  params: { slug: string };
}

export default async function SingleProjectPage({ params }: IProps) {
  const { slug } = params;
  const infos = await fetchProjectInfo(slug);

  if (infos == null) return "Project not found";

  const query: IssueQueryParams = {
    projects: [slug],
    goodFirst: true,
  };
  const issues = await fetchProjectIssues(slug, query);
  const metrics = await constructProjectMetrics(infos, issues);

  const labels = constructLabels(metrics);
  const repositoryIds = getUniqueRepositoryIds(issues);
  const checkboxFilters = buildCheckboxFilters(metrics);

  return (
    <>
      <section
        className={container() + " sm:gap-4 md:flex md:justify-between !mb-16"}
      >
        <div>
          <ProjectHeader
            avatar={issues.data[0]?.project.avatar}
            name={infos.name}
            description={infos.description}
            links={infos.links}
          />
          <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
            <div className="flex-grow lg:basis-1/4">
              <ProjectMetrics metrics={metrics} />
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

      {metrics.kudosWeeksTotal > 0 && (
        <section className={"mt-20 mb-4 " + container()}>
          <KudosWeeksBanner>
            ♨️ <strong className="capitalize">{infos.name}</strong> participates
            to <strong>Kudos Carnival</strong>! -{" "}
            <strong>From Nov 1 to Dec 15</strong>: Level up your contributions,
            solve key issues, and rise up the leaderboard!
          </KudosWeeksBanner>
        </section>
      )}

      <DefaultFiltersProvider repositoryIds={repositoryIds}>
        <div className="flex flex-col">
          <Toolbar
            label={`${infos?.name ?? "Open"} contributions`}
            selectFilters={SELECT_FILTERS}
            checkboxFilters={checkboxFilters}
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
        </div>
      </DefaultFiltersProvider>
    </>
  );
}
