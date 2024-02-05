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
export const extractRepositoryUrlFromIssue = (
  issueUrl: string,
): string | null => {
  // Regex pattern to match the repository URL in the issue URL
  const regex = /(https:\/\/github\.com\/[^/]+\/[^/]+)\/issues\/\d+/;

  // Use the regex pattern to extract the repository URL
  const match = issueUrl.match(regex);

  // If a match is found, return the repository URL, otherwise, return null
  return match ? match[1] : null;
};
