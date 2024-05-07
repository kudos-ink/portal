import {
  FPurposes,
  FProjectTypes,
  FStackLevels,
  FTechnologies,
} from "@/data/filters";
import { Repository } from "./filters";

export type ProjectPurpose = (typeof FPurposes)[number];
export type ProjectType = (typeof FProjectTypes)[number];
export type ProjectStackLevel = (typeof FStackLevels)[number];
export type ProjectTechnologies = (typeof FTechnologies)[number];

type ProjectLinks = {
  websites: string[];
  documentation: string[];
  explorers: string[];
  repositories: string[];
  socialMedia: string[];
};

export type ProjectInfos = {
  name: string;
  slug: string;
  description: string;
  links: ProjectLinks;
  networks: string[];
  purposes: ProjectPurpose[];
  stackLevels: ProjectStackLevel[];
  technologies: ProjectTechnologies[];
  types: ProjectType[];
};

export type Project = {
  id: number;
  name: string;
  slug: string;
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
