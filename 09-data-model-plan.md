# Data Model Plan

This is a planning model for the future NestJS/Prisma backend. It is not final schema code yet.

## Core Entities

### User

Fields:

- id
- email
- supabaseAuthId
- role
- status
- firstName
- lastName
- phone
- phoneVerifiedAt
- createdAt
- updatedAt
- lastLoginAt

Relations:

- candidateProfile
- departmentMemberships
- auditLogs

### CandidateProfile

Fields:

- id
- userId
- track
- status
- completionPercent
- firstName
- lastName
- address fields
- dateOfBirth
- last4Ssn
- citizenship fields
- license fields
- gender
- ethnicity
- education
- language fields
- relocation
- desiredHiringAgencies
- currentlyQualifiedFor
- hearAboutGetBadged
- training/experience fields
- CXO attestations
- background fields
- additionalSkills
- createdAt
- updatedAt

Relations:

- user
- memberships
- documents
- essays
- examRegistrations
- examScores
- applications
- badgeRequests
- tokenLedgerEntries
- profileChangeLogs

### CandidateEssay

Fields:

- id
- candidateProfileId
- promptKey
- promptText
- response
- wordCount
- createdAt
- updatedAt

Rules:

- Prompt can be selected once per candidate profile.
- Word limit enforced.

### CandidateDocument

Fields:

- id
- candidateProfileId
- documentType
- fileName
- storagePath
- mimeType
- size
- uploadedAt
- status

Rules:

- PDF only for candidate support docs.
- Multiple files per category.

### Membership

Fields:

- id
- ownerType
- candidateProfileId
- departmentId
- track
- stripeCustomerId
- stripeSubscriptionId
- status
- startsAt
- renewsAt
- endsAt
- cancelledAt
- pausedAt
- createdAt
- updatedAt

Rules:

- Stripe is source of truth.
- Candidate and department memberships may have different plans.

### ProductPurchase

Fields:

- id
- buyerUserId
- buyerType
- productType
- stripeCheckoutSessionId
- stripePaymentIntentId
- amount
- currency
- status
- purchasedAt
- metadata

Examples:

- ELR exam
- Token top-up
- Department upfront package
- Badge credit top-up

### TokenLedgerEntry

Fields:

- id
- candidateProfileId
- eventType
- delta
- balanceAfter
- sourcePurchaseId
- applicationId
- notes
- createdAt

Rules:

- Direct Apply consumes 1 token.
- Badge Accept consumes 0 tokens.
- Grants/top-ups follow Master Checklist.

### Department

Fields:

- id
- name
- slug
- status
- tier
- primaryContactUserId
- address fields
- phone
- website
- stripeCustomerId
- createdAt
- updatedAt
- approvedAt

Relations:

- users
- profile
- jobPosts
- badgeRequests
- applications
- messages
- creditLedgerEntries

### DepartmentUser

Fields:

- id
- departmentId
- userId
- role
- status
- createdAt

Rules:

- Department Admin and Department User share most permissions.
- Department Admin has message-send permission where restricted.

### DepartmentProfile

Fields:

- id
- departmentId
- status
- submittedAt
- submittedByUserId
- approvedAt
- approvedByUserId
- publishedAt
- adminNotes
- version
- createdAt
- updatedAt

Relations:

- sections
- media
- changeLogs

### DepartmentProfileSection

Fields:

- id
- departmentProfileId
- templateSectionId
- title
- order
- isVisible

### DepartmentProfileFieldValue

Fields:

- id
- departmentProfileSectionId
- templateFieldId
- valueJson
- updatedByUserId
- updatedAt

### MediaAsset

Fields:

- id
- ownerType
- ownerId
- fileName
- storagePath
- mimeType
- size
- altText
- createdAt

Examples:

- Department photos
- Department short videos

### JobPost

Fields:

- id
- departmentId
- status
- title
- jobType
- positionCategory
- location fields
- requirementsJson
- benefitsJson
- salaryJson
- scheduleJson
- responsibilities
- hiringProcessJson
- submittedAt
- submittedByUserId
- approvedAt
- approvedByUserId
- publishedAt
- closedAt
- adminNotes
- createdAt
- updatedAt

Relations:

- applications
- badgeRequests
- template values

### Application

Fields:

- id
- candidateProfileId
- departmentId
- jobPostId
- jobType
- source
- status
- membershipStatusAtSubmit
- submittedAt
- viewedAt
- archivedAt
- coverLetterText
- coverLetterStoragePath
- tokenLedgerEntryId

Source values:

- direct
- accepted_badge

Rules:

- One application per candidate, department, and job type.
- Candidate sees own application history.
- Departments see only their own applications.

### ApplicationStatusHistory

Fields:

- id
- applicationId
- previousStatus
- newStatus
- changedByUserId
- changedByRole
- reason
- createdAt

### ApplicationNote

Fields:

- id
- applicationId
- departmentId
- authorUserId
- body
- createdAt
- updatedAt

Rules:

- Never visible to candidate.

### DepartmentPrivateFile

Fields:

- id
- applicationId
- departmentId
- uploadedByUserId
- title
- storagePath
- fileName
- mimeType
- size
- createdAt

Rules:

- Visible only to same department.

### ProfileChangeLog

Fields:

- id
- candidateProfileId
- applicationId
- fieldKey
- previousValue
- newValue
- changedAt

Rules:

- Department sees change log only for its application.
- Candidate does not see department-facing change log.

### BadgeRequest

Fields:

- id
- candidateProfileId
- departmentId
- jobPostId
- jobType
- status
- sentByUserId
- sentAt
- acceptedAt
- expiredAt
- creditReserved
- creditLedgerEntryId

Rules:

- No Decline state exposed to candidate.
- Accept creates application.
- Candidate direct apply to same department/job frees outstanding Badge.

### CreditLedgerEntry

Fields:

- id
- departmentId
- eventType
- delta
- balanceAfter
- badgeRequestId
- purchaseId
- notes
- createdAt

Rules:

- Credit pack size needs confirmation.
- Master Checklist controls send/accept deduction behavior.

### ExamSitting

Fields:

- id
- title
- format
- date
- time
- checkInTime
- location
- maxQuantity
- registrationDeadline
- customConfirmationSendAt
- status
- createdAt
- updatedAt

### ExamRegistration

Fields:

- id
- examSittingId
- candidateProfileId
- purchaseId
- status
- registeredAt
- checkedInAt
- cancelledAt

### ExamScore

Fields:

- id
- candidateProfileId
- examSittingId
- score
- scorePercent
- examDate
- isPublished
- verifiedByUserId
- publishedAt
- importedAt
- importBatchId

Rules:

- Most recent score behavior follows Master Checklist.
- Publishing blocked or disqualifies if profile incomplete per Master Checklist.

### MessageThread

Fields:

- id
- departmentId
- candidateProfileId
- applicationId
- subject
- createdAt
- updatedAt

### Message

Fields:

- id
- threadId
- senderUserId
- senderRole
- body
- sentAt
- readAt

Rules:

- Two-way messaging per Master Checklist.
- Recipient visibility is BCC-style for bulk messages.

### MessageTemplate

Fields:

- id
- departmentId
- createdByUserId
- title
- subject
- body
- visibility
- createdAt
- updatedAt

### Notification

Fields:

- id
- recipientUserId
- recipientRole
- type
- title
- body
- readAt
- linkUrl
- createdAt

### AuditLog

Fields:

- id
- actorUserId
- actorRole
- targetType
- targetId
- action
- metadataJson
- ipAddress
- userAgent
- createdAt

Examples:

- Impersonation start/end
- Status change
- Profile edit
- Admin approval
- Payment webhook
- File upload

### TemplateSection

Fields:

- id
- templateType
- title
- order
- isActive

Template types:

- candidate_profile
- department_profile
- job_post

### TemplateField

Fields:

- id
- sectionId
- key
- label
- fieldType
- required
- optionsJson
- visibilityRulesJson
- order
- isActive

## Backend Notes

- Prisma should model strict relations and unique constraints.
- Supabase RLS should enforce department boundaries in addition to backend authorization.
- Stripe webhooks should create ledger entries.
- SendGrid email events can update notification/message status where required.
- Twilio verification should update `phoneVerifiedAt`.

## Important Constraints

- Unique application: candidate + department + job type.
- Department-private files scoped by department.
- Candidate application history private from other departments.
- Badge Pool query must exclude protected fields.
- Audit logs should be append-only.
