import { TRACKED_LABELS } from "@/data/filters";
import {
  Task,
  TaskDto,
  TaskQueryParamsWithPagination,
  TaskQueryParamsDto,
} from "@/types/task";
import {
  Project,
  ProjectDto,
  ProjectQueryParams,
  ProjectQueryParamsDto,
} from "@/types/project";
import {
  LanguageQueryParams,
  LanguageQueryParamsDto,
  Repository,
  RepositoryDto,
} from "@/types/repository";
import { User, UserDto } from "@/types/user";

export function dtoToTask(dto: TaskDto): Task {
  return {
    id: dto.id,
    number: dto.number,
    isCertified: dto.certified,
    labels: dto.labels ?? [],
    user: dto.user ? dtoToUser(dto.user) : null,
    repository: dto.repository ? dtoToRepository(dto.repository) : null,
    project: dto.project ? dtoToProject(dto.project) : null,
    title: dto.title,
    description: dto.description,
    createdAt: dto.issue_created_at ? dto.issue_created_at : dto.created_at,
    url: dto.repository ? dto.repository.url + `/issues/${dto.number}` : null,
    upvotes: dto.upvotes ?? 0,
    downvotes: dto.downvotes ?? 0,
    user_vote: dto.user_vote,
    type_: dto.type_
  };
}

export function dtoToUser(dto: UserDto): User {
  return {
    id: dto.id,
    username: dto.username,
    avatar: dto.avatar,
  };
}

export function dtoToRepository(dto: RepositoryDto): Repository {
  return {
    id: dto.id,
    slug: dto.slug,
    language: dto.language_slug,
    // project: dtoToProject(dto.project),
    name: dto.name,
    url: dto.url,
  };
}

export function dtoToProject(dto: ProjectDto): Project {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    avatar: dto.avatar ?? null,
    types: dto.types ?? [],
    purposes: dto.purposes ?? [],
    stack_levels: dto.stack_levels ?? [],
    technologies: dto.technologies ?? [],
  };
}

export function taskQueryParamsToDto(
  query: TaskQueryParamsWithPagination,
  allLanguages: string[],
): TaskQueryParamsDto {
  const { technologies = [], labels } = query;

  const languageSlugs = technologies.filter((tech) =>
    allLanguages.includes(tech),
  );
  const remainingTechnologies = technologies.filter(
    (tech) => !allLanguages.includes(tech),
  );

  const combinedLabels = labels === undefined ? TRACKED_LABELS : labels;

  return {
    slugs: query.projects,
    certified: query.certified,
    purposes: query.purposes,
    types: query.types,
    stack_levels: query.stackLevels,
    labels: combinedLabels.length > 0 ? combinedLabels : undefined,
    open: query.open,
    technologies:
      remainingTechnologies.length > 0 ? remainingTechnologies : undefined,
    language_slugs: languageSlugs.length > 0 ? languageSlugs : undefined,
    offset: query.offset,
    limit: query.limit,
    certified_or_labels: query.certifiedOnly
      ? false
      : combinedLabels.length > 0 && query.certified,
    type_: query.type_
  };
}

export function languageQueryParamsToDto(
  query?: LanguageQueryParams,
): LanguageQueryParamsDto {
  return {
    open: query?.open,
    slugs: query?.projects,
    certified: query?.certified,
    labels: query?.labels,
    with_technologies: query?.withTechnologies,
    certified_or_labels:
      query?.labels && query.labels.length > 0 && query?.certified,
  };
}

export function projectQueryParamsToDto(
  query: ProjectQueryParams,
): ProjectQueryParamsDto {
  return {
    purposes: query.purposes,
    stack_levels: query.stackLevels,
    technologies: query.technologies,
    open: query.open,
    slugs: query.slugs,
    certified: query.certified,
    rewards: query.withRewards,
    labels: query.labels,
    certified_or_labels:
      query?.labels && query.labels.length > 0 && query.certified,
  };
}
