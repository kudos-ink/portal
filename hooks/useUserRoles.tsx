"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUserRoles } from "@/lib/api/roles";
import {
  UserProjectRole,
  ROLE_ADMIN,
  ROLE_CONTRIBUTOR,
  ROLE_MAINTAINER,
  ROLE_ECOSYSTEM_ARCHITECT,
  canManageProject,
  canCreateNonDevTasks,
  canAssignTasks,
  hasElevatedPermissions,
} from "@/types/role";

export function useUserRoles() {
  const { data: session, status } = useSession();

  const {
    data: roles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userRoles", session?.accessToken],
    queryFn: () => fetchCurrentUserRoles(session?.accessToken as string),
    enabled: !!session?.accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isAuthenticated = status === "authenticated";
  const isLoadingAuth = status === "loading";

  // Role checks
  const isAdmin = roles.some((r) => r.roleId === ROLE_ADMIN);
  const isEcosystemArchitect = roles.some((r) => r.roleId === ROLE_ECOSYSTEM_ARCHITECT);
  const isMaintainer = roles.some((r) => r.roleId === ROLE_MAINTAINER);
  const isContributor = roles.some((r) => r.roleId === ROLE_CONTRIBUTOR);

  // Global elevated permissions (Admin or Ecosystem Architect)
  const hasGlobalElevatedPermissions = roles.some((r) =>
    hasElevatedPermissions(r.roleId)
  );

  // Check if user can manage a specific project
  const canManageProjectById = (projectId: number | null) =>
    canManageProject(roles, projectId);

  // Check if user can create non-dev tasks
  const canCreateNonDev = canCreateNonDevTasks(roles);

  // Check if user can assign tasks for a specific project
  const canAssignTasksForProject = (projectId: number | null) =>
    canAssignTasks(roles, projectId);

  // Get projects the user is a maintainer of
  const maintainedProjectIds = roles
    .filter((r) => r.roleId === ROLE_MAINTAINER && r.projectId !== null)
    .map((r) => r.projectId as number);

  return {
    roles,
    isLoading: isLoading || isLoadingAuth,
    error,
    isAuthenticated,

    // Role flags
    isAdmin,
    isEcosystemArchitect,
    isMaintainer,
    isContributor,
    hasGlobalElevatedPermissions,

    // Permission checks
    canManageProjectById,
    canCreateNonDev,
    canAssignTasksForProject,

    // Maintained projects
    maintainedProjectIds,
  };
}

export default useUserRoles;
