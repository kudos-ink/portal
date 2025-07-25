"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

import Link from "next/link";
import { IconRepo } from "@/assets/icons"; // Assuming you have a suitable icon for votes
import { User } from "@nextui-org/user";

// A simple upvote icon for demonstration
const UpvoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 15 7-7 7 7"/></svg>
);


interface WishCardProps {
  id: number;
  title: string;
  description: string | null;
  upvotes: number;
  project?: {
    slug: string;
    name: string;
  } | null;
  creator?: { // Assuming the creator's info might be available in the future
    username: string;
    avatar: string;
  } | null;
  onVote: (taskId: number, voteType: 'up' | 'down') => void;
  isVoting: boolean;
}

export const WishCard = ({ id, title, description, upvotes, project, creator, onVote, isVoting }: WishCardProps) => {
  return (
    <Card className="w-full">
      <div className="flex items-start justify-between p-4">
        <div className="flex-1 pr-4">
          <CardHeader className="p-0 pb-2">
            <h4 className="font-bold text-large text-left">{title}</h4>
          </CardHeader>
          <CardBody className="p-0">
            <p className="text-default-500 text-left line-clamp-2">
              {description || "No description provided."}
            </p>
          </CardBody>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button 
            isIconOnly 
            variant="bordered" 
            aria-label="Upvote" 
            size="sm"
            onPress={() => onVote(id, 'up')}
            isLoading={isVoting}
          >
            <UpvoteIcon />
          </Button>
          <span className="font-bold text-lg">{upvotes}</span>
        </div>
      </div>
      <CardFooter className="flex justify-between items-center pt-2 border-t-1 border-default-100">
        {creator ? (
          <User   
            name={creator.username}
            avatarProps={{
              src: creator.avatar
            }}
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