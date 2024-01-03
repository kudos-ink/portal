"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { FilterItem } from "@/types/filters";
import { createUrl } from "@/utils/url";
import Emoji from "./emoji";

interface IFilterProps {
  placeholder: string;
  emoji: string;
  items: FilterItem[];
}
export const Filter = ({ placeholder, items, emoji }: IFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Select
      color="default"
      variant="faded"
      placeholder={placeholder}
      startContent={<Emoji emoji={emoji} className="text-sm" />}
      size={"sm"}
    >
      {items.map((item) => {
        const optionNameLowerCase = placeholder.toLowerCase();
        const optionSearchParams = new URLSearchParams(searchParams.toString());
        optionSearchParams.set(optionNameLowerCase, item.value);
        const optionUrl = createUrl(pathname, optionSearchParams);

        return (
          <SelectItem
            key={item.value}
            value={item.value}
            startContent={<Emoji emoji={item.emoji} />}
            onClick={() => {
              router.replace(optionUrl, { scroll: false });
            }}
          >
            {item.label}
          </SelectItem>
        );
      })}
    </Select>
  );
};

export default Filter;
