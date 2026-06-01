# Task Groups

This file is the coordination plan for two frontend developers. The goal is to split work so each developer can build large parts of the app without touching the same route files or components every day.

## Coordination Rules

- Dev A owns candidate/public flows.
- Dev B owns department/admin flows.
- Shared foundation must be done first or by explicit agreement.
- Shared components go in `components/ui` and `components/common`.
- Route-specific components stay inside their route feature folder.
- Mock data should be split by domain under `lib/mock`.
- If both devs need a shared type, add it to `types`.
- If both devs need a shared component, create a small neutral API before building domain-specific variants.
- Shared object names, field keys, enums, and mock data shapes must follow `11-object-field-registry.md`.
- Follow clean architecture from `00-start-work-rules.md`: route files compose features, domain logic lives outside page JSX, mock/API access stays isolated.

## Proposed Frontend Structure

```txt
app/
  (public)/
  auth/
  candidate/
  department/
  admin/
components/
  ui/
  common/
  candidate/
  department/
  admin/
features/
  candidate/
  department/
  admin/
  public/
lib/
  mock/
  api/
  routes/
  utils/
types/
```

## Latest PDF Alignment Rule

Current source of truth is `MASTER GetBadged Dev Checklist | 1st june.pdf`.

Dev A and Dev B completed their first eight task groups before the May 14 and June 1 latest-PDF comparisons. Completed groups should not be rewritten as new work. Instead:

- Keep TG-A1 through TG-A8 and TG-B1 through TG-B8 marked as completed.
- Add latest-PDF impact/patch notes to completed groups where needed.
- Update unstarted and remaining groups directly so future work starts from the latest checklist.
- Any shared field change must be reflected in `11-object-field-registry.md` before implementation.

## Milestone 0: Foundation

Owner: Shared, short initial pairing.

Do this before parallel feature work:

- Create Next.js app with TypeScript and App Router.
- Add Tailwind or chosen styling setup.
- Add base layout, metadata, global CSS, font setup, and theme tokens.
- Add route groups for public, auth, candidate, department, admin.
- Add mock auth/session provider.
- Add role-based redirect helpers.
- Add base UI primitives: Button, Input, Select, Checkbox, Radio, Tabs, Modal, Drawer, Table, Badge/StatusChip, Progress, Card, FileUpload shell, EmptyState, Toast.
- Add mock data pattern and shared types.

Primary files likely touched:

- `app/layout.tsx`
- `app/globals.css`
- `components/ui/*`
- `components/common/*`
- `lib/mock/*`
- `types/*`

After Milestone 0, avoid editing foundation without noting in tracker.

## Dev A Track: Candidate + Public

### TG-A1 Public Marketing Shell

Routes:

- `app/(public)/page.tsx`
- `app/(public)/about/page.tsx`
- `app/(public)/resources/page.tsx`

Scope:

- Public home
- About/resources shells
- Public CTA routing
- Brand sections
- Responsive header/footer

Dependencies:

- Foundation layout and UI primitives

Avoids:

- Department dashboard routes
- Admin routes

Latest PDF change impact:

- Patch needed: low.
- Ensure brand usage follows current logo/name rule: `GetBadged` is one word with capital `G` and capital `B`.
- June 1: Candidate Resource Center sample includes homepage visitor/member content. Public resources should stay data-driven so visitor-facing resource blocks can be changed without route rewrites.

### TG-A2 Public Department and Job Browse

Routes:

- `app/(public)/departments/page.tsx`
- `app/(public)/departments/[departmentId]/page.tsx`
- `app/(public)/jobs/page.tsx`
- `app/(public)/jobs/[jobId]/page.tsx`

Scope:

- Department cards/list
- Department Profile public detail
- Jobs list
- Job detail
- Public filters
- Apply CTA behavior for logged-out and logged-in candidates

Mock data:

- `lib/mock/departments.ts`
- `lib/mock/jobs.ts`

Hand-off points:

- Job detail apply CTA must pass `jobId` into candidate apply flow.

Latest PDF change impact:

- Patch needed: medium.
- Public department profile and public job detail should continue matching the latest sample layouts.
- Job detail data should prepare for expanded job-post fields such as state requirements, department-specific requirements, preferred eligibility, salary, benefits, responsibilities, and hiring process.
- June 1: Job post to Department Profile linking is still a final review item; keep public job detail linked by `departmentId`/`departmentSlug` until the client defines deeper content inheritance.

### TG-A3 Auth and Candidate Free Signup

Routes:

- `app/auth/login/page.tsx`
- `app/auth/signup/candidate/page.tsx`
- `app/auth/signup/department/page.tsx` only shell if Dev B takes department details

Scope:

- Shared login page
- Candidate signup
- Role-based mock redirects
- Limited dashboard state for free candidate
- Forgot password/email placeholder flows

Shared with Dev B:

- Department signup form can be split: Dev A builds auth shell; Dev B owns department-specific fields and pending approval behavior.

Latest PDF change impact:

- Patch needed: low.
- Confirm password rules in UI: minimum 8 characters, 1 capital letter, 1 number, and 1 special character.
- Session timeout behavior is documented for backend/app shell; no full implementation required in this completed auth UI unless scheduled as a patch.
- June 1: Session timeout has conflicting details: profile section mentions 10 minutes, open-item response says 15 minutes idle warning/logout. Track as confirmation before implementation.

### TG-A4 Candidate Dashboard

Routes:

- `app/candidate/page.tsx`

Scope:

- Overview cards
- Membership status
- Token balance
- Profile progress
- Eligibility checklist
- Recent activity
- Badge Request summary
- Submitted Application summary
- Track-specific dashboard states
- Free account limited state

Mock data:

- `lib/mock/candidate.ts`
- `lib/mock/memberships.ts`
- `lib/mock/tokens.ts`

Latest PDF change impact:

- Patch needed: medium.
- Candidate dashboard should be ready to show Resource Center items and "New" unread labels.
- Candidate dashboard should show membership expiry/renewal notifications and exam confirmation/reminder notices when those mock states exist.
- June 1: Candidate dashboard needs three member layouts/states: ELR, CXO, and OPS. OPS should follow CXO layout/options.
- June 1: ELR dashboard should include an upgrade option to CXO; OPS dashboard should include an upgrade option to ELR.
- June 1: Candidate Resource Center sample is explicit and should be wired to member type/content assignment.

### TG-A5 Candidate Profile Wizard

Routes:

- `app/candidate/profile/page.tsx`
- `app/candidate/profile/[step]/page.tsx` if step routes are used

Components:

- `components/candidate/profile/*`

Scope:

- Wizard shell based on reference design
- Left step rail
- Right progress panel
- Autosave state
- Contact step
- Personal information step
- Education/preferences step
- Training/experience step
- Background step
- Certifications/credentials step
- Essay responses step
- Attachments step
- Review/submit step

Important:

- Keep form schemas/data local to candidate feature.
- Do not build department profile forms here.

Latest PDF change impact:

- Patch needed: high.
- Replace old `U.S. Citizen` yes/no with `Citizenship / Work Authorization Status` single-select options from `11-object-field-registry.md`.
- Confirm this field is hidden from Badge Pool and only appears in allowed full application/dashboard/export contexts.
- June 1: Contact fields, phone, email, address, DOB/age, gender, ethnicity, and SSN visibility must align with the 90-day inactive/department-expired hiding rules in downstream application views.

### TG-A6 Candidate Documents

Routes:

- `app/candidate/documents/page.tsx`

Scope:

- Supporting documents upload UI
- Category dropdown
- PDF-only validation state
- Multiple files per category
- Required/optional indicators
- Document eligibility blockers

Dependencies:

- Shared FileUpload shell

Latest PDF change impact:

- Patch needed: low.
- No major document category change found, but full application view/download/export must include document links according to latest visibility rules.
- June 1: Supporting documents remain full-application-only links and should not be shown in Applicant Pool column view.

### TG-A7 Candidate Exam Registration

Routes:

- `app/candidate/exams/page.tsx`
- `app/candidate/exams/[examId]/page.tsx` if needed

Scope:

- ELR-only exam list
- Online/in-person exam states
- Registration detail
- Acknowledgement UI
- Mock checkout handoff
- Exam score/status display in candidate UI

Avoids:

- Admin exam management, owned by Dev B.

Latest PDF change impact:

- Patch needed: medium.
- Exam confirmation display should support date, time, location, what to bring, and parking.
- Online exam reminder mock states should support 7-10 day reminders.
- June 1: Password/session open-item response confirms exam confirmation send time is GB Admin-configurable.

### TG-A8 Candidate Jobs and Direct Apply

Routes:

- `app/candidate/jobs/page.tsx`
- `app/candidate/jobs/[jobId]/page.tsx`
- `app/candidate/apply/[jobId]/page.tsx`

Scope:

- Candidate-personalized job browse
- Eligibility indicators
- Minimum requirements
- Consent checkbox
- Token balance at apply
- Cover letter UI
- Successful application state
- Duplicate application blocked state

Hand-off:

- Uses public `jobs` mock from TG-A2 and candidate eligibility mock from TG-A4.

Latest PDF change impact:

- Patch needed: medium.
- Cover letter should enforce 300-word maximum.
- Direct apply should use latest job-post requirement fields once Dev B updates job data.
- June 1: Direct apply should continue to consume one token, while Badge acceptance consumes zero tokens.

### TG-A9 Candidate Badge Requests and Submitted Applications

Routes:

- `app/candidate/badge-requests/page.tsx`
- `app/candidate/applications/page.tsx`
- `app/candidate/applications/[applicationId]/page.tsx`

Scope:

- Badge Request list
- Accept action
- No Decline action
- Submitted Applications table
- Application source display
- Candidate-safe application detail
- Status updates with mock state
- Badge request notifications on Candidate Dashboard/Notification Center
- Candidate application status update notifications
- Inactive/reactivated membership/application state messaging
- Contact-info expiration warnings from departments should be reflected where candidate-facing status/notifications require it.
- Badge acceptance remains blocked when candidate membership is inactive/cancelled or department is expired.

### TG-A10 Candidate Messages, Notifications, Settings

Routes:

- `app/candidate/messages/page.tsx`
- `app/candidate/messages/[threadId]/page.tsx`
- `app/candidate/notifications/page.tsx`
- `app/candidate/settings/page.tsx`
- `app/candidate/privacy/page.tsx`

Scope:

- Candidate message inbox and replies
- Notification center
- Account settings
- Privacy/data page
- Candidate Resource Center entry points:
  - GetBadged News & Announcements
  - Physical Fitness Standards & Prep
  - ELR Exam Study Guide
  - Application Tips & Best Practices
  - Help & FAQs
- "New" unread state for updated resources
- Membership renewal notification UI for CXO and OPS
- OPS dashboard/resource behavior aligned to CXO member layout/options
- ELR to CXO and OPS to ELR upgrade entry points if not handled by TG-A4 patch
- Resource Center content assigned by member type and "New" state

Shared:

- Message data model must align with Dev B department messaging.
- Resource data model must align with GB Admin CMS from TG-B12.

## Dev B Track: Department + Admin

### TG-B1 Department Signup and Pending Approval

Routes:

- `app/auth/signup/department/page.tsx`
- `app/department/pending/page.tsx`

Scope:

- Department registration details
- Pending approval state
- Plan/tier selection placeholder if needed
- Admin approval queue mock record

Dependencies:

- Auth shell from TG-A3

Latest PDF change impact:

- Patch needed: medium.
- Latest checklist mentions AI assist tools on department setup/profile/job pages, but user already decided AI assist is later.
- Keep self-registration and GB Admin approval flow.

### TG-B2 Department Dashboard

Routes:

- `app/department/page.tsx`

Scope:

- Department overview
- Plan/tier status
- Badge credits
- Active jobs
- Applicant counts
- Profile/job approval status
- Messages/notifications summary
- Expired account restricted state

Mock data:

- `lib/mock/departmentDashboard.ts`

Latest PDF change impact:

- Patch needed: medium.
- Dashboard should be ready for low badge-credit warning at 2 credits and hard stop at zero.
- Department Resource Center entry point should be added when TG-B12 CMS/resource work begins.
- June 1: Remove bottom-right Quick Actions pattern; all dashboard actions should live in the left menu/top navigation.
- June 1: Department dashboard should include Resource Center entry points once CMS/resource work is available.

### TG-B3 Department Profile Builder

Routes:

- `app/department/profile/page.tsx`
- `app/department/profile/edit/page.tsx`

Components:

- `components/department/profile/*`

Scope:

- Department Profile draft/edit UI
- Dynamic section rendering from mock schema
- Media upload shell
- Save draft
- Submit for approval
- Revisions needed state
- Admin notes display

Avoids:

- Candidate profile wizard files.

Latest PDF change impact:

- Patch needed: low to medium.
- Keep latest public department profile sample layout alignment.
- AI assist controls are deferred unless user later moves them into MVP.
- June 1: Department Profile builder/schema should remain dynamic: GB Admin controls sections, fields, field types, required states, permissions, order, visibility, version/change log.
- June 1: Department Admin/User can access profile templates and job templates; AI assist still deferred by project decision.

### TG-B4 Department Job Post Builder

Routes:

- `app/department/jobs/page.tsx`
- `app/department/jobs/new/page.tsx`
- `app/department/jobs/[jobId]/edit/page.tsx`

Scope:

- Job post list
- Job post create/edit
- Template-driven form sections
- Save draft
- Submit for approval
- Close/deactivate request state
- Status chips

Hand-off:

- Public job pages consume active approved job data from this mock domain.

Latest PDF change impact:

- Patch needed: high.
- Expand job post builder/schema for latest checklist fields:
  - state requirements
  - minimum passing exam score
  - department-specific requirements
  - age, residency, tattoo, and education requirements
  - fitness requirements
  - preferred eligibility and experience
  - additional skills and qualifications
  - required certifications
  - academy and POST requirements
  - shift schedule
  - salary and benefits
  - responsibilities
  - hiring process
- June 1: GB Admin can set exam requirement Y/N per job.
- June 1: GB Admin can set minimum exam score; default is 70%, cannot go below 70%, can go higher.
- June 1: Position categories expanded for ELR, CXO, OPS, campus/corrections/sheriff/security/court/marine/command variants.

### TG-B5 Department Badge Pool

Routes:

- `app/department/badge-pool/page.tsx`

Scope:

- Anonymous candidate table
- Track tabs/dropdowns
- Dropdown-only filters
- Badge credit count
- Send Badge Request modal
- Badge sent state
- No protected fields in UI

Critical:

- Add test checklist in tracker for privacy fields.

Latest PDF change impact:

- Patch needed: medium.
- Ensure `Citizenship / Work Authorization Status` never appears in Badge Pool.
- Low credit warning/hard stop should be reflected before sending Badge Requests.
- June 1: Department low-credit warning appears at 2 badge credits; zero credits blocks sending until additional badge pack purchase.

### TG-B6 Department Applicant Pools

Routes:

- `app/department/applicants/page.tsx`
- `app/department/applicants/[applicationId]/page.tsx`

Scope:

- Per-job and combined Applicant Pool
- Sortable/filterable columns
- New flag
- Aggregate stats
- Full application view
- Notes
- Department-private files
- Change log
- Print/download shell

Avoids:

- Candidate application detail route, owned by Dev A.

Latest PDF change impact:

- Patch needed: high.
- Full application view should include latest visibility rules for application view, print, download, export, and application dashboard.
- Applicant Pool column `U.S. Citizen` becomes `Citizenship/Work Authorization`.
- Essays are included in application view, print, download, and export, but not Applicant Pool column view or Badge Pool.
- June 1: Applicant Pool columns include phone and email when allowed.
- June 1: Contact information hides after 90 days from inactive/lapse/cancel/expiration or when department expires, whichever comes first.
- June 1: Full application needs hover/countdown messaging before contact access expires.
- June 1: Application change log is full-application-only, never candidate-visible, and included in print/download/export.

### TG-B7 Department Status, Archive, Exports

Routes:

- Integrated into `app/department/applicants/*`
- `app/department/reports/page.tsx`

Scope:

- Inline status updates
- Bulk status updates
- Archive/unarchive actions
- Archived filters
- Export modal
- CSV generation from mock data
- Contact info hidden in expired state

Dependencies:

- TG-B6 pool table

Latest PDF change impact:

- Patch needed: medium.
- Export rules must include latest full application/export visibility.
- Status pipeline keeps broad client-provided list and should include `Disqualified`.
- June 1: Expired department can export data, but contact information must be hidden.
- June 1: Export supports field selection, filtered results, archived candidates, archive status, notes, qualifications, essays, and allowed application package fields.

### TG-B8 Department Messages and Notifications

Routes:

- `app/department/messages/page.tsx`
- `app/department/messages/[threadId]/page.tsx`
- `app/department/notifications/page.tsx`

Scope:

- Compose message
- Recipient filtering
- Templates
- Message history
- Candidate replies
- Department User read-only/send-blocked state
- Notification center

Shared:

- Message types align with TG-A10.

Latest PDF change impact:

- Patch needed: medium.
- Department Notification Center should include candidate updates, accepted Badge Requests, submitted applications, membership expiry, and inactive/reactivated candidate status.
- Dept User cannot send messages; template access remains an open confirmation item.
- June 1: Archived candidates and inactive candidates after the grace period/department expiration must not appear in new-message recipient selection.
- June 1: Dept User can view templates; creating/saving/sending remains Dept Admin-only unless client confirms otherwise.

### TG-B9 GB Admin Dashboard and Approvals

Routes:

- `app/admin/page.tsx`
- `app/admin/approvals/departments/page.tsx`
- `app/admin/approvals/profiles/page.tsx`
- `app/admin/approvals/jobs/page.tsx`

Scope:

- Admin overview
- Pending approval queues
- Approve/reject/return actions
- Admin notes
- Audit log entries
- Approval notes for department profiles and job posts
- Resource/CMS publishing overview if resources are routed through GB Admin
- June 1 profile/job approval notes and dynamic template controls should be considered in approval queues.

### TG-B10 GB Admin Users, Roles, Impersonation

Routes:

- `app/admin/users/page.tsx`
- `app/admin/users/[userId]/page.tsx`
- `app/admin/impersonation/page.tsx` or integrated controls

Scope:

- Search users
- View user detail
- Candidate/department/admin role display
- Deactivate/block mock action
- Impersonation start/exit
- Impersonation audit log

### TG-B11 GB Admin Exams and Scores

Routes:

- `app/admin/exams/page.tsx`
- `app/admin/exams/new/page.tsx`
- `app/admin/exams/[examId]/page.tsx`
- `app/admin/scores/page.tsx`

Scope:

- Create/edit exam sittings
- Deadline/location/format/quantity fields
- Custom confirmation send date/time
- Generate roster CSV
- Import mock score CSV
- Make unpublic until verified
- Publish scores
- Incomplete profile disqualification state

Hand-off:

- Candidate exam registration consumes active exam data from TG-A7/TG-B11 mock contract.

### TG-B12 GB Admin Platform Config, CMS, Reports

Routes:

- `app/admin/config/statuses/page.tsx`
- `app/admin/config/templates/page.tsx`
- `app/admin/cms/page.tsx`
- `app/admin/reports/page.tsx`
- `app/admin/audit-logs/page.tsx`

Scope:

- Application status list
- Dynamic template/field schema mock editor
- CMS blocks/resources/news
- Candidate Resource Center management:
  - GetBadged News & Announcements
  - Physical Fitness Standards & Prep
  - ELR Exam Study Guide
  - Application Tips & Best Practices
  - Help & FAQs with assignable member types
- Department Resource Center management
- Resource content assignment by audience/member type:
  - Homepage visitor
  - ELR member
  - CXO member
  - OPS member
- Publish/unpublish resource content
- Mark resources as new until read
- Admin exports
- Audit log viewer
- Department Profile and Job Post dynamic schema management:
  - sections
  - fields
  - field types
  - required status
  - display order
  - visibility/permission rules
- Department credit pack configuration should remain data-driven until `$100/10`, `$200/20`, or both are confirmed.

## Suggested Developer Split

Dev A should take:

- TG-A1 through TG-A10
- Candidate/public mock data
- Candidate forms, profile, jobs, applications, messages

Dev B should take:

- TG-B1 through TG-B12
- Department/admin mock data
- Department profile/job builders, Badge Pool, Applicant Pool, admin tooling

Shared early:

- Milestone 0 foundation
- Auth/session mock shape
- Shared types for User, Department, JobPost, Candidate, Application, Message, Notification, AuditLog

## Non-Clash Map

Dev A should mostly work in:

- `app/(public)`
- `app/auth/login`
- `app/auth/signup/candidate`
- `app/candidate`
- `components/candidate`
- `lib/mock/candidate*`

Dev B should mostly work in:

- `app/auth/signup/department`
- `app/department`
- `app/admin`
- `components/department`
- `components/admin`
- `lib/mock/department*`
- `lib/mock/admin*`

Shared files require tracker note before editing:

- `app/layout.tsx`
- `app/globals.css`
- `components/ui/*`
- `components/common/*`
- `types/*`
- `lib/mock/index.ts`
- `lib/routes/*`
- `11-object-field-registry.md`

## Recommended Build Order

1. Milestone 0 foundation
2. Dev A: public jobs/departments, candidate dashboard, candidate profile wizard
3. Dev B: department dashboard, department profile/job builders, admin approvals
4. Dev A: candidate apply, Badge Requests, applications
5. Dev B: Badge Pool, Applicant Pool, application view
6. Both: messages, notifications, exports, settings
7. Dev B: admin exams/scores, config, reports
8. Both: responsive QA, privacy QA, mock-to-API readiness pass
