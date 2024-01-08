"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { FilterOption } from "@/types/filters";
import { createUrl } from "@/utils/url";
import Emoji from "../emoji";

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
  const searchParams = useSearchParams();

  const handleSelectionChange = (selection: unknown) => {
    const selectedValue = Array.from(selection as Iterable<string>)[0];
    onSelect(selectedValue);
    const optionNameLowerCase = placeholder.toLowerCase();
    const optionSearchParams = new URLSearchParams(searchParams.toString());
    if (selectedValue) {
      optionSearchParams.set(optionNameLowerCase, selectedValue);
    } else {
      optionSearchParams.delete(optionNameLowerCase)
    }
    const optionUrl = createUrl(pathname, optionSearchParams);
    router.replace(optionUrl, { scroll: false });

  };

  return (
    <Select
      aria-label={`Select Filter ${placeholder}`}
      color="default"
      variant="faded"
      size="sm"
      placeholder={placeholder}
      selectionMode="single"
      startContent={<Emoji emoji={mainEmoji} className="text-sm" />}
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
