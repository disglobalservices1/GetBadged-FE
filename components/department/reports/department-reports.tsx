"use client";

import { Archive, Download, FileText, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DepartmentApplicantPoolRow } from "@/features/department/applicants/get-mock-department-applicant-pool";
import type { DepartmentReportsViewModel } from "@/features/department/reports/get-mock-department-reports";

export function DepartmentReports({ model }: { model: DepartmentReportsViewModel }) {
  function downloadExport(exportId: string) {
    const rows = exportId === "archived_applicants" ? model.applicantRows.filter((row) => row.archivedAt) : model.applicantRows;
    const csv = buildApplicantCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${exportId}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Reports" title="Reports and exports" description={`Export mock department activity for ${model.departmentName}.`} />

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<UsersRound className="h-5 w-5" />} label="Total Applicants" value={model.stats.totalApplicants} detail="Available for CSV export" />
        <StatCard icon={<FileText className="h-5 w-5" />} label="Active Applicants" value={model.stats.activeApplicants} detail="Current review queue" />
        <StatCard icon={<Archive className="h-5 w-5" />} label="Archived" value={model.stats.archivedApplicants} detail="Archived application records" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available exports</CardTitle>
          <p className="text-sm leading-6 text-[color:var(--muted)]">CSV exports are generated locally from mock data for frontend review.</p>
        </CardHeader>
        <CardContent className="grid gap-3">
          {model.exports.map((exportItem) => (
            <div key={exportItem.id} className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-[color:var(--border-muted)] p-4">
              <div>
                <p className="font-bold text-[color:var(--navy)]">{exportItem.title}</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{exportItem.description}</p>
                <p className="mt-1 text-xs font-bold uppercase text-slate-500">{exportItem.rowCount} rows</p>
              </div>
              <Button type="button" iconLeft={<Download className="h-4 w-4" />} onClick={() => downloadExport(exportItem.id)} disabled={exportItem.rowCount === 0}>
                Download CSV
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function buildApplicantCsv(rows: DepartmentApplicantPoolRow[]) {
  const headings = ["Application ID", "Candidate", "Job", "Source", "Status", "Submitted", "Archived"];
  const body = rows.map((row) => [row.id, row.candidateName, row.jobLabel, row.sourceLabel, row.statusLabel, row.submittedAtLabel, row.archivedAt ? formatDate(row.archivedAt) : ""]);

  return [headings, ...body].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
}

function escapeCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
