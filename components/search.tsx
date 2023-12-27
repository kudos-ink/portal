import { Input } from "@nextui-org/input";
import React from "react";
import { SearchIcon } from "./icons";
import { Kbd } from "@nextui-org/kbd";

function Search() {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      className="font-open-sans"
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          S
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
}

export default Search;
