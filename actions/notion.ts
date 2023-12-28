"use server";
import { Client } from "@notionhq/client";
import {
  QueryDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import "dotenv/config";
import { subtractMonths } from "../utils/helpers";
import {
  KudosQueryParameters,
  databaseId,
  defaultFilterProperties,
  defaultSort,
  ValidRepositoryLink,
  repoLinkToPageIdMap,
} from "@/types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function baseQueryDatabase(
  queryParams: QueryDatabaseParameters
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

export async function getGoodFirstIssues({
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

export async function getBugIssues({
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
export async function getUnassignedIssues({
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

export async function getIssuesOpenedWithin3Months({
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

export async function getIssuesOpenedWithin1Month({
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
export async function getIssuesByProject(
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

export async function getIssuesByRepo(
  repoLink: ValidRepositoryLink,
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
        contains: repoLinkToPageIdMap[repoLink],
      },
    },
    page_size,
    filter_properties,
    sorts,
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

// async function main() {
//   //   const r = await getGoodFirstIssues({ page_size: 1 });
//   // const r = await getUnassignedIssues({ page_size: 1 });
//   //   const r = await getIssuesByProject("Polkadot", { page_size: 1 });
//   //   const r = await getIssuesByRepo("af89c412b69f4437a6a0cdf80070a4a9", {
//   //     page_size: 1,
//   //   });
//   const r = await createRepoMap();
//   // const r = await queryDatabase({ page_size: 105 });
//   //   console.log(r.results.length);
//   console.log(JSON.stringify(r, null, 2));
//   //   console.log(JSON.stringify(r, null, 2));
// }

// main();
