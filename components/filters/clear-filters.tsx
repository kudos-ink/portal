"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { createUrl } from "@/utils/url";

interface IClearFilters {
  param?: string;
  value: string;
  onClear: () => void;
}

export const ClearFilters = ({ param, value, onClear }: IClearFilters) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const clearSearchParams = () => {
    if (!!param) {
      const newUrl = createUrl(param, null, pathname, params);
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
        onClick={clearSearchParams}
        onClose={clearSearchParams}
      >
        {value}
      </Chip>
    </div>
  );
};

export default ClearFilters;
