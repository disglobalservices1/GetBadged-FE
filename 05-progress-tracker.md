# Progress Tracker

Use this file to track who owns what and avoid clashes. Update status before starting and after finishing task groups.

Status values:

- `Not Started`
- `In Progress`
- `Blocked`
- `Review`
- `Done`

## Foundation

| ID | Task Group | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| M0 | Foundation setup | Shared | Done | Next.js, TypeScript, routing, UI primitives, theme, mock patterns |

## Dev A Candidate/Public Track

| ID | Task Group | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| TG-A1 | Public marketing shell | Dev A | Not Started | Public home/about/resources |
| TG-A2 | Public department and job browse | Dev A | Not Started | Department/job list and detail pages |
| TG-A3 | Auth and candidate free signup | Dev A | Not Started | Shared login, candidate signup |
| TG-A4 | Candidate dashboard | Dev A | Not Started | Overview, tokens, eligibility, limited state |
| TG-A5 | Candidate profile wizard | Dev A | Not Started | Autosave, progress rail, all profile steps |
| TG-A6 | Candidate documents | Dev A | Not Started | PDF uploads by category |
| TG-A7 | Candidate exam registration | Dev A | Not Started | ELR exam browse/register UI |
| TG-A8 | Candidate jobs and direct apply | Dev A | Not Started | Eligibility, consent, token use |
| TG-A9 | Badge Requests and submitted applications | Dev A | Not Started | Accept Badge, application history |
| TG-A10 | Candidate messages, notifications, settings | Dev A | Not Started | Candidate communication/settings |

## Dev B Department/Admin Track

| ID | Task Group | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| TG-B1 | Department signup and pending approval | Dev B | Complete | Signup/pending workflow, stepper UX, mock pending state, and admin queue record added and QA checked |
| TG-B2 | Department dashboard | Dev B | Complete | Department overview, plan/credits, jobs, applicants, approvals, messages, notifications, responsive drawer nav, active-route states, and restricted-state model reviewed |
| TG-B3 | Department Profile builder | Dev B | Complete | Draft/edit profile, dynamic sections, media slots, revisions/admin notes, and mock save/submit approval behavior reviewed |
| TG-B4 | Department Job Post builder | Dev B | Not Started | Templates, drafts, approvals |
| TG-B5 | Department Badge Pool | Dev B | Not Started | Anonymous pool, filters, send Badge |
| TG-B6 | Department Applicant Pools | Dev B | Not Started | Per-job/combined pool, full app view |
| TG-B7 | Department status, archive, exports | Dev B | Not Started | Bulk updates, CSV exports |
| TG-B8 | Department messages and notifications | Dev B | Not Started | Compose/history/templates |
| TG-B9 | GB Admin dashboard and approvals | Dev B | Not Started | Department/profile/job approvals |
| TG-B10 | GB Admin users, roles, impersonation | Dev B | Not Started | User management, audit |
| TG-B11 | GB Admin exams and scores | Dev B | Not Started | Exam dates, rosters, score import |
| TG-B12 | GB Admin platform config, CMS, reports | Dev B | Not Started | Statuses, templates, CMS, exports |

## Shared Integration Checklist

| Item | Status | Notes |
| --- | --- | --- |
| Shared mock auth role model | Done | Candidate, Dept Admin, Dept User, GB Admin |
| Shared object/field registry | Done | See `11-object-field-registry.md` |
| Shared route guard pattern | Done | Mock session and role helper added; route-specific guards to be applied during feature work |
| Shared table component | Done | Table shell added for Applicant, Badge Pool, exports |
| Shared form components | Done | Input, textarea, select, checkbox, radio added |
| Shared notification component | Done | Notification list shell added |
| Shared message model | Done | Two-way message thread/message types and mock file added |
| Shared audit log model | Done | Audit log type and mock file added |
| Responsive QA | Not Started | Desktop/tablet/mobile |
| Badge Pool privacy QA | Not Started | No protected fields pre-consent |
| Mock-to-API readiness pass | Not Started | Replace mock data with REST clients later |

## Decisions Logged

| Date | Decision |
| --- | --- |
| 2026-05-14 | Master GetBadged Dev Checklist is source of truth over MRD conflicts |
| 2026-05-14 | Frontend repo is `getbadged-frontend`; backend repo is `getbadged-backend` |
| 2026-05-14 | Current folder is frontend repo with planning MD files |
| 2026-05-14 | Frontend first with mock data |
| 2026-05-14 | Backend later: NestJS REST, Prisma, Supabase Postgres |
| 2026-05-14 | Supabase Auth, Stripe, SendGrid, Twilio |
| 2026-05-14 | Backend deploys on Railway; frontend deploys on Vercel |
| 2026-05-14 | Candidate free accounts allowed with limited dashboard |
| 2026-05-14 | Token balance shown on dashboard and at point of apply |
| 2026-05-14 | Inactive accounts archive at 30 days; deletion period needs confirmation |
| 2026-05-15 | Added expanded demo UI screenshots to theme/design direction |
| 2026-05-15 | Added start-work rules doc that must be read before implementation |
| 2026-05-15 | Added clean architecture rules for frontend and backend |
| 2026-05-15 | Added proper app error handling and structured API response rules |

## Open Blocks

| Item | Status |
| --- | --- |
| Final visual design samples | Pending user samples |
| Department credit pack size | Needs Client Confirmation |
| Permanent deletion retention period | Needs Client Confirmation |
| Exact backend API contracts | Later backend planning |
