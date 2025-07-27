"use client";

import React, { useState, useMemo } from "react";
import { Divider } from "@nextui-org/divider";
import { Task } from "@/types/task";
import { Comment } from "@/lib/api/comments";
import { buildCommentTree, ThreadedComment } from "@/lib/api/comments";
import { CommentForm } from "./comment-form";
import { CommentCard } from "./comment-card";
import { VoteControl } from "./vote-control";
import { coreApiClient } from "@/api/core/_client";

export const WishDetailView = ({ initialWish, initialComments }: { initialWish: Task; initialComments: Comment[] }) => {
  const [allComments, setAllComments] = useState(initialComments);
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [wish, setWish] = useState(initialWish);
  const [isVoting, setIsVoting] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(
    initialWish.user_vote ? (initialWish.user_vote === 1 ? 'up' : 'down') : null
  );

  // Use useMemo to transform the flat list into a tree only when comments change
  const threadedComments = useMemo(() => buildCommentTree(allComments), [allComments]);

  const handleNewComment = (newComment: Comment) => {
    // Add the new comment to our flat list, triggering a re-render of the tree
    setAllComments(prev => [...prev, newComment]);
    setActiveReplyId(null); // Close any open reply forms
  };

  const handleVote = async (voteType: 'up' | 'down') => {
    // ... Implement the exact same handleVote logic from Wishlist.tsx ...
    // ... It will call setWish and setUserVote instead of setWishes and setUserVotes ...
    if (isVoting) return;
    setIsVoting(true);
    
    const originalWish = { ...wish };
    const originalUserVote = userVote;

    // Optimistic Update
    const currentVote = userVote;
    if (currentVote === voteType) {
        setIsVoting(false);
        return;
    }

    let newUpvotes = wish.upvotes || 0;
    let newDownvotes = wish.downvotes || 0;
    if (currentVote === 'down' && voteType === 'up') { newDownvotes--; newUpvotes++; }
    else if (currentVote === 'up' && voteType === 'down') { newUpvotes--; newDownvotes++; }
    else { if (voteType === 'up') newUpvotes++; if (voteType === 'down') newDownvotes++; }
    
    setWish(prev => ({ ...prev, upvotes: newUpvotes, downvotes: newDownvotes }));
    setUserVote(voteType);
    
    try {
        const endpoint = voteType === 'up' ? '/tasks/upvotes' : '/tasks/downvotes';
        await coreApiClient.post(endpoint, { task_id: wish.id });
    } catch (error) {
        console.error("Vote failed", error);
        setWish(originalWish);
        setUserVote(originalUserVote);
    } finally {
        setIsVoting(false);
    }
  };

  const score = (wish.upvotes || 0) - (wish.downvotes || 0);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Wish Details */}
      <div className="flex justify-between items-start gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{wish.title}</h1>
          <p className="mt-4 text-lg text-default-600">{wish.description}</p>
        </div>
        {/* V-- Add the VoteControl component here --V */}
        <VoteControl 
            score={score}
            userVote={userVote}
            onVote={handleVote}
            isVoting={isVoting}
        />
      </div>
      <Divider className="my-8" />

      {/* Top-level Comment Form */}
      <h2 className="text-xl font-bold mb-4">Join the Discussion</h2>
      <CommentForm taskId={initialWish.id} onSuccess={handleNewComment} />
      
      <Divider className="my-8" />

      {/* Comments List */}
      <div className="flex flex-col gap-8">
        {threadedComments.length > 0 ? (
          threadedComments.map(comment => 
            <CommentCard 
              key={comment.id}
              comment={comment}
              taskId={initialWish.id}
              activeReplyId={activeReplyId}
              onReplyClick={setActiveReplyId}
              onReplySuccess={handleNewComment}
            />
          )
        ) : (
          <p className="text-default-500 text-center py-8">Be the first to comment on this idea!</p>
        )}
      </div>
    </div>
  );
};