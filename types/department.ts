import type { AccountStatus } from "./auth";

export type ApprovalStatus = "draft" | "pending_approval" | "approved" | "active" | "revisions_needed" | "inactive" | "closed";

export type Department = {
  id: string;
  departmentName: string;
  slug: string;
  accountStatus: AccountStatus;
  approvalStatus: ApprovalStatus;
  tier: "small" | "medium" | "large" | "xl" | "custom";
  city: string;
  state: "MA";
  zipCode?: string;
  websiteUrl?: string;
  mainPhone?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  primaryAdminUserId?: string;
  badgeCreditsRemaining: number;
  badgeCreditsSent: number;
  createdAt: string;
  updatedAt: string;
};

export type PublicDepartmentSummary = Pick<
  Department,
  "id" | "departmentName" | "slug" | "city" | "state" | "logoUrl" | "coverImageUrl"
> & {
  profileIntro: string;
  activeJobCount: number;
  departmentType: string;
  hiringTimeline: string;
  openPositions: string;
};

export type DepartmentProfileHighlight = {
  label: string;
  value: string;
};

export type DepartmentProfileSection = {
  id: string;
  title: string;
  summary: string;
  highlights: DepartmentProfileHighlight[];
};

export type PublicDepartmentProfile = Department & {
  profileIntro: string;
  activeJobCount: number;
  departmentType: string;
  hiringTimeline: string;
  openPositions: string;
  chiefName: string;
  chiefSwornIn: string;
  population: string;
  departmentSize: string;
  patrolOfficers: string;
  callVolume: string;
  communityType: string;
  badgeImageUrl: string;
  whyJoin: string[];
  media: string[];
  sections: DepartmentProfileSection[];
};
