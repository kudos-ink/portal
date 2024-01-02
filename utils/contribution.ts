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
      language: properties["Repo Language"].rollup.array[0].multi_select.map(
        (language: any) => language.name,
      )[0],
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
