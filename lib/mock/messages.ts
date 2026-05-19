import type { MessageThread } from "@/types/message";

export const mockMessageThreads: MessageThread[] = [
  {
    id: "message_thread_1",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    candidateProfileId: "candidate_1",
    applicationId: "application_1",
    subject: "Application follow-up",
    lastMessageAt: "2026-05-15T10:10:00.000Z",
    unreadCountForCurrentUser: 2
  },
  {
    id: "message_thread_2",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    candidateProfileId: "candidate_1",
    applicationId: "application_2",
    subject: "Badge acceptance next steps",
    lastMessageAt: "2026-05-14T16:20:00.000Z",
    unreadCountForCurrentUser: 1
  }
];
