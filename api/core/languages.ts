import tags from "@/utils/tags";
import { coreApiClient } from "./_client";

const LANGUAGES_PATH = "/languages";

export async function getAllLanguages() {
  const response = await coreApiClient.get<string[]>(LANGUAGES_PATH, {
    tag: tags.languages,
  });
  return response;
}

export default { getAllLanguages };
