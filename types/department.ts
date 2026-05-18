import type { AccountStatus } from "./auth";
import type { TemplateFieldType } from "./template";

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

export type MediaAsset = {
  id: string;
  ownerType: "department" | "candidate" | "job_post";
  ownerId: string;
  fileName: string;
  fileType: "image" | "document";
  url: string;
  altText?: string;
  uploadedAt: string;
};

export type DepartmentProfileFieldValue = {
  fieldKey: string;
  label: string;
  fieldType: TemplateFieldType;
  value: unknown;
  isRequired: boolean;
};

export type DepartmentProfileSection = {
  id: string;
  sectionKey: string;
  title: string;
  order: number;
  fields: DepartmentProfileFieldValue[];
};

export type DepartmentProfile = {
  id: string;
  departmentId: string;
  status: ApprovalStatus;
  submittedAt?: string;
  submittedByUserId?: string;
  approvedAt?: string;
  approvedByUserId?: string;
  publishedAt?: string;
  adminNotes?: string;
  sections: DepartmentProfileSection[];
  media: MediaAsset[];
  updatedAt: string;
};
