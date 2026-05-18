"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, FilePlus2, Save, Send, XCircle } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { Table } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getMockDepartmentJobPostBuilder, getMockDepartmentJobPosts } from "@/features/department/jobs/get-mock-department-job-post-builder";
import type { ApprovalStatus } from "@/types/department";
import type { JobPost } from "@/types/job";
import type { TemplateField } from "@/types/template";

type JobListModel = ReturnType<typeof getMockDepartmentJobPosts>;
type JobBuilderModel = ReturnType<typeof getMockDepartmentJobPostBuilder>;

function getStatusTone(status: ApprovalStatus) {
  if (status === "active" || status === "approved") return "success";
  if (status === "pending_approval") return "warning";
  if (status === "revisions_needed" || status === "closed" || status === "inactive") return "danger";
  return "muted";
}

function getStatusLabel(status: ApprovalStatus) {
  const labels: Record<ApprovalStatus, string> = {
    active: "Active",
    approved: "Approved",
    closed: "Closed",
    draft: "Draft",
    inactive: "Inactive",
    pending_approval: "Pending approval",
    revisions_needed: "Revisions needed"
  };

  return labels[status];
}

function formatValue(job: JobPost, field: TemplateField) {
  const value = job[field.fieldKey as keyof JobPost];

  if (Array.isArray(value)) return value.join("\n");
  if (value === undefined || value === null) return "";
  return String(value);
}

export function DepartmentJobPostsList() {
  const model: JobListModel = getMockDepartmentJobPosts();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          eyebrow={`${model.department.tier} department | ${model.department.city}, ${model.department.state}`}
          title="Job Posts"
          description="Create, draft, submit, and monitor department job postings before they become public."
        />
        <Button href="/department/jobs/new" iconLeft={<FilePlus2 className="h-4 w-4" />}>
          New job post
        </Button>
      </div>

      <Table className="min-w-[980px] table-fixed">
        <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
          <tr>
            <th className="w-[320px] px-4 py-3">Job</th>
            <th className="w-[180px] px-4 py-3">Status</th>
            <th className="w-[140px] px-4 py-3">Openings</th>
            <th className="w-[150px] px-4 py-3">Deadline</th>
            <th className="w-[140px] px-4 py-3">Updated</th>
            <th className="w-[80px] px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {model.jobs.map((job) => (
            <tr key={job.id} className="border-t border-[color:var(--border-muted)]">
              <td className="px-4 py-4 align-top">
                <p className="font-bold text-[color:var(--navy)]">{job.title}</p>
                <p className="mt-1 text-xs text-[color:var(--muted)]">{job.positionCategory}</p>
              </td>
              <td className="px-4 py-4 align-top">
                <StatusChip label={job.statusLabel} tone={getStatusTone(job.status)} />
              </td>
              <td className="whitespace-nowrap px-4 py-4 align-top text-slate-700">{job.numberOfOpenings}</td>
              <td className="whitespace-nowrap px-4 py-4 align-top text-slate-700">{job.deadlineLabel}</td>
              <td className="whitespace-nowrap px-4 py-4 align-top text-slate-700">{job.updatedAtLabel}</td>
              <td className="px-4 py-4 text-right align-top">
                <Button
                  href={`/department/jobs/${job.id}/edit`}
                  variant="ghost"
                  className="min-h-10 w-10 px-0"
                  aria-label={`Edit ${job.title}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function FieldEditor({ job, field }: { job: JobPost; field: TemplateField }) {
  const label = `${field.label}${field.isRequired ? " *" : ""}`;
  const value = formatValue(job, field);

  if (field.fieldType === "text_long" || field.fieldType === "repeatable_list") {
    return <Textarea label={label} name={field.fieldKey} defaultValue={value} rows={5} />;
  }

  if (field.fieldType === "dropdown" && field.options) {
    return <Select label={label} name={field.fieldKey} defaultValue={value} options={field.options.map((option) => ({ label: option.replace(/_/g, " "), value: option }))} />;
  }

  if (field.fieldType === "date") {
    return (
      <Input
        label={label}
        name={field.fieldKey}
        defaultValue={value}
        type="date"
        onChange={(event) => {
          const input = event.currentTarget;
          window.setTimeout(() => input.blur(), 0);
        }}
      />
    );
  }

  return <Input label={label} name={field.fieldKey} defaultValue={value} type="text" />;
}

export function DepartmentJobPostEditor({ jobId }: { jobId?: string }) {
  const router = useRouter();
  const model: JobBuilderModel = getMockDepartmentJobPostBuilder(jobId);
  const [jobStatus, setJobStatus] = useState<ApprovalStatus>(model.job.status);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [lifecycleMessage, setLifecycleMessage] = useState<string | null>(null);
  const isExistingJob = model.job.id !== "job_new";

  function returnToJobs() {
    window.setTimeout(() => {
      router.push("/department/jobs");
    }, 700);
  }

  function handleSaveDraft() {
    setJobStatus("draft");
    setActionMessage("Job post draft saved locally.");
    setLifecycleMessage(null);
    returnToJobs();
  }

  function handleSubmitForApproval() {
    setJobStatus("pending_approval");
    setActionMessage("Job post submitted for GetBadged approval.");
    setLifecycleMessage(null);
    returnToJobs();
  }

  function handleCloseRequest() {
    setJobStatus("closed");
    setActionMessage(null);
    setLifecycleMessage("Close request recorded locally. This job will be treated as closed in the mock workflow.");
  }

  function handleDeactivateRequest() {
    setJobStatus("inactive");
    setActionMessage(null);
    setLifecycleMessage("Deactivate request recorded locally. This job will be treated as inactive in the mock workflow.");
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          eyebrow="Job post builder"
          title={isExistingJob ? "Edit Job Post" : "New Job Post"}
          description="Build a template-driven job post, save a draft, or submit it for GetBadged approval."
        />
        <div className="flex flex-wrap gap-3">
          <Button href="/department/jobs" variant="secondary">
            Back to jobs
          </Button>
          <Button type="button" variant="secondary" iconLeft={<Save className="h-4 w-4" />} onClick={handleSaveDraft}>
            Save draft
          </Button>
          <Button type="button" iconRight={<Send className="h-4 w-4" />} onClick={handleSubmitForApproval}>
            Submit for approval
          </Button>
        </div>
      </div>

      {actionMessage ? (
        <div className="rounded-md border border-[color:var(--border-muted)] bg-slate-50 p-4 text-sm font-semibold text-[color:var(--navy)]">
          {actionMessage}
        </div>
      ) : null}

      <Card>
        <CardHeader className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Current job state</CardTitle>
            <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
              Public visibility begins only after GetBadged approval.
            </p>
          </div>
          <div className="w-fit justify-self-start self-start">
            <StatusChip label={getStatusLabel(jobStatus)} tone={getStatusTone(jobStatus)} />
          </div>
        </CardHeader>
        {model.job.approvalNotes ? (
          <CardContent>
            <div className="rounded-md border border-yellow-100 bg-yellow-50 p-4 text-sm font-semibold text-amber-800">{model.job.approvalNotes}</div>
          </CardContent>
        ) : null}
      </Card>

      <form className="grid gap-4">
        {model.templateSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {section.fields.map((field) => (
                <div
                  key={field.id}
                  className={
                    section.fields.length === 1 && (field.fieldType === "text_long" || field.fieldType === "repeatable_list")
                      ? "sm:col-span-2"
                      : undefined
                  }
                >
                  <FieldEditor job={model.job} field={field} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </form>

      {isExistingJob ? (
        <Card>
          <CardHeader>
            <CardTitle>Close or deactivate</CardTitle>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              Use these request states when a job should no longer move through the public hiring flow.
            </p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" iconLeft={<XCircle className="h-4 w-4" />} onClick={handleCloseRequest}>
                Request close
              </Button>
              <Button type="button" variant="secondary" iconLeft={<XCircle className="h-4 w-4" />} onClick={handleDeactivateRequest}>
                Request deactivate
              </Button>
            </div>
            {lifecycleMessage ? (
              <div className="rounded-md border border-[color:var(--border-muted)] bg-slate-50 p-4 text-sm font-semibold text-[color:var(--navy)]">
                {lifecycleMessage}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
