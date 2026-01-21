export type RoleId = 1 | 2 | 3 | 4;

export type RoleName = "Admin" | "Contributor" | "Maintainer" | "Ecosystem Architect";

export type RoleDto = {
  id: RoleId;
  name: RoleName;
  created_at: string;
  updated_at: string | null;
};

export type Role = {
  id: RoleId;
  name: RoleName;
  createdAt: string;
  updatedAt: string | null;
};

export type UserProjectRoleDto = {
  id: number;
  user_id: number;
  project_id: number | null;
  role_id: RoleId;
  created_at: string;
};

export type UserProjectRole = {
  id: number;
  userId: number;
  projectId: number | null;
  roleId: RoleId;
  createdAt: string;
};

// Role IDs as constants for easy checking
export const ROLE_ADMIN: RoleId = 1;
export const ROLE_CONTRIBUTOR: RoleId = 2;
export const ROLE_MAINTAINER: RoleId = 3;
export const ROLE_ECOSYSTEM_ARCHITECT: RoleId = 4;

// Helper to check if user has elevated permissions
export function hasElevatedPermissions(roleId: RoleId): boolean {
  return roleId === ROLE_ADMIN || roleId === ROLE_ECOSYSTEM_ARCHITECT;
}

// Helper to check if user can manage a specific project
export function canManageProject(
  userRoles: UserProjectRole[],
  projectId: number | null
): boolean {
  return userRoles.some((role) => {
    // Admins and Ecosystem Architects can manage all projects
    if (hasElevatedPermissions(role.roleId)) {
      return true;
    }
    // Maintainers can only manage their assigned projects
    if (role.roleId === ROLE_MAINTAINER && role.projectId === projectId) {
      return true;
    }
    return false;
  });
}

// Helper to check if user can create non-dev tasks
export function canCreateNonDevTasks(userRoles: UserProjectRole[]): boolean {
  return userRoles.some((role) => {
    return (
      role.roleId === ROLE_ADMIN ||
      role.roleId === ROLE_MAINTAINER ||
      role.roleId === ROLE_ECOSYSTEM_ARCHITECT
    );
  });
}

// Helper to check if user can assign tasks
export function canAssignTasks(
  userRoles: UserProjectRole[],
  projectId: number | null
): boolean {
  return canManageProject(userRoles, projectId);
}
