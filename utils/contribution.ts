import projectLogosJson from "@/public/images/imageMap.json";
import { Contribution } from "@/types/contribution";
import { getImagePath } from "./helpers";

export function transformNotionDataToContributions(
  notionData: any,
): Contribution[] {
  return notionData.results.map(({ properties }: any) => {
    const [avatarKey, id] = properties["Issue Link"].url.split("/issues/");
    const contribution: Contribution = {
      id,
      avatar: getImagePath(avatarKey, projectLogosJson),
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
    return contribution;
  });
}
