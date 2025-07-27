"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { postComment, Comment } from "@/lib/api/comments";

interface CommentFormInputs {
  content: string;
}

interface CommentFormProps {
  taskId: number;
  parentCommentId?: number | null;
  onSuccess: (newComment: Comment) => void;
  onCancel?: () => void;
  placeholderText?: string;
  submitButtonText?: string;
}

export const CommentForm = ({ 
  taskId, 
  parentCommentId = null, 
  onSuccess, 
  onCancel,
  placeholderText = "Share your thoughts...",
  submitButtonText = "Post Comment"
}: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, reset } = useForm<CommentFormInputs>({ defaultValues: { content: "" } });

  const onSubmit = async (data: CommentFormInputs) => {
    if (!data.content.trim()) return;
    setIsSubmitting(true);
    try {
      const newComment = await postComment(taskId, data.content, parentCommentId);
      onSuccess(newComment);
      reset();
    } catch (error) {
      console.error("Failed to post comment:", error);
      // You should show an error toast to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Your comment"
            variant="bordered"
            placeholder={placeholderText}
            minRows={parentCommentId ? 3 : 4} // Smaller form for replies
            autoFocus={!!parentCommentId}
          />
        )}
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
            <Button variant="flat" color="default" onPress={onCancel}>
                Cancel
            </Button>
        )}
        <Button type="submit" color="primary" isLoading={isSubmitting}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};