import IssuesApi from "@/api/core/issues";
import { DEFAULT_QUERY, DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { GOOD_FIRST_ISSUE_LABELS } from "@/data/filters";
import { ProjectInfosLabelFlags } from "@/types/project";

export async function fetchProjectLabelFlags(
  slug: string,
): Promise<ProjectInfosLabelFlags> {
  const goodFirstIssuesResponse = await IssuesApi.getIssues({
    ...DEFAULT_QUERY,
    slug,
    labels: GOOD_FIRST_ISSUE_LABELS,
  }).catch((error) => {
    console.error(
      `Error fetching 'GOOD FIRST' issues for project "${slug}":`,
      error,
    );
    return DEFAULT_PAGINATED_RESPONSE;
  });

  const kudosCertificationResponse = await IssuesApi.getIssues({
    ...DEFAULT_QUERY,
    slug,
    isCertified: true,
  }).catch((error) => {
    console.error(
      `Error fetching 'Kudos Certified' issues for project "${slug}":`,
      error,
    );
    return DEFAULT_PAGINATED_RESPONSE;
  });

  const hasGoodFirstIssue = (goodFirstIssuesResponse.totalCount ?? 0) > 0;
  const hasKudosCertified = (kudosCertificationResponse.totalCount ?? 0) > 0;

  // TODO: handle rewards flag

  return { hasGoodFirstIssue, hasKudosCertified, hasRewards: false };
}
