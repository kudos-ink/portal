"use client";
import React, { FC, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { FilterItem } from "@/types/filters";
import Emoji from "./emoji";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils/url";

interface SearchProps {
  placeholder: string;
  emoji: string;
  items: FilterItem[];
  selectedValue: string;
}

const Search: FC<SearchProps> = ({
  placeholder,
  emoji,
  items,
  selectedValue,
}: SearchProps) => {
  const [value, setValue] = React.useState(selectedValue);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setValue(selectedValue || "");
  }, [selectedValue]);
  console.log(value);

  useEffect(() => {
    console.log(value);
    if (value === undefined || value === "") {
      return;
    }
    const optionNameLowerCase = placeholder.toLowerCase();
    const optionSearchParams = new URLSearchParams(searchParams.toString());
    if (value !== null) {
      optionSearchParams.set(optionNameLowerCase, value);
    } else {
      optionSearchParams.delete(optionNameLowerCase);
    }
    const optionUrl = createUrl(pathname, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  }, [value]);
  return (
    <Autocomplete
      placeholder={placeholder}
      variant="faded"
      defaultItems={items}
      startContent={<Emoji emoji={emoji} className="text-xl"></Emoji>}
      className="max-w-md"
      size="lg"
      selectedKey={value}
      onSelectionChange={setValue}
    >
      {(item: FilterItem) => {
        return (
          <AutocompleteItem key={item.value} textValue={item.label}>
            <Emoji emoji={item.emoji} className="text-xl"></Emoji>
            &nbsp;
            <span className="text-l">{item.label}</span>
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
};

export default Search;
