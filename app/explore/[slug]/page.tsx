import { Metadata } from "next";
import ContributionsTable from "@/components/table/table";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import { queryDatabase } from "@/lib/notion";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import {
  processNotionFilters,
  transformNotionDataToContributions,
} from "@/utils/notion";
import { decodingSlug } from "@/utils/url";

interface IProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,
  };
}

export default async function ExplorePage({ params }: IProps) {
  const filters = decodingSlug(params.slug);
  const queryFilter = processNotionFilters(filters);
  const data = await queryDatabase({
    page_size: DEFAULT_PAGE_SIZE,
    filter: queryFilter,
  });
  const contributions = transformNotionDataToContributions(data);
  const items: PaginatedCustomDataResponse<Contribution> = {
    data: contributions,
    hasMore: data.has_more,
    nextCursor: data.next_cursor ?? undefined,
  };
  return (
    <ContributionsTable
      items={items}
      queries={{
        page_size: DEFAULT_PAGE_SIZE,
        filter: queryFilter,
      }}
    />
  );
}
