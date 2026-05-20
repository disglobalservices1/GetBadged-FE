import type { User } from "@/types/auth";

export const mockUsers: User[] = [
  {
    id: "user_candidate_1",
    email: "jordan@example.com",
    role: "candidate",
    accountStatus: "free",
    firstName: "Jordan",
    lastName: "Smith",
    candidateProfileId: "candidate_1",
    createdAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z"
  },
  {
    id: "user_department_admin_1",
    email: "admin@westviewpd.gov",
    role: "department_admin",
    accountStatus: "active",
    firstName: "Avery",
    lastName: "Cole",
    departmentId: "department_1",
    createdAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z"
  },
  {
    id: "user_department_user_1",
    email: "reviewer@westviewpd.gov",
    role: "department_user",
    accountStatus: "active",
    firstName: "Taylor",
    lastName: "Kim",
    departmentId: "department_1",
    createdAt: "2026-05-15T08:20:00.000Z",
    updatedAt: "2026-05-15T08:20:00.000Z"
  },
  {
    id: "user_candidate_2",
    email: "avery.cole@example.com",
    role: "candidate",
    accountStatus: "active",
    firstName: "Avery",
    lastName: "Cole",
    candidateProfileId: "candidate_2",
    createdAt: "2026-05-10T08:00:00.000Z",
    updatedAt: "2026-05-16T11:20:00.000Z"
  },
  {
    id: "user_candidate_3",
    email: "morgan.reyes@example.com",
    role: "candidate",
    accountStatus: "active",
    firstName: "Morgan",
    lastName: "Reyes",
    candidateProfileId: "candidate_3",
    createdAt: "2026-05-12T08:00:00.000Z",
    updatedAt: "2026-05-17T13:10:00.000Z"
  },
  {
    id: "user_department_admin_pending",
    email: "morgan@eastharborpd.gov",
    role: "department_admin",
    accountStatus: "pending_approval",
    firstName: "Morgan",
    lastName: "Reyes",
    phone: "(617) 555-0140",
    departmentId: "department_pending_1",
    createdAt: "2026-05-15T09:00:00.000Z",
    updatedAt: "2026-05-15T09:00:00.000Z"
  },
  {
    id: "user_gb_admin_1",
    email: "admin@getbadged.com",
    role: "gb_admin",
    accountStatus: "active",
    firstName: "GB",
    lastName: "Admin",
    createdAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z"
  }
];
