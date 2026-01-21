import { User } from "./user";

export type TeamMemberRole = "member" | "lead";

export type TeamMembershipDto = {
  id: number;
  team_id: number;
  user_id: number;
  role: TeamMemberRole;
  joined_at: string;
};

export type TeamMembership = {
  id: number;
  teamId: number;
  userId: number;
  role: TeamMemberRole;
  joinedAt: string;
  user?: User;
};

export type TeamDto = {
  id: number;
  name: string;
  description: string | null;
  created_by_user_id: number;
  created_at: string;
  updated_at: string | null;
  members?: TeamMembershipDto[];
};

export type Team = {
  id: number;
  name: string;
  description: string | null;
  createdByUserId: number;
  createdAt: string;
  updatedAt: string | null;
  members?: TeamMembership[];
};

export type CreateTeamPayload = {
  name: string;
  description?: string;
};

export type AddTeamMemberPayload = {
  user_id: number;
  role: TeamMemberRole;
};

export type UpdateTeamMemberPayload = {
  role: TeamMemberRole;
};
