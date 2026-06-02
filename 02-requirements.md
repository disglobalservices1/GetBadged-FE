# Requirement Set

## Global Requirements

- Use a single Next.js App Router frontend for public, candidate, department, and GB Admin experiences.
- Use TypeScript.
- Build frontend with mock data first.
- Use role-based routing and navigation.
- Use Supabase Auth for login, account creation, session handling, and role-aware redirects.
- Use backend REST API contracts as planned interfaces, even before backend is built.
- Use Stripe as source of truth for purchases, memberships, subscriptions, tokens, and badge credits.
- Use Supabase Storage for documents, images, and videos.
- Use SendGrid for transactional email.
- Use Twilio for SMS phone verification.
- Use Massachusetts-only behavior in MVP, while designing filters so state expansion can be added later.
- Treat `MASTER GetBadged Dev Checklist | 1st june.pdf` as the current source of truth.
- Brand text must use `GetBadged` as one word with capital `G` and capital `B`.

## Public Website

- Show GetBadged brand, public landing pages, about/resources, department listings, job listings, Department Profile pages, and job detail pages.
- Visitors can browse public jobs and departments.
- Visitors can start candidate signup, department signup, login, and purchase flows.
- Public job pages must show job details, minimum requirements, department information, and apply entry point.
- Public Department Profile pages must show approved and active department content only.

## Auth & Account

- One shared login page for all roles.
- Email-based login only.
- No username login.
- Candidate free account is allowed before purchase.
- Free candidate account gets limited dashboard access.
- Applying, Badge Pool eligibility, Badge acceptance, and track activation remain blocked until relevant membership, exam, profile, document, and verification requirements are satisfied.
- Candidate phone verification occurs during profile completion, not at initial account creation.
- Session timeout behavior: use Master Checklist if implemented in detail. If unresolved in UI phase, implement idle warning modal and logout behavior as a frontend state.
- June 1 conflict note: one checklist area mentions 10-minute inactivity handling, while the open-item response says 15-minute idle warning/logout. Confirm final duration before backend implementation.
- Password rule baseline: minimum 8 characters, 1 uppercase letter, 1 number, and 1 special character.

## Candidate Tracks

### ELR

- Entry-Level Recruit.
- Must complete profile and required documents.
- Must register for and sit GetBadged entry exam.
- Must have passing valid score to be active for applications and Badge Pool.
- Exam score validity and membership behavior follow Master Checklist.

### CXO

- Certified / Experienced Officer.
- Must complete profile and required documents.
- Must upload POST certificate or out-of-state waiver if applicable.
- Must satisfy CXO attestations.
- Can apply to permitted job types per Master Checklist.

### OPS

- Other Public Safety.
- Must complete profile and resume.
- Can apply to OPS/Dispatcher permitted roles.
- Can upgrade to ELR or CXO according to Master Checklist.
- OPS member dashboard should follow the CXO dashboard layout/options unless a later client design specifies differences.

## Candidate Profile

- Multi-step wizard with autosave.
- Save and exit behavior.
- Progress panel with completion percentage and per-section status.
- Required and optional fields vary by track.
- Essay questions support choosing unique prompts, with word limits per Master Checklist.
- Profile changes after application submission must be logged for department view.
- Candidate can edit profile, but department-facing records must show change logs where required.
- ELR dashboard should expose an ELR to CXO upgrade path when eligible.
- OPS dashboard should expose an OPS to ELR upgrade path when eligible.

## Candidate Documents

- Upload PDFs only for document categories required by Master Checklist.
- Multiple files per category are allowed.
- Resume is required before applications become active.
- CXO requires POST certificate or waiver when applicable.
- Documents are private and accessed via signed or authorized URLs.

## Exam Registration & Scores

- ELR-only exam workflow.
- Exam dates listed chronologically.
- Seat capacity is not shown to candidates.
- Cart or registration holds must release according to Master Checklist rules.
- GB Admin manages exam dates, deadlines, rosters, score imports, and score publishing.
- Candidate sees score only after admin verification/publishing.
- Score display and validity follow Master Checklist.

## Payments, Tokens, Credits

- Candidate direct application consumes 1 application token after validation and submission.
- Accepting a Badge Request never consumes candidate tokens.
- Candidate token balance appears on dashboard and at point of apply.
- Token purchases and grants follow Master Checklist.
- Department badge credits follow Master Checklist.
- Department credit pack size is `Needs Client Confirmation`.
- Candidate 4-pack top-up is `$80 / 4` tokens per June 1 checklist.
- Department low badge-credit warning appears at 2 credits.
- Department has a hard stop at zero badge credits until additional badge pack purchase.
- Department badge-credit pack remains conflicting/unresolved because the latest checklist references `$200 / 20` and final review references both `$100 / 10` and `$200 / 20`.

## Department Registration

- Departments can self-register.
- Department account waits for GB Admin approval before full activation.
- Department Profile and Job Posts require GB Admin approval before public visibility.
- Department Admin and Department User can both edit profile/job post answers.

## Department Profile

- Draft, submit for approval, approved/active, revisions needed, inactive states.
- GB Admin can approve, reject, return for edits, publish, archive, or deactivate.
- Department media includes images and short videos where supported.
- Field/template management should be planned as dynamic, even if frontend starts with mock schemas.
- GB Admin can create/hide profile sections, add/edit/reorder fields, set field type, display label, required status, permissions, and display order.
- Department Admin/User can access profile templates and job templates.
- Profile field edits require version/change log tracking.

## Job Posts

- Department Admin and Department User can create and edit job posts from templates.
- Job posts require GB Admin approval before public visibility.
- Job post status includes draft, pending approval, approved, active, revisions needed, closed, inactive.
- Job fields and templates should be planned as dynamic.
- Job eligibility rules must drive apply eligibility checks.
- GB Admin can add/remove/rename job post fields and sections without developer support.
- GB Admin can set exam requirement Y/N per job.
- GB Admin can set minimum passing exam score per job; default is 70%, cannot be lower than 70%, can be higher.

## Badge Pool

- Anonymous candidate pool for departments.
- Candidate name, phone, street address, ethnicity, age/DOB, gender, last 4 SSN, citizenship/work authorization, application history, and other protected data are not visible before consent.
- Departments can filter using dropdowns/sub-dropdowns only.
- Department can send Badge Requests tied to a job type.
- Candidate can accept or ignore; no Decline button.
- On acceptance, full application package is released to that department.
- Two-way privacy boundaries must be enforced in UI and later backend authorization.

## Direct Applications

- Candidate can apply to eligible job posts based on track and requirements.
- Minimum requirements display before consent/apply action.
- Consent checkbox required.
- Optional cover letter per application.
- Candidate cannot apply twice to the same job type at the same department.
- Direct applications enter the relevant department Applicant Pool.

## Applicant Pool & Application View

- Department sees per-job Applicant Pools and combined pool.
- Pool rows are sortable and filterable.
- New applications are flagged until viewed.
- Full application view includes candidate profile, documents, cover letter, essay responses, notes, private department files, status, source, and change log.
- Department notes and private files are never visible to candidate or other departments.
- Applicant Pool column view includes phone and email when allowed by membership/department state.
- Essay responses, supporting document links, social media handles, and additional skills are full-application-only and not shown in Applicant Pool column summary or Badge Pool.
- Candidate contact info is hidden from department application view, print, download, export, and messaging after 90 days from inactive/lapse/cancellation/expiration or when the department expires, whichever comes first.
- Department application view should show countdown/hover messaging before contact access expires.

## Status Pipeline & Archive

- Application status starts as `New Applicant`.
- Department Admin and User can update status.
- Candidate sees status updates in real time or mock real-time in frontend phase.
- Department can archive/unarchive one, multiple, or all candidates.
- Archived candidates are hidden from new message recipient selection.
- Exports include archive status where applicable.

## Messaging

- Follow Master Checklist: two-way candidate and department messaging.
- Department Admin can send messages.
- Department User can view history and template bank but cannot send unless Master Checklist says otherwise for a specific action.
- Candidate can respond through platform.
- Message history belongs to the department, not a single department user.
- Recipients should not see other recipients.
- Read/open status and message history are tracked where required.
- Archived candidates do not appear in new-message recipient selection.
- Inactive candidates do not appear in new-message recipient selection after the 90-day grace period or department expiration.
- Department User can view template library; sending and creating/saving templates remain Department Admin-only unless confirmed otherwise.

## Notifications

- Candidate notification center.
- Department notification center.
- GB Admin notification center.
- Email notifications through SendGrid.
- SMS verification through Twilio.
- Events include purchases, exam reminders, Badge Requests, Badge acceptance, application receipt, status changes, membership changes, admin approvals, and score posting.

## Exports & Reports

- CSV exports for MVP.
- Applicant Pool per-job export.
- Combined Applicant Pool export.
- Filtered export.
- Field selection before export.
- Archived candidate export.
- GB Admin exports for users, mailing list, purchases, exam rosters, scores, and admin metric drilldowns.
- Application print/download can start as browser print/download in frontend phase and be backed by API/PDF generation later if needed.
- Expired departments may export data, but contact information must be hidden in the export.
- GB Admin-only exports include contact-info expiration data and exam attendance rosters.

## GB Admin

- Full platform management.
- Approvals for departments, profiles, job posts.
- User and role management.
- Candidate and department view/impersonation.
- Impersonation audit logs.
- Exam management.
- Score import and publishing.
- Dynamic field/template management.
- Department profile dynamic sections/fields.
- Job post dynamic sections/fields and exam-score requirement configuration.
- Status pipeline management.
- CMS/content management.
- Reports, exports, and audit logs.

## Privacy, Audit, Compliance

- Archive inactive accounts after 30 days.
- Permanent deletion period is `Needs Client Confirmation`.
- Log profile edits, application changes, status changes, payment events, admin actions, department actions, messaging events, file uploads, and impersonation.
- Last 4 SSN and sensitive fields require elevated handling in backend planning.
- Department data boundaries must be explicit in route structure and mock data.
- Department application change log is never visible to the candidate and is scoped to the department's own application record.
