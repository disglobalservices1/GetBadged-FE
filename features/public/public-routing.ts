import { getDashboardHrefForRole } from "@/lib/auth/mock-session";
import type { UserRole } from "@/types/auth";

export type PublicAuthIntent = "candidate" | "department" | "sign_in";

export function resolveRoleAwarePublicHref(intent: PublicAuthIntent, role?: UserRole): string {
  if (!role) {
    switch (intent) {
      case "candidate":
        return "/auth/signup/candidate";
      case "department":
        return "/auth/signup/department";
      case "sign_in":
      default:
        return "/auth/login";
    }
  }

  if (intent === "candidate") {
    return role === "candidate" ? "/candidate" : getDashboardHrefForRole(role);
  }

  if (intent === "department") {
    return role === "department_admin" || role === "department_user" ? "/department" : getDashboardHrefForRole(role);
  }

  return getDashboardHrefForRole(role);
}
