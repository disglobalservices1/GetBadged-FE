import { mockUsers } from "@/lib/mock/users";
import type { User, UserRole } from "@/types/auth";

export type MockSession = {
  user: User;
  isAuthenticated: boolean;
};

export const mockSession: MockSession = {
  user: mockUsers[0],
  isAuthenticated: true
};

export function getMockSession(role?: UserRole): MockSession {
  const user = role ? mockUsers.find((item) => item.role === role) : mockSession.user;

  return {
    user: user ?? mockSession.user,
    isAuthenticated: true
  };
}

export function getDashboardHrefForRole(role: UserRole) {
  switch (role) {
    case "candidate":
      return "/candidate";
    case "department_admin":
    case "department_user":
      return "/department";
    case "gb_admin":
      return "/admin";
    default:
      return "/auth/login";
  }
}

export function canAccessRole(userRole: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(userRole);
}
