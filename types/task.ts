import { PaginationQueryParams } from "./pagination";
import { Project } from "./project";
import { Repository, RepositoryDto } from "./repository";

export type TaskDto = {
  id: number;
  task_id: number;
  labels: string[] | null;
  open: boolean;
  assignee_id: string | null;
  assignee_username: string | null;
  certified: boolean;
  repository: RepositoryDto;
  title: string | null;
  description: string | null;
  task_created_at: string;
  task_closed_at: string | null;
  created_at: string;
  updated_at: string | null;
};

export type Task = {
  id: number;
  taskId: number;
  isCertified: boolean;
  labels: string[];
  repository: Repository;
  project: Project;
  title: string | null;
  description: string | null;
  url: string;
  createdAt: string;
};

export type TaskQueryParams = Partial<{
  certified: boolean;
  certifiedOnly: boolean;
  open: boolean;
  labels: string[];
  projects: string[];
  purposes: string[];
  stackLevels: string[];
  technologies: string[];
  types: string[];
}>;

export type TaskQueryParamsWithPagination = TaskQueryParams &
  Partial<PaginationQueryParams>;

export type TaskQueryParamsDto = Partial<{
  slugs: string[];
  certified: boolean;
  purposes: string[];
  types: string[];
  stack_levels: string[];
  technologies: string[];
  labels: string[];
  language_slugs: string[];
  repository_id: number;
  assignee_id: number;
  open: boolean;
  has_assignee: boolean;
  task_closed_at_min: string;
  task_closed_at_max: string;
  certified_or_labels: boolean;
}> &
  Partial<PaginationQueryParams>;
