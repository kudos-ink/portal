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
  title: string;
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
  title: string;
  url: string;
  createdAt: string;
};

export type IssueQueryParams = Partial<{
  certified: boolean;
  open: boolean;
  labels: string[];
  projects: string[];
  purposes: string[];
  stackLevels: string[];
  technologies: string[];
  types: string[];
}>;

export type IssueQueryParamsDto = IssueQueryParams &
  Partial<{
    languages: string[];
  }>;
