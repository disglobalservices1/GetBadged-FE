"use client";

import { useState } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DepartmentApplicationDetailViewModel } from "@/features/department/applicants/get-mock-department-applicant-pool";

export function ApplicationReviewActions({ model }: { model: DepartmentApplicationDetailViewModel }) {
  const [message, setMessage] = useState("");

  function handlePrint() {
    setMessage("Preparing the application review for printing.");
    window.print();
  }

  function handleDownloadPackage() {
    const packageText = buildApplicationPackage(model);
    const blob = new Blob([packageText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${slugify(model.application.candidateName)}-application-package.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setMessage("Application package downloaded as a mock review summary.");
  }

  return (
    <div className="gb-print-hide grid justify-items-start gap-2">
      <div className="flex flex-wrap gap-3">
        <Button href="/department/applicant-pools" variant="secondary" iconLeft={<ArrowLeft className="h-4 w-4" />}>
          Back to Applicant Pools
        </Button>
        <Button type="button" variant="secondary" iconLeft={<Printer className="h-4 w-4" />} onClick={handlePrint}>
          Print
        </Button>
        <Button type="button" iconLeft={<Download className="h-4 w-4" />} onClick={handleDownloadPackage}>
          Download package
        </Button>
      </div>
      {message ? (
        <p className="text-sm font-semibold text-[color:var(--muted)]" aria-live="polite">
          {message}
        </p>
      ) : null}
    </div>
  );
}

function buildApplicationPackage(model: DepartmentApplicationDetailViewModel) {
  const { application } = model;
  const candidate = application.candidate;
  const documents = model.documents.map((document) => `- ${document.label}: ${document.fileName} (${document.status.replace(/_/g, " ")})`).join("\n");
  const notes = model.notes.length
    ? model.notes.map((note) => `- ${note.authorName} (${formatDate(note.createdAt)}): ${note.body}`).join("\n")
    : "- No department notes have been added.";
  const privateFiles = model.privateFiles.length
    ? model.privateFiles.map((file) => `- ${file.label}: ${file.fileName} (${file.uploadedByName}, ${formatDate(file.uploadedAt)})`).join("\n")
    : "- No department-private files have been attached.";
  const changeLog = model.changeLog.map((entry) => `- ${formatDate(entry.createdAt)} | ${entry.actorName} | ${entry.action}: ${entry.detail}`).join("\n");

  return [
    "GetBadged Application Review Package",
    "=====================================",
    "",
    "Application summary",
    "-------------------",
    `Candidate: ${application.candidateName}`,
    `Job: ${application.jobLabel}`,
    `Source: ${application.sourceLabel}`,
    `Status: ${application.statusLabel}`,
    `Submitted: ${application.submittedAtLabel}`,
    `Viewed: ${application.viewedAtLabel}`,
    "",
    "Candidate profile snapshot",
    "--------------------------",
    `Email: ${candidate.email}`,
    `Phone: ${candidate.phone}`,
    `Location: ${candidate.city}, ${candidate.state} ${candidate.zipCode}`,
    `Track: ${candidate.track}`,
    `Membership: ${candidate.membershipStatus}`,
    `Education: ${candidate.highestEducation ?? "Not provided"}`,
    `Credentials: ${candidate.credentials.length ? candidate.credentials.join(", ").toUpperCase() : "None listed"}`,
    `Profile summary: ${application.profileSummary || "None listed"}`,
    "",
    "Cover letter",
    "------------",
    application.coverLetterText ?? "No cover letter was submitted with this application.",
    "",
    "Submitted documents",
    "-------------------",
    documents,
    "",
    "Department notes",
    "----------------",
    notes,
    "",
    "Department-private files",
    "------------------------",
    privateFiles,
    "",
    "Change log",
    "----------",
    changeLog || "- No changes recorded."
  ].join("\n");
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
