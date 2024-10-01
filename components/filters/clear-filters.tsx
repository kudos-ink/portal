"use client";
import React from "react";
import { Chip } from "@nextui-org/chip";

interface IClearFilters {
  value: string;
  onClear: () => void;
}

export const ClearFilters = ({ value, onClear }: IClearFilters) => (
  <div className="flex gap-4">
    <Chip
      className="cursor-pointer"
      variant="bordered"
      color="danger"
      onClick={onClear}
      onClose={onClear}
    >
      {value}
    </Chip>
  </div>
);

export default ClearFilters;
