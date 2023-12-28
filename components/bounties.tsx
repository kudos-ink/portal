"use client";
import React, { FC } from "react";
import {
  Slider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronOpenIcon } from "./utils/icons/chevronOpenIcon";
import Emoji from "./utils/emoji";

interface BountiesProps {
  currency: string;
  emoji: string;
  defaultValue: number;
  maxValue: number;
}

const Bounties: FC<BountiesProps> = ({
  currency,
  defaultValue,
  maxValue,
  emoji,
}) => {
  const formatOptions = { style: "currency", currency };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          startContent={<Emoji emoji={emoji} className="text-sm"></Emoji>}
          endContent={<ChevronOpenIcon />}
        >
          Bounties
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">
          <Slider
            label="Minimum"
            showTooltip={true}
            formatOptions={formatOptions}
            tooltipValueFormatOptions={formatOptions}
            defaultValue={defaultValue}
            maxValue={maxValue}
            minValue={0}
            className="max-w-md"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Bounties;
