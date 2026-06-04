"use client";

import { useMemo, useRef, useState } from "react";
import { Archive, CheckSquare, ChevronDown, Download, FileText, Filter, History, UsersRound } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils/cn";
import type { DepartmentReportRow, DepartmentReportsViewModel } from "@/features/department/reports/get-mock-department-reports";

type ExportScope = "filtered" | "active_only" | "archived_only" | "all";
type SourceFilter = "all" | "direct_application" | "accepted_badge";
type ArchiveFilter = "all" | "active" | "archived";
type ExportFieldId =
  | "applicationId"
  | "candidate"
  | "candidateLastName"
  | "job"
  | "source"
  | "status"
  | "membership"
  | "submittedAt"
  | "archivedStatus"
  | "contactStatus"
  | "email"
  | "phone"
  | "city"
  | "zipCode"
  | "departmentNotesCount"
  | "departmentNotes"
  | "qualifications"
  | "essayResponse"
  | "changeLogCount"
  | "changeLog"
  | "privateFiles"
  | "profileSummary";

type ExportField = {
  id: ExportFieldId;
  label: string;
  description: string;
  defaultSelected?: boolean;
};

const exportFields: ExportField[] = [
  { id: "applicationId", label: "Application ID", description: "Unique application record ID.", defaultSelected: true },
  { id: "candidate", label: "Candidate", description: "Candidate full name.", defaultSelected: true },
  { id: "candidateLastName", label: "Last Name", description: "Candidate last name for sorting or mail merges." },
  { id: "job", label: "Job / Position", description: "Department position tied to the application.", defaultSelected: true },
  { id: "source", label: "Source", description: "Direct application or accepted Badge.", defaultSelected: true },
  { id: "status", label: "Application Status", description: "Current department review status.", defaultSelected: true },
  { id: "membership", label: "Membership Status", description: "Candidate membership state when exported.", defaultSelected: true },
  { id: "submittedAt", label: "Date Received", description: "Application submit date.", defaultSelected: true },
  { id: "archivedStatus", label: "Archive Status", description: "Whether the application is active or archived.", defaultSelected: true },
  { id: "contactStatus", label: "Contact Visibility", description: "Whether contact info is visible or hidden.", defaultSelected: true },
  { id: "email", label: "Email", description: "Candidate email, hidden when contact access is blocked.", defaultSelected: true },
  { id: "phone", label: "Phone", description: "Candidate phone, hidden when contact access is blocked.", defaultSelected: true },
  { id: "city", label: "City / Town", description: "Candidate city or town." },
  { id: "zipCode", label: "Zip Code", description: "Candidate zip code." },
  { id: "departmentNotesCount", label: "Department Notes Count", description: "Number of department notes tied to the application." },
  { id: "departmentNotes", label: "Department Notes", description: "Concatenated department note entries.", defaultSelected: true },
  { id: "qualifications", label: "Qualifications Summary", description: "Highlighted academy, POST, multilingual, veteran, and experience flags.", defaultSelected: true },
  { id: "essayResponse", label: "Essay / Cover Letter", description: "Exported cover letter or essay response text.", defaultSelected: true },
  { id: "changeLogCount", label: "Change Log Count", description: "Number of change log entries for the application." },
  { id: "changeLog", label: "Application Change Log", description: "Timeline summary of application updates.", defaultSelected: true },
  { id: "privateFiles", label: "Department Private Files", description: "Private file count / summary.", defaultSelected: true },
  { id: "profileSummary", label: "Profile Summary", description: "Compact candidate summary from the Applicant Pool.", defaultSelected: true }
];

export function DepartmentReports({ model }: { model: DepartmentReportsViewModel }) {
  const [jobFilter, setJobFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [archiveFilter, setArchiveFilter] = useState<ArchiveFilter>("all");
  const [exportScope, setExportScope] = useState<ExportScope>("filtered");
  const [selectedFieldIds, setSelectedFieldIds] = useState<ExportFieldId[]>(exportFields.filter((field) => field.defaultSelected).map((field) => field.id));
  const [feedback, setFeedback] = useState("");
  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const fieldPickerRef = useRef<HTMLDivElement | null>(null);

  const filteredRows = useMemo(() => {
    return model.rows.filter((row) => {
      if (jobFilter !== "all" && row.jobPostId !== jobFilter) return false;
      if (sourceFilter !== "all" && row.source !== sourceFilter) return false;
      if (archiveFilter === "active" && row.archivedAt) return false;
      if (archiveFilter === "archived" && !row.archivedAt) return false;
      return true;
    });
  }, [archiveFilter, jobFilter, model.rows, sourceFilter]);

  const rowsForExport = useMemo(() => {
    if (exportScope === "all") return model.rows;
    if (exportScope === "active_only") return filteredRows.filter((row) => !row.archivedAt);
    if (exportScope === "archived_only") return filteredRows.filter((row) => row.archivedAt);
    return filteredRows;
  }, [exportScope, filteredRows, model.rows]);

  const selectedFields = exportFields.filter((field) => selectedFieldIds.includes(field.id));

  function toggleField(fieldId: ExportFieldId) {
    setSelectedFieldIds((current) =>
      current.includes(fieldId) ? current.filter((item) => item !== fieldId) : [...current, fieldId]
    );
  }

  function resetFields() {
    setSelectedFieldIds(exportFields.filter((field) => field.defaultSelected).map((field) => field.id));
  }

  function resetFilters() {
    setJobFilter("all");
    setSourceFilter("all");
    setArchiveFilter("all");
    setExportScope("filtered");
  }

  function downloadExport() {
    if (selectedFields.length === 0) {
      setFeedback("Select at least one field before exporting.");
      return;
    }

    if (rowsForExport.length === 0) {
      setFeedback("No applicant records are available for the current report filters and export scope.");
      return;
    }

    const csv = buildApplicantCsv(rowsForExport, selectedFields);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `department-report-export-${exportScope}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setFeedback(`${rowsForExport.length} applicant record${rowsForExport.length === 1 ? "" : "s"} exported with ${selectedFields.length} field${selectedFields.length === 1 ? "" : "s"}.`);
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Reports"
        title="Reports and exports"
        description={`Build filtered exports for ${model.departmentName}, including department notes, qualifications, essay responses, and application change history.`}
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<UsersRound className="h-5 w-5" />} label="Total Applicants" value={model.stats.totalApplicants} detail="Available for reporting" />
        <StatCard icon={<FileText className="h-5 w-5" />} label="Active Applicants" value={model.stats.activeApplicants} detail="Current review queue" />
        <StatCard icon={<Archive className="h-5 w-5" />} label="Archived" value={model.stats.archivedApplicants} detail="Archived records available for export" />
        <StatCard icon={<History className="h-5 w-5" />} label="Change Log Entries" value={model.stats.changeLogEntries} detail="Application timeline events" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reporting access</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div
            className={cn(
              "rounded-xl border px-4 py-3",
              model.isExpired && "border-rose-200 bg-rose-50 text-rose-700",
              model.isPendingApproval && "border-amber-200 bg-amber-50 text-amber-800",
              !model.isExpired && !model.isPendingApproval && "border-blue-100 bg-blue-50 text-[color:var(--blue)]"
            )}
          >
            <div className="flex flex-wrap items-center gap-3">
              <StatusChip label={model.accountStatusLabel} tone={model.isExpired ? "danger" : model.isPendingApproval ? "warning" : "success"} />
              <StatusChip label={model.departmentName} tone="navy" />
            </div>
            <p className="mt-3 text-sm font-bold">
              {model.isExpired
                ? "Exports stay available for review, but candidate email and phone remain hidden until membership is renewed."
                : model.isPendingApproval
                  ? "Reports are available for preview while department approval is pending. Live recruiting exports remain limited until approval."
                  : "Exports reflect Applicant Pool filters and include contact-hiding rules when candidate or department access is restricted."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <Filter className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Export filters and scope</CardTitle>
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Filter applicant records first, then choose whether to export the filtered rows, only active rows, archived rows, or the full dataset.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 xl:grid-cols-4">
            <Select label="Position" value={jobFilter} onChange={(event) => setJobFilter(event.target.value)} options={model.jobs.map((job) => ({ label: job.label, value: job.id }))} />
            <Select
              label="Source"
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value as SourceFilter)}
              options={[
                { label: "All sources", value: "all" },
                { label: "Direct applications", value: "direct_application" },
                { label: "Accepted Badges", value: "accepted_badge" }
              ]}
            />
            <Select
              label="Archive view"
              value={archiveFilter}
              onChange={(event) => setArchiveFilter(event.target.value as ArchiveFilter)}
              options={[
                { label: "All records", value: "all" },
                { label: "Active only", value: "active" },
                { label: "Archived only", value: "archived" }
              ]}
            />
            <Select
              label="Export scope"
              value={exportScope}
              onChange={(event) => setExportScope(event.target.value as ExportScope)}
              options={[
                { label: "Filtered rows", value: "filtered" },
                { label: "Filtered active rows only", value: "active_only" },
                { label: "Filtered archived rows only", value: "archived_only" },
                { label: "All rows", value: "all" }
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="secondary" onClick={resetFilters}>
              Reset filters
            </Button>
            <p className="text-sm font-semibold text-[color:var(--muted)]">
              {filteredRows.length} matching row{filteredRows.length === 1 ? "" : "s"} | {rowsForExport.length} row{rowsForExport.length === 1 ? "" : "s"} in export scope
            </p>
          </div>

        </CardContent>
      </Card>

      <Card>
        <CardHeader className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div>
            <CardTitle>Export preview</CardTitle>
            <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Preview the rows that match your current filters before downloading the report.</p>
          </div>
          <Button type="button" iconLeft={<Download className="h-4 w-4" />} onClick={downloadExport}>
            Download CSV
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-md border border-[color:var(--border-muted)] bg-slate-50/60 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                <CheckSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-[color:var(--navy)]">Field selection</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Choose exactly which fields should appear in the export before downloading the CSV.</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div ref={fieldPickerRef} className="relative min-w-[280px] md:w-[40%]">
                <button
                  type="button"
                  onClick={() => setIsFieldPickerOpen((current) => !current)}
                  className="flex min-h-11 w-full items-center justify-between rounded-md border border-[color:var(--border)] bg-white px-3 text-left text-sm font-semibold text-slate-950 transition hover:border-[color:var(--blue)] focus:outline-none focus:ring-2 focus:ring-[rgba(27,51,181,0.12)]"
                  aria-expanded={isFieldPickerOpen}
                  aria-haspopup="listbox"
                >
                  <span>Choose export fields</span>
                  <ChevronDown className={cn("h-4 w-4 text-slate-500 transition", isFieldPickerOpen && "rotate-180")} />
                </button>
                {isFieldPickerOpen ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-[420px] overflow-auto rounded-md border border-[color:var(--border-muted)] bg-white p-2 shadow-xl">
                    <div className="grid gap-2">
                      {exportFields.map((field) => (
                        <label key={field.id} className="flex items-start gap-3 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={selectedFieldIds.includes(field.id)}
                            onChange={() => toggleField(field.id)}
                            className="mt-1 h-4 w-4 rounded border-[color:var(--border)] accent-[color:var(--blue-deep)]"
                          />
                          <span>
                            {field.label}
                            <span className="mt-1 block text-xs font-medium leading-5 text-[color:var(--muted)]">{field.description}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <Button type="button" variant="secondary" onClick={resetFields}>
                Reset to default fields
              </Button>
              <p className="text-sm font-semibold text-[color:var(--muted)]">{selectedFields.length} field{selectedFields.length === 1 ? "" : "s"} selected</p>
            </div>
          </div>
          {feedback ? (
            <p className="text-sm font-semibold text-[color:var(--muted)]" aria-live="polite">
              {feedback}
            </p>
          ) : null}
          {rowsForExport.length === 0 ? (
            <EmptyState title="No report rows match the current filters" description="Adjust the report filters or broaden the export scope to include more applicant records." />
          ) : (
              <Table className="min-w-[3200px] table-auto text-sm">
                <colgroup>
                  {selectedFields.map((field) => (
                    <col key={field.id} className={getPreviewColumnWidthClass(field.id)} />
                  ))}
                </colgroup>
                <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
                  <tr>
                    {selectedFields.map((field) => (
                      <th key={field.id} className={cn("px-4 py-3 text-left whitespace-nowrap", getPreviewCellClassName(field.id))}>
                        {field.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowsForExport.slice(0, 5).map((row) => (
                    <tr key={row.id} className="border-t border-[color:var(--border-muted)] align-top">
                      {selectedFields.map((field) => (
                        <td key={field.id} className={cn("px-4 py-4 text-slate-700", getPreviewCellClassName(field.id))}>
                          {renderPreviewCell(row, field.id)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
          )}
          {rowsForExport.length > 5 ? (
            <p className="text-sm font-semibold text-[color:var(--muted)]">
              Previewing 5 of {rowsForExport.length} export row{rowsForExport.length === 1 ? "" : "s"}.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function buildApplicantCsv(rows: DepartmentReportRow[], fields: ExportField[]) {
  const headings = fields.map((field) => field.label);
  const body = rows.map((row) => fields.map((field) => getFieldValue(row, field.id)));
  return [headings, ...body].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
}

function getFieldValue(row: DepartmentReportRow, fieldId: ExportFieldId) {
  switch (fieldId) {
    case "applicationId":
      return row.id;
    case "candidate":
      return row.candidateName;
    case "candidateLastName":
      return row.candidateLastName;
    case "job":
      return row.jobLabel;
    case "source":
      return row.sourceLabel;
    case "status":
      return row.statusLabel;
    case "membership":
      return row.membershipStatusLabel;
    case "submittedAt":
      return row.submittedAtLabel;
    case "archivedStatus":
      return row.archivedLabel;
    case "contactStatus":
      return row.contactStatusLabel;
    case "email":
      return row.contactAccess.isContactHidden ? "Hidden - contact access restricted" : row.emailLabel;
    case "phone":
      return row.contactAccess.isContactHidden ? "Hidden - contact access restricted" : row.phoneLabel;
    case "city":
      return row.cityLabel;
    case "zipCode":
      return row.zipCodeLabel;
    case "departmentNotesCount":
      return row.departmentNotesCountLabel;
    case "departmentNotes":
      return row.departmentNotesExport;
    case "qualifications":
      return row.qualificationsLabel;
    case "essayResponse":
      return row.essayResponseLabel;
    case "changeLogCount":
      return row.changeLogCountLabel;
    case "changeLog":
      return row.changeLogSummary;
    case "privateFiles":
      return row.privateFilesLabel;
    case "profileSummary":
      return row.profileSummary;
    default:
      return "";
  }
}

function renderPreviewCell(row: DepartmentReportRow, fieldId: ExportFieldId) {
  if (fieldId === "status") {
    return <StatusChip label={row.statusLabel} tone={row.statusTone} />;
  }

  if (fieldId === "archivedStatus") {
    return <StatusChip label={row.archivedLabel} tone={row.archivedAt ? "muted" : "success"} />;
  }

  if (fieldId === "candidate") {
    return (
      <div className="grid gap-1">
        <span className="font-bold text-[color:var(--navy)]">{row.candidateName}</span>
        <span className="text-xs font-semibold text-slate-500">{row.jobLabel}</span>
      </div>
    );
  }

  if (fieldId === "job") {
    return (
      <div className="grid gap-1">
        <span className="font-semibold text-slate-800">{row.jobLabel}</span>
        <span className="text-xs text-[color:var(--muted)]">{row.sourceLabel}</span>
      </div>
    );
  }

  const value = getFieldValue(row, fieldId);
  return <span className="block leading-6">{value}</span>;
}

function getPreviewColumnWidthClass(fieldId: ExportFieldId) {
  switch (fieldId) {
    case "applicationId":
      return "w-[160px]";
    case "candidate":
      return "w-[560px]";
    case "candidateLastName":
      return "w-[170px]";
    case "job":
      return "w-[620px]";
    case "source":
      return "w-[320px]";
    case "status":
      return "w-[380px]";
    case "membership":
      return "w-[170px]";
    case "submittedAt":
      return "w-[260px]";
    case "archivedStatus":
      return "w-[150px]";
    case "contactStatus":
      return "w-[170px]";
    case "email":
      return "w-[240px]";
    case "phone":
      return "w-[320px]";
    case "city":
      return "w-[160px]";
    case "zipCode":
      return "w-[120px]";
    case "departmentNotesCount":
      return "w-[170px]";
    case "departmentNotes":
      return "w-[760px]";
    case "qualifications":
      return "w-[760px]";
    case "essayResponse":
      return "w-[700px]";
    case "changeLogCount":
      return "w-[170px]";
    case "changeLog":
      return "w-[760px]";
    case "privateFiles":
      return "w-[280px]";
    case "profileSummary":
      return "w-[700px]";
    default:
      return "w-[180px]";
  }
}

function getPreviewCellClassName(fieldId: ExportFieldId) {
  switch (fieldId) {
    case "departmentNotes":
    case "qualifications":
    case "essayResponse":
    case "changeLog":
    case "profileSummary":
      return "whitespace-normal leading-7";
    default:
      return "whitespace-normal";
  }
}

function escapeCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}
