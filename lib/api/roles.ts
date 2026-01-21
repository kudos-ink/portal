import RolesApi from "@/api/core/roles";
import { Role, UserProjectRole } from "@/types/role";
import { safeFetch } from "@/utils/error";

export async function fetchRoles(): Promise<Role[]> {
  return safeFetch(
    () => RolesApi.getRoles(),
    "fetchRoles",
    [],
    {}
  );
}

export async function fetchCurrentUserRoles(token: string): Promise<UserProjectRole[]> {
  return safeFetch(
    () => RolesApi.getCurrentUserRoles(token),
    "fetchCurrentUserRoles",
    [],
    { token: !!token }
  );
}
