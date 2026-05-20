import { mockApplications } from "@/lib/mock/applications";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import { mockMessages, mockMessageThreads } from "@/lib/mock/messages";
import { mockUsers } from "@/lib/mock/users";
import type { Message, MessageThread } from "@/types/message";

const CURRENT_DEPARTMENT_ID = "department_1";

export type DepartmentMessageThread = MessageThread & {
  candidateName: string;
  candidateEmail: string;
  applicationLabel: string;
  lastMessageLabel: string;
  messages: Message[];
};

export type DepartmentMessageTemplate = {
  id: string;
  label: string;
  body: string;
  lastUsedLabel: string;
};

export const departmentMessageTemplates: DepartmentMessageTemplate[] = [
  {
    id: "application_follow_up",
    label: "Application follow-up",
    body: "Thank you for your application. Our department review team is reviewing your materials and will follow up with next steps.",
    lastUsedLabel: "Last used May 15, 2026"
  },
  {
    id: "request_more_info",
    label: "Request more information",
    body: "We need a little more information before we can continue reviewing your application package.",
    lastUsedLabel: "Last used May 14, 2026"
  },
  {
    id: "schedule_intro",
    label: "Schedule intro call",
    body: "We would like to schedule an introductory call with you to discuss the role and next steps.",
    lastUsedLabel: "Last used May 12, 2026"
  }
];

export function getMockDepartmentMessages() {
  const threads = getDepartmentThreads();

  return {
    threads,
    stats: {
      totalThreads: threads.length,
      unreadThreads: threads.filter((thread) => thread.unreadCountForCurrentUser > 0).length,
      unreadMessages: threads.reduce((total, thread) => total + thread.unreadCountForCurrentUser, 0)
    },
    recipients: [
      { value: "all", label: "All recipients" },
      ...threads.map((thread) => ({ value: thread.candidateProfileId, label: thread.candidateName }))
    ],
    templates: departmentMessageTemplates
  };
}

export function getMockDepartmentMessageThread(threadId: string) {
  const thread = getDepartmentThreads().find((item) => item.id === threadId) ?? null;
  if (!thread) return null;

  return {
    thread,
    templates: departmentMessageTemplates
  };
}

function getDepartmentThreads(): DepartmentMessageThread[] {
  return mockMessageThreads
    .filter((thread) => thread.departmentId === CURRENT_DEPARTMENT_ID)
    .map((thread) => {
      const candidate = mockCandidateProfiles.find((profile) => profile.id === thread.candidateProfileId);
      const application = mockApplications.find((item) => item.id === thread.applicationId);
      const messages = mockMessages.filter((message) => message.threadId === thread.id).sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());

      return {
        ...thread,
        candidateName: candidate ? `${candidate.firstName} ${candidate.lastName}` : "Unknown Candidate",
        candidateEmail: candidate?.email ?? "Not available",
        applicationLabel: application?.jobTitle ?? "General message",
        lastMessageLabel: formatDate(thread.lastMessageAt),
        messages
      };
    });
}

export function getSenderLabel(message: Message) {
  const user = mockUsers.find((item) => item.id === message.senderUserId);
  if (user) return `${user.firstName} ${user.lastName}`;
  if (message.senderRole === "candidate") return "Candidate";
  return "Department";
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
