"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { IFilterOption, FilterOptions } from "@/types/filters";
import { createUrl } from "@/utils/url";
import Emoji from "../emoji";
import { CircledCross } from "@/assets/icons";

interface ISelectFilterProps {
  placeholder: string;
  options: IFilterOption[];
  selectKeys: string[];
  filterOptions: FilterOptions;
  onSelect: (values: string[]) => void;
}
export const SelectFilter = ({
  placeholder,
  options,
  selectKeys,
  filterOptions,
  onSelect,
}: ISelectFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectionChange = (selection: unknown) => {
    onSelect(Array.from(selection as Set<string>));
    const currentPath = pathname === "/" ? "/explore/" : pathname;
    const newUrl = createUrl(
      placeholder,
      Array.from(selection as Set<string>),
      currentPath,
      filterOptions,
    );
    router.replace(newUrl, { scroll: true });
  };

  const resetFilter = () => {
    handleSelectionChange(new Set());
  };

  return (
    <Select
      aria-label={`Select Filter ${placeholder}`}
      className="w-48 shrink-0"
      classNames={{ value: "capitalize" }}
      color="default"
      variant="faded"
      size="sm"
      placeholder={placeholder.replace("-", " ")}
      selectionMode="multiple"
      endContent={
        selectKeys.length > 0 && (
          <CircledCross
            className="z-10 appearance-none outline-none select-none transition-opacity opacity-70 hover:opacity-100 cursor-pointer active:opacity-disabled tap-highlight-transparent text-large"
            onClick={resetFilter}
          />
        )
      }
      selectedKeys={new Set(selectKeys)}
      onSelectionChange={handleSelectionChange}
    >
      {options.map(({ emoji, label, value }) => {
        return (
          <SelectItem
            key={value}
            value={value}
            startContent={emoji && <Emoji emoji={emoji} />}
          >
            {label}
          </SelectItem>
        );
      })}
    </Select>
  );
};

export default SelectFilter;
