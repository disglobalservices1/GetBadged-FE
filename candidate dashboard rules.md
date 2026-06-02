# Candidate Dashboard Rules

Source of truth: `MASTER GetBadged Dev Checklist | 1st june.pdf`

Important rule: use written text, tables, and explicit business rules from the Master document for product logic. Screenshots in the Master document are UI theme references only and must not create new functional requirements by themselves.

## Purpose

The Candidate Dashboard is the logged-in workspace for candidate members. It must show the candidate's track, membership state, application token balance, profile and document readiness, exam or certification status, application activity, Badge Requests, Resource Center items, membership controls, notifications, and upgrade options.

The dashboard must be driven by track and eligibility rules, not by a static visual mock.

## Candidate Dashboard Types

There are three candidate member types:

1. `ELR`: Entry-Level Recruit, Track A.
2. `CXO`: Certified / Experienced Officer, Track B.
3. `OPS`: Other Public Safety, Track C.

There are two dashboard layout families:

1. `ELR` dashboard: Entry Level Member dashboard.
2. `CXO/OPS` dashboard: Certified / Experienced Officer dashboard, also used for OPS unless client later gives OPS-specific changes.

## Candidate Access States

Candidate access must consider both member track and account/payment state.

| State | Meaning | Dashboard Behavior |
| --- | --- | --- |
| Free / limited account | Candidate has an account but has not completed a qualifying purchase or membership activation. | Candidate can build profile draft. Applying, Badge Pool visibility, and Badge Request acceptance stay blocked. |
| Purchaser | Candidate purchased an exam, membership, or additional product. | Candidate Dashboard is granted even if profile is incomplete. |
| Active member | Candidate has active membership and required track eligibility items. | Candidate can access eligible actions based on track. |
| Inactive / lapsed / cancelled / expired | Candidate membership is not active. | Candidate is removed from Badge Pool, Accept buttons are hidden, applications may auto-update to inactive status. |
| Restored / renewed | Candidate renews/reactivates membership. | Previously submitted applications reactivate when eligibility is restored. Badge Pool re-entry follows track-specific rules. |

## Role And Track Resolution

The frontend should determine the dashboard variant from authenticated candidate data.

Required user/session fields:

- `user.id`
- `user.role = candidate`
- `candidateProfile.id`
- `candidateProfile.track`: `ELR`, `CXO`, or `OPS`
- `candidateProfile.accountStatus`
- `candidateProfile.membershipStatus`
- `candidateProfile.profileCompletionPercent`
- `candidateProfile.currentStepKey`
- `candidateProfile.fullName`

Routing rule:

- `/candidate` renders the candidate dashboard shell.
- Dashboard content branches by `candidateProfile.track`.
- `ELR` renders Entry Level dashboard content.
- `CXO` renders Certified / Experienced dashboard content.
- `OPS` renders the same dashboard layout/options as `CXO`, with OPS-specific labels, resource availability, requirements, and job eligibility rules.

## Data Sources

### Current Frontend Mock Data Sources

Until backend APIs are connected, the candidate dashboard may be fed from these frontend mock modules:

- `features/candidate/dashboard/get-mock-candidate-dashboard.ts`: dashboard view model.
- `lib/mock/candidates.ts`: candidate profile, track, account status, profile completion, current step.
- `lib/mock/memberships.ts`: membership plan/status/renewal state.
- `lib/mock/tokens.ts`: application token ledger and balance.
- `lib/mock/badgeRequests.ts`: Badge Requests sent to candidate.
- `lib/mock/applications.ts`: submitted applications and statuses.
- `lib/mock/candidateDocuments.ts`: resume, POST cert, waiver, optional documents.
- `lib/mock/exams.ts`: ELR exam registrations, scores, score publish state, exam dates.
- `lib/mock/notifications.ts`: notification center items.
- `lib/mock/messages.ts`: candidate message center data.
- `lib/mock/jobs.ts`: public/candidate job listings and eligibility matching.
- `lib/mock/departments.ts` and `lib/mock/departmentProfiles.ts`: department names/profile data used in applications, jobs, and Badge Requests.

### Future Backend API Data Sources

When backend is connected, dashboard data should come from composed REST endpoints or equivalent service calls:

- Candidate profile API.
- Candidate membership API.
- Token ledger API.
- Candidate documents API.
- Exam registration and score API.
- Badge Request API.
- Submitted applications API.
- Notifications API.
- Message Center API.
- Public jobs/departments API.
- Resource Center CMS API.
- Stripe payment/subscription webhook state.
- SendGrid email event logs where needed.
- Twilio phone verification status where needed.

The UI should avoid duplicating business logic that belongs to backend eligibility checks. Backend should be source of truth for membership, tokens, score validity, application eligibility, Badge Pool eligibility, and application status transitions.

## Candidate Dashboard Side Nav

The Master document defines functional areas but does not provide a complete text-only side-nav table. The side nav below maps current implemented candidate routes to written Master document sections.

### Shared Candidate Side Nav Items

| Item | Route | ELR | CXO | OPS | Purpose / Rules |
| --- | --- | --- | --- | --- | --- |
| Dashboard | `/candidate` | Show | Show | Show | Main dashboard summary for track, membership, tokens, activity, Badge Requests, resources, and membership actions. |
| Candidate Profile | `/candidate/profile` and `/candidate/profile/[step]` | Show | Show | Show | Multi-step candidate profile wizard. Required fields vary by track. Autosave required. |
| Supporting Documents | `/candidate/documents` | Show | Show | Show | Upload and manage required/optional PDF documents. Resume required for all tracks. |
| Exam Registration | `/candidate/exams` | Show | Hide | Hide | ELR-only exam registration and scoring. CXO/OPS do not take the GetBadged entry exam. |
| Certification & Background | `/candidate/profile/background` or equivalent | Hide | Show | Show if OPS-specific background page is needed | CXO requires POST certification or waiver plus attestations. OPS should not show CXO-only POST requirements unless upgraded to CXO. |
| Browse Departments & Jobs | `/candidate/jobs` | Show | Show | Show | Browse public jobs/departments, apply only when track and eligibility allow. |
| Badge Requests | `/candidate/badge-requests` | Show when eligible/in pool or when requests exist | Show when eligible/in pool or when requests exist | Show when eligible/in pool or when requests exist | Displays incoming Badge Requests. Accept only if membership active, department active, and request remains valid. |
| Submitted Applications | `/candidate/applications` | Show | Show | Show | Candidate sees own application history. |
| Tokens & Purchases | `/candidate/tokens` | Show | Show | Show | Shows token balance, ledger, purchase history, membership products, top-ups. |
| Messages | `/candidate/messages` | Top bar only | Top bar only | Top bar only | Candidate message center should live in top bar, not the left nav, unless future design says otherwise. |
| Notifications | `/candidate/notifications` | Top bar only | Top bar only | Top bar only | Candidate-facing notification center. |
| Settings | `/candidate/settings` | Show | Show | Show | Candidate account settings. |
| Privacy & Data | `/candidate/privacy` | Show | Show | Show | Privacy/data controls and consent-related information. |
| Sign out | `/auth/login` or auth logout action | Show | Show | Show | Ends session. |

### Side Nav Behavior

- Side nav must support collapse/expand behavior consistent with the shared app shell.
- Active route must be highlighted.
- Nested candidate pages should show the correct parent active state.
- Badge count may appear on Badge Requests when open requests exist.
- Items must be hidden when they do not apply to the candidate track, not disabled unless there is a clear user-facing reason to explain the restriction.
- Free/limited accounts may still see dashboard/profile/documents, but apply-related actions remain blocked.

## Top Bar Rules

Candidate dashboard top bar should include:

- GetBadged logo linking to `/`.
- Public/Candidate switch or role tab UI used in the current app shell.
- Candidate tab active while in candidate workspace.
- Messages entry in the top bar.
- Notifications icon with unread count.
- Candidate identity block with initials/name/role label.
- User menu affordance.

Functional routing:

- Logo -> `/`
- Public -> `/`
- Candidate -> `/candidate`
- Messages -> `/candidate/messages`
- Notifications -> `/candidate/notifications`
- User menu -> account/settings menu when implemented.

## Main Dashboard Content

### Shared Header

Dashboard header should show:

- Welcome text using candidate first name.
- Candidate track label:
  - `ELR Candidate`
  - `CXO Candidate`
  - `OPS Candidate`
- Membership status.
- Member since date when available.

### Shared CTA Panel

Dashboard should show a primary track-specific CTA panel.

For ELR:

- Headline: "Your future. Your mission." or equivalent approved copy.
- Message should drive browsing departments/jobs and applying with confidence.
- Primary CTA: Browse Departments & Jobs -> `/candidate/jobs`.

For CXO:

- Headline should focus on experience and career movement.
- Primary CTA: Browse Departments & Jobs -> `/candidate/jobs`.

For OPS:

- Use CXO dashboard layout/options unless OPS-specific copy is provided.
- Copy should not imply POST certification unless candidate has upgraded to CXO.

## Dashboard Cards

### Application Tokens Card

Shown to: ELR, CXO, OPS.

Data:

- Current token balance.
- Membership/product context.
- Token purchase/top-up availability.

Rules:

- Direct Apply consumes 1 application token.
- Accepting a Badge Request consumes 0 tokens.
- ELR initial exam purchase grants 5 tokens.
- ELR retake exam resets balance to 5, not additive.
- CXO and OPS initial monthly subscription grants 2 tokens.
- CXO and OPS monthly renewals do not grant additional tokens.
- 4-pack top-up purchase adds 4 tokens for $80 and is available to all active members.
- OPS tokens are voided when OPS upgrades to ELR or CXO.

### Exam Score Card

Shown to: ELR only.

Hide for: CXO and OPS.

Data:

- Exam score percentage.
- Passing/failing state.
- Exam date.
- Score received/published date.
- Maximum score validity date.
- GB Admin verification/published state.

Rules:

- ELR must sit and pay for GetBadged entry exam.
- Passing threshold is 70% or higher.
- Below 70% means candidate is not added to Badge Pool and cannot apply to any positions, even with active membership.
- Score is valid for 12 months from exam date.
- Score is hidden until GB Admin verifies and publishes it.
- Most recent score always replaces prior score, whether higher or lower.
- Complete profile is required before score is posted; if profile/application package is incomplete at score-posting attempt, candidate is disqualified and score is never released.
- Dashboard displays exam date and maximum validity date while subscription is active.

### Open Applications Card

Shown to: ELR, CXO, OPS.

Data:

- Count of active/open submitted applications.
- Count under review.
- Count awaiting department action.
- May include counts by current application status.

Rules:

- Applications update in real time when department changes status.
- New applications start as `New Applicant`.
- Submitted Applications table shows Date Submitted, Department Name, Position, and Application Status.
- Direct apply vs accepted Badge must be distinguishable in application history.
- Candidate sees their own full application history.
- Department notes are never visible to candidate.

### Profile Completeness Card

Shown to: ELR, CXO, OPS.

Data:

- Profile completion percentage.
- Current missing item or next recommended action.
- Current profile wizard step.

Rules:

- Profile completion is not required to receive dashboard access after purchase.
- Profile completion is required for eligibility-dependent actions.
- ELR score cannot be posted if profile/application package is incomplete.
- Profile changes must autosave.

### Account Status Card

Shown mainly to: CXO and OPS dashboard layout.

Optional for: ELR if useful in membership card instead.

Data:

- Active/inactive membership state.
- Member since date.
- Valid until/renewal date.
- Pause/cancel state.

Rules:

- CXO and OPS monthly memberships auto-renew until cancelled.
- CXO and OPS must have an easy pause/cancel action from dashboard.
- ELR membership is 6 months from exam date and does not auto-renew monthly.

### Recent Activity Card

Shown to: ELR, CXO, OPS.

Data:

- Badge Request received.
- Application submitted.
- Application status updated.
- Badge accepted.
- Token used.
- Score posted.
- Membership renewal/lapse/cancellation.

Rules:

- Activity should be sorted newest first.
- Application status updates from department appear in real time.
- Candidate sees their own activity only.
- No department-private notes should appear.

### Badge Requests Card

Shown to: ELR, CXO, OPS when candidate has Badge Requests, or when dashboard needs to expose Badge Request state.

Data:

- Department name after request is accepted? Before accept, candidate may see department/job request details as allowed by dashboard design.
- Specific job type tied to request.
- Sent/requested date.
- Request status.
- Accept action.

Rules:

- Candidate can receive Badge Requests only when in Badge Pool.
- Badge Requests show on dashboard with Accept button.
- Accept button displays the specific job type being accepted toward.
- There is no Decline button.
- Candidate may accept or ignore.
- Accepting a Badge Request is free and consumes zero tokens.
- Accept button is hidden when candidate membership is inactive/cancelled.
- Candidate cannot accept if department account has expired.
- On accept, application moves to Submitted Applications with status `Badge Accepted / [Job Type]`.
- On accept, full profile and documents are released to the department.
- Badge Request remains active until accepted or either side becomes inactive/expired.
- If candidate directly applies to a department that already Badged them, the outstanding Badge is freed and the department credit is returned.

### Eligibility Checklist Card

Shown primarily to: CXO and OPS dashboards.

May also be shown to: ELR if replacing Badge Requests card for eligibility education.

Data:

- Membership active.
- Required resume uploaded.
- Track-specific required documents uploaded.
- ELR exam score valid and passing.
- CXO POST cert/waiver uploaded.
- CXO attestations completed.
- OPS requirements current.

Rules:

- Applications active only when all track-specific eligibility requirements are met.
- Inactive membership blocks application actions.
- Resume is required for all tracks.
- ELR needs passing score 70%+ and score less than 12 months old.
- CXO needs valid POST certificate or out-of-state waiver plus resume.
- OPS needs active membership and resume; no ELR exam or CXO POST requirements unless upgraded.

### Resource Center Card

Shown to: ELR, CXO, OPS with member-type filtering.

Resource items from Master doc:

| Resource | ELR | CXO | OPS | Content Types | Notes |
| --- | --- | --- | --- | --- | --- |
| GetBadged News & Announcements | Show | Show | Show | Pics, short videos, hyperlinks, formatable text, PDFs | `New` indicator lights up when updated and unread; disappears once read. |
| Physical Fitness Standards & Prep | Show | Show | Show | Pics, short videos, hyperlinks, formatable text, PDFs | Links to page with text and printable PDFs of standards. |
| ELR Exam Study Guide | Show | Hide | Hide | Formatable text, hyperlink | Links to page with text and partner-site purchase link. |
| Application Tips & Best Practices | Show | Hide unless client adds | Show | Pics, short videos, hyperlinks, formatable text, PDFs | Assignable by GB Admin. |
| Help & FAQs | Show | Show | Show | Hyperlinks, formatable text, PDFs | FAQ bank supports add/remove and member-type assignment. |

GB Admin capabilities for resources:

- Setup and add to dashboards.
- Add/edit content.
- Unpublish from dashboards.
- Add/remove individual FAQs.
- Assign member type to specific FAQ where applicable.

### Membership Card

Shown to: ELR, CXO, OPS when membership/product state exists.

Data:

- Membership plan label.
- Active/inactive/cancelled/paused state.
- Token balance.
- Token progress/usage display.
- Membership details link.
- Renewal/expiry information.
- Pause/cancel controls.
- Top-up token pack purchase.

ELR rules:

- ELR membership is created by exam purchase.
- Membership lasts 6 months from registered exam date, even if no score is posted or candidate does not attend.
- ELR can renew for 6 months for $85.
- ELR renewal grants no additional tokens.
- ELR can use passing score for the next 6 months only if renewed before expiry, but never beyond 12 months from exam date.
- ELR retake exam price is same as exam format and resets token balance to 5.

CXO/OPS rules:

- Monthly membership fee is $29/month.
- Auto-renews via Stripe until cancelled.
- Initial monthly subscription grants 2 tokens.
- Monthly renewal does not grant more tokens.
- Must have pause/cancel from dashboard.

All tracks:

- Cancellation/lapse/expiry removes candidate from Badge Pool immediately.
- Accept Badge buttons are hidden when inactive.
- Restoring membership reactivates prior submissions if eligibility is restored.
- 4-pack token top-up = $80 and adds 4 tokens.

### Additional Products Card

Shown to: track/member types according to product eligibility and GB Admin configuration.

Potential items from current design and Master resource rules:

- Hiring playbook / application tips.
- ELR Exam Study Guide.
- Support/contact block.
- Physical Fitness Standards & Prep.

Rules:

- Do not show product cards that imply an unavailable track-specific action.
- ELR Exam Study Guide is ELR-only.
- Application Tips & Best Practices are ELR and OPS in the June 1 table.
- AI assist is deferred unless explicitly added later.
- Personality Assessment and Physical Fitness Assessment products are deferred unless client reactivates them.

## Candidate Profile Data Shown / Managed From Dashboard

The dashboard can link into or summarize these profile areas.

### Contact Information

Required for ELR, CXO, OPS:

- First name.
- Last name.
- Street address.
- Town/city.
- State.
- ZIP.
- Phone, SMS verified during profile completion.
- Date of birth.
- Last 4 digits of SSN.
- Citizenship / work authorization status.
- Valid driver's license yes/no.
- Gender.
- Ethnicity.
- Highest education level.
- Fluent in language other than English.
- Languages if yes.
- Willing to relocate.
- Desired hiring agencies.
- Position currently qualified for.
- How candidate heard about GetBadged.

Privacy rules:

- Name, phone, street address, ethnicity, age/date of birth, gender, and application history are never visible in Badge Pool.
- Citizenship/work authorization is never visible in Badge Pool.
- Desired hiring agencies, current qualified positions, and referral source are internal only and never shown to departments.

### Training And Experience

Required for ELR, CXO, OPS:

- Volunteer/community service yes/no, with where/when if yes.
- Police Cadet/Citizens Police Academy yes/no, with where/when if yes.
- MA Civil Service exam status, collected for hybrid PDs and does not affect eligibility.
- Prior public-safety experience yes/no, with role/agency/years if yes.
- Credentials multi-select: CPR, EMT, LTC.
- Completed full-time academy yes/no.
- Academy type and when/where if applicable.
- Previously employed as police officer yes/no, with where/when if yes.

CXO-only:

- Active POST certification attestation.
- Certification in good standing attestation.

### Background

Required for ELR, CXO, OPS:

- U.S. military service yes/no.
- Qualified veteran status yes/no.
- LTC obstacle/eligibility.

Optional:

- Social media handles.
- Additional skills/qualifications.
- Personal essay responses.

Essay rules:

- Candidate chooses 5 of 10 prompts.
- Each response is max 125 words.
- Once a prompt is chosen, it is removed from available choices.
- Essay responses are included on department application view, print, download, and exports.
- Essay responses are not shown in Applicant Pool column view or Badge Pool.

## Supporting Documents Rules

Documents should be managed from Supporting Documents and reflected on dashboard readiness.

| Document | ELR | CXO | OPS | Rules |
| --- | --- | --- | --- | --- |
| Resume | Required | Required | Required | Required before applications become active. |
| POST Certificate | N/A | Required | N/A | CXO must upload valid full-time POST cert before applying. |
| Out-of-State Exemption Waiver | N/A | Conditional | N/A | CXO out-of-state candidates upload waiver in lieu of POST cert. |
| DD-214 | Optional | Optional | Optional | PDF upload. |
| College Transcript | Optional | Optional | Optional | PDF upload. |
| LTC Certificate | Optional | Optional | Optional | PDF upload. |
| CPR Certificate | Optional | Optional | Optional | PDF upload. |
| EMT / Paramedic Certificate | Optional | Optional | Optional | PDF upload. |
| Academy Graduation / Completion Verification | Optional | Optional | Optional | PDF upload. |
| Fitness Certificate | Optional | Optional | Optional | PDF upload. |
| Training / Course Certificate - Other | Optional | Optional | Optional | PDF upload. |
| Letter of Recommendation | Optional | Optional | Optional | PDF upload. |
| Other / Misc | Optional | Optional | Optional | PDF upload. |

Upload rules:

- All documents must be PDF format.
- Multiple files are allowed per category.
- Category is selected via dropdown only.
- No individual upload buttons per document type.
- Documents appear as clickable links on Supporting Documents page.

## Exam Registration Rules

ELR only.

Dashboard should link to exam registration and show exam state where applicable.

Rules:

- ELR exam is 65% non-cognitive and 35% cognitive/scenario-based.
- Exam offered 2-5 times per month.
- Two formats: online live-proctored and in-person.
- Online exam + 6 month membership costs $145.
- In-person exam + 6 month membership costs $120.
- Retake costs same as selected format.
- Retake resets token balance to 5, not additive.
- Passing score is 70% or higher.
- Score valid for 12 months from exam date.
- No limit on retakes.
- No waiting period between exams.
- Exam date options shown in chronological order.
- Seat quantity is not shown to candidates.
- Registration deadline should display: "Or until sold out, whichever comes first."
- Candidate is not registered until full payment is received.
- No refunds, rescheduling, or transfers; acknowledgement required at checkout.
- Online pre-exam steps due 72 hours before exam.
- In-person exam prohibits cell phones or smart devices.
- Two reminder emails are sent 7-10 days before exam.
- If exam registration is added to cart but not purchased, after 30 minutes exam seat returns to inventory.
- State filter hidden for Phase 1; MA only.

## Badge Pool Eligibility Rules

Dashboard should clearly show whether candidate is eligible for Badge Pool visibility.

ELR enters Badge Pool only when:

- Exam score is 70% or higher.
- Score is less than 12 months old.
- Membership is active.
- Required resume is uploaded.

CXO enters Badge Pool only when:

- Membership is active.
- Resume is uploaded.
- Valid POST certificate or out-of-state waiver is uploaded.
- Required CXO attestations are complete.

OPS enters Badge Pool only when:

- Membership is active.
- Resume is uploaded.
- OPS-required profile/documents are current.

All tracks:

- Removed from Badge Pool immediately on membership cancellation, expiration, or lapse.
- Re-added after renewal only if track-specific eligibility is still valid.
- Candidate remains in global Badge Pool after accepting a Badge.
- Candidate is removed only from that department's pool view after accepting that department's Badge.
- Direct apply does not remove candidate from any department's Badge Pool view.
- Badge Pool refresh should be real-time.

## Direct Application Rules

### Job Eligibility By Track

| Posting Type | ELR | CXO | OPS |
| --- | --- | --- | --- |
| Entry Level postings | Can apply | Can apply | Cannot apply |
| Certified Officer postings | Cannot apply | Can apply | Cannot apply |
| Experienced Officer postings | Cannot apply | Can apply | Cannot apply |
| Dispatcher / OPS postings | Can apply | Can apply | Can apply |
| Specialty / Command Staff postings | Cannot apply | Can apply | Cannot apply |

### Direct Apply Rules

- Direct Apply costs 1 application token.
- System blocks application if candidate does not meet department minimums.
- Blocking popup: "Currently, you do not meet the requirements to apply to this position."
- Minimum Requirements list must show immediately above consent checkbox and Apply button.
- Consent checkbox is required before Apply.
- Consent copy: "By applying to this position, I confirm I meet the requirements and consent to share my Profile & Supporting Documents."
- Apply button sits next to checkbox.
- Candidate can attach optional cover letter per application.
- If no cover letter, department sees "No cover letter attached."
- Candidate can submit one application per job type per department.
- Candidate cannot re-apply to same job at same department regardless of membership.
- Application history is private from other departments.

## Submitted Applications Rules

Dashboard and Submitted Applications page should show:

- Date submitted.
- Department name.
- Position.
- Application status.
- Direct Application vs Accepted Badge indicator.
- Status updates in real time.

Status behavior:

- New applications start as `New Applicant`.
- Direct applies feed into the department's per-job Applicant Pool.
- Accepted Badges feed into the specific job type Applicant Pool.
- Candidate can see their own full application history.
- Candidate cannot see department internal notes.
- Auto-update to `No Longer Meets Requirements` when candidate no longer meets department requirements.
- Auto-update to `Inactive Membership` when membership lapses, cancels, or expires.
- Previously submitted applications are restored upon renewal/reactivation if eligibility is restored.

## Notifications Rules

Candidate dashboard and notification center should support these candidate-facing events:

- Product or membership purchase confirmation.
- In-person exam registration confirmation.
- Online exam reminder notifications 7-10 days before exam.
- Badge Request received.
- Score posted.
- Score approaching 6-month expiry warning.
- Membership lapse/cancellation warning.
- Account approaching 365-day inactivity archival warning.
- Application status update by department.
- Candidate monthly subscription renewal notification for CXO and OPS only, with pause/cancel option somewhere on notification.

Dashboard notification icon:

- Shows unread count.
- Routes to candidate notification center.
- Notification center is distinct from Message Center.

## Message Center Rules

- Candidate messages should be available from top bar.
- Message Center should not be duplicated in the candidate side nav unless product design changes.
- Application/contact information visibility rules still apply inside messaging.
- Candidate contact information may be hidden from department-side views after 90 days from inactive status or when department expires, whichever comes first.

## Track Upgrade Rules

Dashboard should expose eligible upgrade prompts based on track.

### OPS To ELR

When OPS upgrades to ELR:

- New ELR membership replaces OPS membership.
- Candidate must register for entry exam.
- 5 new Application Tokens are granted.
- Any remaining OPS tokens are voided.
- Candidate now follows ELR exam, score, Badge Pool, and application rules.

### OPS To CXO

When OPS upgrades to CXO:

- CXO membership applies.
- Required supporting documents change to POST certificate or waiver plus resume.
- Candidate can apply to ELR, CXO, and OPS posting types after eligibility requirements are met.
- Any remaining OPS tokens are voided.

### ELR To CXO

When ELR upgrades to CXO:

- Standard CXO membership applies after POST certification is obtained.
- Exam score and ELR history are superseded for current eligibility.
- Candidate follows CXO document/attestation/application rules.

### No Downgrade

- CXO cannot downgrade to ELR.
- CXO cannot downgrade to OPS.
- No downgrade path exists.

## Free / Limited Candidate Dashboard Rules

Free/limited candidate state is allowed by project decision and current product behavior.

For free/limited accounts:

- Candidate can access dashboard.
- Candidate can complete profile draft.
- Candidate can upload draft/profile data if allowed by UX.
- Candidate cannot directly apply.
- Candidate cannot accept Badge Requests.
- Candidate cannot appear in Badge Pool.
- Candidate should see blocked action messaging explaining that purchase/membership and requirements are needed.

This state is an account/payment state, not a separate candidate track.

## Privacy Rules

Never expose these fields in Badge Pool:

- First name.
- Last name.
- Phone number.
- Street address.
- Ethnicity.
- Age/date of birth.
- Gender.
- Where else the candidate has applied.
- Department currently serving with, for CXO.

Candidate dashboard may show these to the candidate, but not in anonymous department Badge Pool views.

## Error And Empty States

Dashboard should handle:

- No active membership.
- No token balance.
- No applications.
- No Badge Requests.
- No published exam score.
- Score pending verification.
- Missing required documents.
- Inactive/cancelled/expired membership.
- Department expired while candidate has pending Badge Request.
- Candidate track unsupported or missing.
- Backend unavailable.

All user-facing errors should be clear, structured, and action-oriented.

## Implementation Guardrails

- Do not hardcode profile percentage; calculate from profile step/data completion.
- Do not hardcode dashboard type; branch from candidate track.
- Do not hardcode token balance; use token ledger.
- Do not show ELR exam cards to CXO/OPS.
- Do not show CXO POST requirements to ELR/OPS unless upgrading or eligible for CXO.
- Do not consume tokens on Badge Request acceptance.
- Do not allow direct apply without eligibility, consent checkbox, and token availability.
- Do not show department notes to candidates.
- Do not expose Badge Pool private fields.
- Do not treat sample screenshots as source of business logic.
- Keep dashboard UI aligned with shared app shell, top nav, side nav, cards, buttons, spacing, and responsive behavior documented in `06-theme-design-specs.md`.

