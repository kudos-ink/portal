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

export async function createNotionFilter(
  languages: string,
  search: string,
  interests: string[],
) {
  if (!languages && !search && !interests) {
    // If all parameters are undefined, return undefined
    return undefined;
  } else {
    const filters = [];

    if (languages) {
      // If languages is defined, create a filter for Repo Language
      filters.push({
        property: "Repo Language",
        rollup: {
          any: {
            multi_select: {
              contains: languages,
            },
          },
        },
      });
    }

    if (search) {
      // If search is defined, create a filter for Project Name
      filters.push({
        property: "Project Name",
        rollup: {
          any: {
            rich_text: {
              contains: search,
            },
          },
        },
      });
    }
    if (interests && interests.length > 0) {
      // If interests is defined and not empty, create a filter for Interests using "or"
      filters.push({
        or: interests.map((interest) => ({
          property: "Project Name",
          rollup: {
            any: {
              rich_text: {
                contains: interest,
              },
            },
          },
        })),
      });
    }

    if (filters.length === 1) {
      // If there's only one filter, return it directly
      return filters[0];
    } else if (filters.length > 1) {
      // If there are multiple filters, combine them with "and"
      return {
        and: filters,
      };
    }
  }
}
