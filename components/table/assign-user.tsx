"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { User } from "@/types/user";
import { useAsyncList } from "@react-stately/data";

export default function Users({ taskId }: { taskId: number }) {
  const onSelectionChange = async (key: React.Key | null) => {
    if (!key) return;

    const selectedUserId = Number(key);
    if (isNaN(selectedUserId)) {
      console.error("Invalid user ID:", key);
      return;
    }

    try {
      const response = await fetch("/api/update-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          assignedUserId: selectedUserId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign user to task");
      }

      console.log("User assigned successfully");
    } catch (error) {
      console.error("Error assigning user:", error);
    }
  };

  let list = useAsyncList<User>({
    async load({ filterText }) {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?search=${filterText}`,
        {
          cache: "no-store",
        },
      );
      let users = await res.json();
      return { items: users };
    },
  });

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      label="Select a user"
      placeholder="Type to search..."
      variant="bordered"
      onSelectionChange={onSelectionChange}
      onInputChange={list.setFilterText}
    >
      {(item: User) => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.username}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
