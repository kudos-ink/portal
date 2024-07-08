import tags from "@/utils/tags";
import { sanitizeUrl } from "@/utils/url";
import { fetchData } from "../fetch";
import { Language } from "@/types/languages";

const LANGUAGES_PATH = sanitizeUrl(process.env.API_URL || "") + "/languages";

export async function getAllLanguages() {
  const url = LANGUAGES_PATH;
  const tag = tags.languages;
  const response = await fetchData<Language[]>(url, { tag }, []);
  return response.map(({ slug }) => slug);
}
