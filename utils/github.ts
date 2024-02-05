export function getImagePath(
  githubUrl: string,
  projectLogos: { [key: string]: string },
): string | null {
  const lowerCaseGithubUrl = githubUrl.toLowerCase();

  for (const key in projectLogos) {
    if (
      projectLogos.hasOwnProperty(key) &&
      key.toLowerCase() === lowerCaseGithubUrl
    ) {
      return "/images/" + projectLogos[key];
    }
  }

  return null;
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
