"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@nextui-org/checkbox";
import { createUrl } from "@/utils/url";

interface ICheckboxFilterProps {
  paramKey: string;
  placeholder: string;
  isSelected?: boolean;
  onSelect: (values: string[]) => void;
}
export const CheckboxFilter = ({
  paramKey,
  placeholder,
  isSelected,
  onSelect,
}: ICheckboxFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: boolean) => {
    const newValue = value ? [value.toString()] : [];
    onSelect(newValue);
    const newUrl = createUrl(paramKey, newValue, pathname);
    router.replace(newUrl, { scroll: false });
  };

  return (
    <Checkbox
      classNames={{
        wrapper: "before:border-default-200 before:border-medium",
        label: "whitespace-nowrap",
      }}
      isSelected={isSelected}
      onValueChange={handleValueChange}
    >
      {placeholder}
    </Checkbox>
  );
};

export default CheckboxFilter;
