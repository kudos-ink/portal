import { fetchProjectIssues } from "@/lib/api/issues";
import { Issue } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";
import { ProjectMetrics, ProjectInfos } from "@/types/project";

export async function constructProjectMetrics(
  infos: ProjectInfos,
  suggestedIssues: PaginatedCustomResponse<Issue>,
): Promise<ProjectMetrics> {
  const certifiedIssues = await fetchProjectIssues(infos.slug, {
    labels: [],
    certified: true,
  });

  return {
    repositoriesTotal: infos.links.repository.length,
    certifiedTotal: certifiedIssues.totalCount,
    rewardsTotal: 0,
    suggestedTotal: suggestedIssues.totalCount,
  };
}
