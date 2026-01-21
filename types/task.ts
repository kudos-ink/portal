import { PaginationQueryParams } from "./pagination";
import { Project, ProjectDto } from "./project";
import { Repository, RepositoryDto } from "./repository";
import { User, UserDto } from "./user";

export type TaskStatus = "open" | "in-progress" | "completed" | "closed";

export type TaskDto = {
  id: number;
  number: number;
  labels: string[] | null;
  open: boolean;
  assignee_id: string | null;
  assignee_user_id: number | null;
  assignee_team_id: number | null;
  assignee: UserDto | null;
  user: UserDto | null;
  certified: boolean;
  repository: RepositoryDto | null;
  project: ProjectDto | null;
  title: string | null;
  description: string | null;
  url: string | null;
  status: TaskStatus;
  bounty: number | null;
  skills: string[] | null;
  contact: string | null;
  funding_options: string[] | null;
  is_featured: boolean | null;
  is_certified: boolean | null;
  issue_created_at: string;
  issue_closed_at: string | null;
  created_at: string;
  updated_at: string | null;
  upvotes: number | null;
  downvotes: number | null;
  user_vote: 1 | -1 | null;
  type_: TaskType;
};

export type Task = {
  id: number;
  number: number;
  isCertified: boolean;
  labels: string[];
  user: User | null;
  assignee: User | null;
  assigneeUserId: number | null;
  assigneeTeamId: number | null;
  repository: Repository | null;
  project: Project | null;
  title: string | null;
  description: string | null;
  url: string | null;
  status: TaskStatus;
  bounty: number | null;
  skills: string[] | null;
  contact: string | null;
  fundingOptions: string[] | null;
  isFeatured: boolean;
  createdAt: string;
  upvotes: number | null;
  downvotes: number | null;
  user_vote: 1 | -1 | null;
  type_: TaskType;
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
  type_: TaskType;
}>;

export type TaskType = 'dev' | 'non-dev' | 'wish';

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
  type_: TaskType
}> &
  Partial<PaginationQueryParams>;


export type NewTaskPayload = {
  title: string;
  description?: string;
  type_: TaskType;
  project_id?: number;
  status?: TaskStatus;
  bounty?: number;
  skills?: string[];
  contact?: string;
  funding_options?: string[];
};

export type UpdateTaskPayload = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  assignee_user_id?: number | null;
  assignee_team_id?: number | null;
  bounty?: number;
  skills?: string[];
  contact?: string;
  funding_options?: string[];
};