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

export const mockRoleCookieName = "gb.mockRole";

export function getMockSession(defaultRole?: UserRole, allowedRoles?: UserRole[]): MockSession {
  const currentRole = getCurrentMockRole(allowedRoles);
  const resolvedRole = currentRole ?? defaultRole;
  const user = resolvedRole ? mockUsers.find((item) => item.role === resolvedRole) : mockSession.user;

  return {
    user: user ?? mockSession.user,
    isAuthenticated: true
  };
}

export function getCurrentMockRole(allowedRoles?: UserRole[]) {
  if (typeof document === "undefined") {
    return null;
  }

  const roleValue = getCookieValue(mockRoleCookieName);
  if (!roleValue) {
    return null;
  }

  const matchingUser = mockUsers.find((item) => item.role === roleValue);
  if (!matchingUser) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(matchingUser.role)) {
    return null;
  }

  return matchingUser.role;
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

function getCookieValue(name: string) {
  const match = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}
