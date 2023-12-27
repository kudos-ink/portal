"use server";
import { Client } from "@notionhq/client";
import {
  QueryDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import "dotenv/config";
import { subtractMonths } from "../utils/helpers.js"; // added .js extension for ts-node to work - remove when done

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = "bc9fe682dbe04550b121303a2befad8a";

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
  ID: "VRvO",
  //   "Issue Body": "M~GN",
  //   Etag: "vh~G",
  //   "Issue State": "zPlX",
} as const;

const defaultFilterProperties = [
  fieldnameToPropertyIdMap["Issue Link"],
  fieldnameToPropertyIdMap["Issue Title"],
  fieldnameToPropertyIdMap["Opened By"],
  fieldnameToPropertyIdMap["Project Name"],
  fieldnameToPropertyIdMap["Repo Language"],
  fieldnameToPropertyIdMap["Assignee"],
  fieldnameToPropertyIdMap["Opened Date"],
  fieldnameToPropertyIdMap["Issue Labels"],
  fieldnameToPropertyIdMap["Github Repo"],
];

const defaultSort = [
  {
    property: "Opened Date",
    direction: "descending",
  },
] as ValidSort;

type ValueOf<T> = T[keyof T];
type ValidFilterProperty = ValueOf<typeof fieldnameToPropertyIdMap>;
type ValidSortProperty = keyof typeof fieldnameToPropertyIdMap;
type ValidSort = Array<
  | {
      property: ValidSortProperty;
      direction: "ascending" | "descending";
    }
  | {
      timestamp: "created_time" | "last_edited_time";
      direction: "ascending" | "descending";
    }
>;

type KudosQueryParameters = Omit<QueryDatabaseParameters, "filter_properties"> &
  Omit<QueryDatabaseParameters, "sorts"> & {
    filter_properties?: Array<ValidFilterProperty>;
  } & {
    sorts?: ValidSort;
  };

async function baseQueryDatabase(
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

async function queryDatabase(
  queryOverrides: Partial<KudosQueryParameters> = {}
): Promise<QueryDatabaseResponse> {
  const defaultQuery: KudosQueryParameters = {
    database_id: databaseId,
    filter_properties: defaultFilterProperties,
    sorts: defaultSort,
    page_size: 100,
  };
  const query = {
    ...defaultQuery,
    ...queryOverrides,
  };
  return await baseQueryDatabase(query);
}

async function getGoodFirstIssues({
  page_size = 100,
  filter_properties = defaultFilterProperties,
  sorts = defaultSort,
}): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    filter: {
      or: [
        {
          property: "Issue Labels",
          multi_select: {
            contains: "good-first-issue",
          },
        },
        {
          property: "Issue Labels",
          multi_select: {
            contains: "good first issue",
          },
        },
      ],
    },
    page_size,
    filter_properties,
    sorts,
  });
}

async function getBugIssues({
  page_size = 100,
  filter_properties = defaultFilterProperties,
  sorts = defaultSort,
}): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    filter: {
      property: "Issue Labels",
      multi_select: {
        contains: "bug",
      },
    },
    page_size,
    filter_properties,
    sorts,
  });
}
async function getUnassignedIssues({
  page_size = 100,
  filter_properties = defaultFilterProperties,
  sorts = defaultSort,
}): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    filter: {
      property: "Assignee",
      url: {
        is_empty: true,
      },
    },
    page_size,
    filter_properties,
    sorts,
  });
}

async function getIssuesOpenedWithin3Months({
  page_size = 100,
  filter_properties = defaultFilterProperties,
  sorts = defaultSort,
}): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    filter: {
      property: "Opened Date",
      date: {
        on_or_after: subtractMonths(new Date(), 3).toISOString(),
      },
    },
    page_size,
    filter_properties,
    sorts,
  });
}

async function getIssuesOpenedWithin1Month({
  page_size = 100,
  filter_properties = defaultFilterProperties,
  sorts = defaultSort,
}): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    filter: {
      property: "Opened Date",
      date: {
        on_or_after: subtractMonths(new Date(), 1).toISOString(),
      },
    },
    page_size,
    filter_properties,
    sorts,
  });
}

// For our purposes we will probably use this with Project Name from a predefined list.
// This query can return issues from different repos since one project could have a few tracked repos.
async function getIssuesByProject(
  projectName: string,
  {
    page_size = 100,
    filter_properties = defaultFilterProperties,
    sorts = defaultSort,
  }
): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    filter: {
      property: "Project Name",
      rollup: {
        any: {
          rich_text: {
            contains: projectName,
          },
        },
      },
    },
    page_size,
    filter_properties,
    sorts,
  });
}

async function getIssuesByRepo(
  repoLink: string,
  {
    page_size = 100,
    filter_properties = defaultFilterProperties,
    sorts = defaultSort,
  }
): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    filter: {
      property: "Github Repo",
      relation: {
        contains: repoLink,
      },
    },
    page_size,
    filter_properties,
    sorts,
  });
}

async function main() {
  //   const r = await getGoodFirstIssues({ page_size: 1 });
  // const r = await getUnassignedIssues({ page_size: 1 });
  const r = await getIssuesByProject("Polkadot", { page_size: 1 });
  // const r = await queryDatabase({ page_size: 105 });
  //   console.log(r.results.length);
  console.log(JSON.stringify(r.results, null, 2));
  //   console.log(JSON.stringify(r, null, 2));
}

main();
