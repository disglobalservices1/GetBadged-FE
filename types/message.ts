import type { UserRole } from "./auth";

export type MessageThread = {
  id: string;
  departmentId: string;
  departmentName: string;
  candidateProfileId: string;
  applicationId?: string;
  subject: string;
  lastMessageAt: string;
  unreadCountForCurrentUser: number;
};

export type Message = {
  id: string;
  threadId: string;
  senderUserId: string;
  senderRole: UserRole;
  body: string;
  sentAt: string;
  readAt?: string;
};
