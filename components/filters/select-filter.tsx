"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { FilterOption } from "@/types/filters";
import { createUrl } from "@/utils/url";
import Emoji from "../emoji";
import { CircledCross } from "@/assets/icons";

interface ISelectFilterProps {
  placeholder: string;
  mainEmoji: string;
  options: FilterOption[];
  selectedKey?: string;
  onSelect: (value: string) => void;
}
export const SelectFilter = ({
  placeholder,
  mainEmoji,
  options,
  selectedKey,
  onSelect,
}: ISelectFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleSelectionChange = (selection: unknown) => {
    const selectedValue = Array.from(selection as Iterable<string>)[0];
    onSelect(selectedValue);
    const newUrl = createUrl(placeholder, selectedValue, pathname, params);
    router.replace(newUrl, { scroll: false });
  };

  const resetFilter = () => {
    handleSelectionChange("");
  };
  return (
    <Select
      aria-label={`Select Filter ${placeholder}`}
      className="w-48 shrink-0"
      classNames={{ value: "capitalize" }}
      color="default"
      variant="faded"
      size="sm"
      placeholder={placeholder}
      selectionMode="single"
      startContent={<Emoji emoji={mainEmoji} className="text-sm" />}
      endContent={
        selectedKey && (
          <CircledCross
            className="z-10 appearance-none outline-none select-none transition-opacity opacity-70 hover:opacity-100 cursor-pointer active:opacity-disabled tap-highlight-transparent text-large"
            onClick={resetFilter}
          />
        )
      }
      selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
      onSelectionChange={handleSelectionChange}
    >
      {options.map(({ emoji, label, value }) => {
        return (
          <SelectItem
            key={value}
            value={value}
            startContent={<Emoji emoji={emoji} />}
          >
            {label}
          </SelectItem>
        );
      })}
    </Select>
  );
};

export default SelectFilter;
