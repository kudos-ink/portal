"use client";
import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@nextui-org/checkbox";
import { Tooltip } from "@nextui-org/tooltip";
import { createUrl } from "@/utils/url";
import { FilterOptions } from "@/types/filters";

interface ICheckboxFilterProps {
  paramKey: string;
  placeholder: string;
  content: ReactNode;
  icon: ReactNode;
  isSelected?: boolean;
  filterOptions: FilterOptions;
  onSelect: (values: string[]) => void;
}
export const CheckboxFilter = ({
  paramKey,
  placeholder,
  content,
  icon,
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
    <Tooltip content={content}>
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
          {icon}
        </Checkbox>
      </div>
    </Tooltip>
  );
};

export default CheckboxFilter;
