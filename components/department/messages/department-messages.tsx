"use client";

import { useMemo, useState } from "react";
import { MessageSquare, Send, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import type { getMockDepartmentMessages } from "@/features/department/messages/get-mock-department-messages";

type DepartmentMessagesModel = ReturnType<typeof getMockDepartmentMessages>;
type PermissionMode = "department_admin" | "department_user";

export function DepartmentMessages({ model }: { model: DepartmentMessagesModel }) {
  const [recipientFilter, setRecipientFilter] = useState("all");
  const [templateId, setTemplateId] = useState(model.templates[0]?.id ?? "");
  const [composeBody, setComposeBody] = useState("");
  const [permissionMode, setPermissionMode] = useState<PermissionMode>("department_admin");
  const [feedback, setFeedback] = useState("");

  const filteredThreads = useMemo(() => {
    return model.threads.filter((thread) => recipientFilter === "all" || thread.candidateProfileId === recipientFilter);
  }, [model.threads, recipientFilter]);

  function applyTemplate(value: string) {
    setTemplateId(value);
    setComposeBody(model.templates.find((template) => template.id === value)?.body ?? "");
  }

  function sendMessage() {
    if (permissionMode === "department_user") {
      setFeedback("Department User mode is read-only. Switch to Department Admin to send a mock message.");
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
      <PageHeader eyebrow="Messages" title="Messages" description="View department conversations with candidates and send templated follow-ups." />

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
          <div className="grid gap-4 md:grid-cols-3">
            <Select label="Recipient" value={recipientFilter} onChange={(event) => setRecipientFilter(event.target.value)} options={model.recipients} />
            <Select label="Template" value={templateId} onChange={(event) => applyTemplate(event.target.value)} options={model.templates.map((template) => ({ label: template.label, value: template.id }))} />
            <Select
              label="Permission mode"
              value={permissionMode}
              onChange={(event) => setPermissionMode(event.target.value as PermissionMode)}
              options={[
                { label: "Department Admin", value: "department_admin" },
                { label: "Department User (read-only)", value: "department_user" }
              ]}
            />
          </div>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Message
            <textarea
              value={composeBody}
              onChange={(event) => setComposeBody(event.target.value)}
              rows={5}
              disabled={permissionMode === "department_user"}
              className="rounded-md border border-[color:var(--border)] bg-white p-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[rgba(27,51,181,0.12)] disabled:bg-slate-100 disabled:text-slate-500"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" iconLeft={<Send className="h-4 w-4" />} onClick={sendMessage} disabled={permissionMode === "department_user"}>
              Send mock message
            </Button>
            {permissionMode === "department_user" ? <StatusChip label="Read-only mode" tone="warning" /> : null}
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
        </CardHeader>
        <CardContent className="grid gap-3">
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
