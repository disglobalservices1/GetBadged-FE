import type { AccountStatus } from "./auth";

export type CandidateTrack = "ELR" | "CXO" | "OPS";

export type MembershipStatus = "none" | "active" | "paused" | "cancelled" | "expired" | "inactive";

export type CandidateProfileStepKey =
  | "contact_information"
  | "personal_information"
  | "education_preferences"
  | "training_experience"
  | "background"
  | "certifications_credentials"
  | "essay_responses"
  | "attachments"
  | "review_submit";

export type CandidateCredential = "ltc" | "cpr" | "emt";

export type SocialMediaHandle = {
  platform: "instagram" | "facebook" | "x" | "linkedin";
  handle: string;
};

export type CandidateProfile = {
  id: string;
  userId: string;
  track: CandidateTrack;
  accountStatus: AccountStatus;
  membershipStatus: MembershipStatus;
  profileCompletionPercent: number;
  currentStepKey: CandidateProfileStepKey;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: "MA";
  zipCode: string;
  phone: string;
  phoneVerifiedAt?: string;
  email: string;
  dateOfBirth: string;
  last4Ssn: string;
  isUsCitizen: boolean | null;
  hasValidDriversLicense: boolean | null;
  gender: "male" | "female" | "other" | null;
  ethnicity: string | null;
  highestEducation: string | null;
  isMultilingual: boolean | null;
  languages: string[];
  isWillingToRelocate: boolean | null;
  desiredHiringAgencies: string[];
  currentlyQualifiedFor: string[];
  heardAboutGetBadged: string | null;
  hasVolunteerExperience: boolean | null;
  volunteerExperienceDetails?: string;
  hasCadetOrCitizensAcademy: boolean | null;
  cadetOrAcademyDetails?: string;
  civilServiceExamStatus?: string;
  hasPriorPublicSafetyExperience: boolean | null;
  priorPublicSafetyDetails?: string;
  credentials: CandidateCredential[];
  hasCompletedFullTimeAcademy: boolean | null;
  academyType?: string;
  academyWhen?: string;
  academyWhere?: string;
  hasPriorPoliceEmployment: boolean | null;
  priorPoliceEmploymentDetails?: string;
  hasActivePostCertification?: boolean | null;
  isPostCertificationGoodStanding?: boolean | null;
  hasMilitaryService: boolean | null;
  isQualifiedVeteran: boolean | null;
  ltcEligibility: "eligible" | "restrictions_may_apply" | null;
  ltcRestrictionDetails?: string;
  socialMediaHandles: SocialMediaHandle[];
  additionalSkills?: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentType =
  | "resume"
  | "post_certificate"
  | "out_of_state_waiver"
  | "dd_214"
  | "college_transcript"
  | "ltc_certificate"
  | "cpr_certificate"
  | "emt_paramedic_certificate"
  | "academy_graduation"
  | "fitness_certificate"
  | "training_certificate"
  | "recommendation_letter"
  | "other";

export type CandidateDocument = {
  id: string;
  candidateProfileId: string;
  documentType: DocumentType;
  label: string;
  fileName: string;
  fileUrl: string;
  mimeType: "application/pdf";
  fileSizeBytes: number;
  uploadedAt: string;
  status: "uploaded" | "required_missing" | "rejected";
};
