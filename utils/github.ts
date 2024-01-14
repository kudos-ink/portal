import { ProjectLogoImages } from "@/lib/notion/types";

export function getImagePath(
  githubUrl: string,
  projectLogos: ProjectLogoImages,
): string | null {
  const endpoint = projectLogos[githubUrl];
  return endpoint ? "/images/" + endpoint : null;
}
