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
  }
];
