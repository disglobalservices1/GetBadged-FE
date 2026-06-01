# User Roles

## Role Overview

| Role | Dashboard | Description |
| --- | --- | --- |
| Visitor | No authenticated dashboard | Public user browsing GetBadged |
| Candidate | Candidate dashboard | Person seeking public-safety employment |
| Department Admin | Department dashboard | Primary department account administrator |
| Department User | Department dashboard | Department team member with nearly same permissions except messaging limitations |
| GB Admin | GB Admin dashboard | GetBadged platform administrator |

## Candidate Tracks

### ELR: Entry-Level Recruit

Purpose:

- Candidate seeking entry-level law-enforcement pathway.

Core requirements:

- Active membership/exam requirements per Master Checklist
- Complete profile
- SMS-verified phone
- Resume uploaded
- Passing valid exam score where required

Core capabilities:

- Complete profile wizard
- Upload documents
- Register for exam
- View score/status after publishing
- Browse jobs
- Apply to eligible jobs
- Receive and accept Badge Requests
- View submitted applications
- Message departments

### CXO: Certified / Experienced Officer

Purpose:

- Candidate with certification/experience seeking lateral or advanced roles.

Core requirements:

- Active membership
- Complete profile
- SMS-verified phone
- Resume uploaded
- POST certificate or out-of-state waiver where required
- CXO attestations where required

Core capabilities:

- Complete profile
- Upload required certifications
- Browse and apply to eligible roles
- Appear in Badge Pool when eligible
- Receive and accept Badge Requests
- Message departments

### OPS: Other Public Safety

Purpose:

- Candidate seeking dispatcher, security, or other public-safety roles.

Core requirements:

- Active membership
- Complete profile
- SMS-verified phone
- Resume uploaded

Core capabilities:

- Browse and apply to eligible OPS roles
- Appear in Badge Pool when eligible
- Upgrade to ELR or CXO according to rules
- Receive and accept Badge Requests
- Uses the CXO dashboard layout/options unless client later specifies OPS-only differences

## Candidate Account States

| State | Meaning | UI Behavior |
| --- | --- | --- |
| Free | Account exists without purchase/membership | Limited dashboard, profile allowed, apply/badge eligibility blocked |
| Incomplete | Missing profile/docs/verification | Show eligibility checklist and blockers |
| Active | Meets track requirements | Can apply, receive/accept Badges, appear in Badge Pool |
| Inactive | Membership lapsed/cancelled/expired | Applications auto-status as required, Badge acceptance blocked |
| Archived | Inactive long enough for archival rule | Hidden from departments |

Department visibility note:

- For inactive/cancelled/expired candidates, candidate contact information remains visible to active departments only until the 90-day grace period ends, or until the department expires, whichever comes first.
- After that point, contact information is hidden from department application view, print, download, export, and messaging.

## Department Roles

### Department Admin

Core capabilities:

- Receive notifications
- View dashboards
- Edit Department Profile answers
- Create/edit Job Posts
- Submit profile/jobs for approval
- Browse Badge Pool
- Send Badge Requests
- View Applicant Pools
- View full applications
- Update statuses
- Archive/unarchive applicants
- Record department notes
- Upload department-private files
- Send messages
- Create/save message templates
- Export reports/data
- Renew/manage membership where allowed

### Department User

Core capabilities:

- Similar to Department Admin for most recruiting actions
- Can edit Department Profile and Job Posts
- Can browse Badge Pool and send Badge Requests if allowed by Master Checklist
- Can view applications, update statuses, archive, export, upload private files
- Can view message history and templates
- Cannot send messages or create/save templates unless client confirms otherwise

Primary difference:

- Department Admin has message sending/template creation permission where Department User is restricted.

## Department Account States

| State | Meaning | UI Behavior |
| --- | --- | --- |
| Pending Approval | Self-registered department not yet approved | Waiting dashboard, limited access |
| Active | Approved and paid/valid | Full tier-based access |
| Expired/Inactive | Membership expired/lapsed | Restricted actions, contact info hidden where required |
| Revisions Needed | Profile/job returned by GB Admin | Show admin notes and resubmit action |

Expired department restrictions:

- Can view/export applications, but contact information is hidden.
- Cannot receive notifications/messages.
- Cannot send messages.
- Cannot update application statuses.
- Cannot send Badge Requests.
- Candidates cannot accept Badges from expired departments.

## GB Admin

Purpose:

- Full GetBadged platform control.

Core capabilities:

- View and manage all users
- Approve/reject departments
- Approve/reject/return Department Profiles
- Approve/reject/return Job Posts
- Manage candidate and department records
- Impersonate users
- View audit logs
- Manage exam dates
- Generate rosters
- Import and publish scores
- Manage profile/job templates and dynamic fields
- Configure job exam requirement Y/N and minimum exam-score requirement
- Manage application statuses
- Manage CMS/resources/news/statistics
- View all reports and exports
- View platform notifications

## Permission Boundaries

- Departments never see candidate Badge Pool protected fields before consent.
- Departments never see where else a candidate applied.
- One department never sees another department's notes, files, messages, or application logs.
- Candidate never sees department notes or department-private files.
- Candidate sees their own application history.
- GB Admin can see/manage everything, but impersonation must be logged.
