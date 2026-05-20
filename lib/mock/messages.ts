import type { Message, MessageThread } from "@/types/message";

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
    candidateProfileId: "candidate_2",
    applicationId: "application_2",
    subject: "Badge acceptance next steps",
    lastMessageAt: "2026-05-14T16:20:00.000Z",
    unreadCountForCurrentUser: 1
  }
];

export const mockMessages: Message[] = [
  {
    id: "message_1",
    threadId: "message_thread_1",
    senderUserId: "user_candidate_1",
    senderRole: "candidate",
    body: "Hello, I submitted my application and wanted to confirm whether my inactive membership blocks department review.",
    sentAt: "2026-05-15T09:45:00.000Z"
  },
  {
    id: "message_2",
    threadId: "message_thread_1",
    senderUserId: "user_department_admin_1",
    senderRole: "department_admin",
    body: "Thanks Jordan. We can see the application, but membership activation is needed before we can move it forward.",
    sentAt: "2026-05-15T10:00:00.000Z",
    readAt: "2026-05-15T10:04:00.000Z"
  },
  {
    id: "message_3",
    threadId: "message_thread_1",
    senderUserId: "user_candidate_1",
    senderRole: "candidate",
    body: "Understood. I will complete activation today and follow up when it is done.",
    sentAt: "2026-05-15T10:10:00.000Z"
  },
  {
    id: "message_4",
    threadId: "message_thread_2",
    senderUserId: "user_candidate_2",
    senderRole: "candidate",
    body: "I accepted the Badge Request and released my profile package for the lateral officer role.",
    sentAt: "2026-05-14T16:20:00.000Z"
  },
  {
    id: "message_5",
    threadId: "message_thread_2",
    senderUserId: "user_department_admin_1",
    senderRole: "department_admin",
    body: "Thank you Avery. Our review team will check the POST certificate and follow up with next steps.",
    sentAt: "2026-05-14T16:34:00.000Z"
  }
];
