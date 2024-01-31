import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/config";
import { fetchFilterOptions } from "@/lib/repository-metadata";
import { createUrl, encodingSlug } from "@/utils/url";
import {
  LANGUAGES_KEY,
  INTEREST_KEY,
  PROJECTS_KEY,
  GOOD_FIRST_ISSUE_KEY,
} from "@/data/filters";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const filterOptions = await fetchFilterOptions();

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
  const languagesSites: MetadataRoute.Sitemap = filterOptions.languages.map(
    (lang) => {
      const path = createUrl(
        LANGUAGES_KEY,
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
  const interestsSites: MetadataRoute.Sitemap = filterOptions.interests.map(
    (interest) => {
      const path = createUrl(
        INTEREST_KEY,
        [interest.value],
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
  const repositoriesSites: MetadataRoute.Sitemap =
    filterOptions.repositories.map((repo) => {
      const path = createUrl(
        PROJECTS_KEY,
        [repo.value],
        "/explore/",
        filterOptions,
      );
      return {
        url: `${SITE_CONFIG.url}${path}`,
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 0.9,
      };
    });
  const sites = defaultSites.concat(
    languagesSites.concat(interestsSites.concat(repositoriesSites)),
  );
  return sites;
}
