import React from "react";
import Toolbar from "@/components/filters/toolbar";
import { container } from "@/components/primitives";
import { FiltersProvider } from "@/contexts/filters";
import { decodingSlug } from "@/utils/url";
import { fetchFilterOptions } from "@/lib/repository-metadata";

export default async function ExploreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const filterOptions = await fetchFilterOptions();
  const filters = decodingSlug(params.slug, filterOptions);
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
