import { coreApiClient } from "@/api/core/_client";
import { User } from "@/types/user";

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: User;
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
 * @returns The newly created comment.
 */
export async function postComment(taskId: number, content: string): Promise<Comment> {
    const payload = { content, task_id: taskId };
    return coreApiClient.post<Comment, { task_id: number, content: string }>(`/tasks/${taskId}/comments`, payload);
}