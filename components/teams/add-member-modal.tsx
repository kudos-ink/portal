"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { TeamMemberRole } from "@/types/team";
import { addTeamMember } from "@/lib/api/teams";
import { searchUsers } from "@/lib/api/users";
import { User } from "@/types/user";
import { Avatar } from "@nextui-org/avatar";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: number;
  onMemberAdded: () => void;
}

export function AddMemberModal({
  isOpen,
  onClose,
  teamId,
  onMemberAdded,
}: AddMemberModalProps) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState<TeamMemberRole>("member");
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    try {
      const users = await searchUsers(
        { query: searchQuery.trim(), limit: 10 },
        session?.accessToken as string
      );
      setSearchResults(users);
      if (users.length === 0) {
        setError("No users found");
      }
    } catch (err) {
      setError("Failed to search users");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAdd = async () => {
    if (!session?.accessToken || !selectedUser) return;

    setIsAdding(true);
    setError(null);
    try {
      await addTeamMember(
        teamId,
        { user_id: selectedUser.id, role },
        session.accessToken as string
      );
      handleClose();
      onMemberAdded();
    } catch (err: any) {
      setError(err?.message || "Failed to add member");
    } finally {
      setIsAdding(false);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedUser(null);
    setRole("member");
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} placement="top-center" size="lg">
      <ModalContent>
        <ModalHeader>Add Team Member</ModalHeader>
        <ModalBody>
          <div className="flex gap-2">
            <Input
              placeholder="Search by username..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              variant="bordered"
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              color="primary"
              variant="flat"
              onPress={handleSearch}
              isLoading={isSearching}
            >
              Search
            </Button>
          </div>

          {searchResults.length > 0 && !selectedUser && (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {searchResults.map((user) => (
                <Button
                  key={user.id}
                  variant="flat"
                  className="justify-start h-auto py-2"
                  onPress={() => setSelectedUser(user)}
                >
                  <Avatar src={user.avatar} name={user.username} size="sm" />
                  <span className="ml-2">{user.username}</span>
                </Button>
              ))}
            </div>
          )}

          {selectedUser && (
            <div className="flex flex-col gap-4 p-4 bg-gradient-to-r from-background to-background-200 to-80% border-[1px] rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={selectedUser.avatar}
                    name={selectedUser.username}
                    size="md"
                  />
                  <span className="font-medium">{selectedUser.username}</span>
                </div>
                <Button
                  size="sm"
                  variant="flat"
                  onPress={() => setSelectedUser(null)}
                >
                  Change
                </Button>
              </div>

              <Select
                label="Role"
                selectedKeys={[role]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as TeamMemberRole;
                  if (selected) setRole(selected);
                }}
                variant="bordered"
              >
                <SelectItem key="member">Member</SelectItem>
                <SelectItem key="lead">Lead</SelectItem>
              </Select>
            </div>
          )}

          {error && <p className="text-danger text-sm">{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleAdd}
            isLoading={isAdding}
            isDisabled={!selectedUser}
          >
            Add Member
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
