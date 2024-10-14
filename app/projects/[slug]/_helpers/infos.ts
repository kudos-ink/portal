import { REWARDS_KEY, KUDOS_ISSUE_KEY } from "@/data/filters";
import {
  ProjectInfos,
  ProjectInfosLabel,
  ProjectMetrics,
} from "@/types/project";

export function constructLabels(
  infos: ProjectInfos,
  metrics: ProjectMetrics,
): ProjectInfosLabel[] {
  const { certifiedTotal, rewardsTotal } = metrics;

  return [
    infos.attributes.rewards && {
      color: "success",
      emoji: "💰",
      label: "Rewards",
      type: REWARDS_KEY,
      tooltip: "This project is willing to distributed rewards (e.g. tipping)",
    },
    certifiedTotal > 0 && {
      color: "default",
      label: "Kudos Pick",
      type: KUDOS_ISSUE_KEY,
      tooltip: "This project participates to the Kudos Carnival",
    },
  ].filter((label): label is ProjectInfosLabel => Boolean(label)); // Type-safe filtering
}
