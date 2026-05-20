import { AlertTriangle, CheckCircle2, FileText, Lock, UploadCloud } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusChip } from "@/components/ui/status-chip";
import { getMockCandidateDocuments, formatFileSize, formatUploadDate, type CandidateDocumentCategoryView } from "@/features/candidate/documents/get-mock-candidate-documents";

export function CandidateDocumentsPage() {
  const dashboard = getMockCandidateDocuments();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Candidate Documents"
        title="Supporting documents"
        description="Upload PDF documents by category so future applications can include complete, verified packets."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard icon={<FileText className="h-6 w-6" />} label="Uploaded PDFs" value={dashboard.uploadedCount} detail="Across all document categories." />
        <SummaryCard icon={<CheckCircle2 className="h-6 w-6" />} label="Required Complete" value={`${dashboard.completedRequiredCount}/${dashboard.requiredCount}`} detail="Required document coverage." />
        <SummaryCard icon={dashboard.isEligibleForApplicationPacket ? <CheckCircle2 className="h-6 w-6" /> : <Lock className="h-6 w-6" />} label="Packet Status" value={dashboard.isEligibleForApplicationPacket ? "Ready" : "Blocked"} detail="Required documents gate application readiness." />
      </section>

      <Card className={dashboard.isEligibleForApplicationPacket ? "border-green-100 bg-green-50" : "border-amber-200 bg-amber-50"}>
        <CardContent className="grid gap-4 px-6 pb-6 pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-[color:var(--blue)]">
              {dashboard.isEligibleForApplicationPacket ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6 text-amber-700" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[color:var(--navy)]">{dashboard.isEligibleForApplicationPacket ? "Required documents complete" : "Document blocker active"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {dashboard.isEligibleForApplicationPacket
                  ? "This mock candidate has the required document coverage for application packet readiness."
                  : `${dashboard.missingRequiredCount} required document category needs an uploaded PDF before full application packet readiness.`}
              </p>
            </div>
          </div>
          <div className="min-w-52">
            <Progress value={dashboard.completionPercent} label={`${dashboard.completionPercent}% required complete`} />
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4">
        {dashboard.categories.map((category) => (
          <DocumentCategoryCard key={category.documentType} category={category} />
        ))}
      </section>
    </div>
  );
}

function DocumentCategoryCard({ category }: { category: CandidateDocumentCategoryView }) {
  const uploadedDocuments = category.documents.filter((document) => document.status === "uploaded");

  return (
    <Card>
      <CardContent className="grid gap-6 px-6 pb-6 pt-8 xl:grid-cols-[1fr_420px]">
        <div className="grid gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-[color:var(--navy)]">{category.label}</h2>
                  <StatusChip label={category.isRequired ? "Required" : "Optional"} tone={category.isRequired ? "warning" : "muted"} />
                  <StatusChip label={getStatusLabel(category.status)} tone={getStatusTone(category.status)} />
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">{category.description}</p>
                <p className="mt-1 text-xs font-bold uppercase text-slate-500">{category.requirementNote}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {uploadedDocuments.length > 0 ? (
              uploadedDocuments.map((document) => (
                <div key={document.id} className="grid gap-2 rounded-md border border-[color:var(--border-muted)] bg-[color:var(--surface-muted)] p-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="font-bold text-[color:var(--navy)]">{document.fileName}</p>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {formatFileSize(document.fileSizeBytes)} · Uploaded {formatUploadDate(document.uploadedAt)}
                    </p>
                  </div>
                  <StatusChip label={document.status} tone="success" />
                </div>
              ))
            ) : (
              <p className="rounded-md border border-[color:var(--border-muted)] bg-[color:var(--surface-muted)] p-4 text-sm text-[color:var(--muted)]">
                No PDF uploaded for this category yet.
              </p>
            )}
          </div>
        </div>

        <FileUpload
          label={`Upload ${category.label}`}
          description={category.allowsMultiple ? "Multiple PDFs are allowed for this category." : "One primary PDF is expected for this category."}
          className={category.status === "missing_required" ? "border-amber-300 bg-amber-50" : undefined}
        />
      </CardContent>
    </Card>
  );
}

function SummaryCard({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string | number; detail: string }) {
  return (
    <Card>
      <CardContent className="grid gap-3 px-5 pb-5 pt-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">{icon}</div>
          <div>
            <p className="text-sm font-semibold uppercase text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold text-[color:var(--navy)]">{value}</p>
          </div>
        </div>
        <p className="text-sm leading-5 text-[color:var(--muted)]">{detail}</p>
      </CardContent>
    </Card>
  );
}

function getStatusLabel(status: CandidateDocumentCategoryView["status"]) {
  switch (status) {
    case "complete":
      return "Complete";
    case "missing_required":
      return "Missing";
    case "rejected":
      return "Rejected";
    case "optional":
      return "Optional";
    default:
      return status;
  }
}

function getStatusTone(status: CandidateDocumentCategoryView["status"]) {
  switch (status) {
    case "complete":
      return "success";
    case "missing_required":
    case "rejected":
      return "warning";
    default:
      return "muted";
  }
}
