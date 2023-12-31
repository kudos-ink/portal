import { ValidNotionResponse, ProjectLogoImages } from "@/lib/notion/types";

export function subtractMonths(date: Date, numberOfMonths: number): Date {
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() - numberOfMonths);
  return result;
}

export function daysSince(date: Date) {
  const currentDate = new Date();
  const givenDate = new Date(date);

  const differenceInTime = currentDate.getTime() - givenDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}

export function isValidNotionPage(object: any): object is ValidNotionResponse {
  return object && object.object === "page" && "properties" in object;
}

export function getImagePath(
  githubUrl: string,
  projectLogos: ProjectLogoImages,
): string {
  return (
    "/images/" + projectLogos[githubUrl] ||
    "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
  );
}
