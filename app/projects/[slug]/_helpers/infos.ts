import { REWARDS_KEY, KUDOS_ISSUE_KEY } from "@/data/filters";
import { ProjectInfosLabel, ProjectMetrics } from "@/types/project";

export function constructLabels(metrics: ProjectMetrics): ProjectInfosLabel[] {
  const { certifiedTotal, rewardsTotal } = metrics;

  return [
    rewardsTotal > 0 && {
      color: "success",
      emoji: "💰",
      label: "Rewards",
      type: REWARDS_KEY,
    },
    certifiedTotal > 0 && {
      color: "default",
      label: "Kudos Pick",
      type: KUDOS_ISSUE_KEY,
    },
  ].filter((label): label is ProjectInfosLabel => Boolean(label)); // Type-safe filtering
}
