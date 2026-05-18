import type { ApprovalStatus, DepartmentProfileFieldValue } from "@/types/department";
import { mockDepartments } from "@/lib/mock/departments";
import { mockDepartmentProfiles } from "@/lib/mock/departmentProfiles";
import { mockTemplateFields, mockTemplateSections } from "@/lib/mock/templates";

function formatDateTime(value?: string) {
  if (!value) return undefined;

  const parts = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC"
  })
    .formatToParts(new Date(value))
    .reduce<Record<string, string>>((dateParts, part) => {
      dateParts[part.type] = part.value;
      return dateParts;
    }, {});

  return `${parts.month} ${parts.day}, ${parts.year}, ${parts.hour}:${parts.minute} ${parts.dayPeriod}`;
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

function getFieldValue(fieldKey: string): unknown {
  for (const profile of mockDepartmentProfiles) {
    for (const section of profile.sections) {
      const match = section.fields.find((field) => field.fieldKey === fieldKey);
      if (match) return match.value;
    }
  }

  return "";
}

export function getMockDepartmentProfileBuilder() {
  const department = mockDepartments.find((item) => item.id === "department_1") ?? mockDepartments[0];
  const profile = mockDepartmentProfiles.find((item) => item.departmentId === department.id);

  if (!profile) {
    throw new Error(`Missing department profile for ${department.id}`);
  }

  const templateSections = mockTemplateSections
    .filter((section) => section.templateType === "department_profile" && section.isActive)
    .sort((first, second) => first.order - second.order);

  const sections = templateSections.map((section) => {
    const fields: DepartmentProfileFieldValue[] = mockTemplateFields
      .filter((field) => field.sectionId === section.id && field.isActive)
      .sort((first, second) => first.order - second.order)
      .map((field) => ({
        fieldKey: field.fieldKey,
        label: field.label,
        fieldType: field.fieldType,
        value: getFieldValue(field.fieldKey),
        isRequired: field.isRequired
      }));

    return {
      id: section.id,
      sectionKey: section.sectionKey,
      title: section.title,
      order: section.order,
      fields
    };
  });

  return {
    department,
    profile: {
      ...profile,
      sections
    },
    statusLabel: getStatusLabel(profile.status),
    submittedAtLabel: formatDateTime(profile.submittedAt),
    updatedAtLabel: formatDateTime(profile.updatedAt),
    templateFields: mockTemplateFields
  };
}
