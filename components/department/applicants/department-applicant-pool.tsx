"use client";

import { useMemo, useState } from "react";
import { Archive, ArrowUpDown, ClipboardList, Download, FileText, RotateCcw, Search, UsersRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils/cn";
import type { DepartmentApplicantPoolRow, DepartmentApplicantPoolViewModel } from "@/features/department/applicants/get-mock-department-applicant-pool";

type SourceFilter = "all" | "direct_application" | "accepted_badge";
type StatusFilter = "all" | string;
type ArchiveFilter = "active" | "archived" | "all";
type ExportScope = "filtered" | "selected" | "all";
type QualificationFilter =
  | "all"
  | "multilingual"
  | "veteran"
  | "academy_completed"
  | "post_certified"
  | "willing_to_relocate"
  | "prior_police"
  | "prior_public_safety"
  | "volunteer"
  | "cadet_academy";
type ApplyDateFilter = "all" | "last_7_days" | "last_30_days" | "this_month";
type SortColumn =
  | "departmentNotesCount"
  | "candidateName"
  | "jobLabel"
  | "sourceLabel"
  | "submittedAt"
  | "statusLabel"
  | "membershipStatusLabel"
  | "examScore"
  | "examDate"
  | "city"
  | "zipCode"
  | "phone"
  | "email"
  | "isWillingToRelocate"
  | "age"
  | "citizenship"
  | "driversLicense"
  | "education"
  | "multilingual"
  | "veteran"
  | "priorPolice"
  | "priorPublicSafety"
  | "fullTimeAcademy"
  | "academyType"
  | "credentials"
  | "postCertified"
  | "volunteer"
  | "cadetAcademy"
  | "civilService"
  | "ltcEligibility";
type SortDirection = "asc" | "desc";

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
  const router = useRouter();
  const [rows, setRows] = useState(model.rows);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [jobFilter, setJobFilter] = useState(model.initialJobFilter ?? "all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [qualificationFilter, setQualificationFilter] = useState<QualificationFilter>("all");
  const [applyDateFilter, setApplyDateFilter] = useState<ApplyDateFilter>("all");
  const [receivedFrom, setReceivedFrom] = useState("");
  const [receivedTo, setReceivedTo] = useState("");
  const [lastNameQuery, setLastNameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [archiveFilter, setArchiveFilter] = useState<ArchiveFilter>("active");
  const [sortColumn, setSortColumn] = useState<SortColumn>("submittedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
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

  const jobTypeOptions = useMemo(() => {
    const jobTypes = Array.from(new Set(rows.map((row) => row.jobType)));
    return [{ label: "All job types", value: "all" }, ...jobTypes.map((jobType) => ({ label: formatJobType(jobType), value: jobType }))];
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
    const lowerLastNameQuery = lastNameQuery.trim().toLowerCase();
    const lowerEmailQuery = emailQuery.trim().toLowerCase();

    return rows
      .filter((row) => jobFilter === "all" || row.jobPostId === jobFilter)
      .filter((row) => jobTypeFilter === "all" || row.jobType === jobTypeFilter)
      .filter((row) => sourceFilter === "all" || row.source === sourceFilter)
      .filter((row) => statusFilter === "all" || row.status === statusFilter)
      .filter((row) => qualificationFilter === "all" || matchesQualificationFilter(row, qualificationFilter))
      .filter((row) => lowerLastNameQuery.length === 0 || row.candidateLastName.toLowerCase().includes(lowerLastNameQuery))
      .filter((row) => lowerEmailQuery.length === 0 || row.candidate.email.toLowerCase().includes(lowerEmailQuery))
      .filter((row) => matchesApplyDateFilter(row.submittedAt, applyDateFilter))
      .filter((row) => matchesReceivedDateRange(row.submittedAt, receivedFrom, receivedTo))
      .filter((row) => archiveFilter === "all" || (archiveFilter === "archived" ? row.archivedAt : !row.archivedAt))
      .sort((a, b) => sortRows(a, b, sortColumn, sortDirection));
  }, [
    archiveFilter,
    applyDateFilter,
    emailQuery,
    jobFilter,
    jobTypeFilter,
    lastNameQuery,
    qualificationFilter,
    receivedFrom,
    receivedTo,
    rows,
    sortColumn,
    sortDirection,
    sourceFilter,
    statusFilter
  ]);

  const selectedRows = useMemo(() => rows.filter((row) => selectedIds.includes(row.id)), [rows, selectedIds]);
  const allFilteredSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedIds.includes(row.id));

  function resetFilters() {
    setJobFilter(model.initialJobFilter ?? "all");
    setJobTypeFilter("all");
    setSourceFilter("all");
    setStatusFilter("all");
    setQualificationFilter("all");
    setApplyDateFilter("all");
    setReceivedFrom("");
    setReceivedTo("");
    setLastNameQuery("");
    setEmailQuery("");
    setArchiveFilter("active");
    setSortColumn("submittedAt");
    setSortDirection("desc");
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

  function toggleSort(column: SortColumn) {
    if (sortColumn === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortColumn(column);
    setSortDirection(getDefaultSortDirection(column));
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Applicant pools"
        title="Applicant Pools"
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
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Filter by job type, application timing, candidate contact, and qualification signals.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Select label="Position" value={jobFilter} onChange={(event) => setJobFilter(event.target.value)} options={model.jobs.map((job) => ({ label: job.label, value: job.id }))} />
          <Select label="Job type" value={jobTypeFilter} onChange={(event) => setJobTypeFilter(event.target.value)} options={jobTypeOptions} />
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
            label="Qualification"
            value={qualificationFilter}
            onChange={(event) => setQualificationFilter(event.target.value as QualificationFilter)}
            options={[
              { label: "All qualifiers", value: "all" },
              { label: "Multilingual", value: "multilingual" },
              { label: "Veteran", value: "veteran" },
              { label: "Completed full-time academy", value: "academy_completed" },
              { label: "POST certified", value: "post_certified" },
              { label: "Willing to relocate", value: "willing_to_relocate" },
              { label: "Prior police experience", value: "prior_police" },
              { label: "Prior public safety experience", value: "prior_public_safety" },
              { label: "Volunteer/community service", value: "volunteer" },
              { label: "Cadet/citizens academy", value: "cadet_academy" }
            ]}
          />
          <Select
            label="Apply date"
            value={applyDateFilter}
            onChange={(event) => setApplyDateFilter(event.target.value as ApplyDateFilter)}
            options={[
              { label: "All application dates", value: "all" },
              { label: "Last 7 days", value: "last_7_days" },
              { label: "Last 30 days", value: "last_30_days" },
              { label: "This month", value: "this_month" }
            ]}
          />
          <Select
            label="Archive"
            value={archiveFilter}
            onChange={(event) => setArchiveFilter(event.target.value as ArchiveFilter)}
            options={[
              { label: "Unarchived only", value: "active" },
              { label: "Archived only", value: "archived" },
              { label: "All records", value: "all" }
            ]}
          />
          <Input label="Search by last name" value={lastNameQuery} onChange={(event) => setLastNameQuery(event.target.value)} placeholder="Smith" />
          <Input label="Search by email" value={emailQuery} onChange={(event) => setEmailQuery(event.target.value)} placeholder="candidate@example.com" />
          <Input
            label="Received from"
            type="date"
            value={receivedFrom}
            max={receivedTo || undefined}
            onChange={(event) => {
              const nextFrom = event.target.value;
              setReceivedFrom(nextFrom);

              if (receivedTo && nextFrom && nextFrom > receivedTo) {
                setReceivedTo(nextFrom);
              }
            }}
          />
          <Input
            label="Received to"
            type="date"
            value={receivedTo}
            min={receivedFrom || undefined}
            onChange={(event) => {
              const nextTo = event.target.value;
              setReceivedTo(nextTo);

              if (receivedFrom && nextTo && nextTo < receivedFrom) {
                setReceivedFrom(nextTo);
              }
            }}
          />
          <div className="self-end xl:col-span-4">
            <Button type="button" variant="secondary" className="w-full md:w-auto" onClick={resetFilters}>
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
        <Table className="min-w-[3200px] table-fixed text-xs">
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
              <th className="w-[120px] px-4 py-3">
                <SortableHeader label="Notes" column="departmentNotesCount" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[220px] px-4 py-3">
                <SortableHeader label="Candidate" column="candidateName" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[240px] px-4 py-3">
                <SortableHeader label="Job / Position" column="jobLabel" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[150px] px-4 py-3">
                <SortableHeader label="Application Source" column="sourceLabel" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[220px] px-4 py-3">
                <SortableHeader label="Application Status" column="statusLabel" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[170px] px-4 py-3">
                <SortableHeader label="Membership Status" column="membershipStatusLabel" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[130px] px-4 py-3">
                <SortableHeader label="Exam Score" column="examScore" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[140px] px-4 py-3">
                <SortableHeader label="Exam Date" column="examDate" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[145px] px-4 py-3">
                <SortableHeader label="Date Received" column="submittedAt" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[140px] px-4 py-3">
                <SortableHeader label="City / Town" column="city" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[100px] px-4 py-3">
                <SortableHeader label="Zip Code" column="zipCode" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[140px] px-4 py-3">
                <SortableHeader label="Phone" column="phone" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[220px] px-4 py-3">
                <SortableHeader label="Email" column="email" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[110px] px-4 py-3">
                <SortableHeader label="Relocate" column="isWillingToRelocate" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[80px] px-4 py-3">
                <SortableHeader label="Age" column="age" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[160px] px-4 py-3">
                <SortableHeader label="Citizenship" column="citizenship" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[150px] px-4 py-3">
                <SortableHeader label="Driver's License" column="driversLicense" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[170px] px-4 py-3">
                <SortableHeader label="Education" column="education" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[120px] px-4 py-3">
                <SortableHeader label="Multilingual" column="multilingual" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[150px] px-4 py-3">
                <SortableHeader label="Veteran Status" column="veteran" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[140px] px-4 py-3">
                <SortableHeader label="Prior Police" column="priorPolice" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[170px] px-4 py-3">
                <SortableHeader label="Prior Public Safety" column="priorPublicSafety" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[160px] px-4 py-3">
                <SortableHeader label="Full-Time Academy" column="fullTimeAcademy" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[170px] px-4 py-3">
                <SortableHeader label="Academy Type" column="academyType" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[170px] px-4 py-3">
                <SortableHeader label="Credentials" column="credentials" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[140px] px-4 py-3">
                <SortableHeader label="POST Certified" column="postCertified" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[160px] px-4 py-3">
                <SortableHeader label="Volunteer / Service" column="volunteer" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[170px] px-4 py-3">
                <SortableHeader label="Cadet / Academy" column="cadetAcademy" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[170px] px-4 py-3">
                <SortableHeader label="Civil Service Exam" column="civilService" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[160px] px-4 py-3">
                <SortableHeader label="LTC Eligibility" column="ltcEligibility" sortColumn={sortColumn} sortDirection={sortDirection} onSort={toggleSort} />
              </th>
              <th className="w-[190px] px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-t border-[color:var(--border-muted)] transition hover:bg-slate-50/70"
                onClick={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest("button, a, input, select, label")) return;
                  router.push(row.detailHref);
                }}
              >
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
                  {row.departmentNotesCount > 0 ? (
                    <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                      {row.departmentNotesCount} note{row.departmentNotesCount === 1 ? "" : "s"}
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="grid gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <a href={row.detailHref} className="font-bold text-[color:var(--navy)] hover:underline">
                        {row.candidateName}
                      </a>
                      {row.isNewForDepartment ? <StatusChip label="New" tone="navy" /> : null}
                      {row.archivedAt ? <StatusChip label="Archived" tone="muted" /> : null}
                    </div>
                    <p className="text-xs font-semibold text-[color:var(--muted)]">{row.locationLabel}</p>
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
                <td className="px-4 py-4 align-top">
                  <StatusChip label={row.membershipStatusLabel} tone={row.membershipStatusTone} />
                </td>
                <td className="whitespace-nowrap px-4 py-4 align-top text-slate-700">{row.examScoreLabel}</td>
                <td className="whitespace-nowrap px-4 py-4 align-top text-slate-700">{row.examDateLabel}</td>
                <td className="whitespace-nowrap px-4 py-4 align-top text-slate-700">{row.submittedAtLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.cityLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.zipCodeLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">
                  {row.contactAccess.isContactHidden ? <span className="text-slate-400">Hidden</span> : row.phoneLabel}
                </td>
                <td className="px-4 py-4 align-top text-slate-700">
                  {row.contactAccess.isContactHidden ? <span className="text-slate-400">Hidden</span> : row.emailLabel}
                </td>
                <td className="px-4 py-4 align-top text-slate-700">{row.candidate.isWillingToRelocate ? "Yes" : "No"}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.ageLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.citizenshipLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.driversLicenseLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.educationLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.multilingualLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.veteranLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.priorPoliceLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.priorPublicSafetyLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.fullTimeAcademyLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.academyTypeLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.credentialsLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.postCertifiedLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.volunteerLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.cadetAcademyLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.civilServiceLabel}</td>
                <td className="px-4 py-4 align-top text-slate-700">{row.ltcEligibilityLabel}</td>
                <td className="px-4 py-4 text-right align-top">
                  <div className="flex justify-end gap-2">
                    <Button href={row.detailHref} variant="secondary" className="min-h-10 px-3">
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

function SortableHeader({
  label,
  column,
  sortColumn,
  sortDirection,
  onSort
}: {
  label: string;
  column: SortColumn;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}) {
  const isActive = sortColumn === column;

  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className={cn("inline-flex items-center gap-1 text-left transition hover:text-[color:var(--navy)]", isActive && "text-[color:var(--navy)]")}
    >
      <span>{label}</span>
      <ArrowUpDown className={cn("h-3 w-3", isActive && sortDirection === "desc" && "rotate-180")} />
    </button>
  );
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
    "Department Notes",
    "Candidate",
    "Last Name",
    "Email",
    "Phone",
    "City/Town",
    "Zip Code",
    "Job / Position",
    "Job Type",
    "Source",
    "Status",
    "Membership Status",
    "Exam Score",
    "Exam Date",
    "Date Received",
    "Willing To Relocate",
    "Age",
    "Citizenship",
    "Valid Driver's License",
    "Highest Education",
    "Multilingual",
    "Veteran Status",
    "Prior Police Experience",
    "Prior Public Safety Experience",
    "Full-Time Academy",
    "Full-Time Academy Type",
    "Credentials",
    "POST Certified",
    "Volunteer/Community Service",
    "Cadet/Citizens Academy",
    "Civil Service Exam",
    "LTC Eligibility",
    "Archived",
    "Profile Summary"
  ];
  const body = rows.map((row) => {
    const contactHidden = row.contactAccess.isContactHidden;

    return [
      row.id,
      `${row.departmentNotesCount}`,
      row.candidateName,
      row.candidateLastName,
      contactHidden ? "Hidden - inactive or expired state" : row.candidate.email,
      contactHidden ? "Hidden - inactive or expired state" : row.candidate.phone,
      row.cityLabel,
      row.zipCodeLabel,
      row.jobLabel,
      formatJobType(row.jobType),
      row.sourceLabel,
      row.statusLabel,
      row.membershipStatusLabel,
      row.examScoreLabel,
      row.examDateLabel,
      row.submittedAtLabel,
      row.candidate.isWillingToRelocate ? "Yes" : "No",
      row.ageLabel,
      row.citizenshipLabel,
      row.driversLicenseLabel,
      row.educationLabel,
      row.multilingualLabel,
      row.veteranLabel,
      row.priorPoliceLabel,
      row.priorPublicSafetyLabel,
      row.fullTimeAcademyLabel,
      row.academyTypeLabel,
      row.credentialsLabel,
      row.postCertifiedLabel,
      row.volunteerLabel,
      row.cadetAcademyLabel,
      row.civilServiceLabel,
      row.ltcEligibilityLabel,
      row.archivedAt ? formatCsvDate(row.archivedAt) : "",
      row.profileSummary
    ];
  });

  return [headings, ...body].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
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

function formatJobType(jobType: DepartmentApplicantPoolRow["jobType"]) {
  return jobType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function matchesQualificationFilter(row: DepartmentApplicantPoolRow, qualificationFilter: QualificationFilter) {
  if (qualificationFilter === "multilingual") return Boolean(row.candidate.isMultilingual);
  if (qualificationFilter === "veteran") return Boolean(row.candidate.hasMilitaryService);
  if (qualificationFilter === "academy_completed") return Boolean(row.candidate.hasCompletedFullTimeAcademy);
  if (qualificationFilter === "post_certified") return Boolean(row.candidate.hasActivePostCertification);
  if (qualificationFilter === "willing_to_relocate") return Boolean(row.candidate.isWillingToRelocate);
  if (qualificationFilter === "prior_police") return Boolean(row.candidate.hasPriorPoliceEmployment);
  if (qualificationFilter === "prior_public_safety") return Boolean(row.candidate.hasPriorPublicSafetyExperience);
  if (qualificationFilter === "volunteer") return Boolean(row.candidate.hasVolunteerExperience);
  if (qualificationFilter === "cadet_academy") return Boolean(row.candidate.hasCadetOrCitizensAcademy);
  return true;
}

function matchesApplyDateFilter(submittedAt: string, applyDateFilter: ApplyDateFilter) {
  if (applyDateFilter === "all") return true;

  const submittedDate = new Date(submittedAt);
  const referenceDate = new Date("2026-06-03T23:59:59.000Z");

  if (applyDateFilter === "last_7_days") return submittedDate.getTime() >= referenceDate.getTime() - 7 * 24 * 60 * 60 * 1000;
  if (applyDateFilter === "last_30_days") return submittedDate.getTime() >= referenceDate.getTime() - 30 * 24 * 60 * 60 * 1000;

  return submittedDate.getUTCFullYear() === 2026 && submittedDate.getUTCMonth() === 5;
}

function matchesReceivedDateRange(submittedAt: string, receivedFrom: string, receivedTo: string) {
  const submittedDate = new Date(submittedAt);
  if (receivedFrom) {
    const fromDate = new Date(`${receivedFrom}T00:00:00.000Z`);
    if (submittedDate < fromDate) return false;
  }

  if (receivedTo) {
    const toDate = new Date(`${receivedTo}T23:59:59.999Z`);
    if (submittedDate > toDate) return false;
  }

  return true;
}

function getDefaultSortDirection(column: SortColumn): SortDirection {
  if (column === "submittedAt" || column === "examScore" || column === "examDate" || column === "departmentNotesCount" || column === "age") {
    return "desc";
  }

  return "asc";
}

function sortRows(a: DepartmentApplicantPoolRow, b: DepartmentApplicantPoolRow, sortColumn: SortColumn, sortDirection: SortDirection) {
  const direction = sortDirection === "asc" ? 1 : -1;
  const aValue = getSortValue(a, sortColumn);
  const bValue = getSortValue(b, sortColumn);

  if (typeof aValue === "number" && typeof bValue === "number") return (aValue - bValue) * direction;
  if (aValue instanceof Date && bValue instanceof Date) return (aValue.getTime() - bValue.getTime()) * direction;

  return `${aValue}`.localeCompare(`${bValue}`) * direction;
}

function getSortValue(row: DepartmentApplicantPoolRow, sortColumn: SortColumn) {
  switch (sortColumn) {
    case "departmentNotesCount":
      return row.departmentNotesCount;
    case "candidateName":
      return row.candidateName;
    case "jobLabel":
      return row.jobLabel;
    case "sourceLabel":
      return row.sourceLabel;
    case "submittedAt":
      return new Date(row.submittedAt);
    case "statusLabel":
      return row.statusLabel;
    case "membershipStatusLabel":
      return row.membershipStatusLabel;
    case "examScore":
      return row.examScoreValue ?? -1;
    case "examDate":
      return row.examDateLabel === "—" ? new Date(0) : new Date(row.examDateLabel);
    case "city":
      return row.cityLabel;
    case "zipCode":
      return row.zipCodeLabel;
    case "phone":
      return row.phoneLabel;
    case "email":
      return row.emailLabel;
    case "isWillingToRelocate":
      return row.candidate.isWillingToRelocate ? "Yes" : "No";
    case "age":
      return row.ageValue ?? -1;
    case "citizenship":
      return row.citizenshipLabel;
    case "driversLicense":
      return row.driversLicenseLabel;
    case "education":
      return row.educationLabel;
    case "multilingual":
      return row.multilingualLabel;
    case "veteran":
      return row.veteranLabel;
    case "priorPolice":
      return row.priorPoliceLabel;
    case "priorPublicSafety":
      return row.priorPublicSafetyLabel;
    case "fullTimeAcademy":
      return row.fullTimeAcademyLabel;
    case "academyType":
      return row.academyTypeLabel;
    case "credentials":
      return row.credentialsLabel;
    case "postCertified":
      return row.postCertifiedLabel;
    case "volunteer":
      return row.volunteerLabel;
    case "cadetAcademy":
      return row.cadetAcademyLabel;
    case "civilService":
      return row.civilServiceLabel;
    case "ltcEligibility":
      return row.ltcEligibilityLabel;
  }
}
