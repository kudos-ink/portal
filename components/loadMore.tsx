"use client";

import { isValidNotionPage, daysSince, getImagePath } from "@/utils/helpers";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import projectLogosJson from "@/public/images/imageMap.json";
import { useInView } from "react-intersection-observer";
import Row from "./row";
import { getGoodFirstIssues } from "@/lib/notion";
import { LoadMoreState } from "@/lib/notion/types";

export function LoadMore({ cursor }: { cursor: string }) {
  const { ref, inView } = useInView();
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [queryData, setQueryData] = useState<LoadMoreState>({
    data: [],
    nextCursor: cursor,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (inView && !awaitingResponse) {
        setAwaitingResponse(true);
        try {
          const res = await getGoodFirstIssues({
            page_size: 10,
            start_cursor: queryData.nextCursor,
          });
          setQueryData((prevData) => ({
            data: prevData.data.concat(res),
            nextCursor: res.next_cursor || undefined,
          }));
        } catch (error) {
          console.log("There was an error fetching the data", error);
        }
      }
    };
    fetchData();
  }, [inView, queryData, awaitingResponse]);

  useEffect(() => {
    if (!inView && awaitingResponse) {
      setAwaitingResponse(false);
    }
  }, [inView, awaitingResponse]);

  return (
    <>
      {queryData.data &&
        queryData.data.map((query) => {
          return query.results.map((row, index) => {
            if (isValidNotionPage(row)) {
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
                    daysSince(
                      row.properties["Opened Date"].date.start,
                    ).toString() + "d"
                  }
                  labels={row.properties["Issue Labels"].multi_select.map(
                    (label) => label.name,
                  )}
                  image={getImagePath(
                    row.properties["Issue Link"].url.split("/issues")[0],
                    projectLogosJson,
                  )}
                />
              );
            }
          });
        })}
      {queryData.nextCursor && (
        <section className="flex justify-center">
          <div ref={ref}>
            <Spinner />
          </div>
        </section>
      )}
    </>
  );
}
