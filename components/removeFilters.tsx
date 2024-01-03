"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { createUrl } from "@/utils/url";

interface IRemoveFilters {
  param: string;
  value: string;
}

export const RemoveFilters = ({ param, value }: IRemoveFilters) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const removeSearchParams = () => {
    const optionNameLowerCase = param.toLowerCase();
    const optionSearchParams = new URLSearchParams(searchParams.toString());
    optionSearchParams.delete(optionNameLowerCase);
    const optionUrl = createUrl(pathname, optionSearchParams);
    router.replace(optionUrl);
  };
  return (
    <div className="flex gap-4">
      <Chip color="secondary" onClose={removeSearchParams}>
        {value}
      </Chip>
    </div>
  );
};

export default RemoveFilters;
