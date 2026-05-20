import { candidateDocumentCategories, mockCandidateDocuments } from "@/lib/mock/candidateDocuments";
import type { CandidateDocument, DocumentType } from "@/types/candidate";

export type CandidateDocumentCategoryView = {
  documentType: DocumentType;
  label: string;
  description: string;
  isRequired: boolean;
  requirementNote: string;
  allowsMultiple: boolean;
  documents: CandidateDocument[];
  status: "complete" | "missing_required" | "optional" | "rejected";
};

export function getMockCandidateDocuments(candidateProfileId = "candidate_1") {
  const documents = mockCandidateDocuments.filter((document) => document.candidateProfileId === candidateProfileId);
  const categories = candidateDocumentCategories.map((category): CandidateDocumentCategoryView => {
    const categoryDocuments = documents.filter((document) => document.documentType === category.documentType);
    const uploadedDocuments = categoryDocuments.filter((document) => document.status === "uploaded");
    const rejectedDocuments = categoryDocuments.filter((document) => document.status === "rejected");
    const hasRequiredMissing = category.isRequired && uploadedDocuments.length === 0;

    return {
      ...category,
      documents: categoryDocuments,
      status: rejectedDocuments.length > 0 ? "rejected" : hasRequiredMissing ? "missing_required" : uploadedDocuments.length > 0 ? "complete" : "optional"
    };
  });

  const requiredCount = categories.filter((category) => category.isRequired).length;
  const completedRequiredCount = categories.filter((category) => category.isRequired && category.status === "complete").length;
  const uploadedCount = documents.filter((document) => document.status === "uploaded").length;
  const missingRequiredCount = categories.filter((category) => category.status === "missing_required").length;

  return {
    categories,
    requiredCount,
    completedRequiredCount,
    uploadedCount,
    missingRequiredCount,
    completionPercent: requiredCount === 0 ? 100 : Math.round((completedRequiredCount / requiredCount) * 100),
    isEligibleForApplicationPacket: missingRequiredCount === 0
  };
}

export function formatFileSize(bytes: number) {
  if (!bytes) {
    return "Pending";
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatUploadDate(value: string) {
  if (!value) {
    return "Not uploaded";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
