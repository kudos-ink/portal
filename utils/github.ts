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
