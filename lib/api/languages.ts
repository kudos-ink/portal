import LanguagesApi from "@/api/core/languages";
import { LanguageQueryParams } from "@/types/repository";
import { safeFetch } from "@/utils/error";
import { DEFAULT_ALL_LANGUAGES } from "@/data/fetch";

export async function fetchLanguages(
  query: LanguageQueryParams,
): Promise<string[]> {
  return safeFetch(
    () => LanguagesApi.getAllLanguages(query),
    "fetchLanguages",
    DEFAULT_ALL_LANGUAGES,
    { query },
  );
}
