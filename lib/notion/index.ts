"use server";
import { Client } from "@notionhq/client";
import {
  QueryDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import "dotenv/config";
import { subtractMonths } from "../../utils/date";
import {
  DATABASE_ID,
  DEFAULT_FILTER_PROPERTIES,
  DEFAULT_SORT,
} from "./constants";
import { KudosQueryParameters } from "./types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function baseQueryDatabase(
  queryParams: QueryDatabaseParameters,
): Promise<QueryDatabaseResponse> {
  try {
    const response = await notion.databases.query(queryParams);

    return response as QueryDatabaseResponse;
  } catch (error) {
    console.error("Error querying Notion database:", error);
    throw error;
  }
}

export async function queryDatabase(
  queryOverrides: Partial<KudosQueryParameters> = {},
): Promise<QueryDatabaseResponse> {
  const defaultQuery: KudosQueryParameters = {
    database_id: DATABASE_ID,
    filter_properties: DEFAULT_FILTER_PROPERTIES,
    sorts: DEFAULT_SORT,
    page_size: 100,
    start_cursor: undefined,
    filter: undefined,
  };

  const query = {
    ...defaultQuery,
    ...queryOverrides,
  } as QueryDatabaseParameters;
  return await baseQueryDatabase(query);
}

export async function getGoodFirstIssues({
  database_id = DATABASE_ID,
  page_size = 100,
  filter_properties = DEFAULT_FILTER_PROPERTIES,
  sorts = DEFAULT_SORT,
  start_cursor,
}: KudosQueryParameters = {}): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    filter: {
      or: [
        {
          property: "Issue Labels",
          multi_select: {
            contains: "C-good-first-issue",
          },
        },
        {
          property: "Issue Labels",
          multi_select: {
            contains: "good first issue",
          },
        },
        {
          property: "Issue Labels",
          multi_select: {
            contains: "good first issue :baby:",
          },
        },
      ],
    },
    page_size,
    filter_properties,
    sorts,
    start_cursor,
    database_id,
  });
}

export async function getBugIssues({
  database_id = DATABASE_ID,
  page_size = 100,
  filter_properties = DEFAULT_FILTER_PROPERTIES,
  sorts = DEFAULT_SORT,
  start_cursor,
}: KudosQueryParameters = {}): Promise<QueryDatabaseResponse> {
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
    start_cursor,
    database_id,
  });
}
export async function getUnassignedIssues({
  database_id = DATABASE_ID,
  page_size = 100,
  filter_properties = DEFAULT_FILTER_PROPERTIES,
  sorts = DEFAULT_SORT,
  start_cursor,
}: KudosQueryParameters = {}): Promise<QueryDatabaseResponse> {
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
    start_cursor,
    database_id,
  });
}

export async function getIssuesOpenedWithin3Months({
  database_id = DATABASE_ID,
  page_size = 100,
  filter_properties = DEFAULT_FILTER_PROPERTIES,
  sorts = DEFAULT_SORT,
  start_cursor,
}: KudosQueryParameters = {}): Promise<QueryDatabaseResponse> {
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
    start_cursor,
    database_id,
  });
}

export async function getIssuesOpenedWithin1Month({
  database_id = DATABASE_ID,
  page_size = 100,
  filter_properties = DEFAULT_FILTER_PROPERTIES,
  sorts = DEFAULT_SORT,
  start_cursor,
}: KudosQueryParameters = {}): Promise<QueryDatabaseResponse> {
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
    start_cursor,
    database_id,
  });
}

// For our purposes we will probably use this with Project Name from a predefined list.
// This query can return issues from different repos since one project could have a few tracked repos.
export async function getIssuesByProject(
  projectName: string,
  {
    database_id = DATABASE_ID,
    page_size = 100,
    filter_properties = DEFAULT_FILTER_PROPERTIES,
    sorts = DEFAULT_SORT,
    start_cursor,
  }: KudosQueryParameters = {},
): Promise<QueryDatabaseResponse> {
  return await queryDatabase({
    database_id,
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
    start_cursor,
  });
}

export async function createRepoMap() {
  let out: { [key: string]: string } = {};
  try {
    let response = await baseQueryDatabase({
      database_id: process.env.REPO_LIST_DB_ID!,
      filter_properties: ["title"],
    });

    response.results.forEach((issue) => {
      if (
        "properties" in issue &&
        "title" in issue.properties.Repo &&
        Array.isArray(issue.properties.Repo.title) &&
        "text" in issue.properties.Repo.title[0]
      ) {
        out[issue.properties.Repo.title[0].text.content] = issue.id;
      }
    });

    while (response.has_more) {
      response = await baseQueryDatabase({
        database_id: process.env.REPO_LIST_DB_ID!,
        filter_properties: ["title"],
        start_cursor: response.next_cursor ? response.next_cursor : undefined,
      });

      response.results.forEach((issue) => {
        if (
          "properties" in issue &&
          "title" in issue.properties.Repo &&
          Array.isArray(issue.properties.Repo.title) &&
          "text" in issue.properties.Repo.title[0]
        ) {
          out[issue.properties.Repo.title[0].text.content] = issue.id;
        }
      });
    }
  } catch (err) {
    console.log("There was a problem creating the repository map...");
    console.log(err);
  }
  return out;
}
