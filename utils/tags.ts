const tags = {
  projectInfos(slug: string) {
    return `project-infos-${slug}`;
  },
  repositories(slug?: string) {
    return `repositories${slug ? `_${slug}` : ""}`;
  },
};

export default tags;
