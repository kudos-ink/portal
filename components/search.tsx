"use client";
import React, { FC, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { FilterOption } from "@/types/filters";
import Emoji from "./emoji";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils/url";

interface SearchProps {
  placeholder: string;
  emoji: string;
  items: FilterOption[];
  selectedValue?: string;
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
  const params = useSearchParams();

  useEffect(() => {
    setValue(selectedValue || "");
  }, [selectedValue]);

  useEffect(() => {
    if (value === undefined || value === "") {
      return;
    }
    const newUrl = createUrl(placeholder, [value], pathname);
    router.replace(newUrl, { scroll: false });
  }, [params, pathname, placeholder, router, value]);

  return (
    <Autocomplete
      placeholder={placeholder}
      variant="faded"
      defaultItems={items}
      startContent={<Emoji emoji={emoji} className="text-xl"></Emoji>}
      className="max-w-md"
      size="lg"
      selectedKey={value}
      // onSelectionChange={setValue}
      allowsCustomValue={true}
      clearButtonProps={{
        id: "clear-button",
      }}
      selectorButtonProps={{
        id: "selector-button",
      }}
    >
      {(item: FilterOption) => {
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
