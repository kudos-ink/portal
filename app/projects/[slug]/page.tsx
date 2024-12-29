import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { DefaultFiltersProvider } from "@/components/providers/filters";
import { SelectFilterConfig } from "@/components/filters/config";
import Toolbar from "@/components/filters/toolbar";
import KudosWeeksBanner from "@/components/kudos-weeks-banner";
import { DEFAULT_PAGINATION } from "@/data/fetch";
import { TECHNOLOGY_KEY } from "@/data/filters";
import { fetchProjectIssues } from "@/lib/api/issues";
import { fetchProject, fetchProjectInfo } from "@/lib/api/projects";
import { buildCheckboxFilters } from "@/lib/filters";
import ProjectAbout from "./_components/ProjectAbout";
import ProjectHeader from "./_components/ProjectHeader";
import ProjectInfos, { LayersMap } from "./_components/ProjectInfos";
import ProjectMetrics from "./_components/ProjectMetrics";
import { constructProjectMetrics } from "./_helpers/metrics";
import { constructLabels } from "./_helpers/infos";

const SELECT_FILTERS: SelectFilterConfig[] = [
  { key: TECHNOLOGY_KEY, options: [] },
];

interface IProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleProjectPage(props: IProps) {
  const params = await props.params;
  const { slug } = params;
  const infos = await fetchProjectInfo(slug);

  if (infos == null) return "Project not found";

  const project = await fetchProject(slug);
  const issues = await fetchProjectIssues(slug);
  const metrics = await constructProjectMetrics(infos, issues);

  const labels = constructLabels(infos, metrics);
  const checkboxFilters = buildCheckboxFilters(metrics);

  return (
    <>
      <section
        className={container() + " sm:gap-4 md:flex md:justify-between !mb-16"}
      >
        <div className="flex-grow md:basis-1/2 lg:basis-3/4">
          <ProjectHeader
            avatar={project?.avatar ?? null}
            name={infos.name}
            description={infos.description}
            links={infos.links}
            slug={infos.slug}
          />
          <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
            <div className="flex-grow lg:basis-1/4">
              <ProjectMetrics metrics={metrics} />
            </div>
            <div className="lg:basis-2/3">
              <ProjectInfos
                labels={labels}
                infos={[
                  // {
                  //   title: "Networks",
                  //   items: infos?.attributes.networks ?? [],
                  // },
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

      {metrics.certifiedTotal > 0 && (
        <section className={"mt-20 " + container()}>
          <KudosWeeksBanner>
            ♨️ <strong className="capitalize">{infos.name}</strong> participates
            to <strong>Kudos Carnival</strong>! -{" "}
            <strong>From Nov 1 to Dec 15</strong>:
            <br />
            Level up your contributions, solve key issues, and rise up the
            leaderboard!
          </KudosWeeksBanner>
        </section>
      )}

      {infos.richText && (
        <section className={"mt-12 mb-4 " + container()}>
          <ProjectAbout richText={infos.richText} />
        </section>
      )}

      <DefaultFiltersProvider slugs={[infos.slug]}>
        <div className="flex flex-col">
          <Toolbar
            label={`${infos?.name ?? "Open"} contributions`}
            selectFilters={SELECT_FILTERS}
            checkboxFilters={checkboxFilters}
            shouldUpdateRouter={false}
          />
          <section className={container()}>
            <PaginatedTable
              query={{
                projects: [slug],
              }}
              pagination={DEFAULT_PAGINATION}
              withProjectData={false}
            />
          </section>
        </div>
      </DefaultFiltersProvider>
    </>
  );
}
