"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { User } from "@nextui-org/user";
import {Card, CardBody} from '@nextui-org/card';
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/spinner";

import { Task } from "@/types/task";
import { Comment, postComment } from "@/lib/api/comments";
import { formatDistanceToNow } from "date-fns";

interface CommentFormInputs {
  content: string;
}

const CommentCard = ({ comment }: { comment: Comment }) => (
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
      <p className="text-foreground">{comment.content}</p>
    </div>
  </div>
);


export const WishDetailView = ({ initialWish, initialComments }: { initialWish: Task; initialComments: Comment[] }) => {
  const [comments, setComments] = useState(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset } = useForm<CommentFormInputs>({ defaultValues: { content: "" } });

  const onCommentSubmit = async (data: CommentFormInputs) => {
    setIsSubmitting(true);
    try {
      const newComment = await postComment(initialWish.id, data.content);
      setComments(prev => [...prev, newComment]);
      reset();
    } catch (error) {
      console.error("Failed to post comment:", error);
      // Show error toast to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Wish Details */}
      <h1 className="text-3xl font-bold tracking-tight">{initialWish.title}</h1>
      <p className="mt-4 text-lg text-default-600">
        {initialWish.description}
      </p>
      <Divider className="my-8" />

      {/* New Comment Form */}
      <h2 className="text-xl font-bold mb-4">Join the Discussion</h2>
      <form onSubmit={handleSubmit(onCommentSubmit)} className="flex flex-col gap-4">
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Your comment"
              variant="bordered"
              placeholder="Share your thoughts, feedback, or suggestions..."
              minRows={4}
            />
          )}
        />
        <div className="flex justify-end">
            {/* TODO: Add authentication check here */}
            <Button type="submit" color="primary" isLoading={isSubmitting}>
              Post Comment
            </Button>
        </div>
      </form>

      <Divider className="my-8" />

      {/* Comments List */}
      <div className="flex flex-col gap-8">
        {comments.length > 0 ? (
          comments.map(comment => {
            console.log(comment)
          return <CommentCard key={comment.id} comment={comment} />
        })
        ) : (
          <p className="text-default-500 text-center py-8">Be the first to comment on this idea!</p>
        )}
      </div>
    </div>
  );
};