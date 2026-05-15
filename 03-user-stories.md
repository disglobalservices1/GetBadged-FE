# User Stories

These stories are written for frontend-first MVP delivery with mock data. Each story includes the expected behavior and acceptance criteria so UI work can begin before the API is available.

## Visitor Stories

### V-01 Browse Public Site

As a visitor, I want to understand what GetBadged does so I can decide whether to join as a candidate or department.

Acceptance criteria:

- Visitor can reach public home, about, resources, department listing, job listing, login, candidate signup, and department signup.
- Public copy uses correct terms: candidates Apply, departments Badge.
- Public pages do not expose private candidate data.
- CTA buttons route to appropriate signup or browse flows.

### V-02 Browse Departments

As a visitor, I want to browse public Department Profiles so I can learn about agencies before applying.

Acceptance criteria:

- Only approved and active Department Profiles appear.
- Department cards show public summary information.
- Department detail page shows approved profile sections, media, active job posts, and contact/support prompts.
- Inactive or draft profiles are not visible.

### V-03 Browse Jobs

As a visitor, I want to browse available job posts so I can find roles that match my track.

Acceptance criteria:

- Jobs list supports search and dropdown filters.
- State defaults to Massachusetts for MVP.
- Job detail shows department, job type, requirements, benefits/pay summary, hiring process, and Apply CTA.
- If visitor is not logged in, Apply routes to signup/login.

## Auth Stories

### A-01 Shared Login

As any user, I want one login page so I can access the right dashboard based on my role.

Acceptance criteria:

- Login accepts email and password only.
- Successful login redirects by role: Candidate, Department Admin/User, or GB Admin.
- Login shows useful errors for invalid credentials.
- Legacy username copy is supported if required later.

### A-02 Candidate Free Account

As a candidate, I want to create a free account before purchase so I can start my profile and explore the platform.

Acceptance criteria:

- Candidate can sign up without purchasing.
- Candidate lands in limited candidate dashboard.
- Dashboard shows what is locked or incomplete.
- Candidate cannot Apply, accept Badges, or enter Badge Pool until membership and track requirements are satisfied.

### A-03 Department Self Registration

As a department representative, I want to register my department so GetBadged can approve and activate my account.

Acceptance criteria:

- Department signup collects department name, contact details, admin user details, and requested plan/tier if available.
- Submitted department account enters pending approval state.
- Pending department user sees a waiting/approval dashboard.
- GB Admin receives approval task in mock admin data.

## Candidate Dashboard Stories

### C-01 Candidate Dashboard Overview

As a candidate, I want a dashboard summary so I can see my membership, token balance, profile progress, applications, and Badge Requests.

Acceptance criteria:

- Dashboard adapts to ELR, CXO, OPS, and free/inactive states.
- Token balance is visible.
- Point-of-apply token balance is also visible.
- Dashboard shows profile completion, membership status, open applications, Badge Requests, recent activity, and next actions.
- Ineligible users see clear blockers without exposing backend-only logic.

### C-02 Profile Wizard With Autosave

As a candidate, I want a multi-step profile wizard that autosaves so I can complete my application over time.

Acceptance criteria:

- Wizard uses left step navigation and right progress panel similar to reference design.
- Sections include contact, personal, education/preferences, training/experience, background, certifications/credentials, essay responses, attachments, review/submit.
- Current step, completed steps, locked steps, and not-started steps are visually distinct.
- Autosave state displays last saved time.
- Save and Exit returns to dashboard.
- Required fields are validated per track.

### C-03 Phone Verification

As a candidate, I want to verify my phone by SMS during profile completion so my profile can become eligible.

Acceptance criteria:

- Phone field supports verification status.
- Twilio integration is represented by mock send-code and verify-code interactions.
- Unverified phone blocks active eligibility.
- Verification can be retried.

### C-04 Essay Responses

As a candidate, I want to answer optional essay prompts so departments can review fuller context after I apply or accept a Badge.

Acceptance criteria:

- Candidate can choose up to the required number of prompts from the Master Checklist.
- Once a prompt is selected, it is removed from available options.
- Word limit is enforced.
- Essays are not shown in Badge Pool or Applicant Pool column view.
- Essays appear in full application view, print/download, and exports after consent.

### C-05 Supporting Documents

As a candidate, I want to upload supporting documents by category so my applications can become active.

Acceptance criteria:

- Upload UI uses category dropdown.
- PDF-only validation is shown in UI.
- Multiple files per category are displayed as numbered links.
- Required document gaps are shown in eligibility checklist.
- Resume required for all tracks.
- CXO-specific POST/waiver requirements appear only where relevant.

### C-06 ELR Exam Registration

As an ELR candidate, I want to register for an exam date so I can become eligible for the Badge Pool and applications.

Acceptance criteria:

- Exam dates appear chronologically.
- Seat quantity is never shown.
- Registration deadline text includes sell-out language if required by Master Checklist.
- Checkout and acknowledgement states are represented in mock flow.
- Candidate dashboard shows exam date and validity date once registered/scored.

### C-07 Browse Jobs as Candidate

As a candidate, I want to browse jobs and see whether I am eligible to apply.

Acceptance criteria:

- Candidate sees public jobs plus personalized eligibility indicators.
- Ineligible jobs show reason or requirements without allowing Apply.
- Eligible jobs show Apply CTA.
- Candidate can filter by job type, department, location, and qualification fields using dropdown UI.

### C-08 Direct Apply

As a candidate, I want to apply directly to a job using one token so the department receives my application package.

Acceptance criteria:

- Minimum requirements display directly above consent checkbox.
- Candidate must check consent before applying.
- Token balance shown before submit.
- Submit consumes one mock token.
- Optional cover letter can be attached or typed according to UI decision.
- Candidate cannot apply again to the same job type at the same department.
- Successful application appears in Submitted Applications.

### C-09 Badge Requests

As a candidate, I want to review Badge Requests and accept those I am interested in.

Acceptance criteria:

- Badge Requests list shows department, job type, date received, and Accept action.
- No Decline button exists.
- Accept is hidden or disabled if candidate membership is inactive or department is expired.
- Accepting a Badge costs zero candidate tokens.
- Accepted Badge becomes a Submitted Application with source `Badge Accepted / [Job Type]`.

### C-10 Submitted Applications

As a candidate, I want to track all applications I submitted or accepted through Badges.

Acceptance criteria:

- Table columns include date submitted, department, position, application status, and application source.
- Status updates appear in UI using mock real-time state.
- Candidate can see their own full application history.
- Candidate never sees department notes or department-private files.

### C-11 Candidate Messaging

As a candidate, I want to receive and respond to department messages so communication stays inside GetBadged.

Acceptance criteria:

- Candidate sees message inbox and thread/detail view.
- Candidate can reply according to Master Checklist two-way messaging.
- Candidate does not see other recipients.
- Candidate does not see department internal read/admin metadata unless required.

## Department Stories

### D-01 Department Pending Approval

As a newly registered department, I want to see that my account is pending approval so I know what happens next.

Acceptance criteria:

- Pending dashboard blocks full department features.
- Pending screen explains that GB Admin approval is required.
- Contact/support option is visible.

### D-02 Department Dashboard Overview

As a Department Admin or User, I want a dashboard summary so I can manage jobs, applicants, Badges, messages, and profile status.

Acceptance criteria:

- Dashboard shows plan/tier status, active jobs, applicant counts, badge credits, profile/job approvals, recent activity, and notifications.
- Expired department state hides or disables restricted actions per Master Checklist.
- Role-specific permissions are visible in UI affordances.

### D-03 Department Profile Builder

As a department user, I want to build and edit a Department Profile so candidates can learn about my agency.

Acceptance criteria:

- Department Admin and Department User can edit profile answers.
- Draft save is supported.
- Submit for approval sends profile to GB Admin queue.
- Approved profiles become public.
- Revisions Needed state shows admin notes.
- GB Admin controls schema/fields later; frontend mock schema should be data-driven.

### D-04 Job Post Builder

As a department user, I want to create job posts from templates so candidates can apply to open roles.

Acceptance criteria:

- Department Admin and Department User can create/edit job post content.
- Job post can be saved as draft.
- Submit for approval sends to GB Admin queue.
- Public visibility requires GB Admin approval.
- Job post uses structured fields for category, requirements, pay, benefits, responsibilities, and hiring process.
- Eligibility requirements are represented in data for candidate apply checks.

### D-05 Badge Pool Browse

As a department user, I want to browse anonymous candidates so I can send Badge Requests to strong prospects.

Acceptance criteria:

- Badge Pool never shows protected private fields.
- Pool has track tabs or dropdowns for ELR, CXO, OPS.
- Filters are dropdown/sub-dropdown only.
- Radius/distance filter can be mocked if geocoding is not built yet.
- Badge count and remaining credits are visible.
- Candidate rows expose only allowed summary fields.

### D-06 Send Badge Request

As a department user, I want to send a Badge Request tied to a job type so the candidate can decide whether to share their full application.

Acceptance criteria:

- User selects job type before sending.
- UI prevents sending if no credits remain.
- After send, Badge button becomes `Badge sent on [date]`.
- Candidate remains anonymous until accepted.
- Credit behavior follows Master Checklist.

### D-07 Applicant Pool

As a department user, I want to view applicants per job and across all jobs so I can manage hiring.

Acceptance criteria:

- Per-job Applicant Pool includes direct applications and accepted Badges.
- Combined pool can filter by job type.
- Table columns follow Master Checklist.
- Columns are sortable.
- New flag appears until viewed.
- Demographic aggregate stats appear at pool level where required.
- Filters include job type, date, status, qualifications, last name/email search, and date range.

### D-08 Full Candidate Application View

As a department user, I want to open a full application so I can review profile, documents, essays, notes, status, and change logs.

Acceptance criteria:

- Header shows candidate name, job type, source, date/time received, status, track, membership status.
- Sections match candidate profile structure.
- Documents appear as clickable links.
- Essays appear only in full view, print/download, and exports.
- Department notes are editable and hidden from candidate.
- Department-private file uploads are visible only to that department.
- Candidate profile edits after submission appear in change log.

### D-09 Application Status Updates

As a department user, I want to update applicant status so candidates and my team know where the application stands.

Acceptance criteria:

- Status can be edited from pool row and full application view.
- Bulk selection UI supports one, multiple, or all selected applicants.
- Candidate sees status update in their Submitted Applications.
- Status changes are logged.
- Auto-status states are represented in mock data.

### D-10 Archive Applicants

As a department user, I want to archive and unarchive applicants so my pool stays organized.

Acceptance criteria:

- One, multiple, and all archive actions are supported in UI.
- Archived filter supports Archived, Unarchived, All.
- Archived candidates are excluded from active application counts where required.
- Archived candidates do not appear in new message recipient selection.
- Exports can include archived candidates.

### D-11 Department Messaging

As a Department Admin, I want to message one or more applicants so I can communicate hiring updates.

Acceptance criteria:

- Department Admin can compose and send.
- Department User can view history and templates per Master Checklist permissions.
- Recipient selection supports one, multiple, all, job type, and application status filters.
- Recipients are BCC-style and cannot see each other.
- Message history is tied to the department.
- Candidate replies appear in Message Center.

### D-12 Department Exports

As a department user, I want to export applicant data so I can support offline hiring workflows.

Acceptance criteria:

- Export per job type.
- Export combined pool.
- Export filtered results only.
- Select fields before export.
- Include archive status, notes, qualifications, essays, and allowed application package fields.
- Expired department exports hide contact info.

## GB Admin Stories

### GBA-01 Admin Dashboard

As a GB Admin, I want a control dashboard so I can see platform activity and pending work.

Acceptance criteria:

- Dashboard shows pending department approvals, profile approvals, job approvals, exam tasks, score tasks, support/admin notifications, and platform metrics.
- Admin can drill into records from summary cards.

### GBA-02 Department Approval

As a GB Admin, I want to approve or reject department registrations so only valid departments access the platform.

Acceptance criteria:

- Admin can view pending department details.
- Admin can approve, reject, or request more information.
- Approved department gets activated.
- Actions are audit logged.

### GBA-03 Profile and Job Approval

As a GB Admin, I want to approve, reject, return, publish, close, or deactivate profiles and job posts.

Acceptance criteria:

- Approval queues separate Department Profiles and Job Posts.
- Admin notes are captured for returned/rejected items.
- Public visibility updates based on approval state.
- Actions are audit logged.

### GBA-04 User Management

As a GB Admin, I want to manage users so I can support accounts and enforce rules.

Acceptance criteria:

- Admin can search by name, email, role, department, and status.
- Admin can view candidate, department, and admin users.
- Admin can deactivate/block users in UI mock.
- Admin can view login/activity indicators where represented.

### GBA-05 Impersonation

As a GB Admin, I want to impersonate candidate and department accounts so I can support users and verify behavior.

Acceptance criteria:

- Impersonation action has confirmation.
- Active impersonation is visibly indicated.
- Exit impersonation control is available.
- All impersonation actions are audit logged in mock data.

### GBA-06 Exam Management

As a GB Admin, I want to manage exam dates and score publishing for ELR candidates.

Acceptance criteria:

- Admin can create/edit exam date, time, location, format, quantity, deadline, and custom confirmation timing.
- Admin can generate/export attendance roster.
- Admin can import mock score CSV.
- Imported scores are unpublic until verified.
- Admin can publish scores.
- Incomplete profiles are flagged/disqualified according to Master Checklist.

### GBA-07 Dynamic Templates and Fields

As a GB Admin, I want to manage templates and field definitions so profile/job forms can evolve without developer work.

Acceptance criteria:

- UI plan supports dynamic section/field schema.
- Admin can add, edit, reorder, hide, and mark fields required in mock interface.
- Changes create audit log entries.
- Frontend builders consume mock schema arrays rather than hardcoded-only fields where practical.

### GBA-08 Status Pipeline

As a GB Admin, I want to manage application status options so departments use a consistent pipeline.

Acceptance criteria:

- Admin can view master status list.
- Admin can add/edit/deactivate status options in mock UI.
- Department dropdowns consume the same mock status list.

### GBA-09 Reports and Exports

As a GB Admin, I want reports and CSV exports so GetBadged can monitor platform operations.

Acceptance criteria:

- Export all users/mailing list.
- Export purchase history.
- Export exam roster and scores.
- Export candidate application data.
- Export any admin metric drilldown view.

### GBA-10 CMS and Content

As a GB Admin, I want to manage public content so the site can be updated without developers.

Acceptance criteria:

- Admin can manage homepage stats, news/announcements, resources, captions, and public text blocks in mock UI.
- Public pages consume mock CMS content.

## Cross-Cutting Stories

### X-01 Notifications

As any user, I want relevant notifications so I can act on platform events.

Acceptance criteria:

- Candidate, department, and GB Admin each have notification center UI.
- Notifications include read/unread states.
- Email-backed events are labeled as SendGrid-backed in implementation notes.
- SMS verification events are labeled Twilio-backed.

### X-02 Audit Logs

As the platform, I need audit logs so sensitive actions can be traced.

Acceptance criteria:

- Mock audit log includes actor, target, role, action, timestamp, and metadata.
- Logs appear in GB Admin where relevant.
- Department change logs show only that department's relevant application changes.

### X-03 Responsive UI

As any user, I want the platform to work on desktop and mobile.

Acceptance criteria:

- Forms collapse cleanly on tablet/mobile.
- Dashboards remain scan-friendly.
- Navigation adapts without hiding critical actions.
- Text does not overflow cards/buttons.
