import {
  fetchFromApi,
  fetchFromApiGitHubAuth,
  fetchFromApiGitHubAuthPost,
  fetchFromApiGitHubAuthPut,
  fetchFromApiGitHubAuthDelete,
} from "./_client";
import { dtoToTeam } from "./_transformers";
import {
  Team,
  TeamDto,
  CreateTeamPayload,
  AddTeamMemberPayload,
  UpdateTeamMemberPayload,
} from "@/types/team";

const TEAMS_PATH = "/teams";

export async function getTeams(token?: string): Promise<Team[]> {
  if (token) {
    const teams = await fetchFromApiGitHubAuth<TeamDto[]>(TEAMS_PATH, {}, token);
    return teams.map(dtoToTeam);
  }
  const teams = await fetchFromApi<TeamDto[]>(TEAMS_PATH, {});
  return teams.map(dtoToTeam);
}

export async function getTeamById(id: number, token?: string): Promise<Team> {
  const path = `${TEAMS_PATH}/${id}`;
  if (token) {
    const team = await fetchFromApiGitHubAuth<TeamDto>(path, {}, token);
    return dtoToTeam(team);
  }
  const team = await fetchFromApi<TeamDto>(path, {});
  return dtoToTeam(team);
}

export async function createTeam(
  payload: CreateTeamPayload,
  token: string
): Promise<Team> {
  const team = await fetchFromApiGitHubAuthPost<TeamDto, CreateTeamPayload>(
    TEAMS_PATH,
    payload,
    token
  );
  return dtoToTeam(team);
}

export async function updateTeam(
  id: number,
  payload: Partial<CreateTeamPayload>,
  token: string
): Promise<Team> {
  const path = `${TEAMS_PATH}/${id}`;
  const team = await fetchFromApiGitHubAuthPut<TeamDto, Partial<CreateTeamPayload>>(
    path,
    payload,
    token
  );
  return dtoToTeam(team);
}

export async function deleteTeam(id: number, token: string): Promise<void> {
  const path = `${TEAMS_PATH}/${id}`;
  await fetchFromApiGitHubAuthDelete<void, {}>(path, {}, token);
}

export async function addTeamMember(
  teamId: number,
  payload: AddTeamMemberPayload,
  token: string
): Promise<void> {
  const path = `${TEAMS_PATH}/${teamId}/members`;
  await fetchFromApiGitHubAuthPost<void, AddTeamMemberPayload>(path, payload, token);
}

export async function updateTeamMember(
  teamId: number,
  memberId: number,
  payload: UpdateTeamMemberPayload,
  token: string
): Promise<void> {
  const path = `${TEAMS_PATH}/${teamId}/members/${memberId}`;
  await fetchFromApiGitHubAuthPut<void, UpdateTeamMemberPayload>(path, payload, token);
}

export async function removeTeamMember(
  teamId: number,
  memberId: number,
  token: string
): Promise<void> {
  const path = `${TEAMS_PATH}/${teamId}/members/${memberId}`;
  await fetchFromApiGitHubAuthDelete<void, {}>(path, {}, token);
}

export default {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  addTeamMember,
  updateTeamMember,
  removeTeamMember,
};
