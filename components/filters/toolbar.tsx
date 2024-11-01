"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { container } from "@/components/primitives";
import { useFilters } from "@/contexts/filters";
import useSticky from "@/hooks/useSticky";
import { FilterKeys } from "@/types/filters";
import { countNonEmptyFilters } from "@/utils/filters";
import { createUrl } from "@/utils/url";
import type { CheckboxFilterConfig, SelectFilterConfig } from "./config";
import { DEFAULT_CHECKBOX_FILTERS, DEFAULT_SELECT_FILTERS } from "./config";
import CheckboxFilter from "./checkbox-filter";
import ClearFilters from "./clear-filters";
import SelectFilter from "./select-filter";

interface IToolbarProps {
  label: string;
  checkboxFilters?: CheckboxFilterConfig[];
  selectFilters?: SelectFilterConfig[];
  withAdvanceFilters?: boolean;
  shouldUpdateRouter?: boolean;
}

const Toolbar = ({
  label,
  checkboxFilters = DEFAULT_CHECKBOX_FILTERS,
  selectFilters = DEFAULT_SELECT_FILTERS,
  withAdvanceFilters = false,
  shouldUpdateRouter = true, // Default to true for URL-based filter updates
}: IToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isToolbarSticky = useSticky(toolbarRef);

  const { filters, updateFilter, clearFilter, clearAllFilters, filterOptions } =
    useFilters();

  selectFilters.forEach(
    (filter) => (filter.options = filterOptions[filter.key]),
  );

  const updateRouterWithFilters = useCallback(
    (key: FilterKeys, newValue: string[]) => {
      const currentPath = pathname === "/" ? "/explore/" : pathname;
      const newUrl = createUrl(key, newValue, currentPath, filterOptions);
      router.replace(newUrl, { scroll: true });
    },
    [filterOptions, pathname, router],
  );

  const handleSelectChange = useCallback(
    (key: FilterKeys) => (newValues: Set<string>) => {
      if (newValues.size > 0) {
        updateFilter(key, Array.from(newValues));
      } else {
        clearFilter(key);
      }

      if (shouldUpdateRouter) {
        updateRouterWithFilters(key, Array.from(newValues));
      }
    },
    [updateFilter, clearFilter, shouldUpdateRouter, updateRouterWithFilters],
  );

  const handleCheckboxChange = useCallback(
    (key: FilterKeys) => (isChecked: boolean) => {
      updateFilter(key, isChecked ? ["true"] : []);

      if (shouldUpdateRouter) {
        const newValue = isChecked ? [isChecked.toString()] : [];
        updateRouterWithFilters(key, newValue);
      }
    },
    [updateFilter, shouldUpdateRouter, updateRouterWithFilters],
  );

  const handleClear = () => {
    const newPathname = pathname.includes("explore")
      ? "/explore/open-contributions"
      : pathname;
    clearAllFilters();
    router.replace(newPathname, { scroll: true });
  };

  const numberOfFilters = countNonEmptyFilters(filters);

  const normalSelectFilters = selectFilters.filter((f) => !f.isAdvanced);
  const advancedSelectFilters = selectFilters.filter((f) => f.isAdvanced);
  const normalCheckboxFilters = checkboxFilters.filter((f) => !f.isAdvanced);
  const advancedCheckboxFilters = checkboxFilters.filter((f) => f.isAdvanced);

  return (
    <div
      className={`sticky top-0 z-10 transition-colors ease-in ${
        isToolbarSticky ? "bg-background" : "bg-transparent"
      }`}
      ref={toolbarRef}
    >
      <div className={`pt-6 flex flex-col gap-4 ${container()}`}>
        <div className="flex flex-col gap-4 items-start overflow-hidden lg:flex-row lg:items-center">
          <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-6 w-full sm:w-auto xl:overflow-visible">
            {normalSelectFilters
              .filter(({ options }) => options?.length > 1)
              .map(({ key, options }) => (
                <SelectFilter
                  key={key}
                  placeholder={key}
                  options={options}
                  selectedKeys={new Set(filters[key].map((item) => item.value))}
                  onSelect={handleSelectChange(key)}
                />
              ))}
            <div className="flex gap-6">
              {normalCheckboxFilters.map(
                ({ key, placeholder, content, icon }) => (
                  <CheckboxFilter
                    key={key}
                    placeholder={placeholder}
                    content={content}
                    icon={icon}
                    isSelected={filters[key]}
                    onSelect={handleCheckboxChange(key)}
                  />
                ),
              )}
            </div>
          </div>

          {withAdvanceFilters && (
            <>
              <div className="hidden sm:flex h-5 items-center space-x-4 text-small">
                <Divider orientation="vertical" />
              </div>

              <Dropdown
                radius="sm"
                placement="bottom-start"
                className="hidden sm:block min-w-0 w-fit"
                classNames={{
                  content: "hidden sm:block p-0 border-small border-divider",
                }}
              >
                <DropdownTrigger className="hidden sm:block">
                  <Button
                    size="sm"
                    aria-label="Advance Filters"
                    color="default"
                    variant="faded"
                    className="capitalize"
                  >
                    <p className="text-sm">Advance Filters</p>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown Variants"
                  color="default"
                  variant="light"
                  closeOnSelect={false}
                >
                  <DropdownSection
                    aria-label="Advance select filters"
                    showDivider
                  >
                    {advancedSelectFilters
                      .filter(({ options }) => options?.length > 1)
                      .map(({ key, options }) => (
                        <DropdownItem
                          key={key}
                          className="justify-end"
                          isReadOnly
                          endContent={
                            <SelectFilter
                              className="w-full"
                              placeholder={key}
                              options={options}
                              selectedKeys={
                                new Set(
                                  filters[key]?.map((item) => item.value) || [],
                                )
                              }
                              onSelect={handleSelectChange(key)}
                            />
                          }
                        />
                      ))}
                  </DropdownSection>
                  <DropdownSection aria-label="Advance checkbox filters">
                    {advancedCheckboxFilters.map(
                      ({ key, placeholder, content, icon }) => (
                        <DropdownItem key={key}>
                          <CheckboxFilter
                            placeholder={placeholder}
                            content={content}
                            icon={icon}
                            isSelected={filters[key] || false}
                            onSelect={handleCheckboxChange(key)}
                          />
                        </DropdownItem>
                      ),
                    )}
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>

              {numberOfFilters > 1 && (
                <div className="hidden sm:flex h-5 items-center space-x-4 text-small">
                  <Divider orientation="vertical" />
                </div>
              )}
            </>
          )}

          {numberOfFilters > 1 && (
            <div className="hidden sm:block">
              <ClearFilters onClear={handleClear} value="Clear all filters" />
            </div>
          )}
        </div>
        <div className="py-4 px-3 bg-default-100 border-[1px] border-b-0 rounded-t-md">
          <span className="text-lg font-bold">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
