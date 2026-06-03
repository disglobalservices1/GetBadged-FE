import { mockApplications } from "@/lib/mock/applications";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import { mockDepartmentDashboard } from "@/lib/mock/departmentDashboard";
import { mockDepartments } from "@/lib/mock/departments";
import { mockMessages, mockMessageThreads } from "@/lib/mock/messages";
import { mockUsers } from "@/lib/mock/users";
import type { UserRole } from "@/types/auth";
import type { Message, MessageThread } from "@/types/message";

const CURRENT_DEPARTMENT_ID = "department_1";
type DepartmentMessagingRole = Extract<UserRole, "department_admin" | "department_user">;

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

type DepartmentMessagingWorkspace = {
  departmentName: string;
  accountStatusLabel: string;
  roleLabel: string;
  isDepartmentAdmin: boolean;
  isPendingApproval: boolean;
  isExpired: boolean;
  isMessagingBlocked: boolean;
  canSendMessages: boolean;
  canManageTemplates: boolean;
  workspaceMessage: string;
  threadHistoryMessage: string;
  templatesMessage: string;
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

export function getMockDepartmentMessages(roleOverride: DepartmentMessagingRole = "department_admin") {
  const threads = getDepartmentThreads();
  const workspace = getDepartmentMessagingWorkspace(roleOverride);

  return {
    ...workspace,
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

export function getMockDepartmentMessageThread(threadId: string, roleOverride: DepartmentMessagingRole = "department_admin") {
  const thread = getDepartmentThreads().find((item) => item.id === threadId) ?? null;
  if (!thread) return null;

  return {
    ...getDepartmentMessagingWorkspace(roleOverride),
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

function getDepartmentMessagingWorkspace(roleOverride: DepartmentMessagingRole): DepartmentMessagingWorkspace {
  const department = mockDepartments.find((item) => item.id === mockDepartmentDashboard.departmentId) ?? mockDepartments[0];
  const isDepartmentAdmin = roleOverride === "department_admin";
  const isPendingApproval = department.accountStatus === "pending_approval";
  const isExpired = department.accountStatus === "expired";
  const isMessagingBlocked = isPendingApproval || isExpired;
  const canSendMessages = isDepartmentAdmin && !isMessagingBlocked;
  const canManageTemplates = isDepartmentAdmin && !isMessagingBlocked;

  return {
    departmentName: department.departmentName,
    accountStatusLabel: toStartCase(department.accountStatus),
    roleLabel: isDepartmentAdmin ? "Department Admin" : "Department User",
    isDepartmentAdmin,
    isPendingApproval,
    isExpired,
    isMessagingBlocked,
    canSendMessages,
    canManageTemplates,
    workspaceMessage: isExpired
      ? "Department membership is expired. Renew membership to send messages or manage templates."
      : isPendingApproval
        ? "Messaging unlocks after GetBadged approves the department registration."
        : isDepartmentAdmin
          ? "You can send messages and manage department templates."
          : "Department User access is view-only. Message sending and template management are disabled.",
    threadHistoryMessage: isExpired
      ? "Historical conversation threads remain visible for review, but new department messages are locked until membership is renewed."
      : isPendingApproval
        ? "You can review existing candidate conversations while department approval is pending."
        : "Candidate replies and department responses stay attached to the application thread.",
    templatesMessage: isExpired
      ? "Template library is read-only until membership is renewed."
      : isPendingApproval
        ? "Template library is available for preview while messaging waits for approval."
        : isDepartmentAdmin
          ? "Preview, reuse, and maintain department replies."
          : "Preview-only template access. Sending, creating, editing, and deleting templates are disabled."
  };
}

function toStartCase(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
