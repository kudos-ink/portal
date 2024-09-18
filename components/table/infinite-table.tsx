"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";
import { useIssues } from "@/hooks/useIssues";
import { PaginatedCustomResponse } from "@/types/pagination";
import StaticTable from "./static-table";
import { Issue, IssueQueryParams } from "@/types/issue";

interface IInfiniteTableProps {
  items: PaginatedCustomResponse<Issue>;
  query?: IssueQueryParams;
}

const InfiniteTable = ({ items, query = {} }: IInfiniteTableProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);
  const { data: results, fetchNextPage, hasNextPage } = useIssues(items, query);

  const contributions = React.useMemo(() => {
    return results?.pages.flatMap((page) => page.data);
  }, [results]);

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingRef.current) return;

    const loaderElement = loaderRef.current;
    if (loaderElement) {
      const rect = loaderElement.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        isFetchingRef.current = true;
        fetchNextPage().then(() => {
          isFetchingRef.current = false;
        });
      }
    }
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <StaticTable data={contributions} />
      {hasNextPage && (
        <div className="flex w-full justify-center pt-8">
          <Spinner ref={loaderRef} color="white" />
        </div>
      )}
    </>
  );
};

export default InfiniteTable;
