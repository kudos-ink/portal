"use client";

import { ContributorProfile } from "@/types/profile";
import { Chip } from "@nextui-org/chip";

interface ProfileSkillsProps {
  skills: ContributorProfile["skills"];
  interests: ContributorProfile["interests"];
}

export default function ProfileSkills({ skills, interests }: ProfileSkillsProps) {
  return (
    <div className="bg-gradient-to-r from-background to-background-200 to-80% py-4 px-6 border-[1px] rounded-md flex flex-col gap-6 h-full">
      <div className="font-semibold">Skills & Interests</div>
      <div className="gap-6 flex flex-col">
        <div>
          <p className="text-small text-default-500 uppercase font-semibold mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <Chip key={skill} variant="flat" color="primary" size="sm">
                  {skill}
                </Chip>
              ))
            ) : (
              <p className="text-default-400 text-sm">No skills listed</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-small text-default-500 uppercase font-semibold mb-2">Interests</p>
          <div className="flex flex-wrap gap-2">
            {interests.length > 0 ? (
              interests.map((interest) => (
                <Chip key={interest} variant="bordered" size="sm">
                  {interest}
                </Chip>
              ))
            ) : (
              <p className="text-default-400 text-sm">No interests listed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
