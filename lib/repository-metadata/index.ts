import { FilterOption } from "@/types/filters";

export async function fetchInterests(): Promise<FilterOption[]> {
  const url =
    "https://kudos-ink.github.io/repository-classification/interests.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const jsonData: { interests: FilterOption[] } = await response.json();
    const { interests } = jsonData;
    return interests;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch interests data");
  }
}

export async function fetchLanguages(): Promise<FilterOption[]> {
  const url =
    "https://kudos-ink.github.io/repository-classification/languages.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const languages: FilterOption[] = await response.json();
    return languages;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch languages data");
  }
}

export async function fetchRepositories(): Promise<FilterOption[]> {
  const url =
    "https://kudos-ink.github.io/repository-classification/repository_full.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const jsonData: { repositories: FilterOption[] } = await response.json();
    const { repositories } = jsonData;
    return repositories;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch projects data");
  }
}
