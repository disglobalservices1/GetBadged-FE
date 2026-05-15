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
