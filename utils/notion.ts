import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { REPO_LINK_TO_PAGE_ID_MAP } from "@/lib/notion/constants";
import { ValidRepositoryLink } from "@/lib/notion/types";
import projectLogosJson from "@/public/images/imageMap.json";
import { Contribution } from "@/types/contribution";
import { getImagePath } from "./github";
import {
  GOOD_FIRST_ISSUE_KEY,
  GOOD_FIRST_ISSUE_LABELS,
  INTEREST_KEY,
  LANGUAGES_KEY,
  PROJECTS_KEY,
  REPOSITORIES_BY_INTERESTS,
} from "@/data/filters";
import { Filters } from "@/types/filters";

export function transformNotionDataToContributions(
  notionData: QueryDatabaseResponse,
): Contribution[] {
  return notionData.results.reduce((acc: Contribution[], currentItem: any) => {
    const properties = currentItem.properties;

    const [avatarKey, id] = properties["Issue Link"].url.split("/issues/");
    const urlElements = avatarKey.split("/");
    const repository = urlElements.pop();
    const organization = urlElements.pop();
    const contribution: Contribution = {
      id,
      avatar: getImagePath(avatarKey, projectLogosJson),
      labels: properties["Issue Labels"].multi_select.map(
        (label: any) => label.name,
      ),
      languages: properties["Repo Language"].rollup.array[0].multi_select.map(
        (language: any) => language.name,
      ),
      project:
        properties["Project Name"].rollup.array[0].rich_text[0].plain_text,
      organization,
      repository,
      title: properties["Issue Title"].title[0].text.content,
      timestamp: properties["Opened Date"].date.start,
      url: properties["Issue Link"].url,
    };

    acc.push(contribution);
    return acc;
  }, []);
}

export function processNotionFilters(filters: Filters) {
  const queryFilters: any[] = [];

  if (filters[LANGUAGES_KEY].length > 0) {
    queryFilters.push({
      or: filters[LANGUAGES_KEY].map((language) => ({
        property: "Repo Language",
        rollup: {
          any: {
            multi_select: {
              contains: language.value,
            },
          },
        },
      })),
    });
  }

  if (filters[PROJECTS_KEY].length > 0) {
    const repositoryIds = filters[PROJECTS_KEY].flatMap(
      (project) =>
        REPO_LINK_TO_PAGE_ID_MAP[project.value as ValidRepositoryLink] || [],
    ).filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates, if necessary

    if (repositoryIds.length > 0) {
      const projectsFilter = {
        or: repositoryIds.map((repoId: string) => ({
          property: "Github Repo",
          relation: {
            contains: repoId,
          },
        })),
      };
      queryFilters.push(projectsFilter);
    }
  } else if (filters[INTEREST_KEY].length > 0) {
    const repositories = filters[INTEREST_KEY].flatMap(
      (interest) => REPOSITORIES_BY_INTERESTS[interest.value] || [],
    ).filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates, if necessary

    if (repositories.length > 0) {
      const interestsFilter = {
        or: repositories.map((repo) => ({
          property: "Github Repo",
          relation: {
            contains: REPO_LINK_TO_PAGE_ID_MAP[repo as ValidRepositoryLink],
          },
        })),
      };
      queryFilters.push(interestsFilter);
    }
  }

  if (filters[GOOD_FIRST_ISSUE_KEY]) {
    queryFilters.push({
      or: GOOD_FIRST_ISSUE_LABELS.map((label) => ({
        property: "Issue Labels",
        multi_select: {
          contains: label,
        },
      })),
    });
  }

  if (queryFilters.length === 1) {
    return queryFilters[0];
  } else if (queryFilters.length > 1) {
    return { and: queryFilters };
  }

  return undefined;
}
