# Department Dashboard Rules

Source: `MASTER GetBadged Dev Checklist | 1st june.pdf`

Important rule: this document uses only written checklist text, tables, and stated business rules. Screenshots in the Master doc are UI/theme references only and must not be treated as functional requirements unless the written checklist explicitly says so.

## Purpose

The Department Dashboard is the authenticated workspace for Department Admin and Department User accounts. It should let departments manage department profile content, job posts, Badge Pool outreach, Applicant Pools, application records, messages, notifications, exports, resources, membership, and badge credits.

Department Admin and Department User share the same dashboard area and nearly the same recruiting permissions. The main permission difference is Message Center sending/template creation.

## Roles

### Department Admin

Can:

- Receive notifications of new applications and accepted Badges.
- View, print, download, and export applications.
- View change logs on candidate applications.
- View, print, and download supporting documents.
- Receive notifications of candidate membership status changes.
- Record private notes on applicant records.
- Archive and unarchive applications.
- Update application status.
- Update job posts and department profile content.
- Browse Badge Pool and send Badge Requests.
- Send messages through Department Message Center.
- View message history and template bank.
- Save/create message templates.
- Generate reports and export data.
- Upload private files to candidate application records.
- View all messages sent from the department administrator.

### Department User

Can:

- Do everything Department Admin can do except sending messages and saving/creating templates.
- View message history.
- View the message template bank.
- Browse Badge Pool and send Badge Requests.
- Update profile/job content, status, notes, archive state, and exports.

Cannot:

- Send messages through Department Message Center.
- Save or create message templates.

### Department Account Seat Limit

Each department has:

- 1 Department Administrator account.
- 2 Department User accounts.

## Dashboard Access States

### Pending Approval Department

Used after department self-registration before GB Admin approval.

Expected dashboard behavior:

- Show waiting/pending approval state.
- Block public publishing and full recruiting actions until approved.
- Show any setup tasks that are allowed before approval, such as completing profile/job drafts if enabled.

### Active Department

Active departments can use the full dashboard according to role permissions.

### Expired Department

Expired departments have restricted behavior:

- Can view applications, but candidate contact information is hidden.
- Can export data, but all contact information is hidden in export.
- Cannot receive notifications or messages of any kind.
- Cannot use Message Center to communicate with applicants.
- Cannot update candidate application status.
- Can view Badge Pool but cannot send Badges.
- Candidates cannot accept Badge Requests from an expired department, even if candidate membership is active.
- Can renew membership from dashboard through Stripe.

## Left Side Navigation

All department dashboard functions must live in the left menu/top navigation. Do not use the old bottom-right Quick Actions box.

Recommended left menu items based on written requirements:

### Dashboard

Route: `/department`

Shows the department workspace overview, account status, applicant/job summary, badge credit state, profile/job approval status, notifications, and resource links.

### Department Profile

Route: `/department/profile`

Purpose:

- Complete the Department Profile template.
- Edit department-entered profile content.
- Attach/replace department photo or short video.
- Save profile draft.
- Submit profile for GB Admin approval.
- View profile approval status and GB Admin notes.

Key rules:

- Department Admin and Department User can complete profile template content.
- Department Admin and Department User can attach/replace department photo or short video.
- Department Admin and Department User can save as draft.
- Draft remains visible on Department Admin/User dashboards but hidden from candidate-facing pages.
- Department Admin and Department User can submit for approval if enabled.
- Submitting profile approval triggers a GB Admin notification.
- Profile cannot become active until approved by GB Admin.
- GB Admin can reject/return profile with notes; status becomes `Revisions Needed`.
- GB Admin alone can archive/deactivate department profile.
- Candidate-facing department profiles are hidden if inactive.
- Profile is removed/hidden from available jobs upon membership expiration.

GB Admin-only profile configuration:

- Edit profile fields.
- Add/remove profile fields.
- Add/remove profile sections.
- Reorder sections.
- Create dynamic sections.
- Add dynamic fields to sections.
- Define field type, display label, required status, permissions, and display order.
- Configure conditional display by department type, job type, hiring model, or GB Admin configuration.

Supported dynamic field types:

- Text Short
- Text Long
- Number
- Number Range
- Date
- Date Range
- Dropdown
- Multi-Select
- Checkbox
- Yes/No
- Repeatable List
- Rich Text
- File/Image Upload
- URL
- System Field

Profile status fields:

- `Profile Status`: Draft, Pending Approval, Approved, Active, Revisions Needed, Inactive.
- `Submit Profile for Approval`: checkbox/button.
- `Approval Requested Date`: system timestamp.
- `Submitted By`: system captured user/role/account.
- `GB Admin Approval Notes`: long text, GB Admin only.
- `Published Date`: system timestamp.

### Job Posts

Route: `/department/jobs`

Purpose:

- Create job post from template.
- Select job post template.
- Edit department-entered job content.
- Save job post as draft.
- Submit job post for approval.
- View job post approval status and GB Admin notes.
- Request job post close/deactivation.

Key rules:

- GB Admin, Department Admin, and Department User can create job posts from template.
- GB Admin, Department Admin, and Department User can edit content entered in job post fields.
- Department Admin and Department User can select templates.
- Department Admin and Department User can save drafts.
- Department Admin and Department User can submit for approval.
- Submission triggers notification to GB Admin Notification Center.
- Job post cannot become active until approved by GB Admin.
- GB Admin can approve/publish.
- GB Admin can reject/return for edits with notes; status becomes `Revisions Needed`.
- GB Admin can force deactivate.
- Department can request close.

GB Admin-only job configuration:

- Add/remove/rename job post fields.
- Add/remove/rename job post sections.
- Set exam requirement Y/N per job.
- Set minimum exam score requirement.
- Default minimum exam score is 70%.
- Minimum exam score cannot be below 70%.
- Minimum exam score can be higher than 70%.

Job post status fields:

- `Job Post Status`: Draft, Pending Approval, Approved, Active, Revisions Needed, Closed, Inactive.
- `Submit Job Post for Approval`: checkbox/button.
- `Approval Requested Date`: system timestamp.
- `Submitted By`: system captured user, department, and role.
- `GB Admin Approval Notes`: long text, GB Admin only.
- `Published Date`: system timestamp.

Job post data that must be supported:

- Role.
- State requirements.
- Optional GB Admin exam requirement Y/N.
- Minimum passing exam score.
- Department-specific requirements.
- Age requirements.
- Residency requirements.
- Tattoo policy.
- Educational requirements.
- Fitness requirements.
- Preferred eligibility.
- Preferred experience.
- Additional skills and qualifications.
- Required certifications.
- CXO academy requirements.
- CXO POST certification status and requirements.
- Shift schedule.
- Salary.
- Benefits.
- Responsibilities.
- Hiring process.

### Applicant Pools

Route: `/department/applicant-pools`

Purpose:

- View all applications received by the department.
- Open per-job Applicant Pools.
- Open a combined Applicant Pool across all job types.
- Filter, sort, archive, update status, export, and open full applications.

Entry points:

- Dashboard shows one link per active job.
- Clicking an active job opens the full Applicant Pool for that job.
- Combined `All Applicants` opens the combined pool across all job types.

Pool contents:

- Direct applications.
- Accepted Badge applications.
- Each accepted Badge feeds into the specific job type Applicant Pool and is noted as `Accepted Badge`.
- Direct applications feed into the specific job Applicant Pool.

Pool rules:

- New applications populate at top with `New` flag until viewed.
- Every column is sortable.
- Applicant Pool uses column-format summary rows.
- Essay responses are not shown in column view.
- Supporting documents are not shown in column view.
- Social media handles are not shown in column view.
- Additional skills/qualifications are not shown in column view.
- Candidate update change log is not shown on the main dashboard or pool list; it appears only in the full application page.
- Department cannot see where else a candidate applied.
- Department cannot see candidate application history from other departments.

Pool filters:

- Dropdown/sub-dropdown filters only.
- No standalone filter buttons.
- Job Type.
- Apply Date.
- Application Status.
- Qualification-based fields.
- Search by last name.
- Search by email.
- Date range for applications received.
- Archived / Unarchived / All.

Pool counts and aggregate stats:

- Show total applicant tally next to each job type.
- Show combined pool total.
- Once archiving begins, show Total Active and Total Archived counts per job type and combined.
- Archived candidates are excluded from `# Applications Received` count for the job.
- Show demographic aggregate percentages at pool level: minority, women, education degree, age group.
- Show breakdown of applications received via Accepted Badges.

Applicant Pool columns:

- Department Notes indicator/column.
- Candidate Name, clickable to full application.
- Job Type / Position.
- Application Source: Direct or Badge.
- Date Received, sortable, default newest first.
- Application Status, inline editable from pool view.
- Membership Status, active/inactive visual state, sortable.
- Exam Score for ELR only.
- Exam Date for ELR only.
- City/Town.
- Zip Code.
- Phone when allowed by visibility rules.
- Email when allowed by visibility rules.
- Willing to Relocate.
- Age.
- Citizenship/Work Authorization.
- Valid Driver’s License.
- Highest Education Level.
- Multilingual Y/N.
- Veteran Status.
- Prior Police Experience Y/N.
- Prior Public Safety Experience Y/N.
- Full-Time Academy Y/N.
- Full-Time Academy Type.
- Credentials.
- POST Certified for CXO only.
- Volunteer/Community Service Y/N.
- Cadet/Citizens Police Academy Y/N.
- Civil Service Exam response.
- LTC eligibility detail.

Full-view-only data:

- Supporting document links.
- Essay responses.
- Social media handles.
- Additional skills/qualifications.
- Full department notes details.
- Candidate application change log.

### Full Application View

Route pattern: `/department/applicant-pools/[poolId]/applications/[applicationId]`

Purpose:

- View the complete candidate application package for one department-specific application record.

Opening rule:

- From Applicant Pool, click candidate name or row to open the full Application View.

Layout rules:

- Single scrollable page.
- Sections match the candidate profile section structure.
- All sections always visible in full application view.
- Application status displayed prominently at top.
- Application source displayed near top: `Direct Application` or `Accepted Badge`, with date received.
- Cover letter section always appears:
  - If submitted, display cover letter and date submitted.
  - If not submitted, show `No cover letter submitted`.
- Supporting documents display as clickable PDF links by document type.
- Multiple files per document type display as separate numbered links.
- Department-uploaded private files display in a separate `Department Files` section visible only to that department.
- Department Notes section is visible only to department users and never visible to candidate.

Header data:

- Candidate full name.
- Job type/position.
- Application type.
- Date and time received.
- Application status.
- Candidate track: Entry-Level Recruit, Certified Officer, or Other Public Safety.
- Candidate membership status: active/inactive visual state.

Actions:

- Update application status.
- Add/edit department notes.
- Upload department-private file.
- Print application.
- Download application.
- Archive/unarchive.
- Export if accessed through reporting/export flow.
- Message candidate if role/account state allows.

Print/download rules:

- Print and Download show/export full application view.
- Download includes all sections and fields visible to the department.
- Download includes essay responses if submitted.
- Download includes candidate update/change log.
- Contact information must be hidden in print/download when contact visibility rules require it.

Change log rules:

- Change log appears only on the candidate full application page.
- Not shown on the main dashboard.
- Not visible to candidate.
- Not visible to other departments.
- Department sees only change log for its own application record.
- Each entry includes date/time, field changed, previous value, new value.
- Most recent change appears first.
- Status updates made by department are logged with the role that made the change.
- Full change log is included in print/download and export.
- Visible to Department Admin, Department User, and GB Admin.

Contact visibility rules:

- Name, street address, phone, email, DOB/age, gender, ethnicity, and last 4 SSN are hidden in Badge Pool.
- Phone, email, and full address are hidden from department application view, print, download, export, and messaging after 90 days from candidate membership lapse/cancellation/expiration.
- Contact information is hidden immediately when the department expires, even if candidate’s 90-day grace period has not ended.
- Contact information can show again if candidate renews/reactivates and department is active.
- Inactive candidate membership visually flags the application.
- Inactive candidate application status auto-updates to `Inactive Membership`.
- Candidate no longer meeting job requirements auto-updates status to `No Longer Meets Requirements`; contact info remains visible.
- Show countdown hover messaging before contact access expires, with remaining day count.

Always hidden from department:

- Desired Hiring Agencies.
- Position Currently Qualified For.
- How did you hear about GetBadged?
- Application history from other departments.

### Badge Pool

Route: `/department/badge-pool`

Purpose:

- Browse anonymous eligible candidates.
- Send Badge Requests tied to specific job types.

Access rules:

- Premium tier required to send Badge Requests.
- Department must be active to send Badge Requests.
- Expired department can view Badge Pool but cannot send Badges.
- Zero badge credits hard-stops sending.
- Low-credit warning appears at 2 badge credits.

Send Badge rules:

- Sending a Badge consumes 1 Agency Badging Credit.
- Badge is tied to one specific job type at send time.
- Department cannot see candidate name, phone, street address, ethnicity, age/DOB, gender, or last 4 SSN in Badge Pool.
- Department does not see whether a candidate declined or ignored a Badge Request.
- If candidate has not accepted, show replacement text: `Badge sent on [date]`.
- If candidate accepts, full profile and supporting documents are released to department immediately.
- Accepted Badge moves to Submitted Applications with status `Badge Accepted / [Job Type]`.
- Accepted Badge feeds into the specific job type Applicant Pool.
- Candidate profile is removed from that department’s Badge Pool view after acceptance.
- Candidate remains globally available in Badge Pool for other departments.
- If candidate directly applies to a department that already Badged them, the outstanding Badge is freed and department credit is returned.

Credit ledger:

- Department sends Badge Request: minus 1 Agency Badging Credit.
- Candidate applies directly after being Badged by same department: credit returned.
- Top-up credit pack currently has unresolved final business decision:
  - Checklist references `$200 / 20 credits`.
  - Final review flags conflict with `$100 / 10` vs `$200 / 20`.
  - Until confirmed, UI should not hard-code only one final package.

### Messages

Route: `/department/messages`

Purpose:

- Two-way message center between department and candidates.
- Department Admin sends; Department User views.

Department Admin can:

- Send messages to one applicant, multiple applicants, or all applicants.
- Filter recipients by Job Type or All.
- Filter recipients by Application Status.
- View sent message history.
- Access template library.
- Save/create templates.
- Search sent history by candidate name.
- View recipients on sent messages.
- Print sent messages.
- Filter recipients by Opened / Unopened.

Department User can:

- View sent message history.
- Access/view template library.
- Search sent history by candidate name.
- View recipients on sent messages.
- Print sent messages.
- Filter recipients by Opened / Unopened.

Department User cannot:

- Send messages.
- Save/create templates.

Message rules:

- Message direction is two-way: department to candidate and candidate to department.
- Recipients do not see other recipients; BCC behavior.
- Candidate responses create a department notification and appear in Message Center.
- Candidate cannot see whether department read the message.
- Message history is tied to the department, not a role. New admins inherit full message history.
- Candidate application shows all messages sent plus read status.
- Message `RE:` line links to full message.
- Archived candidates are hidden from new-message recipient selection.
- Inactive candidates are hidden from new-message recipient selection after 90-day grace period or when department expires, whichever comes first.
- Expired departments cannot use Message Center.

### Notifications

Route: `/department/notifications`

Purpose:

- Show department-specific notifications from application, Badge, membership, and candidate update events.

Department notification triggers:

- Candidate updates application.
- Candidate accepts Badge Request.
- Candidate submits application.
- Department membership expiry notice.
- Candidate application status update to inactive.
- Candidate application reactivation.
- Candidate membership status change.
- Candidate no longer meets requirements alert.

Rules:

- Candidate updates generate a notification in addition to the application update log.
- Candidate inactive/reactivated status changes notify department.
- Expired departments do not receive notifications or messages.
- Notifications are not the same as Message Center messages.

### Reports & Exports

Route: `/department/reports`

Purpose:

- Export Applicant Pool data and reporting views.

Department Admin and Department User can:

- Export Applicant Pool per Job Type.
- Export All Applicants combined pool.
- Export filtered results only.
- Select which fields to include before export.
- Export archived candidates.
- Generate reports/export data.

Export contents:

- Application package fields visible to department.
- Date/time applied.
- Job type.
- Department notes.
- Archive status.
- Qualifications.
- Essay responses.
- Application update/change log.

Export rules:

- CSV format.
- Export respects active filters.
- Export can include archived candidates.
- Export includes Archive/Unarchived status column.
- Expired department can export, but all contact information must be hidden.
- Contact info expiration export is GB Admin-only, not department-facing.

### Resources

Route: `/department/resources`

Purpose:

- Resource Center on Department Dashboards.

Department dashboard resource items from written checklist:

- Link to ELR Exam Schedule.
- Help & FAQs pages.
- Other TBD.

Resource rules:

- ELR Exam Schedule is populated from active exam date options.
- Departments can access upcoming exam dates to refer inquiring candidates.
- Help & FAQs may include pictures, short videos, hyperlinks, formattable text, and PDFs.
- GB Admin sets up and adds resources to Department Admin and Department User dashboards.
- GB Admin adds/edits content.
- GB Admin unpublishes from dashboards.
- GB Admin adds/removes individual FAQs.

### Account / Billing / Credits

Route: `/department/billing`

Purpose:

- Show department membership/account state.
- Renew expired department membership.
- Show badge credit balance.
- Purchase/replenish badge credits once final credit pack is confirmed.

Rules:

- Stripe is the source of truth for department membership and badge credit purchases.
- Active department can send Badge Requests if it has credits.
- Low warning appears at 2 badge credits.
- Hard stop at 0 credits until additional badge pack purchase.
- Top-up credits add to existing balance.
- Top-up credits zero out upon membership expiration.
- Expired department can renew membership through Stripe from dashboard.
- Expired department cannot send Badges or messages.

### Settings / Users

Route: `/department/settings`

Purpose:

- Department account settings and user/seat management shell.

Rules:

- One Department Admin and two Department Users per department.
- Same dashboard view and action permissions except Message Center sending/template creation.

## Main Department Dashboard Screen

Route: `/department`

The main dashboard should summarize written department requirements and link to the relevant work areas.

### Account Status Card

Shows:

- Department account status: active, pending approval, expired, inactive.
- Membership expiration date if available.
- Renewal/action warning if approaching expiration.

When shown:

- Always.

Actions:

- `Renew Membership` goes to `/department/billing` or Stripe checkout flow.
- If expired, show restricted-state message and explain hidden contact info, disabled messages, disabled status updates, and disabled Badge sending.

### Badge Credit Card

Shows:

- Agency Badging Credit balance.
- Low-credit warning when balance is 2.
- Hard-stop warning when balance is 0.

When shown:

- Always for department accounts.

Actions:

- `Add Credits` goes to `/department/billing`.
- `Send Badge` or `Browse Badge Pool` goes to `/department/badge-pool`.

Button logic:

- Disable/send-block Badge action if department is expired.
- Disable/send-block Badge action if credit balance is 0.
- Show low-credit warning at 2 credits.

### Active Jobs / Job Posts Card

Shows:

- Active job posts.
- Draft job posts.
- Pending approval job posts.
- Revisions Needed job posts.
- Closed/inactive count if relevant.
- One link per active job to its Applicant Pool.

When shown:

- Always.

Actions:

- `Create Job Post` goes to `/department/jobs/new`.
- `Manage Job Posts` goes to `/department/jobs`.
- Active job row/link goes to `/department/applicant-pools?jobId=[jobId]`.
- Pending/revisions item goes to `/department/jobs/[jobId]`.

### Applicant Pools Card

Shows:

- Per-job applicant counts.
- Combined applicant count.
- Active applicant count.
- Archived applicant count after archiving begins.
- New application count.
- Accepted Badge count/breakdown.

When shown:

- Always.

Actions:

- `View All Applicants` goes to `/department/applicant-pools`.
- Per-job link goes to filtered job Applicant Pool.
- New applicant row opens pool with `new` filter if implemented.

### Department Profile Card

Shows:

- Profile status: Draft, Pending Approval, Approved, Active, Revisions Needed, Inactive.
- Approval requested date if pending.
- Published date if active.
- GB Admin notes if returned/revisions needed.

When shown:

- Always.

Actions:

- `Edit Profile` goes to `/department/profile`.
- `Submit for Approval` triggers profile submit action if profile is draft and complete enough.
- `View Public Profile` should only be available when profile is active/approved.

### Notifications Card

Shows:

- Candidate application updates.
- Accepted Badge notifications.
- New application received notifications.
- Candidate inactive/reactivated notifications.
- Membership expiry notices.
- Candidate no longer meets requirements alerts.

When shown:

- Active departments only.
- Expired departments do not receive notifications; show restricted state if needed.

Actions:

- Notification item opens relevant record:
  - Candidate update -> full application view.
  - Accepted Badge -> specific application in Applicant Pool.
  - New application -> full application view or filtered pool.
  - Membership expiry -> billing/account screen.

### Message Center Summary Card

Shows:

- New candidate responses.
- Unread/opened status summaries if available.
- Message send restriction for Department User.

When shown:

- Active departments.
- Expired departments should show disabled state or hide send action.

Actions:

- `Open Messages` goes to `/department/messages`.
- `Send Message` visible/enabled for Department Admin only.
- Department User sees view-only message/template access.

### Resource Center Card

Shows:

- Link to ELR Exam Schedule.
- Help & FAQs.
- Other GB Admin-published department resources.

When shown:

- When GB Admin has published resources for Department Admin/User dashboards.

Actions:

- Resource item opens `/department/resources/[resourceId]` or the external/internal configured target.
- `View All Resources` goes to `/department/resources`.

### Recent Activity Card

Shows a compact stream of department-relevant activity:

- New direct application received.
- Badge accepted.
- Candidate updated application.
- Candidate membership became inactive/reactivated.
- Job/profile submitted or returned.
- Application status changed.
- Department message response received.

When shown:

- Always for active departments.
- Expired state may show historical activity but should not show new notification activity.

Actions:

- Each activity opens the relevant record/screen.

## Button and Action Routing Rules

| Button / Link | Destination / Action | Visibility / Disable Rules |
| --- | --- | --- |
| `Edit Profile` | `/department/profile` | Department Admin/User |
| `Submit Profile for Approval` | profile submit action | Draft or Revisions Needed profile; sends GB Admin notification |
| `View Public Profile` | public department profile | Only active/approved profile |
| `Create Job Post` | `/department/jobs/new` | Department Admin/User |
| `Submit Job Post for Approval` | job submit action | Draft or Revisions Needed job; sends GB Admin notification |
| `Manage Job Posts` | `/department/jobs` | Department Admin/User |
| `View Job Applicant Pool` | `/department/applicant-pools?jobId=[jobId]` | Active job link |
| `View All Applicants` | `/department/applicant-pools` | Department Admin/User |
| `View Application` | full application route | From pool row/name |
| `Print Application` | print full application view | Hide contact info if visibility rules require |
| `Download Application` | download full application view | Include visible fields, essays, docs, and change log |
| `Export` | export flow | Hide contact info if expired/hidden |
| `Archive` | archive action | Department Admin/User |
| `Unarchive` | unarchive action | Department Admin/User |
| `Browse Badge Pool` | `/department/badge-pool` | Active/expired can view; expired cannot send |
| `Send Badge` | send Badge modal/action | Premium tier, active department, credit balance > 0 |
| `Add Credits` | `/department/billing` or Stripe top-up | Credit pack final decision still open |
| `Open Messages` | `/department/messages` | Active departments |
| `Send Message` | message compose action | Department Admin only; disabled for Department User/expired |
| `View Templates` | template library | Department Admin/User |
| `Save as Template` | save template action | Department Admin only |
| `Renew Membership` | `/department/billing` or Stripe checkout | Expired or expiring departments |
| `View ELR Exam Schedule` | department resource target | Resource published by GB Admin |
| `Help & FAQs` | department resource target | Resource published by GB Admin |

## Data Objects Needed by Dashboard

### Department Account

- Department ID.
- Department name.
- Department status.
- Membership status.
- Membership expiration date.
- Plan/tier.
- Admin user.
- User seats.
- Badge credit balance.
- Low-credit warning threshold.
- Expired/restricted-state flags.

### Department Profile Summary

- Profile status.
- Approval requested date.
- Submitted by.
- GB Admin approval notes.
- Published date.
- Draft completeness if available.
- Public visibility state.

### Job Post Summary

- Job ID.
- Job title.
- Job type/track eligibility.
- Job status.
- Approval requested date.
- Submitted by.
- GB Admin approval notes.
- Published date.
- Applicant count.
- New applicant count.
- Archived count.

### Applicant Pool Summary

- Job ID or combined pool ID.
- Total applications.
- Active application count.
- Archived application count.
- New application count.
- Accepted Badge count.
- Direct application count.
- Demographic aggregate percentages.

### Application Summary Row

- Application ID.
- Candidate ID.
- Candidate name.
- Job/position.
- Application source.
- Date received.
- Application status.
- Membership status.
- Track.
- Exam score/date for ELR.
- City/Town.
- Zip Code.
- Phone/email if allowed.
- Relocation.
- Age.
- Work authorization.
- Driver’s license.
- Education.
- Multilingual.
- Veteran.
- Prior experience flags.
- Academy/certification fields.
- Notes indicator.
- Archive status.
- New flag.

### Full Application

- Header fields.
- All visible candidate profile sections.
- Cover letter.
- Supporting document links.
- Essay responses.
- Department notes.
- Department-private files.
- Application source.
- Application status.
- Candidate membership status.
- Contact visibility state.
- Contact visibility expiry countdown.
- Change log.
- Message history links/read status.

### Badge Pool Candidate Summary

- Anonymous candidate ID or row ID.
- Track.
- Job-type eligibility.
- Eligibility signals allowed in Badge Pool.
- Hidden identity/contact/protected fields.
- Badge sent date for this department/job when already sent.
- Accepted status if accepted.

### Notification

- Notification ID.
- Type.
- Related application/job/candidate ID.
- Department ID.
- Created date/time.
- Read/unread state.
- Message/action label.

### Message

- Message ID.
- Department ID.
- Sender role.
- Recipient application/candidate IDs.
- Subject/RE line.
- Body.
- Sent date/time.
- Opened/unopened status per recipient.
- Full distribution list.
- Template used.
- Printable metadata.

### Resource Center Item

- Resource ID.
- Audience: Department Admin/User.
- Title.
- Content type: text, image, video, hyperlink, PDF, FAQ.
- Published/unpublished state.
- Sort/order.
- New/unread state if supported.

## Restricted State Logic

### When Candidate Becomes Inactive

- Application status auto-updates to `Inactive Membership`.
- Candidate membership status is visually flagged.
- Department receives notification if department is active.
- Contact info remains visible to active department for 90 days after inactive/lapse/cancellation/expiration.
- After 90 days, contact info hidden from application view, print, download, export, and messaging.
- Previously submitted applications restore on candidate renewal/reactivation.

### When Candidate No Longer Meets Requirements

- Application status auto-updates to `No Longer Meets Requirements`.
- Department receives alert.
- Contact info remains visible unless another hiding rule applies.

### When Department Expires

- All candidate contact information hidden immediately.
- Exports hide all contact information.
- Department cannot receive notifications/messages.
- Department cannot send messages.
- Department cannot update candidate status.
- Department can view Badge Pool but cannot send Badges.
- Candidate cannot accept Badge from expired department.
- Department can renew membership from dashboard.

### When Badge Credits Are Low or Empty

- At 2 credits, show low-credit warning.
- At 0 credits, block Badge sending until additional badge pack purchase.
- Credit top-up package final decision remains open; avoid hard-coding one final package in UI.

## Implementation Notes

- Keep screenshots as visual references only.
- Keep business logic driven by written Master doc requirements.
- Avoid adding bottom-right Quick Actions.
- Keep all department actions discoverable through left menu/top navigation and contextual buttons.
- Department Admin/User dashboards should use the same screens; only disable or hide message-send/template-save actions for Department User.
- Every nested department screen should provide a back path to the relevant parent screen or Department Dashboard.
- Any field displayed in Applicant Pool, Badge Pool, full application, print/download, export, or messaging must obey the visibility rules in this document and `11-object-field-registry.md`.
- If an item is marked TBD or final decision pending, build the UI/data model to be configurable and avoid hard-coded final business values.
