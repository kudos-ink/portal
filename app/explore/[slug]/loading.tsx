import TableSkeleton from "@/components/table/skeleton";
import { DEFAULT_HOMEPAGE_PAGE_SIZE } from "@/data/fetch";

export default function ExploreLoading() {
  return <TableSkeleton pageSize={DEFAULT_HOMEPAGE_PAGE_SIZE} />;
}
