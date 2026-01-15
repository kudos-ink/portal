"use client";

import { ContributorProfile } from "@/types/profile";
import { UserAvatar } from "@/components/table/row";
import { Chip } from "@nextui-org/chip";

interface ProfileHeaderProps {
  profile: ContributorProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-background to-background-200 to-80% py-4 px-6 border-[1px] rounded-md flex flex-row items-start gap-5 w-full">
      <UserAvatar
        src={profile.avatar}
        alt={profile.username}
      />
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            {profile.isOpenToWork && (
              <Chip color="success" variant="flat" size="sm" className="mt-1">
                Open to Work
              </Chip>
            )}
          </div>
        </div>
        <p className="text-default-500 whitespace-pre-wrap">{profile.bio}</p>
      </div>
    </div>
  );
}
