"use client";
import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";


interface SearchItem {
    label: string,
    emoji: string,
    value: string
}

interface SearchProps {
    placeholder: string,
    emoji?: string,
    items: SearchItem[]
}

export default function Search({ placeholder, emoji, items }: SearchProps) {
    return (
        <Autocomplete
            placeholder={placeholder}
            variant="bordered"
            defaultItems={items}
            startContent={
                <span className="text-xl font-noto-color-emoji">
                    {emoji}
                </span>
            }
            className="max-w-md"
            allowsCustomValue={true}
        >
            {(item) => <AutocompleteItem key={item.value} textValue={item.label}>
                <span className="text-l font-noto-color-emoji">
                    {item.emoji}
                </span>
                &nbsp;
                <span className="text-l">
                    {item.label}
                </span>

            </AutocompleteItem>}
        </Autocomplete>
    );
}
