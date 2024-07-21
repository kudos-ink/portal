import { Language } from "@/types/languages";
import tags from "@/utils/tags";
import { coreApiClient } from "./_client";

const LANGUAGES_PATH = "/languages";

export async function getAllLanguages() {
  const response = await coreApiClient.get<Language[]>(LANGUAGES_PATH, {
    tag: tags.languages,
  });
  return response.map(({ slug }) => slug);
}

export default { getAllLanguages };
