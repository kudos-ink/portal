import { Project, ProjectDto } from "./project";

export type RepositoryDto = {
  id: number;
  slug: string;
  name: string;
  language_slug: string;
  project: ProjectDto;
  url: string;
  created_at: string;
  updated_at: string | null;
};

export type Repository = {
  id: number;
  slug: string;
  name: string;
  language: string;
  // project: Project;
  url: string;
};

export type LanguageQueryParams = Partial<{
  labels: string[];
  withTechnologies: boolean;
}>;

export type LanguageQueryParamsDto = Partial<{
  labels: string[];
  with_technologies: boolean;
}>;
