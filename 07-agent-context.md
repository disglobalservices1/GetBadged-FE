# Agent Context

Use this file as the working memory for Codex and future agents.

## User Preferences

- Build frontend first.
- Use mock data until backend exists.
- Backend and frontend are separate repos.
- Current folder is the frontend repo.
- Do not create backend code yet.
- Create detailed planning docs before implementation.
- User stories must be detailed.
- Task groups are extremely important because two developers will split work.
- Avoid generic questions; ask specific questions only when needed.
- If a requirement is very vague, ask the user and also record it in docs.
- If a requirement is normally vague but not risky, make a reasonable assumption and move forward.

## Source of Truth

Primary:

- `MASTER GetBadged Dev Checklist | Last Update_ 051426.pdf`

Secondary:

- `GetBadged_MRD_LATEST.pdf`

Archived/old:

- `MASTER GetBadged Dev Checklist old.pdf`

Conflict rule:

- Current Master Checklist wins over the MRD and older checklist files.
- If a task group was completed before the May 14 checklist review, check `04-task-groups.md` for impact/patch notes.

## Confirmed Project Decisions

- Frontend repo: `getbadged-frontend`
- Backend repo: `getbadged-backend`
- Current folder: frontend repo with planning docs
- Frontend: Next.js latest, App Router, TypeScript
- API style: frontend calls NestJS REST API when backend exists
- Frontend deployment: Vercel
- Backend: NestJS REST API
- Backend deployment: Railway
- Database: Supabase Postgres
- ORM: Prisma
- Auth: Supabase Auth
- Storage: Supabase Storage
- Payments: Stripe
- Email: SendGrid
- SMS: Twilio
- MVP geography: Massachusetts only
- Public marketing pages included in Phase 1
- AI assist deferred
- Personality Assessment deferred
- Physical Fitness Assessment deferred
- Candidate free accounts allowed
- Free candidates get limited dashboard
- Token balance shown on candidate dashboard and point of apply
- Departments self-register and await GB Admin approval
- Department Admin and Department User can edit Department Profiles and Job Posts
- GB Admin approval required before profiles/jobs become public
- GB Admin impersonation included in MVP with audit logs
- Inactive accounts archive after 30 days
- Permanent deletion retention period needs confirmation

## Latest Checklist Delta Notes

The May 14 checklist adds/clarifies these items:

- Candidate `U.S. Citizen` field is now `Citizenship / Work Authorization Status`.
- Candidate and department Resource Centers are explicit product areas.
- Candidate full application view, print, download, export, and dashboard visibility rules are more specific.
- Department job post builder has expanded fields for requirements, eligibility, experience, skills, certifications, schedules, salary, benefits, responsibilities, and hiring process.
- Notification Center requirements are clearer for candidate and department events.
- Completed Dev A/B task groups 1-8 remain completed, but affected groups need patch notes tracked in `04-task-groups.md`.

## Important Product Rules

- Candidates Apply.
- Departments Badge.
- Badge Requests have no Decline button.
- Badge acceptance costs candidate zero tokens.
- Direct application costs candidate one token.
- Candidate cannot apply twice to same job type at same department.
- Badge Pool is anonymous before consent.
- Departments never see where else a candidate has applied.
- Department notes are never visible to candidates.
- Department-private files are visible only to that department.
- Candidate profile changes after application submission must be logged for relevant department view.

## Frontend Architecture Notes

Use one app with role-based routes:

- Public: `app/(public)`
- Auth: `app/auth`
- Candidate: `app/candidate`
- Department: `app/department`
- Admin: `app/admin`

Preferred separation:

- Candidate/public work owned by Dev A.
- Department/admin work owned by Dev B.
- Shared components/types require coordination.

Clean architecture is required:

- `app/` is route composition only.
- Domain rules belong in feature/domain helpers, not page JSX.
- Mock data belongs in `lib/mock`.
- Future API clients belong in `lib/api`.
- Shared contracts belong in `types` and must match `11-object-field-registry.md`.
- Backend later should use controllers, DTOs, use cases/services, repositories, Prisma data access, and external adapters for Stripe/Supabase/SendGrid/Twilio.
- Error handling must include loading, empty, blocked, and error states where relevant.
- API responses must use clean structured success/error envelopes with stable error codes and field validation details.

## Design Baseline

Current design references include the provided candidate application, department profile builder, public Department Profile, public Job Post, and application review screenshots:

- White/light gray shell
- Navy/blue actions
- Gold brand accents
- Clean, dense form layouts
- Left workflow step rail
- Right progress/help panel
- Autosave status
- Public pages with department/job identity and media visible early
- Document-style candidate application review
- Professional SaaS/admin feel

Detailed design rules live in `06-theme-design-specs.md`.

## How to Continue

Before implementation:

1. Read `00-start-work-rules.md`.
2. Read `README.md`.
3. Read `04-task-groups.md`.
4. Read `11-object-field-registry.md`.
5. Read `06-theme-design-specs.md`.
6. Pick an unstarted task group from `05-progress-tracker.md`.
7. Update tracker before editing.
8. Stay inside owned route/component areas.
9. Use mock data first.
10. Keep backend integration points typed and replaceable.
