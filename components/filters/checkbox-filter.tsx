"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@nextui-org/checkbox";
import { Tooltip } from "@nextui-org/tooltip";
import { InfoIcon } from "@/assets/icons";
import { GOOD_FIRST_ISSUE_LABELS } from "@/data/filters";
import { createUrl } from "@/utils/url";
import { FilterOptions } from "@/types/filters";

interface ICheckboxFilterProps {
  paramKey: string;
  placeholder: string;
  isSelected?: boolean;
  filterOptions: FilterOptions;
  onSelect: (values: string[]) => void;
}
export const CheckboxFilter = ({
  paramKey,
  placeholder,
  isSelected,
  filterOptions,
  onSelect,
}: ICheckboxFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: boolean) => {
    const newValue = value ? [value.toString()] : [];
    onSelect(newValue);
    const currentPath = pathname === "/" ? "/explore/" : pathname;
    const newUrl = createUrl(paramKey, newValue, currentPath, filterOptions);
    router.replace(newUrl, { scroll: true });
  };

  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">
            Based on the following GitHub labels:
          </div>
          {GOOD_FIRST_ISSUE_LABELS.map((label, idx) => (
            <div className="text-tiny" key={idx}>
              • {label}
            </div>
          ))}
        </div>
      }
    >
      <div className="flex">
        <Checkbox
          classNames={{
            wrapper: "before:border-default-200 before:border-medium",
            label: "flex gap-2 items-center whitespace-nowrap",
          }}
          isSelected={isSelected}
          onValueChange={handleValueChange}
        >
          {placeholder}
          <InfoIcon className="text-default-500" size={16} />
        </Checkbox>
      </div>
    </Tooltip>
  );
};

export default CheckboxFilter;
