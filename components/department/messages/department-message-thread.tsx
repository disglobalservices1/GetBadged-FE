"use client";

import { useState } from "react";
import { ArrowLeft, Edit3, Eye, Plus, Send, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { getSenderLabel, type getMockDepartmentMessageThread } from "@/features/department/messages/get-mock-department-messages";

type PermissionMode = "department_admin" | "department_user";
type DepartmentMessageThreadModel = ReturnType<typeof getMockDepartmentMessageThread>;

export function DepartmentMessageThreadView({ model }: { model: DepartmentMessageThreadModel }) {
  const [permissionMode, setPermissionMode] = useState<PermissionMode>("department_admin");
  const [templateId, setTemplateId] = useState(model?.templates[0]?.id ?? "");
  const [reply, setReply] = useState("");
  const [feedback, setFeedback] = useState("");

  if (!model) {
    return <EmptyState title="Message thread not found" description="Return to messages to open an available department conversation." />;
  }

  const { thread, templates } = model;

  function applyTemplate(value: string) {
    setTemplateId(value);
    setReply(templates.find((template) => template.id === value)?.body ?? "");
  }

  function sendReply() {
    if (permissionMode === "department_user") {
      setFeedback("Department User mode is read-only. Replies are blocked.");
      return;
    }

    if (!reply.trim()) {
      setFeedback("Add a reply before sending.");
      return;
    }

    setReply("");
    setFeedback("Mock reply added to the outbound queue.");
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader eyebrow="Message thread" title={thread.subject} description={`${thread.candidateName} | ${thread.applicationLabel}`} />
        <Button href="/department/messages" variant="secondary" iconLeft={<ArrowLeft className="h-4 w-4" />}>
          Back to messages
        </Button>
      </div>

      <Card>
        <CardHeader className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div>
            <CardTitle>Conversation history</CardTitle>
            <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Candidate replies and department responses stay attached to the application thread.</p>
          </div>
          {thread.unreadCountForCurrentUser ? <StatusChip label={`${thread.unreadCountForCurrentUser} unread`} tone="navy" /> : null}
        </CardHeader>
        <CardContent className="grid gap-3">
          {thread.messages.map((message) => {
            const isDepartment = message.senderRole === "department_admin" || message.senderRole === "department_user";
            return (
              <div key={message.id} className={`grid max-w-3xl gap-2 rounded-md p-4 ${isDepartment ? "justify-self-end bg-blue-50" : "justify-self-start bg-slate-50"}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-[color:var(--navy)]">{getSenderLabel(message)}</p>
                  <StatusChip label={message.senderRole.replace(/_/g, " ")} tone={isDepartment ? "navy" : "muted"} />
                </div>
                <p className="text-sm leading-6 text-slate-700">{message.body}</p>
                <p className="text-xs font-semibold text-slate-500">{formatDate(message.sentAt)}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Reply</CardTitle>
            <p className="text-sm leading-6 text-[color:var(--muted)]">Use a saved template or write a custom department response.</p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="Template"
                value={templateId}
                onChange={(event) => applyTemplate(event.target.value)}
                options={templates.map((template) => ({ label: template.label, value: template.id }))}
              />
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
            <textarea
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              disabled={permissionMode === "department_user"}
              rows={5}
              className="rounded-md border border-[color:var(--border)] bg-white p-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[rgba(27,51,181,0.12)] disabled:bg-slate-100 disabled:text-slate-500"
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" iconLeft={<Send className="h-4 w-4" />} onClick={sendReply} disabled={permissionMode === "department_user"}>
                Send reply
              </Button>
              {permissionMode === "department_user" ? <StatusChip label="Send blocked" tone="warning" /> : null}
              {feedback ? <p className="text-sm font-semibold text-[color:var(--muted)]">{feedback}</p> : null}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="grid gap-3">
            <div>
              <CardTitle>Message templates</CardTitle>
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Preview and reuse department replies.</p>
            </div>
            <Button type="button" variant="secondary" iconLeft={<Plus className="h-4 w-4" />} className="w-full">
              Create template
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            {templates.map((template) => (
              <div key={template.id} className="rounded-md border border-[color:var(--border-muted)] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-[color:var(--navy)]">{template.label}</p>
                    <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{template.lastUsedLabel}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--blue-deep)] transition hover:bg-[color:var(--surface-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--blue)]"
                      aria-label={`Preview ${template.label}`}
                      onClick={() => setFeedback(`Previewing mock template: ${template.label}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--blue-deep)] transition hover:bg-[color:var(--surface-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--blue)]"
                      aria-label={`Edit ${template.label}`}
                      onClick={() => setFeedback(`Edit action mocked for ${template.label}.`)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--danger)] transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-[color:var(--danger)]"
                      aria-label={`Delete ${template.label}`}
                      onClick={() => setFeedback(`Delete action mocked for ${template.label}.`)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">{template.body}</p>
                <Button type="button" variant="ghost" className="mt-3 w-full justify-center" onClick={() => applyTemplate(template.id)}>
                  Use template
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
