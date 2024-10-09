export const SITE_CONFIG = {
  name: "Kudos Portal",
  description:
    "A portal for the Substrate, Polkadot and Kusama ecosystem contributors. Find collaborations, collect kudos.",
  links: {
    githubOrg: "https://github.com/kudos-ink",
    github: "https://github.com/kudos-ink/portal",
    twitter: "https://twitter.com/KudosPortal",
    bugReport:
      "https://github.com/kudos-ink/portal/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=",
    includeProject:
      "https://github.com/kudos-ink/project-classification/issues/new?assignees=&labels=add-project&projects=&template=add_project.yaml&title=%5BAdd+a+project%5D",
    maintainerFeedback: "https://eu.jotform.com/form/233383475336057",
    contributorFeedback: "https://eu.jotform.com/form/233386452273055",
  },
  url: process.env.NEXT_PUBLIC_URL,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "",
};
