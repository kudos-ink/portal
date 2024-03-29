import { Metadata } from "next";
import InfiniteTable from "@/components/table/infinite-table";
import { queryDatabase } from "@/lib/notion";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import {
  processNotionFilters,
  transformNotionDataToContributions,
} from "@/utils/notion";
import { decodingSlug } from "@/utils/url";
import { fetchFilterOptions } from "@/lib/repository-metadata";

interface IProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const description = title + " GitHub Issues";
  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
  };
}

export default async function ExplorePage({ params }: IProps) {
  const filterOptions = await fetchFilterOptions();
  const filters = decodingSlug(params.slug, filterOptions);
  const queryFilter = processNotionFilters(filters, filterOptions.repositories);
  const data = await queryDatabase({
    filter: queryFilter,
  });
  const contributions = transformNotionDataToContributions(data);
  const items: PaginatedCustomDataResponse<Contribution> = {
    data: contributions,
    hasMore: data.has_more,
    nextCursor: data.next_cursor ?? undefined,
  };

  return (
    <InfiniteTable
      items={items}
      queries={{
        filter: queryFilter,
      }}
    />
  );
}
