"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { createUrl } from "@/utils/url";
import { FilterOptions } from "@/types/filters";

interface IClearFilters {
  param?: string;
  value: string;
  filterOptions: FilterOptions;
  onClear: () => void;
}

export const ClearFilters = ({
  param,
  value,
  onClear,
  filterOptions,
}: IClearFilters) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClear = () => {
    if (!!param) {
      const newUrl = createUrl(param, [], pathname, filterOptions);
      router.replace(newUrl);
    } else {
      router.replace(pathname);
    }
    onClear();
  };

  return (
    <div className="flex gap-4">
      <Chip
        className="cursor-pointer"
        variant="bordered"
        color="danger"
        onClick={handleClear}
        onClose={handleClear}
      >
        {value}
      </Chip>
    </div>
  );
};

export default ClearFilters;
