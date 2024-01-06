"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { createUrl } from "@/utils/url";

interface IClearFilters {
  param?: string;
  value: string;
}

export const ClearFilters = ({ param, value }: IClearFilters) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clearSearchParams = () => {
    if (!!param) {
      const optionNameLowerCase = param.toLowerCase();
      const optionSearchParams = new URLSearchParams(searchParams.toString());
      optionSearchParams.delete(optionNameLowerCase);
      const optionUrl = createUrl(pathname, optionSearchParams);
      router.replace(optionUrl);
    } else {
      router.replace(pathname);
    }
  };
  return (
    <div className="flex gap-4">
      <Chip variant="solid" onClose={clearSearchParams}>
        {value}
      </Chip>
    </div>
  );
};

export default ClearFilters;
