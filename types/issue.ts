import { Project } from "./project";
import { Repository } from "./repository";

export type Issue = {
  id: number;
  issueId: number;
  isCertified: boolean;
  labels: string[];
  repository: Repository;
  title: string;
  timestamp_create: string;
  url: string;
};

export type IssueWithProject = Issue & {
  project: Project;
};

export type IssueQueryParams = Partial<{
  languageIds: string[];
  projectIds: string[];
}>;
