import {
  GOOD_FIRST_ISSUE_KEY,
  REWARDS_KEY,
  KUDOS_ISSUE_KEY,
} from "@/data/filters";
import { ProjectInfosLabelFlags, ProjectInfosLabel } from "@/types/project";

export function constructLabels({
  hasGoodFirstIssue,
  hasKudosCertified,
  hasRewards,
}: ProjectInfosLabelFlags): ProjectInfosLabel[] {
  return [
    hasGoodFirstIssue && {
      color: "danger",
      emoji: "🌟",
      label: "Good First Issue",
      type: GOOD_FIRST_ISSUE_KEY,
    },
    hasRewards && {
      color: "success",
      emoji: "💰",
      label: "Rewards",
      type: REWARDS_KEY,
    },
    hasKudosCertified && {
      color: "default",
      label: "Kudos Pick",
      type: KUDOS_ISSUE_KEY,
    },
  ].filter((label): label is ProjectInfosLabel => Boolean(label)); // Type-safe filtering
}
