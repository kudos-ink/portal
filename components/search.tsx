"use client";
import React, { FC } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { FilterItem } from "@/types/filters";
import Emoji from "./emoji";

interface SearchProps {
  placeholder: string;
  emoji: string;
  items: FilterItem[];
}

const Search: FC<SearchProps> = ({
  placeholder,
  emoji,
  items,
}: SearchProps) => {
  return (
    <Autocomplete
      placeholder={placeholder}
      variant="faded"
      color="default"
      defaultItems={items}
      startContent={<Emoji emoji={emoji} className="text-xl"></Emoji>}
      className="max-w-md"
      size="lg"
      allowsCustomValue={true}
    >
      {(item: FilterItem) => (
        <AutocompleteItem key={item.value} textValue={item.label}>
          <Emoji emoji={item.emoji} className="text-xl"></Emoji>
          &nbsp;
          <span className="text-l">{item.label}</span>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Search;
