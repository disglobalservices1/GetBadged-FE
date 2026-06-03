"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Send, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { getMockDepartmentMessages } from "@/features/department/messages/get-mock-department-messages";
import { getCurrentMockRole } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils/cn";

type DepartmentMessagesModel = ReturnType<typeof getMockDepartmentMessages>;

export function DepartmentMessages({ initialModel }: { initialModel: DepartmentMessagesModel }) {
  const [departmentRole, setDepartmentRole] = useState<"department_admin" | "department_user">("department_admin");
  const model = useMemo(() => getMockDepartmentMessages(departmentRole), [departmentRole]);
  const [recipientFilter, setRecipientFilter] = useState("all");
  const [templateId, setTemplateId] = useState(initialModel.templates[0]?.id ?? "");
  const [composeBody, setComposeBody] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const nextRole = getCurrentMockRole(["department_admin", "department_user"]);
    if (nextRole === "department_admin" || nextRole === "department_user") {
      setDepartmentRole(nextRole);
    }
  }, []);

  useEffect(() => {
    setTemplateId((currentTemplateId) => {
      if (model.templates.some((template) => template.id === currentTemplateId)) {
        return currentTemplateId;
      }

      return model.templates[0]?.id ?? "";
    });
  }, [model.templates]);

  const filteredThreads = useMemo(() => {
    return model.threads.filter((thread) => recipientFilter === "all" || thread.candidateProfileId === recipientFilter);
  }, [model.threads, recipientFilter]);

  function applyTemplate(value: string) {
    setTemplateId(value);
    setComposeBody(model.templates.find((template) => template.id === value)?.body ?? "");
  }

  function sendMessage() {
    if (model.isMessagingBlocked) {
      setFeedback(model.workspaceMessage);
      return;
    }

    if (!model.canSendMessages) {
      setFeedback("Department User access is view-only. Sending messages is disabled.");
      return;
    }

    if (!composeBody.trim()) {
      setFeedback("Add a message before sending.");
      return;
    }

    setFeedback("Mock message queued for the selected recipient.");
    setComposeBody("");
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Messages"
        title="Messages"
        description={`View department conversations with candidates and send templated follow-ups. Signed in as ${model.roleLabel}.`}
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<MessageSquare className="h-5 w-5" />} label="Threads" value={model.stats.totalThreads} detail="Candidate conversations" />
        <StatCard icon={<UsersRound className="h-5 w-5" />} label="Unread Threads" value={model.stats.unreadThreads} detail={`${model.stats.unreadMessages} unread messages`} />
        <StatCard icon={<Send className="h-5 w-5" />} label="Templates" value={model.templates.length} detail="Reusable mock replies" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compose message</CardTitle>
          <p className="text-sm leading-6 text-[color:var(--muted)]">Use recipient filters and templates to prepare a department response.</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div
            className={cn(
              "rounded-xl border px-4 py-3",
              model.isExpired && "border-rose-200 bg-rose-50 text-rose-700",
              model.isPendingApproval && "border-amber-200 bg-amber-50 text-amber-800",
              !model.isMessagingBlocked && !model.isDepartmentAdmin && "border-slate-200 bg-slate-50 text-slate-700",
              !model.isMessagingBlocked && model.isDepartmentAdmin && "border-blue-100 bg-blue-50 text-[color:var(--blue)]"
            )}
          >
            <p className="text-sm font-bold">{model.workspaceMessage}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Select label="Recipient" value={recipientFilter} onChange={(event) => setRecipientFilter(event.target.value)} options={model.recipients} />
            <Select label="Template" value={templateId} onChange={(event) => applyTemplate(event.target.value)} options={model.templates.map((template) => ({ label: template.label, value: template.id }))} />
            <div className="grid gap-2 text-sm font-semibold text-slate-700">
              Workspace role
              <div className="flex min-h-11 items-center rounded-md border border-[color:var(--border)] bg-slate-50 px-3">
                <span className="text-sm font-bold text-[color:var(--navy)]">{model.roleLabel}</span>
              </div>
            </div>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Message
            <textarea
              value={composeBody}
              onChange={(event) => setComposeBody(event.target.value)}
              rows={5}
              disabled={!model.canSendMessages}
              className="rounded-md border border-[color:var(--border)] bg-white p-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[rgba(27,51,181,0.12)] disabled:bg-slate-100 disabled:text-slate-500"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" iconLeft={<Send className="h-4 w-4" />} onClick={sendMessage} disabled={!model.canSendMessages}>
              Send mock message
            </Button>
            {!model.canSendMessages ? <StatusChip label={model.isMessagingBlocked ? "Messaging locked" : "Read-only mode"} tone={model.isMessagingBlocked ? "danger" : "warning"} /> : null}
            {feedback ? (
              <p className="text-sm font-semibold text-[color:var(--muted)]" aria-live="polite">
                {feedback}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message history</CardTitle>
          <p className="text-sm leading-6 text-[color:var(--muted)]">{model.threadHistoryMessage}</p>
        </CardHeader>
        <CardContent className="grid gap-3">
          {filteredThreads.length === 0 ? (
            <div className="rounded-md border border-dashed border-[color:var(--border-muted)] px-4 py-5 text-sm font-semibold text-slate-500">
              No department threads match the current recipient filter.
            </div>
          ) : null}
          {filteredThreads.map((thread) => (
            <div key={thread.id} className="grid gap-4 rounded-md border border-[color:var(--border-muted)] p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-[color:var(--navy)]">{thread.subject}</p>
                  {thread.unreadCountForCurrentUser ? <StatusChip label={`${thread.unreadCountForCurrentUser} unread`} tone="navy" /> : null}
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-700">{thread.candidateName}</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{thread.applicationLabel}</p>
                <p className="mt-1 text-xs font-bold uppercase text-slate-500">Last message {thread.lastMessageLabel}</p>
              </div>
              <Button href={`/department/messages/${thread.id}`} variant="secondary" className="w-full sm:w-fit lg:w-auto">
                Open thread
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
