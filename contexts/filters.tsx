"use client";

import {
  IConfigProps,
  IFiltersContext,
  useFilters as filtersHook,
} from "@/hooks/useFilters";
import { provideContext } from "@/utils/providers";

export const [FiltersProvider, useFilters] = provideContext<
  IConfigProps,
  IFiltersContext
>(filtersHook);
