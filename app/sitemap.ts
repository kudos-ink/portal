import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/config";
import { getFilterOptions } from "@/lib/filters";
import { createUrl, encodingSlug } from "@/utils/url";
import { TECHNOLOGY_KEY, PURPOSE_KEY, PROJECTS_KEY } from "@/data/filters";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const filterOptions = await getFilterOptions();

  const defaultSites: MetadataRoute.Sitemap = [
    {
      url: `${SITE_CONFIG.url}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/explore/open-contributions`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/explore/good-first-open-contributions`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
  ];
  const languagesSites: MetadataRoute.Sitemap = filterOptions.technologies.map(
    (lang) => {
      const path = createUrl(
        TECHNOLOGY_KEY,
        [lang.value],
        "/explore/",
        filterOptions,
      );
      return {
        url: `${SITE_CONFIG.url}${path}`,
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 0.9,
      };
    },
  );
  const interestsSites: MetadataRoute.Sitemap = filterOptions.purposes.map(
    (purpose) => {
      const path = createUrl(
        PURPOSE_KEY,
        [purpose.value],
        "/explore/",
        filterOptions,
      );
      return {
        url: `${SITE_CONFIG.url}${path}`,
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 0.9,
      };
    },
  );
  const repositoriesSites: MetadataRoute.Sitemap = filterOptions.projects.map(
    (project) => {
      const path = createUrl(
        PROJECTS_KEY,
        [project.value],
        "/explore/",
        filterOptions,
      );
      return {
        url: `${SITE_CONFIG.url}${path}`,
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 0.9,
      };
    },
  );
  const sites = defaultSites.concat(
    languagesSites.concat(interestsSites.concat(repositoriesSites)),
  );
  return sites;
}
