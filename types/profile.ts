import { User } from "./user";

export type ContributorProfile = User & {
    bio: string;
    twitter?: string | null;
    telegram?: string | null;
    isOpenToWork: boolean;
    metrics: {
        totalContributions: number;
        contributionsLast30Days: number;
        rewardsEarned: number; // In USD
        rewardsLast30Days: number;
        activeEngagements: number;
        pullRequestsOpened: number;
        pullRequestsMerged: number;
        kudosIssuesSolved: number;
        currentStreakDays: number;
    };
    skills: string[];
    interests: string[];
    engagements: {
        id: number;
        projectId: number;
        projectName: string;
        role: string;
        status: "active" | "completed";
    }[];
};
