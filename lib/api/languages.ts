import LanguagesApi from "@/api/core/languages";
import { LanguageQueryParams } from "@/types/repository";

export async function fetchLanguages(
  query: LanguageQueryParams,
): Promise<string[]> {
  let values: string[] = [];
  return LanguagesApi.getAllLanguages(query).catch((error) => {
    console.error("Error fetching LANGUAGE values:", error);
    return values;
  });
}
