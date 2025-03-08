import { Metadata } from "next";
import InfiniteTable from "@/components/table/infinite-table";
import { filtersToTasksQuery, getFilterOptions } from "@/lib/filters";
import { decodingSlug } from "@/utils/url";
import { fetchTasks } from "@/lib/api/tasks";
import { initFilterOptions } from "@/utils/filters";
import { safeFetch } from "@/utils/error";

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
  const description = title + " GitHub Tasks";
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
  const filterOptions = await safeFetch(
    () => getFilterOptions(),
    "ExplorePage: getFilterOptions",
    initFilterOptions(),
    { params },
  );
  const decodedSlug = decodeURIComponent(params.slug);
  const filters = decodingSlug(decodedSlug, filterOptions);
  const query = filtersToTasksQuery(filters);
  const tasks = await fetchTasks(query);

  return <InfiniteTable initialItems={tasks} query={query} />;
}
