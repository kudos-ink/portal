import Row from "@/components/row";
import { getGoodFirstIssues } from "@/actions/notion";
import {
  QueryDatabaseResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ValidNotionResponse, Properties } from "@/types";
import { daysSince, isValidNotionResponse } from "@/utils/helpers";

export default async function Page() {
  const data = await getGoodFirstIssues({ page_size: 4 });

  return (
    <div>
      {data.results.map((row, index) => {
        if (isValidNotionResponse(row)) {
          return (
            <Row
              key={index}
              projectName={
                row.properties["Project Name"].rollup.array[0].rich_text[0]
                  .plain_text
              }
              repo={row.properties["Issue Link"].url.split("/issues")[0]}
              issueTitle={row.properties["Issue Title"].title[0].plain_text}
              issueLink={row.properties["Issue Link"].url}
              openedDate={
                daysSince(row.properties["Opened Date"].date.start).toString() +
                "d"
              }
              labels={row.properties["Issue Labels"].multi_select.map(
                (label) => label.name
              )}
            />
          );
        }
      })}
    </div>
  );
}
