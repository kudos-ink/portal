"use client";

import { ContributorProfile } from "@/types/profile";

interface ProfileMetricsProps {
  metrics: ContributorProfile["metrics"];
}

export default function ProfileMetrics({ metrics }: ProfileMetricsProps) {
  return (
    <div className="bg-gradient-to-r from-background to-background-200 to-80% py-6 px-8 border-[1px] rounded-md flex flex-col gap-6 w-full">
      <div className="font-semibold text-lg">Metrics</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-small text-default-500 uppercase font-semibold mb-4 border-b border-default-100 pb-2">Activity</p>
          <div className="flex flex-col gap-4">
            <MetricItem label="Active Engagements" value={metrics.activeEngagements} />
            <MetricItem label="Total Contributions" value={metrics.totalContributions} />
            <MetricItem label="Contributions (30d)" value={metrics.contributionsLast30Days} />
            <MetricItem label="PRs Opened" value={metrics.pullRequestsOpened} />
            <MetricItem label="PRs Merged" value={metrics.pullRequestsMerged} />
          </div>
        </div>

        <div>
          <p className="text-small text-default-500 uppercase font-semibold mb-4 border-b border-default-100 pb-2">Impact</p>
          <div className="flex flex-col gap-4">
            <MetricItem label="Kudos Issues Solved" value={metrics.kudosIssuesSolved} />
            <MetricItem label="Current Streak" value={`${metrics.currentStreakDays} days`} />
          </div>
        </div>

        <div>
          <p className="text-small text-default-500 uppercase font-semibold mb-4 border-b border-default-100 pb-2">Rewards</p>
          <div className="flex flex-col gap-4">
            <MetricItem label="Total Earned" value={`$${metrics.rewardsEarned}`} />
            <MetricItem label="Earned (30d)" value={`$${metrics.rewardsLast30Days}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

const MetricItem = ({ label, value }: { label: string; value: number | string }) => (
  <div className="flex flex-col">
    <span className="text-2xl font-bold text-white leading-none mb-0.5">
      {value}
    </span>
    <span className="text-default-500 text-tiny">{label}</span>
  </div>
);
