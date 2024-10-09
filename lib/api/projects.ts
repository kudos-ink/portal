import ConfigApi from "@/api/config/api";

export async function fetchProjectInfo(slug: string) {
  return ConfigApi.getProjectInfos(slug).catch((error) => {
    console.error(`Error fetching project infos for "${slug}":`, error);
    return null;
  });
}
