import { Project, ProjectDto } from "./project";

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';

export type JobLocation = 'remote' | 'hybrid' | 'on-site';

export type JobDto = {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  location_type: JobLocation;
  job_type: JobType;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  apply_url: string | null;
  apply_email: string | null;
  project: ProjectDto | null;
  tags: string[];
  created_at: string;
  updated_at: string | null;
  expires_at: string | null;
  is_active: boolean;
};

export type Job = {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  locationType: JobLocation;
  jobType: JobType;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  applyUrl: string | null;
  applyEmail: string | null;
  project: Project | null;
  tags: string[];
  createdAt: string;
  updatedAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
};
