"use client";
import React, { useEffect } from "react";
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
  selectedValue: string;
}
export const Filter = ({
  placeholder,
  items,
  emoji,
  selectedValue,
}: IFilterProps) => {
  const [value, setValue] = React.useState(selectedValue);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);


  useEffect(() => {
    if (!value) {
      return
    }
    const optionNameLowerCase = placeholder.toLowerCase();
    const optionSearchParams = new URLSearchParams(searchParams.toString());
    optionSearchParams.set(optionNameLowerCase, value);
    const optionUrl = createUrl(pathname, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  }, [value]);

  const handleSelectionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Select
      color="default"
      variant="faded"
      labelPlacement={"inside"}
      label={placeholder}
      onChange={handleSelectionChange}
      selectedKeys={[value]}
      startContent={value ? <Emoji emoji={emoji} className="text-sm" /> : <></>}
      size={"sm"}
    >
      {items.map((item) => {
        return (
          <SelectItem
            key={item.value}
            value={item.value}
            startContent={<Emoji emoji={item.emoji} />}

          >
            {item.label}
          </SelectItem>
        );
      })}
    </Select>
  );
};

export default Filter;
