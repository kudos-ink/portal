import { GOOD_FIRST_ISSUE_LABELS, KUDOS_ISSUE_LABELS } from "@/data/filters";
import {
  Issue,
  IssueDto,
  IssueQueryParamsWithPagination,
  IssueQueryParamsDto,
} from "@/types/issue";
import { Project, ProjectDto } from "@/types/project";
import {
  LanguageQueryParams,
  LanguageQueryParamsDto,
  Repository,
  RepositoryDto,
} from "@/types/repository";

export function dtoToIssue(dto: IssueDto): Issue {
  return {
    id: dto.id,
    issueId: dto.issue_id,
    isCertified: dto.certified,
    labels: dto.labels ?? [],
    repository: dtoToRepository(dto.repository),
    project: dtoToProject(dto.repository.project),
    title: dto.title,
    description: dto.description,
    createdAt: dto.issue_created_at,
    url: dto.repository.url + `/issues/${dto.issue_id}`,
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
    categories: dto.categories ?? [],
    purposes: dto.purposes ?? [],
    stack_levels: dto.stack_levels ?? [],
    technologies: dto.technologies ?? [],
  };
}

export function issueQueryParamsToDto(
  query: IssueQueryParamsWithPagination,
  allLanguages: string[],
): IssueQueryParamsDto {
  const { technologies = [], labels, kudos } = query;

  const languageSlugs = technologies.filter((tech) =>
    allLanguages.includes(tech),
  );
  const remainingTechnologies = technologies.filter(
    (tech) => !allLanguages.includes(tech),
  );

  const combinedLabels =
    labels === undefined
      ? kudos
        ? KUDOS_ISSUE_LABELS
        : [...GOOD_FIRST_ISSUE_LABELS, ...KUDOS_ISSUE_LABELS]
      : labels;

  return {
    slugs: query.projects,
    certified: query.certified,
    purposes: query.purposes,
    stack_levels: query.stackLevels,
    labels: combinedLabels.length > 0 ? combinedLabels : undefined,
    open: query.open,
    technologies:
      remainingTechnologies.length > 0 ? remainingTechnologies : undefined,
    language_slugs: languageSlugs.length > 0 ? languageSlugs : undefined,
    offset: query.offset,
    limit: query.limit,
    certified_or_labels: combinedLabels.length > 0 && query.certified,
  };
}

export function languageQueryParamsToDto(
  query?: LanguageQueryParams,
): LanguageQueryParamsDto {
  const labels = query?.labels ?? [];

  const combinedLabels = [
    ...labels,
    ...GOOD_FIRST_ISSUE_LABELS,
    ...KUDOS_ISSUE_LABELS,
  ];

  return {
    labels: combinedLabels.length > 0 ? combinedLabels : undefined,
    with_technologies: query?.withTechnologies,
  };
}
