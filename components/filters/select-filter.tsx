"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { IFilterOption } from "@/types/filters";
import Emoji from "../emoji";
import { CircledCross } from "@/assets/icons";

interface ISelectFilterProps {
  placeholder: string;
  className?: string;
  options: IFilterOption[];
  selectedKeys: Set<string>;
  onSelect: (values: Set<string>) => void;
}
export const SelectFilter = ({
  placeholder,
  className,
  options,
  selectedKeys,
  onSelect,
}: ISelectFilterProps) => (
  <Select
    aria-label={`Select Filter ${placeholder}`}
    className={`w-48 shrink-0 ${className}`}
    classNames={{
      value: "capitalize",
      trigger: "data-[hover=true]:bg-opacity-hover",
    }}
    color="default"
    variant="faded"
    size="md"
    placeholder={placeholder.replace("-", " ")}
    selectionMode="multiple"
    endContent={
      selectedKeys.size > 0 && (
        <CircledCross
          className="z-10 appearance-none outline-none select-none transition-opacity opacity-70 hover:opacity-100 cursor-pointer active:opacity-disabled tap-highlight-transparent text-large"
          onClick={() => onSelect(new Set())}
        />
      )
    }
    selectedKeys={selectedKeys}
    onSelectionChange={(selection) => onSelect(new Set(selection as string))}
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

export default SelectFilter;
