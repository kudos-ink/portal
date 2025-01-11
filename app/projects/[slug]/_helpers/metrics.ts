import { fetchProjectTasks } from "@/lib/api/tasks";
import { Task } from "@/types/task";
import { PaginatedCustomResponse } from "@/types/pagination";
import { ProjectMetrics, ProjectInfos } from "@/types/project";

export async function constructProjectMetrics(
  infos: ProjectInfos,
  suggestedTasks: PaginatedCustomResponse<Task>,
): Promise<ProjectMetrics> {
  const certifiedTasks = await fetchProjectTasks(infos.slug, {
    labels: [],
    certified: true,
  });

  return {
    repositoriesTotal: infos.links.repository.length,
    certifiedTotal: certifiedTasks.totalCount,
    rewardsTotal: 0,
    suggestedTotal: suggestedTasks.totalCount,
  };
}
