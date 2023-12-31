"use client";
import React, { FC } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { FilterItem } from "@/types/filters";
import Emoji from "./emoji";

interface FilterProps {
  placeholder: string;
  emoji: string;
  items: FilterItem[];
}
export const Filter: FC<FilterProps> = ({ placeholder, items, emoji }) => {
  return (
    <Select
      color="default"
      variant="faded"
      placeholder={placeholder}
      startContent={<Emoji emoji={emoji} className="text-sm" />}
      size={"sm"}
    >
      {items.map((item) => (
        <SelectItem
          key={item.value}
          value={item.value}
          startContent={<Emoji emoji={item.emoji} />}
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Filter;
