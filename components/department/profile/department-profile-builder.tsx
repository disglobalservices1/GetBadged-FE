"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, Clock, Pencil, Save, Send } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { DepartmentProfileMediaManager } from "@/components/department/profile/department-profile-media-manager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { Textarea } from "@/components/ui/textarea";
import { getMockDepartmentProfileBuilder } from "@/features/department/profile/get-mock-department-profile-builder";
import type { DepartmentProfileFieldValue } from "@/types/department";
import type { TemplateField } from "@/types/template";

type ProfileBuilder = ReturnType<typeof getMockDepartmentProfileBuilder>;
type ProfileStatus = ProfileBuilder["profile"]["status"];

function getStatusTone(status: ProfileStatus) {
  if (status === "active" || status === "approved") return "success";
  if (status === "revisions_needed") return "danger";
  if (status === "pending_approval") return "warning";
  return "muted";
}

function getStatusLabel(status: ProfileStatus) {
  const labels: Record<ProfileStatus, string> = {
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

function formatFieldValue(field: DepartmentProfileFieldValue) {
  if (Array.isArray(field.value)) return field.value.join(", ");
  if (typeof field.value === "boolean") return field.value ? "Yes" : "No";
  if (field.value === null || field.value === undefined || field.value === "") return "Not provided";
  return String(field.value);
}

function ProfileStatusPanel({ builder, statusOverride }: { builder: ProfileBuilder; statusOverride?: ProfileStatus }) {
  const { profile, submittedAtLabel, updatedAtLabel } = builder;
  const currentStatus = statusOverride ?? profile.status;
  const statusLabel = getStatusLabel(currentStatus);

  return (
    <Card className="border-[color:var(--border-muted)]">
      <CardHeader className="flex items-start justify-between gap-4">
        <div className="grid gap-2">
          <CardTitle>Profile approval status</CardTitle>
          <p className="text-sm leading-6 text-[color:var(--muted)]">
            Draft changes can be saved locally, then submitted to GetBadged for review before the profile is public.
          </p>
        </div>
        <div className="w-fit justify-self-start self-start">
          <StatusChip label={statusLabel} tone={getStatusTone(profile.status)} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {profile.adminNotes && currentStatus === "revisions_needed" ? (
          <div className="flex gap-3 rounded-md border border-red-100 bg-red-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--danger)]" />
            <div>
              <p className="text-sm font-bold text-[color:var(--navy)]">GetBadged admin notes</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{profile.adminNotes}</p>
            </div>
          </div>
        ) : null}
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="h-4 w-4 text-[color:var(--blue)]" />
            Updated {updatedAtLabel}
          </div>
          {submittedAtLabel ? (
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-[color:var(--success)]" />
              Submitted {submittedAtLabel}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileSectionPreview({ section }: { section: ProfileBuilder["profile"]["sections"][number] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {section.fields.map((field) => (
          <div key={field.fieldKey} className="grid gap-1 rounded-md border border-[color:var(--border-muted)] p-4">
            <p className="text-xs font-bold uppercase text-slate-500">
              {field.label}
              {field.isRequired ? " *" : ""}
            </p>
            <p className="text-sm leading-6 text-[color:var(--navy)]">{formatFieldValue(field)}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function MediaPanel({ builder, mode = "view" }: { builder: ProfileBuilder; mode?: "view" | "edit" }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-4 p-5">
        <div>
          <CardTitle>Media</CardTitle>
          <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Logo and cover image shells for the public profile.</p>
        </div>
        <DepartmentProfileMediaManager assets={builder.profile.media} mode={mode} />
      </div>
    </Card>
  );
}

export function DepartmentProfileOverview() {
  const builder = getMockDepartmentProfileBuilder();
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>(builder.profile.status);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  function handleSubmitForApproval() {
    setProfileStatus("pending_approval");
    setActionMessage("Profile submitted for approval. It is now queued for GetBadged review.");
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          eyebrow="Department profile"
          title={builder.department.departmentName}
          description="Manage the public department profile candidates will review before applying or accepting badge invitations."
        />
        <div className="flex flex-wrap gap-3">
          <Button href="/department/profile/edit" variant="secondary" iconLeft={<Pencil className="h-4 w-4" />}>
            Edit profile
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

      <ProfileStatusPanel builder={builder} statusOverride={profileStatus} />
      <MediaPanel builder={builder} />

      <div className="grid gap-4">
        {builder.profile.sections.map((section) => (
          <ProfileSectionPreview key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

function findTemplateField(builder: ProfileBuilder, fieldKey: string): TemplateField | undefined {
  return builder.templateFields.find((field) => field.fieldKey === fieldKey);
}

function FieldEditor({ builder, field }: { builder: ProfileBuilder; field: DepartmentProfileFieldValue }) {
  const templateField = findTemplateField(builder, field.fieldKey);
  const label = `${field.label}${field.isRequired ? " *" : ""}`;
  const value = formatFieldValue(field);

  if (field.fieldType === "text_long" || field.fieldType === "rich_text" || field.fieldType === "repeatable_list") {
    return (
      <Textarea
        label={label}
        name={field.fieldKey}
        defaultValue={Array.isArray(field.value) ? field.value.join("\n") : value}
        rows={field.fieldType === "repeatable_list" ? 5 : 4}
      />
    );
  }

  if (field.fieldType === "dropdown" && templateField?.options) {
    return (
      <Select
        label={label}
        name={field.fieldKey}
        defaultValue={value}
        options={templateField.options.map((option) => ({ label: option, value: option }))}
      />
    );
  }

  if (field.fieldType === "multi_select" && templateField?.options) {
    return (
      <fieldset className="grid gap-2">
        <legend className="text-sm font-semibold text-slate-700">{label}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {templateField.options.map((option) => (
            <label key={option} className="flex items-center gap-2 rounded-md border border-[color:var(--border-muted)] p-3 text-sm font-semibold text-slate-700">
              <input type="checkbox" name={field.fieldKey} defaultChecked={Array.isArray(field.value) && field.value.includes(option)} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return <Input label={label} name={field.fieldKey} defaultValue={value} />;
}

export function DepartmentProfileEditor() {
  const builder = getMockDepartmentProfileBuilder();
  const router = useRouter();
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>(builder.profile.status);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  function returnToProfile() {
    window.setTimeout(() => {
      router.push("/department/profile");
    }, 700);
  }

  function handleSaveDraft() {
    setProfileStatus("draft");
    setActionMessage("Draft saved locally. You can keep editing or submit it for GetBadged review.");
    returnToProfile();
  }

  function handleSubmitForApproval() {
    setProfileStatus("pending_approval");
    setActionMessage("Profile submitted for approval. It is now queued for GetBadged review.");
    returnToProfile();
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          eyebrow="Department profile"
          title="Edit Department Profile"
          description="Update draft public profile sections, media, and approval-ready details."
        />
        <div className="flex flex-wrap gap-3">
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

      <ProfileStatusPanel builder={builder} statusOverride={profileStatus} />

      <MediaPanel builder={builder} mode="edit" />

      <form className="grid gap-4">
        {builder.profile.sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {section.fields.map((field) => (
                <FieldEditor key={field.fieldKey} builder={builder} field={field} />
              ))}
            </CardContent>
          </Card>
        ))}
      </form>
    </div>
  );
}
