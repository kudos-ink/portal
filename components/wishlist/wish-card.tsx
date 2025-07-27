"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

import Link from "next/link";
import { IconRepo } from "@/assets/icons"; // Assuming you have a suitable icon for votes
import { User } from "@nextui-org/user";
import { VoteControl } from "./vote-control";


interface WishCardProps {
  id: number;
  title: string;
  description: string | null;
  upvotes: number;
  downvotes: number;
  project?: {
    slug: string;
    name: string;
  } | null;
  creator?: {
    username: string;
    avatar: string;
  } | null;
  onVote: (taskId: number, voteType: 'up' | 'down') => void;
  isVoting: boolean;
  userVote: 'up' | 'down' | null;
}

export const WishCard = ({ id, title, description, upvotes, downvotes, project, creator, onVote, isVoting, userVote }: WishCardProps) => {
  const score = upvotes - downvotes;

  return (
    <Card className="w-full">
      <div className="flex items-start justify-between p-4">
        <Link href={`/wishlist/${id}`} className="flex-1 pr-4 cursor-pointer group">
            <CardHeader className="p-0 pb-2">
              <h4 className="font-bold text-large text-left group-hover:text-primary transition-colors">{title}</h4>
            </CardHeader>
            <CardBody className="p-0">
              <p className="text-default-500 text-left line-clamp-2">
                {description || "No description provided."}
              </p>
            </CardBody>
        </Link>
        
        <div className="border-l-1 border-default-100 pl-4">
          <VoteControl 
            score={score}
            userVote={userVote}
            onVote={(voteType) => onVote(id, voteType)}
            isVoting={isVoting}
          />
        </div>
      </div>
      <CardFooter className="flex justify-between items-center pt-2 border-t-1 border-default-100">
        {creator ? (
          <User   
            name={creator.username}
            avatarProps={{ src: creator.avatar }}
          />
        ) : <div />}
        {project && (
          <Link href={`/projects/${project.slug}`}>
            <Chip
              startContent={<IconRepo size={16} />}
              variant="flat"
              color="default"
              className="cursor-pointer hover:bg-default-200"
            >
              {project.name}
            </Chip>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};