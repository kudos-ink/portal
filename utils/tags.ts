const tags = {
  languages: "languages",
  latestTasks: "latest-tasks",
  allProjects: "all-projects",
  projectOptions: "project-options",
  projects(slug: string) {
    return `projects${slug ? `_${slug}` : ""}`;
  },
  projectInfos(slug: string) {
    return `project-infos-${slug}`;
  },
  repositories(slug?: string) {
    return `repositories${slug ? `_${slug}` : ""}`;
  },
};

export default tags;
