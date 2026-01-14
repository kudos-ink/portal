"use client";

import { ContributorProfile } from "@/types/profile";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Chip } from "@nextui-org/chip";

interface ProfileEngagementsProps {
  engagements: ContributorProfile["engagements"];
}

export default function ProfileEngagements({ engagements }: ProfileEngagementsProps) {
  return (
    <div className="bg-gradient-to-r from-background to-background-200 to-80% py-4 px-6 border-[1px] rounded-md flex flex-col gap-6 h-full">
      <div className="font-semibold">Active Engagements</div>
      <div className="p-0">
        {engagements.length > 0 ? (
          <Listbox aria-label="Engagements" className="p-0">
            {engagements.map((item) => (
              <ListboxItem
                key={item.id}
                textValue={item.projectName}
                className="px-4 py-3 border-b border-default-100 last:border-b-0"
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-1">
                    <span className="text-medium font-semibold">{item.projectName}</span>
                    <span className="text-tiny text-default-500">{item.role}</span>
                  </div>
                  <Chip
                    color={item.status === "active" ? "success" : "default"}
                    variant="dot"
                    size="sm"
                  >
                    {item.status}
                  </Chip>
                </div>
              </ListboxItem>
            ))}
          </Listbox>
        ) : (
          <div className="p-4 text-default-400 text-sm">
            No active engagements
          </div>
        )}
      </div>
    </div>
  );
}
