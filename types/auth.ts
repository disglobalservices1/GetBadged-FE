export type UserRole = "candidate" | "department_admin" | "department_user" | "gb_admin";

export type AccountStatus = "free" | "pending_approval" | "active" | "inactive" | "expired" | "archived" | "blocked";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  firstName: string;
  lastName: string;
  phone?: string;
  phoneVerifiedAt?: string;
  avatarUrl?: string;
  departmentId?: string;
  candidateProfileId?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
};
