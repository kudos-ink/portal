import { coreApiClient } from "@/api/core/_client";
import { User } from "@/types/user";

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: User;
    parent_comment_id: number;
}

/**
 * Fetches all comments for a specific task.
 * @param taskId The ID of the task.
 * @returns An array of comments.
 */
export async function fetchCommentsForTask(taskId: number): Promise<Comment[]> {
    try {
        return await coreApiClient.get<Comment[]>(`/tasks/${taskId}/comments`);
    } catch (error) {
        console.error(`Failed to fetch comments for task ${taskId}:`, error);
        return [];
    }
}

/**
 * Posts a new comment to a task.
 * @param taskId The ID of the task.
 * @param content The content of the comment.
 * @param parentCommentId Optional ID of the parent comment for threading.
 * @returns The newly created comment.
 */
export async function postComment(taskId: number, content: string, parentCommentId: number | null = null): Promise<Comment> {
    const payload = { content, task_id: taskId, parent_comment_id: parentCommentId };
    return coreApiClient.post<Comment, { task_id: number, content: string }>(`/tasks/${taskId}/comments`, payload);
}


// Define the new type for our nested structure
export interface ThreadedComment extends Comment {
    replies: ThreadedComment[];
}

/**
 * Transforms a flat array of comments into a nested tree structure.
 * @param comments The flat array of comments from the API.
 * @returns An array of root-level comments, each with a 'replies' array.
 */
export function buildCommentTree(comments: Comment[]): ThreadedComment[] {
    const commentMap: { [key: number]: ThreadedComment } = {};
    const rootComments: ThreadedComment[] = [];

    // First pass: create a map of all comments and initialize replies array
    comments.forEach(comment => {
        commentMap[comment.id] = { ...comment, replies: [] };
    });

    // Second pass: link replies to their parents
    comments.forEach(comment => {
        if (comment.parent_comment_id) {
            const parent = commentMap[comment.parent_comment_id];
            if (parent) {
                parent.replies.push(commentMap[comment.id]);
            }
        } else {
            rootComments.push(commentMap[comment.id]);
        }
    });

    return rootComments;
}