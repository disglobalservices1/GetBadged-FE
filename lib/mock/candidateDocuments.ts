import type { CandidateDocument, DocumentType } from "@/types/candidate";

export type CandidateDocumentCategory = {
  documentType: DocumentType;
  label: string;
  description: string;
  isRequired: boolean;
  requirementNote: string;
  allowsMultiple: boolean;
};

export const candidateDocumentCategories: CandidateDocumentCategory[] = [
  {
    documentType: "resume",
    label: "Resume",
    description: "Current resume used for department application packets.",
    isRequired: true,
    requirementNote: "Required for all candidate profiles.",
    allowsMultiple: false
  },
  {
    documentType: "college_transcript",
    label: "College Transcript",
    description: "Transcript or education proof supporting education claims.",
    isRequired: false,
    requirementNote: "Required only when a job or track asks for education verification.",
    allowsMultiple: true
  },
  {
    documentType: "post_certificate",
    label: "POST Certificate",
    description: "POST certification for certified/lateral candidates.",
    isRequired: false,
    requirementNote: "Required for POST-certified tracks when applicable.",
    allowsMultiple: false
  },
  {
    documentType: "out_of_state_waiver",
    label: "Out-of-State Waiver",
    description: "Waiver or equivalency documentation for out-of-state experience.",
    isRequired: false,
    requirementNote: "Required only when applicable.",
    allowsMultiple: false
  },
  {
    documentType: "dd_214",
    label: "DD-214",
    description: "Military service document for veteran eligibility.",
    isRequired: false,
    requirementNote: "Required for veteran preference claims.",
    allowsMultiple: false
  },
  {
    documentType: "cpr_certificate",
    label: "CPR Certificate",
    description: "Current CPR credential documentation.",
    isRequired: false,
    requirementNote: "Recommended when CPR is selected in credentials.",
    allowsMultiple: true
  },
  {
    documentType: "emt_paramedic_certificate",
    label: "EMT / Paramedic Certificate",
    description: "Current EMT or paramedic certification.",
    isRequired: false,
    requirementNote: "Recommended when EMT is selected in credentials.",
    allowsMultiple: true
  },
  {
    documentType: "ltc_certificate",
    label: "LTC Certificate",
    description: "LTC or firearms eligibility documentation.",
    isRequired: false,
    requirementNote: "Required when a department/job requests LTC verification.",
    allowsMultiple: true
  },
  {
    documentType: "recommendation_letter",
    label: "Recommendation Letter",
    description: "Optional recommendation letters for application packets.",
    isRequired: false,
    requirementNote: "Optional supporting document.",
    allowsMultiple: true
  }
];

export const mockCandidateDocuments: CandidateDocument[] = [
  {
    id: "candidate_document_1",
    candidateProfileId: "candidate_1",
    documentType: "resume",
    label: "Resume",
    fileName: "Jordan-Smith-Resume.pdf",
    fileUrl: "/mock/Jordan-Smith-Resume.pdf",
    mimeType: "application/pdf",
    fileSizeBytes: 340000,
    uploadedAt: "2026-05-17T09:20:00.000Z",
    status: "uploaded"
  },
  {
    id: "candidate_document_2",
    candidateProfileId: "candidate_1",
    documentType: "cpr_certificate",
    label: "CPR Certificate",
    fileName: "CPR-Certificate.pdf",
    fileUrl: "/mock/CPR-Certificate.pdf",
    mimeType: "application/pdf",
    fileSizeBytes: 220000,
    uploadedAt: "2026-05-17T10:10:00.000Z",
    status: "uploaded"
  },
  {
    id: "candidate_document_3",
    candidateProfileId: "candidate_1",
    documentType: "college_transcript",
    label: "College Transcript",
    fileName: "",
    fileUrl: "",
    mimeType: "application/pdf",
    fileSizeBytes: 0,
    uploadedAt: "",
    status: "required_missing"
  }
];
