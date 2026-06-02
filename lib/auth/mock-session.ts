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

export const mockSessionRoleCookieName = "getbadged_mock_role";

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

export function parseUserRole(value?: string | null): UserRole | undefined {
  if (value === "candidate" || value === "department_admin" || value === "department_user" || value === "gb_admin") {
    return value;
  }

  return undefined;
}

export function getMockRoleFromCookieString(cookieString: string): UserRole | undefined {
  const cookieValue = cookieString
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${mockSessionRoleCookieName}=`))
    ?.split("=")[1];

  return parseUserRole(cookieValue);
}
