import { PaginatedCustomDataResponse } from ".";

export type Contribution = {
  id: number;
  avatar: string;
  labels: string[];
  language: string;
  project: string;
  repository: string;
  title: string;
  timestamp: string;
  url: string;
};

export type PaginatedContributions = PaginatedCustomDataResponse<Contribution>;
