import { ContributorProfile } from "@/types/profile";

const MOCK_PROFILES: Record<string, ContributorProfile> = {
    mockuser: {
        id: 1,
        username: "mockuser",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        bio: "Full Stack Developer passionate about open source and blockchain tech.",
        isOpenToWork: true,
        metrics: {
            totalContributions: 42,
            contributionsLast30Days: 12,
            rewardsEarned: 1500,
            rewardsLast30Days: 350,
            activeEngagements: 2,
            pullRequestsOpened: 28,
            pullRequestsMerged: 25,
            kudosIssuesSolved: 5,
            currentStreakDays: 8,
        },
        skills: ["React", "TypeScript", "Solidity", "Rust", "Next.js"],
        interests: ["DeFi", "DAO tooling", "Public Goods"],
        engagements: [
            {
                id: 101,
                projectId: 1,
                projectName: "Kudos Portal",
                role: "Frontend Developer",
                status: "active",
            },
            {
                id: 102,
                projectId: 2,
                projectName: "DeFi Aggregator",
                role: "Smart Contract Auditor",
                status: "active",
            },
        ],
    },
    // Add a fallback for testing
    default: {
        id: 0,
        username: "unknown",
        avatar: "https://i.pravatar.cc/150?u=default",
        bio: "This is a default profile for testing purposes.",
        isOpenToWork: false,
        metrics: {
            totalContributions: 0,
            contributionsLast30Days: 0,
            rewardsEarned: 0,
            rewardsLast30Days: 0,
            activeEngagements: 0,
            pullRequestsOpened: 0,
            pullRequestsMerged: 0,
            kudosIssuesSolved: 0,
            currentStreakDays: 0,
        },
        skills: [],
        interests: [],
        engagements: [],
    },
};

export async function getProfileByUsername(username: string): Promise<ContributorProfile | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const profile = MOCK_PROFILES[username] || MOCK_PROFILES["mockuser"];
    // For demo purposes, fallback to mockuser if not found, or returns null if we want to be strict
    // return MOCK_PROFILES[username] || null;

    // Return a copy to avoid mutation issues in mock data
    return { ...profile, username };
}
