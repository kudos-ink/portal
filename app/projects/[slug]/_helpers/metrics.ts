import { KUDOS_ISSUE_LABELS } from "@/data/filters";
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

  const kudosWeeksIssues = await fetchProjectIssues(infos.slug, {
    labels: KUDOS_ISSUE_LABELS,
  });

  return {
    repositoriesTotal: infos.links.repository.length,
    certifiedTotal: certifiedIssues.totalCount,
    kudosWeeksTotal: kudosWeeksIssues.totalCount,
    rewardsTotal: 0,
    suggestedTotal: suggestedIssues.totalCount,
  };
}
