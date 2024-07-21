import { ProjectInfos } from "@/types/project";
import tags from "@/utils/tags";
import { configApiClient } from "./_client";

const PROJECTS_PATH = "/projects";

export async function getProjectInfos(slug: string): Promise<ProjectInfos> {
  const url = `${PROJECTS_PATH}/${slug}.json`;
  const tag = tags.projectInfos(slug);
  return configApiClient.get<ProjectInfos>(url, { tag });
}

export default { getProjectInfos };
