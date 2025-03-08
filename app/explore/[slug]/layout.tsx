import React from "react";
import Toolbar from "@/components/filters/toolbar";
import { container } from "@/components/primitives";
import { FiltersProvider } from "@/contexts/filters";
import { decodingSlug } from "@/utils/url";
import { getFilterOptions } from "@/lib/filters";
import { safeFetch } from "@/utils/error";
import { initFilterOptions } from "@/utils/filters";

export default async function ExploreLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const filterOptions = await safeFetch(
    () => getFilterOptions(),
    "ExploreLayout: getFilterOptions",
    initFilterOptions(),
    { params },
  );
  const decodedSlug = decodeURIComponent(params.slug);
  const filters = decodingSlug(decodedSlug, filterOptions);

  return (
    <FiltersProvider
      initialFilters={filters}
      initialFilterOptions={filterOptions}
    >
      <div className="flex flex-col">
        <Toolbar label="Open Contributions" />
        <section className={container()}>{children}</section>
      </div>
    </FiltersProvider>
  );
}
