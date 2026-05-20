import {
  Award,
  BookOpen,
  CalendarDays,
  CheckSquare,
  FileText,
  Paperclip,
  ScrollText,
  ShieldCheck,
  User,
  Users
} from "lucide-react";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import type { CandidateProfile, CandidateProfileStepKey } from "@/types/candidate";

export type CandidateProfileStepStatus = {
  stepKey: CandidateProfileStepKey;
  label: string;
  status: "complete" | "in_progress" | "not_started" | "locked";
  isRequired: boolean;
  completedFields: number;
  totalFields: number;
};

export const candidateProfileSteps = [
  { stepKey: "contact_information", label: "Contact Information", icon: User },
  { stepKey: "personal_information", label: "Personal Information", icon: Users },
  { stepKey: "education_preferences", label: "Education & Preferences", icon: BookOpen },
  { stepKey: "training_experience", label: "Training & Experience", icon: CalendarDays },
  { stepKey: "background", label: "Background", icon: ShieldCheck },
  { stepKey: "certifications_credentials", label: "Certifications & Credentials", icon: Award },
  { stepKey: "essay_responses", label: "Essay Responses", icon: ScrollText },
  { stepKey: "attachments", label: "Attachments", icon: Paperclip },
  { stepKey: "review_submit", label: "Review & Submit", icon: CheckSquare }
] satisfies Array<{
  stepKey: CandidateProfileStepKey;
  label: string;
  icon: typeof FileText;
}>;

export function getCandidateProfileWizard(stepKey?: string) {
  const candidate = mockCandidateProfiles[0];
  const activeStepKey = resolveStepKey(stepKey, candidate.currentStepKey);
  const statuses = getCandidateProfileStepStatuses(candidate, activeStepKey);
  const activeIndex = candidateProfileSteps.findIndex((step) => step.stepKey === activeStepKey);
  const previousStep = activeIndex > 0 ? candidateProfileSteps[activeIndex - 1] : undefined;
  const nextStep = activeIndex < candidateProfileSteps.length - 1 ? candidateProfileSteps[activeIndex + 1] : undefined;

  return {
    candidate,
    activeStepKey,
    activeStep: candidateProfileSteps[activeIndex],
    activeIndex,
    previousStep,
    nextStep,
    statuses,
    percent: candidate.profileCompletionPercent,
    lastSavedLabel: "Last saved 2 minutes ago"
  };
}

export function getStepHref(stepKey: CandidateProfileStepKey) {
  return `/candidate/profile/${stepKey}`;
}

export function resolveStepKey(stepKey: string | undefined, fallback: CandidateProfileStepKey): CandidateProfileStepKey {
  const match = candidateProfileSteps.find((step) => step.stepKey === stepKey);
  return match?.stepKey ?? fallback;
}

function getCandidateProfileStepStatuses(candidate: CandidateProfile, activeStepKey: CandidateProfileStepKey): CandidateProfileStepStatus[] {
  const activeIndex = candidateProfileSteps.findIndex((step) => step.stepKey === activeStepKey);

  return candidateProfileSteps.map((step, index) => {
    const isComplete = index < activeIndex || isStepComplete(candidate, step.stepKey);
    const isLocked = index > activeIndex + 2 && candidate.profileCompletionPercent < 60;

    return {
      stepKey: step.stepKey,
      label: step.label,
      status: isComplete ? "complete" : step.stepKey === activeStepKey ? "in_progress" : isLocked ? "locked" : "not_started",
      isRequired: true,
      completedFields: getCompletedFieldCount(candidate, step.stepKey),
      totalFields: getTotalFieldCount(step.stepKey)
    };
  });
}

function isStepComplete(candidate: CandidateProfile, stepKey: CandidateProfileStepKey) {
  switch (stepKey) {
    case "contact_information":
      return Boolean(candidate.firstName && candidate.lastName && candidate.email && candidate.phone && candidate.city && candidate.zipCode);
    case "personal_information":
      return Boolean(candidate.gender && candidate.ethnicity && candidate.highestEducation);
    case "education_preferences":
      return candidate.desiredHiringAgencies.length > 0;
    case "training_experience":
      return Boolean(candidate.civilServiceExamStatus && candidate.credentials.length > 0);
    case "background":
      return candidate.hasMilitaryService !== null && candidate.ltcEligibility !== null;
    case "certifications_credentials":
      return candidate.credentials.length > 0;
    case "essay_responses":
    case "attachments":
    case "review_submit":
      return false;
    default:
      return false;
  }
}

function getCompletedFieldCount(candidate: CandidateProfile, stepKey: CandidateProfileStepKey) {
  switch (stepKey) {
    case "contact_information":
      return [candidate.firstName, candidate.lastName, candidate.email, candidate.phone, candidate.streetAddress, candidate.city, candidate.zipCode].filter(Boolean).length;
    case "personal_information":
      return [candidate.gender, candidate.ethnicity, candidate.highestEducation, candidate.isMultilingual, candidate.isWillingToRelocate].filter((value) => value !== null && value !== undefined).length;
    case "education_preferences":
      return candidate.desiredHiringAgencies.length + (candidate.highestEducation ? 1 : 0);
    case "training_experience":
      return [candidate.hasVolunteerExperience, candidate.hasCadetOrCitizensAcademy, candidate.civilServiceExamStatus, candidate.hasPriorPublicSafetyExperience, candidate.academyType].filter(Boolean).length;
    case "background":
      return [candidate.hasMilitaryService, candidate.isQualifiedVeteran, candidate.ltcEligibility, candidate.additionalSkills].filter(Boolean).length;
    case "certifications_credentials":
      return candidate.credentials.length;
    case "essay_responses":
    case "attachments":
    case "review_submit":
      return 0;
    default:
      return 0;
  }
}

function getTotalFieldCount(stepKey: CandidateProfileStepKey) {
  const totals: Record<CandidateProfileStepKey, number> = {
    contact_information: 7,
    personal_information: 5,
    education_preferences: 4,
    training_experience: 7,
    background: 6,
    certifications_credentials: 5,
    essay_responses: 3,
    attachments: 5,
    review_submit: 4
  };

  return totals[stepKey];
}
