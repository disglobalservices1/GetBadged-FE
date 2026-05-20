import type { CandidateExamRegistration, CandidateExamScore, ExamSitting } from "@/types/exam";

export const mockExamSittings: ExamSitting[] = [
  {
    id: "exam_elr_online_1",
    format: "online",
    title: "ELR Online Entrance Exam",
    examDate: "2026-06-12",
    examTime: "10:00 AM",
    checkInTime: "9:45 AM",
    state: "MA",
    registrationDeadline: "2026-06-05",
    maxQuantity: 200,
    registeredCount: 138,
    status: "published",
    customConfirmationSendAt: "2026-06-06T14:00:00.000Z"
  },
  {
    id: "exam_elr_in_person_1",
    format: "in_person",
    title: "ELR In-Person Entrance Exam",
    examDate: "2026-06-22",
    examTime: "8:30 AM",
    checkInTime: "7:45 AM",
    locationName: "Boston Public Safety Training Center",
    streetAddress: "100 Training Way",
    city: "Boston",
    state: "MA",
    registrationDeadline: "2026-06-14",
    maxQuantity: 80,
    registeredCount: 62,
    status: "published"
  },
  {
    id: "exam_elr_in_person_2",
    format: "in_person",
    title: "ELR Western MA Entrance Exam",
    examDate: "2026-07-08",
    examTime: "9:00 AM",
    checkInTime: "8:15 AM",
    locationName: "Springfield Regional Training Site",
    streetAddress: "55 Academy Drive",
    city: "Springfield",
    state: "MA",
    registrationDeadline: "2026-06-30",
    maxQuantity: 60,
    registeredCount: 20,
    status: "published"
  }
];

export const mockCandidateExamRegistrations: CandidateExamRegistration[] = [
  {
    id: "candidate_exam_registration_1",
    candidateProfileId: "candidate_1",
    examSittingId: "exam_elr_online_1",
    status: "registered",
    purchaseId: "purchase_exam_1",
    registeredAt: "2026-05-18T11:30:00.000Z",
    acknowledgementAcceptedAt: "2026-05-18T11:29:00.000Z"
  }
];

export const mockCandidateExamScores: CandidateExamScore[] = [
  {
    id: "candidate_exam_score_1",
    candidateProfileId: "candidate_1",
    examSittingId: "exam_elr_online_1",
    scorePercent: 82.09,
    status: "pending_verification",
    scoredAt: "2026-05-18T12:00:00.000Z",
    validUntil: "2027-05-18"
  }
];
