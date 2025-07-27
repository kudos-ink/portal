"use client";

import React from "react";
import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { formatDistanceToNow } from "date-fns";
import { deleteComment, ThreadedComment } from "@/lib/api/comments";
import { CommentForm } from "./comment-form";
import { Comment } from "@/lib/api/comments";

interface CommentCardProps {
  comment: ThreadedComment;
  taskId: number;
  activeReplyId: number | null;
  onReplyClick: (commentId: number | null) => void;
  onReplySuccess: (newComment: Comment) => void;
  onDeleteSuccess: (commentId: number, hasReplies: boolean) => void;
}

export const CommentCard = ({ comment, taskId, activeReplyId, onReplyClick, onReplySuccess, onDeleteSuccess }: CommentCardProps) => {
  const isReplying = activeReplyId === comment.id;
  const isDeleted = comment.status === 'deleted';
  const hasReplies = comment.replies && comment.replies.length > 0;

  const MOCK_CURRENT_USER_ID = 1;

  const canDelete = !isDeleted && comment.user && (comment.user.id === MOCK_CURRENT_USER_ID /* || user.isAdmin */);

  const handleDelete = async () => {
      if (!window.confirm("Are you sure you want to delete this comment?")) return;
      try {
          await deleteComment(comment.id);
          onDeleteSuccess(comment.id, hasReplies);
      } catch (error) {
          console.error("Failed to delete comment:", error);
      }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Comment Content */}
      <div className="flex gap-4 items-start">
        <User
            name={isDeleted ? "[deleted]" : comment.user?.username || "[unknown]"}
            avatarProps={{ src: isDeleted ? "" : comment.user?.avatar }}
        />
        <div className="flex-1 pt-1">
          <p className="text-sm text-default-500 pb-1">
            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
          </p>
          <p className="text-foreground whitespace-pre-wrap">{comment.content}</p>
          {!isDeleted && (
                <div className="flex items-center gap-2 mt-2">
                    <Button size="sm" variant="light" color="primary" onPress={() => onReplyClick(comment.id)}>
                        Reply
                    </Button>
                    {canDelete && (
                        <Button size="sm" variant="light" color="danger" onPress={handleDelete}>
                            Delete
                        </Button>
                    )}
                </div>
            )}
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
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};