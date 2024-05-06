type ProjectPurpose =
  | "ai"
  | "bridge"
  | "dao"
  | "data"
  | "defi"
  | "evm"
  | "gaming"
  | "governance"
  | "nft"
  | "oracles"
  | "rwa"
  | "socialfi"
  | "staking"
  | "testing"
  | "universal";

type ProjectType =
  | "platform"
  | "tool"
  | "library"
  | "client"
  | "framework"
  | "template"
  | "mobile"
  | "service"
  | "dApp";

type ProjectStackLevels =
  | "protocol"
  | "runtime"
  | "smart-contract"
  | "messaging"
  | "offchain";

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
  stackLevels: ProjectStackLevels[];
  technologies: string[];
  types: ProjectType[];
};

export interface IProject {
  id: number;
  infos: ProjectInfos;
}

export interface IProjectFull extends IProject {
  // TODO: add project page sections - metrics, contributions, milestones, wishes, tips
}
