"use client";
import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@nextui-org/checkbox";
import { Tooltip } from "@nextui-org/tooltip";
import { createUrl } from "@/utils/url";
import { FilterOptions } from "@/types/filters";

interface ICheckboxFilterProps {
  placeholder: string;
  content: ReactNode;
  icon: ReactNode;
  isSelected?: boolean;
  onSelect: (isChecked: boolean) => void;
}
export const CheckboxFilter = ({
  placeholder,
  content,
  icon,
  isSelected,
  onSelect,
}: ICheckboxFilterProps) => (
  <Tooltip content={content}>
    <div className="flex">
      <Checkbox
        classNames={{
          wrapper: "before:border-default-200 before:border-medium",
          label: "flex gap-2 items-center whitespace-nowrap",
        }}
        isSelected={isSelected}
        onValueChange={onSelect}
      >
        {placeholder}
        {icon}
      </Checkbox>
    </div>
  </Tooltip>
);

export default CheckboxFilter;
