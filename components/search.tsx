"use client";
import React, { FC } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Emoji from "../components/utils/emoji";
import { Item } from "../components/utils/types/item";

interface SearchProps {
  placeholder: string;
  emoji: string;
  items: Item[];
}

const Search: FC<SearchProps> = ({
  placeholder,
  emoji,
  items,
}: SearchProps) => {
  return (
    <Autocomplete
      placeholder={placeholder}
      variant="bordered"
      defaultItems={items}
      startContent={<Emoji emoji={emoji} className="text-xl"></Emoji>}
      className="max-w-md"
      size="lg"
      allowsCustomValue={true}
    >
      {(item: Item) => (
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
