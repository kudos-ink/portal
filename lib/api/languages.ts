import LanguagesApi from "@/api/core/languages";
import { LanguageQueryParams } from "@/types/repository";
import { safeFetch } from "@/utils/error";

export async function fetchLanguages(
  query: LanguageQueryParams,
): Promise<string[]> {
  return safeFetch(
    () => LanguagesApi.getAllLanguages(query),
    "fetchLanguages",
    [],
    { query },
  );
}
