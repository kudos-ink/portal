"use client";
import { Button } from "@nextui-org/button";


const UpvoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 15 7-7 7 7"/></svg>
);

const DownvoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 9 7 7 7-7"/></svg>
);

interface VoteControlProps {
  score: number;
  userVote: 'up' | 'down' | null;
  onVote: (voteType: 'up' | 'down') => void;
  isVoting: boolean;
}

export const VoteControl = ({ score, userVote, onVote, isVoting }: VoteControlProps) => {
  const isUpvoted = userVote === 'up';
  const isDownvoted = userVote === 'down';

  return (
    <div className="flex flex-col items-center gap-1">
      <Button 
        isIconOnly 
        aria-label="Upvote" 
        size="sm"
        onPress={() => onVote('up')}
        isLoading={isVoting}
        variant={isUpvoted ? "flat" : "light"}
        color={isUpvoted ? "success" : "default"}
        className={!isUpvoted ? "text-default-500 hover:text-success" : ""}
      >
        <UpvoteIcon />
      </Button>
      <span className="font-bold text-lg">{score}</span>
      <Button 
        isIconOnly 
        aria-label="Downvote" 
        size="sm"
        onPress={() => onVote('down')}
        isLoading={isVoting}
        variant={isDownvoted ? "flat" : "light"}
        color={isDownvoted ? "danger" : "default"}
        className={!isDownvoted ? "text-default-500 hover:text-danger" : ""}
      >
        <DownvoteIcon />
      </Button>
    </div>
  );
};