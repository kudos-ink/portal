"use server";
import { Client } from "@notionhq/client";
import {
  QueryDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import "dotenv/config";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const fieldnameToPropertyIdMap = {
  "Project Name": "yag%5C",
  "Issue Title": "title",
  "Issue Link": "CpBm",
  "Opened By": "%7DS%5BG",
  "Opened Date": "deF%3F",
  Assignee: "rXDy",
  "Repo Language": "r_s%3C",
  "Issue Labels": "%5EjCr",
  "Github Repo": "Xj~Y",
  "Last edited time": "%3DUY%5E",
  //   "Issue Body": "M~GN",
  //   Etag: "vh~G",
  //   "Issue State": "zPlX",
  //   ID: "VRvO",
} as const;

type ValueOf<T> = T[keyof T];
type ValidFilterProperty = ValueOf<typeof fieldnameToPropertyIdMap>;
type KudosQueryParameters = Omit<
  QueryDatabaseParameters,
  "filter_properties"
> & {
  filter_properties?: Array<ValidFilterProperty>;
};

async function queryDatabase(
  queryParams: KudosQueryParameters
): Promise<QueryDatabaseResponse> {
  try {
    const response = await notion.databases.query(queryParams);

    return response as QueryDatabaseResponse;
  } catch (error) {
    console.error("Error querying Notion database:", error);
    throw error;
  }
}

async function main() {
  const r = await queryDatabase({
    database_id: "bc9fe682dbe04550b121303a2befad8a",
    filter_properties: [
      fieldnameToPropertyIdMap["Issue Link"],
      fieldnameToPropertyIdMap["Issue Title"],
      fieldnameToPropertyIdMap["Opened By"],
      fieldnameToPropertyIdMap["Project Name"],
      fieldnameToPropertyIdMap["Repo Language"],
      fieldnameToPropertyIdMap["Assignee"],
      fieldnameToPropertyIdMap["Opened Date"],
      fieldnameToPropertyIdMap["Issue Labels"],
      fieldnameToPropertyIdMap["Github Repo"],
    ],
    sorts: [
      {
        property: "ID",
        direction: "ascending",
      },
    ],
    page_size: 1,
  });
  console.log(JSON.stringify(r, null, 2));
}

main();
