import { Metadata } from "next";
import IssuesApi from "@/api/core/issues";
import InfiniteTable from "@/components/table/infinite-table";
import { filtersToIssuesQuery, getFilterOptions } from "@/lib/filters";
import { decodingSlug } from "@/utils/url";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";

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
  const filterOptions = await getFilterOptions();
  const filters = decodingSlug(params.slug, filterOptions);
  const query = filtersToIssuesQuery(filters);
  const issues = await IssuesApi.getIssues(query).catch((error) => {
    console.error("Error fetching issues:", error);
    return DEFAULT_PAGINATED_RESPONSE;
  });

  return <InfiniteTable initialItems={issues} query={query} />;
}
