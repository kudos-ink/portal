import { fetchProjectIssues } from "@/lib/api/issues";
import { Issue } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";
import { ProjectMetrics, ProjectInfos } from "@/types/project";

export async function constructProjectMetrics(
  infos: ProjectInfos,
  suggestedIssues: PaginatedCustomResponse<Issue>,
): Promise<ProjectMetrics> {
  const certifiedIssues = await fetchProjectIssues(infos.slug, {
    certified: true,
  });

  const kudosIssues = await fetchProjectIssues(infos.slug, {
    kudos: true,
  });

  return {
    repositoriesTotal: infos.links.repository.length,
    certifiedTotal: certifiedIssues.totalCount,
    kudosTotal: kudosIssues.totalCount,
    rewardsTotal: 0,
    suggestedTotal: suggestedIssues.totalCount,
  };
}
