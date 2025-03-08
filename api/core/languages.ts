import { LanguageQueryParams } from "@/types/repository";
import tags from "@/utils/tags";
import { mergeWithDefaultFilters } from "@/utils/url";
import { fetchFromApi } from "./_client";
import { languageQueryParamsToDto } from "./_transformers";
import { DEFAULT_QUERY_FILTERS } from "@/data/fetch";

const LANGUAGES_PATH = "/languages";

export async function getAllLanguages(query: LanguageQueryParams) {
  const mergedQuery = mergeWithDefaultFilters(query, DEFAULT_QUERY_FILTERS);
  const queryDto = languageQueryParamsToDto(mergedQuery);

  const response = await fetchFromApi<string[]>(
    LANGUAGES_PATH,
    queryDto,
  );
  return Array.from(
    new Set(response.map((language) => language.toLowerCase())),
  );
}

export default { getAllLanguages };
