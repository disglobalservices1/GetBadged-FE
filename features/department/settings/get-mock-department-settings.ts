import { mockDepartmentDashboard } from "@/lib/mock/departmentDashboard";
import { mockDepartments } from "@/lib/mock/departments";
import { mockUsers } from "@/lib/mock/users";
import type { UserRole } from "@/types/auth";

type RoleTone = "navy" | "muted";

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function toStartCase(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getMockDepartmentSettings(roleOverride: Extract<UserRole, "department_admin" | "department_user"> = "department_admin") {
  const department = mockDepartments.find((item) => item.id === mockDepartmentDashboard.departmentId) ?? mockDepartments[0];
  const departmentUsers = mockUsers
    .filter((user) => user.departmentId === department.id)
    .sort((first, second) => new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime());

  const adminUsers = departmentUsers.filter((user) => user.role === "department_admin");
  const standardUsers = departmentUsers.filter((user) => user.role === "department_user");
  const isExpired = department.accountStatus === "expired";
  const isPendingApproval = department.accountStatus === "pending_approval";
  const isDepartmentAdmin = roleOverride === "department_admin";

  return {
    departmentName: department.departmentName,
    accountStatusLabel: toStartCase(department.accountStatus),
    isExpired,
    isPendingApproval,
    isDepartmentAdmin,
    seatSummary: {
      adminSeatsUsed: adminUsers.length,
      adminSeatsLimit: 1,
      userSeatsUsed: standardUsers.length,
      userSeatsLimit: 2
    },
    users: departmentUsers.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      roleLabel: user.role === "department_admin" ? "Department Admin" : "Department User",
      accountStatusLabel: toStartCase(user.accountStatus),
      joinedAtLabel: formatShortDate(user.createdAt),
      tone: getRoleTone(user.role)
    })),
    permissions: [
      {
        label: "Department Admin",
        detail: "Can manage users, update billing contact details, send messages, and manage templates."
      },
      {
        label: "Department User",
        detail: "Can review dashboard data, applicant records, and message history. Sending messages and template creation are disabled."
      }
    ]
  };
}

function getRoleTone(role: (typeof mockUsers)[number]["role"]): RoleTone {
  return role === "department_admin" ? "navy" : "muted";
}
