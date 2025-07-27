"use client";

import React from "react";
import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { formatDistanceToNow } from "date-fns";
import { ThreadedComment } from "@/lib/api/comments";
import { CommentForm } from "./comment-form";
import { Comment } from "@/lib/api/comments";

interface CommentCardProps {
  comment: ThreadedComment;
  taskId: number;
  activeReplyId: number | null;
  onReplyClick: (commentId: number | null) => void;
  onReplySuccess: (newComment: Comment) => void;
}

export const CommentCard = ({ comment, taskId, activeReplyId, onReplyClick, onReplySuccess }: CommentCardProps) => {
  const isReplying = activeReplyId === comment.id;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Comment Content */}
      <div className="flex gap-4 items-start">
        <User
          name={comment.user.username}
          avatarProps={{ src: comment.user.avatar }}
          className="font-semibold"
        />
        <div className="flex-1 pt-1">
          <p className="text-sm text-default-500 pb-1">
            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
          </p>
          <p className="text-foreground whitespace-pre-wrap">{comment.content}</p>
          <Button 
            size="sm" 
            variant="light" 
            color="primary" 
            className="mt-2"
            onPress={() => onReplyClick(comment.id)}
           >
            Reply
          </Button>
        </div>
      </div>

      {/* Reply Form (Conditional) */}
      {isReplying && (
        <div className="pl-14">
            <CommentForm
                taskId={taskId}
                parentCommentId={comment.id}
                onSuccess={onReplySuccess}
                onCancel={() => onReplyClick(null)}
                placeholderText={`Replying to ${comment.user.username}...`}
                submitButtonText="Post Reply"
            />
        </div>
      )}

      {/* Render Replies (Recursive) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-8 border-l-2 border-default-100 ml-5 flex flex-col gap-6">
          {comment.replies.map(reply => (
            <CommentCard
              key={reply.id}
              comment={reply}
              taskId={taskId}
              activeReplyId={activeReplyId}
              onReplyClick={onReplyClick}
              onReplySuccess={onReplySuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};