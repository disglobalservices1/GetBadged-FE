# Object & Field Registry

This file is the shared contract for frontend mock data, TypeScript types, and later backend DTO/Prisma alignment. Both developers should use these object names and field keys unless a change is intentionally coordinated.

## Rules For Both Devs

- Use these field names in mock data and TypeScript types.
- Do not invent alternate keys like `deptName` if the registry says `departmentName`.
- Add new fields here before using them across multiple task groups.
- Route-specific UI-only state can stay local, but domain data belongs here.
- Boolean fields should start with `is`, `has`, or `can`.
- Date/time fields should end in `At`, `Date`, or `On`.
- IDs should use the pattern `<entity>Id` except the primary `id`.
- Use enum values exactly as listed.

## Ownership

| Domain | Primary Frontend Owner | Notes |
| --- | --- | --- |
| Public department/job browse | Dev A | Consumes department/job objects from shared mocks |
| Candidate profile/application data | Dev A | Must align with department application view |
| Department profile/job/admin data | Dev B | Must expose public-safe versions for Dev A |
| Applicant Pool/Application view | Dev B | Uses candidate/application objects created by Dev A contracts |
| Messages/notifications | Shared | Candidate and department views use same objects |
| Admin/audit/config | Dev B | Shared enums consumed by all |

## Enums

```ts
type UserRole = 'candidate' | 'department_admin' | 'department_user' | 'gb_admin';

type CandidateTrack = 'ELR' | 'CXO' | 'OPS';

type AccountStatus =
  | 'free'
  | 'pending_approval'
  | 'active'
  | 'inactive'
  | 'expired'
  | 'archived'
  | 'blocked';

type ApprovalStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'active'
  | 'revisions_needed'
  | 'inactive'
  | 'closed';

type ApplicationSource = 'direct_application' | 'accepted_badge';

type MembershipStatus = 'none' | 'active' | 'paused' | 'cancelled' | 'expired' | 'inactive';

type BadgeRequestStatus = 'sent' | 'accepted' | 'inactive_candidate' | 'expired_department' | 'superseded_by_direct_apply';

type ExamFormat = 'online' | 'in_person';

type DocumentType =
  | 'resume'
  | 'post_certificate'
  | 'out_of_state_waiver'
  | 'dd_214'
  | 'college_transcript'
  | 'ltc_certificate'
  | 'cpr_certificate'
  | 'emt_paramedic_certificate'
  | 'academy_graduation'
  | 'fitness_certificate'
  | 'training_certificate'
  | 'recommendation_letter'
  | 'other';
```

## User

Owner: Shared auth/session.

```ts
type User = {
  id: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  firstName: string;
  lastName: string;
  phone?: string;
  phoneVerifiedAt?: string;
  avatarUrl?: string;
  departmentId?: string;
  candidateProfileId?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
};
```

Usage:

- Auth mock provider
- Role redirects
- Header account menus
- Admin user management

## CandidateProfile

Owner: Dev A, but Dev B consumes this for Applicant Pool and full application view.

```ts
type CandidateProfile = {
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
  state: 'MA';
  zipCode: string;
  phone: string;
  phoneVerifiedAt?: string;
  email: string;
  dateOfBirth: string;
  last4Ssn: string;

  isUsCitizen: boolean | null;
  hasValidDriversLicense: boolean | null;
  gender: 'male' | 'female' | 'other' | null;
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
  ltcEligibility: 'eligible' | 'restrictions_may_apply' | null;
  ltcRestrictionDetails?: string;

  socialMediaHandles: SocialMediaHandle[];
  additionalSkills?: string;

  createdAt: string;
  updatedAt: string;
};
```

```ts
type CandidateProfileStepKey =
  | 'contact_information'
  | 'personal_information'
  | 'education_preferences'
  | 'training_experience'
  | 'background'
  | 'certifications_credentials'
  | 'essay_responses'
  | 'attachments'
  | 'review_submit';

type CandidateCredential = 'ltc' | 'cpr' | 'emt';

type SocialMediaHandle = {
  platform: 'instagram' | 'facebook' | 'x' | 'linkedin';
  handle: string;
};
```

Protected in Badge Pool:

- `firstName`
- `lastName`
- `streetAddress`
- `phone`
- `email`
- `dateOfBirth`
- `last4Ssn`
- `gender`
- `ethnicity`
- application history

Internal-only for GetBadged:

- `desiredHiringAgencies`
- `currentlyQualifiedFor`
- `heardAboutGetBadged`

## CandidateProfileStepStatus

Owner: Dev A.

```ts
type CandidateProfileStepStatus = {
  stepKey: CandidateProfileStepKey;
  label: string;
  status: 'complete' | 'in_progress' | 'not_started' | 'locked';
  isRequired: boolean;
  completedFields: number;
  totalFields: number;
};
```

## CandidateDocument

Owner: Dev A; consumed by Dev B full application view.

```ts
type CandidateDocument = {
  id: string;
  candidateProfileId: string;
  documentType: DocumentType;
  label: string;
  fileName: string;
  fileUrl: string;
  mimeType: 'application/pdf';
  fileSizeBytes: number;
  uploadedAt: string;
  status: 'uploaded' | 'required_missing' | 'rejected';
};
```

## CandidateEssay

Owner: Dev A; consumed by Dev B full application/export views.

```ts
type CandidateEssay = {
  id: string;
  candidateProfileId: string;
  promptId: string;
  promptText: string;
  response: string;
  wordCount: number;
  updatedAt: string;
};
```

## CandidateMembership

Owner: Dev A for candidate UI; backend later owns Stripe truth.

```ts
type CandidateMembership = {
  id: string;
  candidateProfileId: string;
  track: CandidateTrack;
  status: MembershipStatus;
  startedAt?: string;
  renewsAt?: string;
  expiresAt?: string;
  cancelledAt?: string;
  stripeSubscriptionId?: string;
  planLabel: string;
};
```

## TokenLedgerEntry

Owner: Dev A, shared with payment/admin later.

```ts
type TokenLedgerEntry = {
  id: string;
  candidateProfileId: string;
  eventType:
    | 'exam_purchase_grant'
    | 'membership_renewal_grant'
    | 'top_up_purchase'
    | 'direct_apply'
    | 'badge_accept'
    | 'upgrade_void';
  delta: number;
  balanceAfter: number;
  relatedApplicationId?: string;
  relatedPurchaseId?: string;
  createdAt: string;
  note?: string;
};
```

## Department

Owner: Dev B; Dev A consumes public-safe version.

```ts
type Department = {
  id: string;
  departmentName: string;
  slug: string;
  accountStatus: AccountStatus;
  approvalStatus: ApprovalStatus;
  tier: 'small' | 'medium' | 'large' | 'xl' | 'custom';
  city: string;
  state: 'MA';
  zipCode?: string;
  websiteUrl?: string;
  mainPhone?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  primaryAdminUserId?: string;
  badgeCreditsRemaining: number;
  badgeCreditsSent: number;
  createdAt: string;
  updatedAt: string;
};
```

Public-safe department card:

```ts
type PublicDepartmentSummary = Pick<
  Department,
  'id' | 'departmentName' | 'slug' | 'city' | 'state' | 'logoUrl' | 'coverImageUrl'
> & {
  profileIntro: string;
  activeJobCount: number;
  departmentType: string;
  hiringTimeline: string;
  openPositions: string;
};
```

Public Department Profile mock/detail fields used by public browse:

```ts
type PublicDepartmentProfile = Department & {
  profileIntro: string;
  activeJobCount: number;
  departmentType: string;
  hiringTimeline: string;
  openPositions: string;
  chiefName: string;
  chiefSwornIn: string;
  population: string;
  departmentSize: string;
  patrolOfficers: string;
  callVolume: string;
  communityType: string;
  badgeImageUrl: string;
  whyJoin: string[];
  media: string[];
  sections: DepartmentProfileSection[];
};
```

## DepartmentUser

Owner: Dev B.

```ts
type DepartmentUser = {
  id: string;
  departmentId: string;
  userId: string;
  role: 'department_admin' | 'department_user';
  status: AccountStatus;
  createdAt: string;
};
```

## DepartmentProfile

Owner: Dev B; Dev A consumes public active profiles.

```ts
type DepartmentProfile = {
  id: string;
  departmentId: string;
  status: ApprovalStatus;
  submittedAt?: string;
  submittedByUserId?: string;
  approvedAt?: string;
  approvedByUserId?: string;
  publishedAt?: string;
  adminNotes?: string;
  sections: DepartmentProfileSection[];
  media: MediaAsset[];
  updatedAt: string;
};

type DepartmentProfileSection = {
  id: string;
  sectionKey: string;
  title: string;
  order: number;
  fields: DepartmentProfileFieldValue[];
};

type DepartmentProfileFieldValue = {
  fieldKey: string;
  label: string;
  fieldType: TemplateFieldType;
  value: unknown;
  isRequired: boolean;
};
```

## JobPost

Owner: Dev B; Dev A consumes active jobs.

```ts
type JobPost = {
  id: string;
  departmentId: string;
  departmentName: string;
  status: ApprovalStatus;
  title: string;
  jobType: JobType;
  positionCategory: string;
  city: string;
  state: 'MA';
  employmentType: 'full_time' | 'part_time' | 'contract' | 'other';
  postedAt?: string;
  applicationDeadline?: string;
  hiringTimeline?: string;
  numberOfOpenings?: string;
  minimumRequirements: JobRequirement[];
  preferredRequirements: JobRequirement[];
  salary: SalaryRange;
  benefits: string[];
  responsibilities: string;
  hiringProcess: string[];
  approvalNotes?: string;
  createdAt: string;
  updatedAt: string;
};
```

```ts
type JobType =
  | 'entry_level'
  | 'certified_officer'
  | 'experienced_officer'
  | 'dispatcher_ops'
  | 'specialty_command'
  | 'campus_police'
  | 'corrections'
  | 'deputy_sheriff'
  | 'security'
  | 'court_officer'
  | 'other';

type JobRequirement = {
  id: string;
  label: string;
  requirementType:
    | 'citizenship'
    | 'drivers_license'
    | 'exam_score'
    | 'education'
    | 'residency'
    | 'certification'
    | 'academy'
    | 'experience'
    | 'fitness'
    | 'other';
  value?: string | number | boolean | string[];
  isRequired: boolean;
};

type SalaryRange = {
  startingSalary?: number;
  topStepSalary?: number;
  academySalary?: number;
  payFrequency?: 'hourly' | 'weekly' | 'bi_weekly' | 'monthly' | 'annually';
};
```

Public-safe job browse/detail fields used before backend APIs:

```ts
type PublicJobSummary = Pick<
  JobPost,
  | 'id'
  | 'departmentId'
  | 'departmentName'
  | 'title'
  | 'jobType'
  | 'positionCategory'
  | 'city'
  | 'state'
  | 'employmentType'
  | 'postedAt'
  | 'hiringTimeline'
  | 'numberOfOpenings'
> & {
  departmentSlug: string;
  coverImageUrl?: string;
};

type PublicJobDetail = JobPost & {
  departmentSlug: string;
  departmentLogoUrl?: string;
  departmentCoverImageUrl?: string;
  departmentProfileIntro: string;
  whyJoin: string[];
};
```

## BadgePoolCandidate

Owner: Dev B; built from safe candidate fields.

```ts
type BadgePoolCandidate = {
  id: string;
  candidateProfileId: string;
  track: CandidateTrack;
  city: string;
  state: 'MA';
  distanceMiles?: number;
  isWillingToRelocate: boolean | null;
  isMultilingual: boolean | null;
  highestEducation: string | null;
  hasVolunteerExperience: boolean | null;
  hasCadetOrCitizensAcademy: boolean | null;
  hasMilitaryService: boolean | null;
  hasCompletedFullTimeAcademy: boolean | null;
  academyType?: string;
  hasPriorPoliceEmployment: boolean | null;
  hasPriorPublicSafetyExperience: boolean | null;
  credentials: CandidateCredential[];
  examScorePercent?: number;
  hasActivePostCertification?: boolean | null;
  alreadyBadgedByDepartment: boolean;
  badgeSentAt?: string;
};
```

Never add protected candidate fields to this object.

## BadgeRequest

Owner: Shared. Dev B creates; Dev A accepts.

```ts
type BadgeRequest = {
  id: string;
  candidateProfileId: string;
  departmentId: string;
  departmentName: string;
  jobPostId: string;
  jobType: JobType;
  status: BadgeRequestStatus;
  sentByUserId: string;
  sentAt: string;
  acceptedAt?: string;
  resultingApplicationId?: string;
};
```

## Application

Owner: Shared. Dev A creates direct/accepted applications; Dev B manages department view.

```ts
type Application = {
  id: string;
  candidateProfileId: string;
  departmentId: string;
  departmentName: string;
  jobPostId: string;
  jobTitle: string;
  jobType: JobType;
  source: ApplicationSource;
  status: ApplicationStatusKey;
  submittedAt: string;
  viewedAt?: string;
  archivedAt?: string;
  isNewForDepartment: boolean;
  coverLetterText?: string;
  coverLetterFileUrl?: string;
  badgeRequestId?: string;
  tokenLedgerEntryId?: string;
};
```

```ts
type ApplicationStatusKey =
  | 'new_applicant'
  | 'received_application'
  | 'reviewing_application'
  | 'does_not_meet_requirements'
  | 'initial_contact_made'
  | 'more_info_requested'
  | 'inactive_membership'
  | 'no_longer_meets_requirements'
  | 'hired'
  | 'not_selected'
  | 'candidate_withdrew'
  | 'disqualified'
  | string;
```

Use `string` extension because GB Admin can add statuses.

## DepartmentApplicationView

Owner: Dev B. This is the combined shape for full application review.

```ts
type DepartmentApplicationView = {
  application: Application;
  candidate: CandidateProfile;
  documents: CandidateDocument[];
  essays: CandidateEssay[];
  notes: ApplicationNote[];
  privateFiles: DepartmentPrivateFile[];
  changeLog: ApplicationChangeLogEntry[];
  messages: MessageThreadSummary[];
};
```

UI must hide fields according to Master Checklist and account state.

## ApplicationNote

Owner: Dev B.

```ts
type ApplicationNote = {
  id: string;
  applicationId: string;
  departmentId: string;
  authorUserId: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
};
```

Never visible to candidate.

## DepartmentPrivateFile

Owner: Dev B.

```ts
type DepartmentPrivateFile = {
  id: string;
  applicationId: string;
  departmentId: string;
  uploadedByUserId: string;
  title: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSizeBytes: number;
  uploadedAt: string;
};
```

Never visible to candidate or other departments.

## ApplicationChangeLogEntry

Owner: Shared. Dev A profile changes create; Dev B displays department-specific log.

```ts
type ApplicationChangeLogEntry = {
  id: string;
  applicationId: string;
  candidateProfileId: string;
  fieldKey: string;
  fieldLabel: string;
  previousValue: string;
  newValue: string;
  changedAt: string;
  changedBy: 'candidate' | 'department' | 'system' | 'gb_admin';
};
```

## ExamSitting

Owner: Dev B for admin; Dev A consumes for candidate exam registration.

```ts
type ExamSitting = {
  id: string;
  format: ExamFormat;
  title: string;
  examDate: string;
  examTime: string;
  checkInTime?: string;
  locationName?: string;
  streetAddress?: string;
  city?: string;
  state: 'MA';
  registrationDeadline: string;
  maxQuantity: number;
  registeredCount: number;
  status: 'draft' | 'published' | 'closed' | 'completed' | 'cancelled';
  customConfirmationSendAt?: string;
};
```

Candidate UI must not show:

- `maxQuantity`
- `registeredCount`

## ExamRegistration

Owner: Shared.

```ts
type ExamRegistration = {
  id: string;
  examSittingId: string;
  candidateProfileId: string;
  purchaseId: string;
  status: 'cart_hold' | 'registered' | 'completed' | 'disqualified' | 'cancelled';
  registeredAt?: string;
};
```

## ExamScore

Owner: Dev B admin; Dev A consumes after publish.

```ts
type ExamScore = {
  id: string;
  candidateProfileId: string;
  examSittingId: string;
  scorePercent: number;
  examDate: string;
  isPassing: boolean;
  isPublished: boolean;
  isVerified: boolean;
  importedAt: string;
  publishedAt?: string;
};
```

## MessageThread and Message

Owner: Shared.

```ts
type MessageThread = {
  id: string;
  departmentId: string;
  departmentName: string;
  candidateProfileId: string;
  applicationId?: string;
  subject: string;
  lastMessageAt: string;
  unreadCountForCurrentUser: number;
};

type Message = {
  id: string;
  threadId: string;
  senderUserId: string;
  senderRole: UserRole;
  body: string;
  sentAt: string;
  readAt?: string;
};

type MessageThreadSummary = Pick<
  MessageThread,
  'id' | 'subject' | 'lastMessageAt' | 'unreadCountForCurrentUser'
>;
```

Master Checklist says messaging is two-way. Do not implement one-way-only behavior unless the source of truth changes.

## MessageTemplate

Owner: Dev B.

```ts
type MessageTemplate = {
  id: string;
  departmentId: string;
  createdByUserId: string;
  title: string;
  subject: string;
  body: string;
  lastUsedAt?: string;
  createdAt: string;
  updatedAt: string;
};
```

## Notification

Owner: Shared.

```ts
type Notification = {
  id: string;
  recipientUserId: string;
  recipientRole: UserRole;
  type:
    | 'badge_request_received'
    | 'badge_accepted'
    | 'direct_application_received'
    | 'application_status_changed'
    | 'membership_changed'
    | 'exam_registered'
    | 'exam_reminder'
    | 'score_posted'
    | 'approval_requested'
    | 'approval_returned'
    | 'system';
  title: string;
  body: string;
  linkHref?: string;
  readAt?: string;
  createdAt: string;
};
```

## Purchase

Owner: Shared for UI; backend later owns Stripe events.

```ts
type Purchase = {
  id: string;
  buyerUserId: string;
  buyerType: 'candidate' | 'department';
  productType:
    | 'elr_exam'
    | 'candidate_membership'
    | 'token_pack'
    | 'department_upfront'
    | 'department_membership'
    | 'badge_credit_pack'
    | 'study_guide';
  amountCents: number;
  currency: 'usd';
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled';
  stripeCheckoutSessionId?: string;
  purchasedAt?: string;
};
```

## CreditLedgerEntry

Owner: Dev B.

```ts
type CreditLedgerEntry = {
  id: string;
  departmentId: string;
  eventType:
    | 'tier_grant'
    | 'badge_sent'
    | 'badge_accepted'
    | 'direct_apply_freed_badge'
    | 'top_up_purchase'
    | 'expiration_zeroed';
  delta: number;
  balanceAfter: number;
  badgeRequestId?: string;
  purchaseId?: string;
  createdAt: string;
};
```

Confirm exact credit deduction timing against Master Checklist during implementation.

## AuditLog

Owner: Dev B.

```ts
type AuditLog = {
  id: string;
  actorUserId: string;
  actorRole: UserRole;
  targetType:
    | 'user'
    | 'candidate_profile'
    | 'department'
    | 'department_profile'
    | 'job_post'
    | 'application'
    | 'exam'
    | 'score'
    | 'message'
    | 'payment'
    | 'impersonation'
    | 'system';
  targetId: string;
  action: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
};
```

## Dynamic Template Schema

Owner: Dev B; Dev A may consume for candidate profile later.

```ts
type TemplateFieldType =
  | 'text_short'
  | 'text_long'
  | 'number'
  | 'number_range'
  | 'date'
  | 'date_range'
  | 'dropdown'
  | 'multi_select'
  | 'checkbox'
  | 'yes_no'
  | 'repeatable_list'
  | 'rich_text'
  | 'file_upload'
  | 'image_upload'
  | 'url'
  | 'system';

type TemplateSection = {
  id: string;
  templateType: 'candidate_profile' | 'department_profile' | 'job_post';
  sectionKey: string;
  title: string;
  order: number;
  isActive: boolean;
};

type TemplateField = {
  id: string;
  sectionId: string;
  fieldKey: string;
  label: string;
  fieldType: TemplateFieldType;
  isRequired: boolean;
  options?: string[];
  helpText?: string;
  visibilityRules?: Record<string, unknown>;
  order: number;
  isActive: boolean;
};
```

## Mock File Map

Use these mock files when implementation starts:

```txt
lib/mock/users.ts
lib/mock/candidates.ts
lib/mock/candidateProfileSteps.ts
lib/mock/candidateDocuments.ts
lib/mock/departments.ts
lib/mock/departmentProfiles.ts
lib/mock/jobs.ts
lib/mock/badgePool.ts
lib/mock/badgeRequests.ts
lib/mock/applications.ts
lib/mock/exams.ts
lib/mock/messages.ts
lib/mock/notifications.ts
lib/mock/payments.ts
lib/mock/auditLogs.ts
lib/mock/templates.ts
```

## Shared Type File Map

Use these files when implementation starts:

```txt
types/auth.ts
types/candidate.ts
types/department.ts
types/job.ts
types/application.ts
types/badge.ts
types/exam.ts
types/message.ts
types/notification.ts
types/payment.ts
types/admin.ts
types/template.ts
```

## Conflict Prevention Checklist

Before adding a field:

- Check this registry first.
- Check if another dev owns that domain.
- Add the field here if it is shared.
- Update mock data and type file together.
- Add a note in `05-progress-tracker.md` if it affects both devs.

Before changing a field:

- Search the repo for the old field key.
- Confirm which task groups use it.
- Update the registry first.
- Make a single coordinated refactor.
