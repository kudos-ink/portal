import {
  FPurposes,
  FProjectTypes,
  FStackLevels,
  FTechnologies,
} from "@/data/filters";
import { Repository } from "./repository";

export type ProjectPurpose = (typeof FPurposes)[number];
export type ProjectType = (typeof FProjectTypes)[number];
export type ProjectStackLevel = (typeof FStackLevels)[number];
export type ProjectTechnologies = (typeof FTechnologies)[number];

export type LinkItem = {
  label: string;
  url: string;
};

export type ProjectLinks = {
  website: LinkItem[];
  docs: LinkItem[];
  explorer: LinkItem[];
  repository: LinkItem[];
  social: LinkItem[];
};

export type ProjectInfos = {
  name: string;
  slug: string;
  description: string;
  richText: string;
  links: ProjectLinks;
  curators: string[];
  attributes: {
    networks: string[];
    purposes: ProjectPurpose[];
    stackLevels: ProjectStackLevel[];
    technologies: ProjectTechnologies[];
    types: ProjectType[];
    rewards: boolean;
  };
};

export type ProjectMetrics = {
  repositoriesTotal: number;
  suggestedTotal: number;
  certifiedTotal: number;
  kudosTotal: number;
  rewardsTotal: number;
};

export type ProjectInfosLabel = {
  color: "default" | "success" | "danger";
  emoji?: string;
  label: string;
  tooltip: string;
  type: string;
};

export type ProjectDto = {
  id: number;
  name: string;
  slug: string;
  avatar: string | null;
  categories: string[] | null;
  purposes: string[] | null;
  stack_levels: string[] | null;
  technologies: string[] | null;
  created_at: string;
  updated_at: string | null;
};

export type Project = {
  id: number;
  name: string;
  slug: string;
  avatar: string | null;
  categories: string[];
  purposes: string[];
  stack_levels: string[];
  technologies: string[];
};

export interface IProjectFull {
  id: number;
  infos: ProjectInfos;
  // TODO: add project page sections - metrics, contributions, milestones, wishes, tips
  repositories: Repository[];
}

export type ProjectQueryParams = Partial<{
  slugs?: string[];
  categories?: string[];
  stackLevels?: string[];
  technologies?: string[];
  certified?: boolean;
}>;
