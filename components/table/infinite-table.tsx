"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";
import { useContributions } from "@/hooks/useContributions";
import { KudosQueryParameters } from "@/lib/notion/types";
import { PaginatedContributions } from "@/types/contribution";
import StaticTable from "./static-table";

interface IInfiniteTableProps {
  items: PaginatedContributions;
  queries?: Partial<KudosQueryParameters>;
}

const InfiniteTable = ({ items, queries = {} }: IInfiniteTableProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);
  const {
    data: results,
    fetchNextPage,
    hasNextPage,
  } = useContributions(items, queries);

  const contributions = React.useMemo(() => {
    const uniqueContributions = new Map();

    results?.pages
      .flatMap((page) => page.data)
      .forEach((contribution) => {
        if (!uniqueContributions.has(contribution.id)) {
          uniqueContributions.set(contribution.id, contribution);
        }
      });

    return Array.from(uniqueContributions.values());
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
