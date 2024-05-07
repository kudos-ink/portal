import tags from "@/utils/tags";
import { sanitizeUrl } from "@/utils/url";
import { fetchData } from "../fetch";

const LANGUAGES_PATH = sanitizeUrl(process.env.API_URL || "") + "/languages";

export async function getLanguages() {
  const url = LANGUAGES_PATH;
  const tag = tags.languages;
  return fetchData<string[]>(url, { tag });
}
