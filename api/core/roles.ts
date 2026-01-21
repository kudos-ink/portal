import { fetchFromApi, fetchFromApiGitHubAuth } from "./_client";
import { dtoToRole, dtoToUserProjectRole } from "./_transformers";
import { Role, RoleDto, UserProjectRole, UserProjectRoleDto } from "@/types/role";

const ROLES_PATH = "/roles";
const USER_ROLES_PATH = "/users/me/roles";

export async function getRoles(): Promise<Role[]> {
  const roles = await fetchFromApi<RoleDto[]>(ROLES_PATH, {});
  return roles.map(dtoToRole);
}

export async function getCurrentUserRoles(token: string): Promise<UserProjectRole[]> {
  const roles = await fetchFromApiGitHubAuth<UserProjectRoleDto[]>(
    USER_ROLES_PATH,
    {},
    token
  );
  return roles.map(dtoToUserProjectRole);
}

export default {
  getRoles,
  getCurrentUserRoles,
};
