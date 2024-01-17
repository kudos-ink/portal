import { ProjectLogoImages } from "@/lib/notion/types";

export function getImagePath(
  githubUrl: string,
  projectLogos: ProjectLogoImages,
): string | null {
  const endpoint = projectLogos[githubUrl];
  return endpoint ? "/images/" + endpoint : null;
}

export const getProjectUrls = (organization: string, repository?: string) => {
  return {
    organizationUrl: `https://github.com/${organization}`,
    repositoryUrl: repository
      ? `https://github.com/${organization}/${repository}`
      : undefined,
  };
};
