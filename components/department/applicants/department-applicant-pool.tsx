"use client";

import { useMemo, useState } from "react";
import { Archive, ArrowUpDown, ClipboardList, Download, FileText, RotateCcw, Search, UsersRound, X } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { Table } from "@/components/ui/table";
import type { DepartmentApplicantPoolRow, DepartmentApplicantPoolViewModel } from "@/features/department/applicants/get-mock-department-applicant-pool";

type SourceFilter = "all" | "direct_application" | "accepted_badge";
type StatusFilter = "all" | string;
type SortKey = "submitted_desc" | "submitted_asc" | "name_asc" | "status_asc";
type ArchiveFilter = "active" | "archived" | "all";
type ExportScope = "filtered" | "selected" | "all";

const statusUpdateOptions = [
  { label: "New Applicant", value: "new_applicant" },
  { label: "Received Application", value: "received_application" },
  { label: "Reviewing Application", value: "reviewing_application" },
  { label: "Initial Contact Made", value: "initial_contact_made" },
  { label: "More Info Requested", value: "more_info_requested" },
  { label: "Does Not Meet Requirements", value: "does_not_meet_requirements" },
  { label: "Inactive Membership", value: "inactive_membership" },
  { label: "Hired", value: "hired" },
  { label: "Not Selected", value: "not_selected" },
  { label: "Candidate Withdrew", value: "candidate_withdrew" },
  { label: "Disqualified", value: "disqualified" }
];

export function DepartmentApplicantPool({ model }: { model: DepartmentApplicantPoolViewModel }) {
  const [rows, setRows] = useState(model.rows);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [jobFilter, setJobFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [archiveFilter, setArchiveFilter] = useState<ArchiveFilter>("active");
  const [sortKey, setSortKey] = useState<SortKey>("submitted_desc");
  const [bulkStatus, setBulkStatus] = useState("reviewing_application");
  const [feedback, setFeedback] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportScope, setExportScope] = useState<ExportScope>("filtered");

  const statusOptions = useMemo(() => {
    const statuses = Array.from(new Set(rows.map((row) => row.status)));
    return [
      { label: "All statuses", value: "all" },
      ...statuses.map((status) => ({ label: formatStatus(status), value: status }))
    ];
  }, [rows]);

  const liveStats = useMemo(() => {
    const activeRows = rows.filter((row) => !row.archivedAt);
    return {
      total: activeRows.length,
      newApplicants: activeRows.filter((row) => row.isNewForDepartment).length,
      directApplications: activeRows.filter((row) => row.source === "direct_application").length,
      acceptedBadges: activeRows.filter((row) => row.source === "accepted_badge").length,
      archived: rows.filter((row) => row.archivedAt).length
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows
      .filter((row) => jobFilter === "all" || row.jobPostId === jobFilter)
      .filter((row) => sourceFilter === "all" || row.source === sourceFilter)
      .filter((row) => statusFilter === "all" || row.status === statusFilter)
      .filter((row) => archiveFilter === "all" || (archiveFilter === "archived" ? row.archivedAt : !row.archivedAt))
      .sort((a, b) => sortRows(a, b, sortKey));
  }, [archiveFilter, jobFilter, rows, sortKey, sourceFilter, statusFilter]);

  const selectedRows = useMemo(() => rows.filter((row) => selectedIds.includes(row.id)), [rows, selectedIds]);
  const allFilteredSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedIds.includes(row.id));

  function resetFilters() {
    setJobFilter("all");
    setSourceFilter("all");
    setStatusFilter("all");
    setArchiveFilter("active");
    setSortKey("submitted_desc");
  }

  function toggleSelected(id: string) {
    setSelectedIds((current) => (current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id]));
  }

  function toggleAllFiltered() {
    setSelectedIds((current) => {
      if (allFilteredSelected) return current.filter((id) => !filteredRows.some((row) => row.id === id));
      return Array.from(new Set([...current, ...filteredRows.map((row) => row.id)]));
    });
  }

  function updateRowStatus(id: string, status: string) {
    setRows((currentRows) => currentRows.map((row) => (row.id === id ? { ...row, status, statusLabel: formatStatus(status), statusTone: getStatusTone(status) } : row)));
    setFeedback("Application status updated locally.");
  }

  function applyBulkStatus() {
    if (selectedIds.length === 0) {
      setFeedback("Select at least one applicant before applying a bulk status update.");
      return;
    }

    setRows((currentRows) =>
      currentRows.map((row) =>
        selectedIds.includes(row.id) ? { ...row, status: bulkStatus, statusLabel: formatStatus(bulkStatus), statusTone: getStatusTone(bulkStatus) } : row
      )
    );
    setFeedback(`${selectedIds.length} application${selectedIds.length === 1 ? "" : "s"} updated locally.`);
  }

  function toggleArchive(id: string) {
    setRows((currentRows) =>
      currentRows.map((row) => (row.id === id ? { ...row, archivedAt: row.archivedAt ? undefined : new Date().toISOString() } : row))
    );
    setFeedback("Archive state updated locally.");
  }

  function exportRows() {
    const exportRowsByScope = getExportRows(exportScope, rows, filteredRows, selectedRows);

    if (exportRowsByScope.length === 0) {
      setFeedback("No applicant records are available for that export scope.");
      return;
    }

    const csv = buildCsv(exportRowsByScope);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `department-applicant-export-${exportScope}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setIsExportOpen(false);
    setFeedback(`${exportRowsByScope.length} applicant record${exportRowsByScope.length === 1 ? "" : "s"} exported as CSV.`);
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Applicant pool"
        title="Applicant Pool"
        description="Review direct applications and accepted Badge Requests across Westview job posts."
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<UsersRound className="h-5 w-5" />} label="Active Applicants" value={liveStats.total} detail={`${liveStats.newApplicants} new for review`} />
        <StatCard icon={<FileText className="h-5 w-5" />} label="Direct Applications" value={liveStats.directApplications} detail="Submitted from public job posts" />
        <StatCard icon={<ClipboardList className="h-5 w-5" />} label="Accepted Badges" value={liveStats.acceptedBadges} detail={`${liveStats.archived} archived record${liveStats.archived === 1 ? "" : "s"}`} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Pool filters</CardTitle>
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Filter by job, source, or review status.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto]">
          <Select label="Job" value={jobFilter} onChange={(event) => setJobFilter(event.target.value)} options={model.jobs.map((job) => ({ label: job.label, value: job.id }))} />
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
          <Select label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} options={statusOptions} />
          <Select
            label="Archive"
            value={archiveFilter}
            onChange={(event) => setArchiveFilter(event.target.value as ArchiveFilter)}
            options={[
              { label: "Active only", value: "active" },
              { label: "Archived only", value: "archived" },
              { label: "All records", value: "all" }
            ]}
          />
          <Select
            label="Sort"
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
            options={[
              { label: "Newest first", value: "submitted_desc" },
              { label: "Oldest first", value: "submitted_asc" },
              { label: "Candidate A-Z", value: "name_asc" },
              { label: "Status A-Z", value: "status_asc" }
            ]}
          />
          <div className="self-end sm:col-span-2 xl:col-span-1">
            <Button type="button" variant="secondary" className="w-full xl:w-auto" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Status, archive, and exports</CardTitle>
            <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Apply mock status updates, archive records, or export applicant data for reporting.</p>
          </div>
          <Button type="button" iconLeft={<Download className="h-4 w-4" />} onClick={() => setIsExportOpen(true)}>
            Export CSV
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[minmax(0,280px)_auto]">
          <Select label="Bulk status" value={bulkStatus} onChange={(event) => setBulkStatus(event.target.value)} options={statusUpdateOptions} />
          <div className="flex flex-wrap items-end gap-3 self-end">
            <Button type="button" variant="secondary" onClick={applyBulkStatus}>
              Apply to selected
            </Button>
            <p className="text-sm font-semibold text-[color:var(--muted)]">{selectedIds.length} selected</p>
          </div>
          {feedback ? (
            <p className="md:col-span-2 text-sm font-semibold text-[color:var(--muted)]" aria-live="polite">
              {feedback}
            </p>
          ) : null}
        </CardContent>
      </Card>

      {filteredRows.length > 0 ? (
        <Table className="min-w-[1300px] table-fixed">
          <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
            <tr>
              <th className="w-[48px] px-4 py-3">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleAllFiltered}
                  aria-label="Select all filtered applicants"
                  className="h-4 w-4 rounded border-[color:var(--border)] accent-[color:var(--blue-deep)]"
                />
              </th>
              <th className="w-[230px] px-4 py-3">Candidate</th>
              <th className="w-[250px] px-4 py-3">Job</th>
              <th className="w-[150px] px-4 py-3">Source</th>
              <th className="w-[230px] px-4 py-3">Status</th>
              <th className="w-[140px] px-4 py-3">
                <span className="inline-flex items-center gap-1">
                  Submitted
                  <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
              <th className="w-[190px] px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="border-t border-[color:var(--border-muted)]">
                <td className="px-4 py-4 align-top">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleSelected(row.id)}
                    aria-label={`Select ${row.candidateName}`}
                    className="h-4 w-4 rounded border-[color:var(--border)] accent-[color:var(--blue-deep)]"
                  />
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="grid gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-[color:var(--navy)]">{row.candidateName}</p>
                      {row.isNewForDepartment ? <StatusChip label="New" tone="navy" /> : null}
                      {row.archivedAt ? <StatusChip label="Archived" tone="muted" /> : null}
                    </div>
                    <p className="text-xs font-semibold text-[color:var(--muted)]">{row.locationLabel}</p>
                    <p className="line-clamp-2 text-xs leading-5 text-[color:var(--muted)]">{row.profileSummary}</p>
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <p className="font-semibold text-slate-800">{row.jobLabel}</p>
                  <p className="mt-1 text-xs text-[color:var(--muted)]">{row.jobType.replace(/_/g, " ")}</p>
                </td>
                <td className="px-4 py-4 align-top">
                  <StatusChip label={row.sourceLabel} tone={row.source === "accepted_badge" ? "success" : "muted"} />
                </td>
                <td className="px-4 py-4 align-top">
                  <Select
                    value={row.status}
                    onChange={(event) => updateRowStatus(row.id, event.target.value)}
                    options={statusUpdateOptions}
                    aria-label={`Update status for ${row.candidateName}`}
                    className="h-10"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-4 align-top text-slate-700">{row.submittedAtLabel}</td>
                <td className="px-4 py-4 text-right align-top">
                  <div className="flex justify-end gap-2">
                    <Button href={`/department/applicants/${row.id}`} variant="secondary" className="min-h-10 px-3">
                      Review
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="min-h-10 px-3"
                      onClick={() => toggleArchive(row.id)}
                      aria-label={row.archivedAt ? `Unarchive ${row.candidateName}` : `Archive ${row.candidateName}`}
                    >
                      {row.archivedAt ? <RotateCcw className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyState
          icon={<Search className="h-8 w-8" />}
          title="No applicants match these filters"
          description="Reset filters or choose a broader job/source/status combination to review the full applicant pool."
        />
      )}
      {isExportOpen ? (
        <ExportModal
          exportScope={exportScope}
          selectedCount={selectedRows.length}
          filteredCount={filteredRows.length}
          allCount={rows.length}
          onChangeScope={setExportScope}
          onClose={() => setIsExportOpen(false)}
          onExport={exportRows}
        />
      ) : null}
    </div>
  );
}

function sortRows(a: DepartmentApplicantPoolRow, b: DepartmentApplicantPoolRow, sortKey: SortKey) {
  if (sortKey === "submitted_asc") return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
  if (sortKey === "name_asc") return a.candidateName.localeCompare(b.candidateName);
  if (sortKey === "status_asc") return a.statusLabel.localeCompare(b.statusLabel);
  return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
}

function ExportModal({
  exportScope,
  selectedCount,
  filteredCount,
  allCount,
  onChangeScope,
  onClose,
  onExport
}: {
  exportScope: ExportScope;
  selectedCount: number;
  filteredCount: number;
  allCount: number;
  onChangeScope: (scope: ExportScope) => void;
  onClose: () => void;
  onExport: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="export-applicants-title">
      <div className="w-full max-w-xl rounded-lg border border-[color:var(--border-muted)] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="export-applicants-title" className="text-xl font-bold text-[color:var(--navy)]">
              Export applicant data
            </h2>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Generate a CSV from the current mock applicant pool. Contact fields stay hidden for inactive or expired states.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close export modal"
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[color:var(--navy)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <label className="flex items-start gap-3 rounded-md border border-[color:var(--border-muted)] p-3 text-sm font-semibold text-slate-700">
            <input
              type="radio"
              name="export-scope"
              value="filtered"
              checked={exportScope === "filtered"}
              onChange={() => onChangeScope("filtered")}
              className="mt-1 h-4 w-4 accent-[color:var(--blue-deep)]"
            />
            <span>
              Filtered records
              <span className="block text-xs font-medium text-[color:var(--muted)]">{filteredCount} matching applicant records</span>
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-md border border-[color:var(--border-muted)] p-3 text-sm font-semibold text-slate-700">
            <input
              type="radio"
              name="export-scope"
              value="selected"
              checked={exportScope === "selected"}
              onChange={() => onChangeScope("selected")}
              className="mt-1 h-4 w-4 accent-[color:var(--blue-deep)]"
            />
            <span>
              Selected records
              <span className="block text-xs font-medium text-[color:var(--muted)]">{selectedCount} selected applicant records</span>
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-md border border-[color:var(--border-muted)] p-3 text-sm font-semibold text-slate-700">
            <input
              type="radio"
              name="export-scope"
              value="all"
              checked={exportScope === "all"}
              onChange={() => onChangeScope("all")}
              className="mt-1 h-4 w-4 accent-[color:var(--blue-deep)]"
            />
            <span>
              All records
              <span className="block text-xs font-medium text-[color:var(--muted)]">{allCount} total applicant records</span>
            </span>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" iconLeft={<Download className="h-4 w-4" />} onClick={onExport}>
            Download CSV
          </Button>
        </div>
      </div>
    </div>
  );
}

function getExportRows(
  exportScope: ExportScope,
  rows: DepartmentApplicantPoolRow[],
  filteredRows: DepartmentApplicantPoolRow[],
  selectedRows: DepartmentApplicantPoolRow[]
) {
  if (exportScope === "selected") return selectedRows;
  if (exportScope === "all") return rows;
  return filteredRows;
}

function buildCsv(rows: DepartmentApplicantPoolRow[]) {
  const headings = [
    "Application ID",
    "Candidate",
    "Email",
    "Phone",
    "Location",
    "Job",
    "Source",
    "Status",
    "Submitted",
    "Viewed",
    "Archived",
    "Profile Summary"
  ];
  const body = rows.map((row) => {
    const contactHidden = shouldHideContact(row.status);

    return [
      row.id,
      row.candidateName,
      contactHidden ? "Hidden - inactive or expired state" : row.candidate.email,
      contactHidden ? "Hidden - inactive or expired state" : row.candidate.phone,
      row.locationLabel,
      row.jobLabel,
      row.sourceLabel,
      row.statusLabel,
      row.submittedAtLabel,
      row.viewedAtLabel,
      row.archivedAt ? formatCsvDate(row.archivedAt) : "",
      row.profileSummary
    ];
  });

  return [headings, ...body].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
}

function shouldHideContact(status: string) {
  return status === "inactive_membership" || status === "no_longer_meets_requirements";
}

function escapeCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function formatCsvDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getStatusTone(status: string): DepartmentApplicantPoolRow["statusTone"] {
  if (status === "hired") return "success";
  if (status === "inactive_membership" || status === "more_info_requested" || status === "reviewing_application") return "warning";
  if (status === "not_selected" || status === "disqualified" || status === "does_not_meet_requirements") return "danger";
  if (status === "new_applicant" || status === "received_application") return "navy";
  return "muted";
}
