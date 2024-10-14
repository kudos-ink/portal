import { PaginationQueryParams } from "./pagination";
import { Project } from "./project";
import { Repository, RepositoryDto } from "./repository";

export type IssueDto = {
  id: number;
  issue_id: number;
  labels: string[] | null;
  open: boolean;
  assignee_id: string | null;
  assignee_username: string | null;
  certified: boolean;
  repository: RepositoryDto;
  title: string | null;
  description: string | null;
  issue_created_at: string;
  issue_closed_at: string | null;
  created_at: string;
  updated_at: string | null;
};

export type Issue = {
  id: number;
  issueId: number;
  isCertified: boolean;
  labels: string[];
  repository: Repository;
  project: Project;
  title: string | null;
  description: string | null;
  url: string;
  createdAt: string;
};

export type IssueQueryParams = Partial<{
  certified: boolean;
  kudos: boolean; // 'kudos' labelled issues
  open: boolean;
  labels: string[];
  projects: string[];
  purposes: string[];
  stackLevels: string[];
  technologies: string[];
  types: string[];
}>;

export type IssueQueryParamsWithPagination = IssueQueryParams &
  Partial<PaginationQueryParams>;

export type IssueQueryParamsDto = Partial<{
  slugs: string[];
  certified: boolean;
  purposes: string[];
  stack_levels: string[];
  technologies: string[];
  labels: string[];
  language_slugs: string[];
  repository_id: number;
  assignee_id: number;
  open: boolean;
  has_assignee: boolean;
  issue_closed_at_min: string;
  issue_closed_at_max: string;
}> &
  Partial<PaginationQueryParams>;
