import type { Department } from "@/types/department";

export const mockDepartments: Department[] = [
  {
    id: "department_1",
    departmentName: "Westview Police Department",
    slug: "westview-police-department",
    accountStatus: "active",
    approvalStatus: "active",
    tier: "medium",
    city: "Westview",
    state: "MA",
    zipCode: "02000",
    websiteUrl: "https://example.gov",
    mainPhone: "(617) 555-0101",
    badgeCreditsRemaining: 18,
    badgeCreditsSent: 2,
    createdAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z"
  },
  {
    id: "department_pending_1",
    departmentName: "East Harbor Police Department",
    slug: "east-harbor-police-department",
    accountStatus: "pending_approval",
    approvalStatus: "pending_approval",
    tier: "small",
    city: "East Harbor",
    state: "MA",
    zipCode: "01940",
    websiteUrl: "https://eastharborpd.gov",
    mainPhone: "(617) 555-0144",
    primaryAdminUserId: "user_department_admin_pending",
    badgeCreditsRemaining: 0,
    badgeCreditsSent: 0,
    createdAt: "2026-05-15T09:00:00.000Z",
    updatedAt: "2026-05-15T09:00:00.000Z"
  }
];
