import { PaginatedCustomDataResponse } from ".";

export type Contribution = {
  id: number;
  isCertified: boolean;
  labels: string[];
  languages: string[];
  project: string;
  organization: string;
  repository: string;
  title: string;
  timestamp: string;
  url: string;
};

export type PaginatedContributions = PaginatedCustomDataResponse<Contribution>;
