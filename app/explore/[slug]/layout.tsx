import React from "react";
import Toolbar from "@/components/filters/toolbar";
import { container } from "@/components/primitives";
import { FiltersProvider } from "@/contexts/filters";
import { decodingSlug } from "@/utils/url";

export default function ExploreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const filters = decodingSlug(params.slug);
  return (
    <FiltersProvider initialFilters={filters}>
      <div className="flex flex-col">
        <Toolbar />
        <section className={container()}>{children}</section>
      </div>
    </FiltersProvider>
  );
}
