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
  links: ProjectLinks;
  curators: string[];
  attributes: {
    networks: string[];
    purposes: ProjectPurpose[];
    stackLevels: ProjectStackLevel[];
    technologies: ProjectTechnologies[];
    types: ProjectType[];
  };
};

export type ProjectInfosLabelFlags = {
  hasGoodFirstIssue: boolean;
  hasKudosCertified: boolean;
  hasRewards: boolean;
};

export type ProjectInfosLabel = {
  color: "default" | "success" | "danger";
  emoji?: string;
  label: string;
  type: string;
};

export type ProjectDto = {
  id: number;
  name: string;
  slug: string;
  avatar: string;
  categories: string[];
  purposes: string[];
  stack_levels: string[];
  technologies: string[];
  created_at: string;
  updated_at: string | null;
};

export type Project = {
  id: number;
  name: string;
  slug: string;
  avatar: string;
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
