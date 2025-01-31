import { PaginationQueryParams } from "./pagination";
import { Project } from "./project";
import { Repository, RepositoryDto } from "./repository";
import { User, UserDto } from "./user";

export type TaskDto = {
  id: number;
  issue_id: number;
  labels: string[] | null;
  open: boolean;
  assignee_id: string | null;
  // assignee_username: string | null;
  user: UserDto | null;
  certified: boolean;
  repository: RepositoryDto | null;
  title: string | null;
  description: string | null;
  issue_created_at: string;
  issue_closed_at: string | null;
  created_at: string;
  updated_at: string | null;
};

export type Task = {
  id: number;
  taskId: number;
  isCertified: boolean;
  labels: string[];
  user: User | null;
  repository: Repository | null;
  project: Project | null;
  title: string | null;
  description: string | null;
  url: string | null;
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
