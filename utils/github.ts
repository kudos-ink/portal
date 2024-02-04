import { Repository } from "@/types/filters";

export function getImagePath(
  githubUrl: string,
  repositories: Repository[],
): string | null {
  const lowerCaseGithubUrl = githubUrl.toLowerCase();

  if (lowerCaseGithubUrl.includes("polkadot")) {
    return "/images/polkadot-logo.png";
  }

  const repository = repositories.find(
    ({ repository_url }) => repository_url.toLowerCase() === lowerCaseGithubUrl,
  );

  return repository?.icon ?? null;
}

export const getProjectUrls = (organization: string, repository?: string) => {
  return {
    organizationUrl: `https://github.com/${organization}`,
    repositoryUrl: repository
      ? `https://github.com/${organization}/${repository}`
      : undefined,
  };
};
