import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Contribution } from "@/types/contribution";
import {
  GOOD_FIRST_ISSUE_KEY,
  GOOD_FIRST_ISSUE_LABELS,
  INTEREST_KEY,
  KUDOS_ISSUE_KEY,
  KUDOS_ISSUE_LABELS,
  LANGUAGES_KEY,
  PROJECTS_KEY,
} from "@/data/filters";
import { FilterOption, Filters } from "@/types/filters";

export function transformNotionDataToContributions(
  notionData: QueryDatabaseResponse,
): Contribution[] {
  return notionData.results.reduce((acc: Contribution[], currentItem: any) => {
    const properties = currentItem.properties;
    const labels: string[] = properties["Issue Labels"].multi_select.map(
      (label: any) => label.name,
    );
    const isCertified = labels.some((label) => label.includes("kudos"));

    const [avatarKey, id] = properties["Issue Link"].url.split("/issues/");
    const urlElements = avatarKey.split("/");
    const repository = urlElements.pop();
    const organization = urlElements.pop();
    const contribution: Contribution = {
      id,
      isCertified,
      labels,
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

export function processNotionFilters(
  filters: Filters,
  repositories: FilterOption[],
) {
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
      //TODO: if the filter has no issues all are display (bug)
      (project) => project?.id || [],
    )
      .filter((value, index, self) => self.indexOf(value) === index)
      .filter(Boolean); // Remove duplicates, if necessary

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
    const interests = filters[INTEREST_KEY].map((interest) => interest.value);
    const ids = repositories
      .filter((item) => {
        return item.interests?.some((interest) => interests.includes(interest));
      })
      .map((i) => i.id);
    if (ids.length > 0) {
      const interestsFilter = {
        or: ids
          .map((id) => {
            return {
              property: "Github Repo",
              relation: {
                contains: id,
              },
            };
          })
          .filter(Boolean), // temp fix until we got the each id in the repositories list.
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

  if (filters[KUDOS_ISSUE_KEY]) {
    queryFilters.push({
      or: KUDOS_ISSUE_LABELS.map((label) => ({
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
