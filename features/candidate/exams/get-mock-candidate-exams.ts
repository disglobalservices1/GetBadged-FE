import { mockCandidateExamRegistrations, mockCandidateExamScores, mockExamSittings } from "@/lib/mock/exams";
import { mockPurchases } from "@/lib/mock/payments";
import type { CandidateExamRegistration, CandidateExamScore, ExamSitting } from "@/types/exam";

export type CandidateExamCard = ExamSitting & {
  seatsRemaining: number;
  isRegistered: boolean;
  registration?: CandidateExamRegistration;
  score?: CandidateExamScore;
  purchaseStatus?: string;
};

export function getMockCandidateExamDashboard(candidateProfileId = "candidate_1") {
  const registrations = mockCandidateExamRegistrations.filter((registration) => registration.candidateProfileId === candidateProfileId);
  const scores = mockCandidateExamScores.filter((score) => score.candidateProfileId === candidateProfileId);
  const exams = getPublishedElrExams(candidateProfileId);
  const activeRegistration = registrations.find((registration) => registration.status === "registered" || registration.status === "checked_in");
  const latestScore = scores.sort((a, b) => new Date(b.scoredAt).getTime() - new Date(a.scoredAt).getTime())[0];

  return {
    exams,
    activeRegistration,
    latestScore,
    hasActiveRegistration: Boolean(activeRegistration),
    registeredExam: activeRegistration ? exams.find((exam) => exam.id === activeRegistration.examSittingId) : undefined
  };
}

export function getPublishedElrExams(candidateProfileId = "candidate_1"): CandidateExamCard[] {
  return mockExamSittings
    .filter((exam) => exam.status === "published")
    .map((exam) => decorateExam(exam, candidateProfileId));
}

export function getCandidateExamById(examId: string, candidateProfileId = "candidate_1") {
  const exam = mockExamSittings.find((item) => item.id === examId);
  return exam ? decorateExam(exam, candidateProfileId) : undefined;
}

export function formatExamDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

export function formatExamFormat(format: ExamSitting["format"]) {
  return format === "online" ? "Online" : "In Person";
}

export function formatRegistrationStatus(status?: CandidateExamRegistration["status"]) {
  if (!status) {
    return "Not Registered";
  }

  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(cents / 100);
}

function decorateExam(exam: ExamSitting, candidateProfileId: string): CandidateExamCard {
  const registration = mockCandidateExamRegistrations.find((item) => item.examSittingId === exam.id && item.candidateProfileId === candidateProfileId);
  const score = mockCandidateExamScores.find((item) => item.examSittingId === exam.id && item.candidateProfileId === candidateProfileId);
  const purchase = registration?.purchaseId ? mockPurchases.find((item) => item.id === registration.purchaseId) : undefined;

  return {
    ...exam,
    seatsRemaining: Math.max(0, exam.maxQuantity - exam.registeredCount),
    isRegistered: Boolean(registration),
    registration,
    score,
    purchaseStatus: purchase?.status
  };
}
