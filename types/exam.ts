export type ExamFormat = "online" | "in_person";

export type ExamSitting = {
  id: string;
  format: ExamFormat;
  title: string;
  examDate: string;
  examTime: string;
  checkInTime?: string;
  locationName?: string;
  streetAddress?: string;
  city?: string;
  state: "MA";
  registrationDeadline: string;
  maxQuantity: number;
  registeredCount: number;
  status: "draft" | "published" | "closed" | "completed" | "cancelled";
  customConfirmationSendAt?: string;
};

export type CandidateExamRegistration = {
  id: string;
  candidateProfileId: string;
  examSittingId: string;
  status: "registered" | "checked_in" | "completed" | "cancelled" | "no_show";
  purchaseId?: string;
  registeredAt: string;
  acknowledgementAcceptedAt?: string;
};

export type CandidateExamScore = {
  id: string;
  candidateProfileId: string;
  examSittingId: string;
  scorePercent: number;
  status: "pending_verification" | "verified" | "expired";
  scoredAt: string;
  validUntil?: string;
};
