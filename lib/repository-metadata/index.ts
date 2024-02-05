import { FilterOption, FilterOptions, Repository } from "@/types/filters";
import { FILTER_TAGS } from "@/utils/cache";

const REPOSITORY_CLASSIFICATION_URL = process.env.REPOSITORY_CLASSIFICATION_URL;

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, { next: { tags: [FILTER_TAGS] } });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const jsonData = await response.json();
    const data = Object.values(jsonData)[0];
    return data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

export async function fetchFilterOptions(): Promise<FilterOptions> {
  try {
    const interests = await fetchData<FilterOption[]>(
      `${REPOSITORY_CLASSIFICATION_URL}/interests.json`,
    );

    const languages = await fetchData<FilterOption[]>(
      `${REPOSITORY_CLASSIFICATION_URL}/languages.json`,
    );

    const allRepositories = await fetchData<Repository[]>(
      `${REPOSITORY_CLASSIFICATION_URL}/repository_full.json`,
    );
    // We want repositories with the id used in Notion.
    // If they don't have it means they aren't loaded in the
    // Notion table yet
    const repositories = allRepositories.filter(
      (value) => value.id && value.id !== "",
    );
    return { interests, languages, repositories };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    throw new Error("Failed to fetch filter options data");
  }
}
