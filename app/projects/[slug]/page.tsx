import { container } from "@/components/primitives";
import { DefaultFiltersProvider } from "@/components/providers/filters";
import { fetchProjectTasks } from "@/lib/api/tasks";
import { fetchProject, fetchProjectInfo } from "@/lib/api/projects";
import ProjectAbout from "./_components/ProjectAbout";
import ProjectHeader from "./_components/ProjectHeader";
import ProjectInfos, { LayersMap } from "./_components/ProjectInfos";
import ProjectMetrics from "./_components/ProjectMetrics";
import { ProjectTasksTabs } from "./_components/ProjectTasksTabs";
import { constructProjectMetrics } from "./_helpers/metrics";
import { constructLabels } from "./_helpers/infos";

interface IProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleProjectPage(props: IProps) {
  const params = await props.params;
  const { slug } = params;
  const infos = await fetchProjectInfo(slug);

  if (infos == null) return "Project not found";

  const project = await fetchProject(slug);
  const tasks = await fetchProjectTasks(slug);
  const metrics = await constructProjectMetrics(infos, tasks);

  const labels = constructLabels(infos, metrics);

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

      {infos.richText && (
        <section className={"mt-12 mb-4 " + container()}>
          <ProjectAbout richText={infos.richText} />
        </section>
      )}

      <DefaultFiltersProvider slugs={[infos.slug]}>
        <section className={container()}>
          <h2 className="text-2xl font-bold mb-6">{infos?.name ?? "Project"} Tasks</h2>
          <ProjectTasksTabs
            projectSlug={slug}
            projectId={project?.id ?? 0}
            devCount={tasks.totalCount}
          />
        </section>
      </DefaultFiltersProvider>
    </>
  );
}
