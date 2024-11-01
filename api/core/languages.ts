import { LanguageQueryParams } from "@/types/repository";
import tags from "@/utils/tags";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";
import { languageQueryParamsToDto } from "./_transformers";

const LANGUAGES_PATH = "/languages";

export async function getAllLanguages(query?: LanguageQueryParams) {
  const queryDto = languageQueryParamsToDto(query);
  const url = prepareUrl(`${LANGUAGES_PATH}`, queryDto);

  const response = await coreApiClient.get<string[]>(url, {
    tag: tags.languages,
  });
  return response;
}

export default { getAllLanguages };
