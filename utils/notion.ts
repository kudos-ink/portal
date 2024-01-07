import projectLogosJson from "@/public/images/imageMap.json";
import { Contribution } from "@/types/contribution";
import { getImagePath } from "./github";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export function transformNotionDataToContributions(
  notionData: QueryDatabaseResponse,
): Contribution[] {
  return notionData.results.reduce((acc: Contribution[], currentItem: any) => {
    const properties = currentItem.properties;

    const [avatarKey, id] = properties["Issue Link"].url.split("/issues/");
    const contribution: Contribution = {
      id,
      avatar: getImagePath(avatarKey, projectLogosJson), // Assuming getImagePath is a defined function
      labels: properties["Issue Labels"].multi_select.map(
        (label: any) => label.name,
      ),
      languages: properties["Repo Language"].rollup.array[0].multi_select.map(
        (language: any) => language.name,
      ),
      project:
        properties["Project Name"].rollup.array[0].rich_text[0].plain_text,
      repository: avatarKey.split("/").pop(),
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

  if (params?.search) {
    filters.push({
      property: "Project Name",
      rollup: {
        any: {
          rich_text: {
            contains: params.search,
          },
        },
      },
    });
  }

  if (params?.interests) {
    const interestsArray = Array.isArray(params.interests)
      ? params.interests
      : [params.interests];
    const interestsFilter = {
      or: interestsArray.map((interest) => ({
        property: "Project Name",
        rollup: {
          any: {
            rich_text: {
              contains: interest,
            },
          },
        },
      })),
    };
    filters.push(interestsFilter);
  }

  if (filters.length === 1) {
    return filters[0];
  } else if (filters.length > 1) {
    return { and: filters };
  }

  return undefined;
}
