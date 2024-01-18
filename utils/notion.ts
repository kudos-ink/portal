import {
  QueryDatabaseResponse,
  search,
} from "@notionhq/client/build/src/api-endpoints";
import { REPO_LINK_TO_PAGE_ID_MAP } from "@/lib/notion/constants";
import { ValidRepositoryLink } from "@/lib/notion/types";
import projectLogosJson from "@/public/images/imageMap.json";
import { Contribution } from "@/types/contribution";
import { getImagePath } from "./github";
import {
  GOOD_FIRST_ISSUE_KEY,
  GOOD_FIRST_ISSUE_LABELS,
  REPOSITORIES_BY_INTERESTS,
} from "@/data/filters";

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

export function processNotionFilters(params?: {
  [key: string]: string | undefined;
}) {
  const filters = [];

  if (params?.languages) {
    filters.push({
      property: "Repo Language",
      rollup: {
        any: {
          multi_select: {
            contains: params.languages,
          },
        },
      },
    });
  }

  if (params?.projects) {
    const repositories =
      REPO_LINK_TO_PAGE_ID_MAP[
        params.projects as unknown as ValidRepositoryLink
      ];
    filters.push({
      property: "Github Repo",
      relation: {
        contains: repositories,
      },
    });
  }

  if (params?.interests && REPOSITORIES_BY_INTERESTS[params.interests]) {
    const repositories = REPOSITORIES_BY_INTERESTS[params.interests];
    const interestsFilter = {
      or: repositories.map((interest) => ({
        property: "Github Repo",
        relation: {
          contains:
            REPO_LINK_TO_PAGE_ID_MAP[
              interest as unknown as ValidRepositoryLink
            ],
        },
      })),
    };
    filters.push(interestsFilter);
  }

  if (params?.[GOOD_FIRST_ISSUE_KEY]) {
    filters.push({
      or: GOOD_FIRST_ISSUE_LABELS.map((label) => ({
        property: "Issue Labels",
        multi_select: {
          contains: label,
        },
      })),
    });
  }

  if (filters.length === 1) {
    return filters[0];
  } else if (filters.length > 1) {
    return { and: filters };
  }

  return undefined;
}
