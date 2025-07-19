import { Metadata } from "next";
import InfiniteTable from "@/components/table/infinite-table";
import { filtersToIssuesQuery, getFilterOptions } from "@/lib/filters";
import { decodingSlug } from "@/utils/url";
import { fetchIssues } from "@/lib/api/issues";

interface IProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const params = await props.params;
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

export default async function ExplorePage(props: IProps) {
  const params = await props.params;
  const filterOptions = await getFilterOptions();
  const decodedSlug = decodeURIComponent(params.slug);
  const filters = decodingSlug(decodedSlug, filterOptions);
  const query = filtersToIssuesQuery(filters);
  const issues = await fetchIssues(query);

  return <InfiniteTable initialItems={issues} query={query} />;
}
