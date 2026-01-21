import TeamsApi from "@/api/core/teams";
import {
  Team,
  CreateTeamPayload,
  AddTeamMemberPayload,
  UpdateTeamMemberPayload,
} from "@/types/team";
import { safeFetch } from "@/utils/error";

export async function fetchTeams(token?: string): Promise<Team[]> {
  return safeFetch(
    () => TeamsApi.getTeams(token),
    "fetchTeams",
    [],
    { token: !!token }
  );
}

export async function fetchTeamById(id: number, token?: string): Promise<Team | null> {
  try {
    return await TeamsApi.getTeamById(id, token);
  } catch (error) {
    console.error(`Failed to fetch team with id ${id}:`, error);
    return null;
  }
}

export async function createTeam(
  payload: CreateTeamPayload,
  token: string
): Promise<Team> {
  return TeamsApi.createTeam(payload, token);
}

export async function updateTeam(
  id: number,
  payload: Partial<CreateTeamPayload>,
  token: string
): Promise<Team> {
  return TeamsApi.updateTeam(id, payload, token);
}

export async function deleteTeam(id: number, token: string): Promise<void> {
  return TeamsApi.deleteTeam(id, token);
}

export async function addTeamMember(
  teamId: number,
  payload: AddTeamMemberPayload,
  token: string
): Promise<void> {
  return TeamsApi.addTeamMember(teamId, payload, token);
}

export async function updateTeamMember(
  teamId: number,
  memberId: number,
  payload: UpdateTeamMemberPayload,
  token: string
): Promise<void> {
  return TeamsApi.updateTeamMember(teamId, memberId, payload, token);
}

export async function removeTeamMember(
  teamId: number,
  memberId: number,
  token: string
): Promise<void> {
  return TeamsApi.removeTeamMember(teamId, memberId, token);
}
