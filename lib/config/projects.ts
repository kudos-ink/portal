import { ProjectInfos } from "@/types/project";
import tags from "@/utils/tags";
import { sanitizeUrl } from "@/utils/url";
import { fetchData } from "../fetch";

const PROJECTS_PATH =
  sanitizeUrl(process.env.PROJECT_CLASSIFICATION_URL || "") + "/projects";

export async function getProjectInfos(
  slug: string,
): Promise<ProjectInfos | null> {
  const url = `${PROJECTS_PATH}/${slug}.json`;
  const tag = tags.projectInfos(slug);
  return fetchData<ProjectInfos | null>(url, { tag }, null);
}
