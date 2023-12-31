import { ProjectLogoImages } from "@/lib/notion/types";

export function getImagePath(
  githubUrl: string,
  projectLogos: ProjectLogoImages,
): string {
  return (
    "/images/" + projectLogos[githubUrl] ||
    "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
  );
}
