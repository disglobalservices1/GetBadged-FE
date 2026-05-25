# GetBadged Frontend Planning Docs

This folder is the `getbadged-frontend` project workspace. These planning files are the working source of truth for the first frontend build before the separate backend repository is started.

## Source Priority

1. `MASTER GetBadged Dev Checklist | Last Update_ 051426.pdf` is the current product source of truth.
2. `GetBadged_MRD_LATEST.pdf` is supporting context only.
3. `MASTER GetBadged Dev Checklist old.pdf` is archived and should only be used for comparison.
4. If the MRD and Master Checklist conflict, follow the current Master Checklist.
5. User decisions in this repo override both documents when explicitly recorded.

## Confirmed Stack

- Frontend repo: `getbadged-frontend`
- Backend repo: `getbadged-backend`
- Frontend: Next.js latest, App Router, TypeScript
- Frontend deployment: Vercel
- Backend: NestJS REST API, Prisma, Supabase Postgres
- Backend deployment: Railway
- Auth: Supabase Auth
- Storage: Supabase Storage
- Payments: Stripe
- Email: SendGrid
- SMS: Twilio
- Phase 1 geography: Massachusetts only

## Planning Files

- [00-start-work-rules.md](00-start-work-rules.md)
- [01-project-summary.md](01-project-summary.md)
- [02-requirements.md](02-requirements.md)
- [03-user-stories.md](03-user-stories.md)
- [04-task-groups.md](04-task-groups.md)
- [05-progress-tracker.md](05-progress-tracker.md)
- [06-theme-design-specs.md](06-theme-design-specs.md)
- [07-agent-context.md](07-agent-context.md)
- [08-user-roles.md](08-user-roles.md)
- [09-data-model-plan.md](09-data-model-plan.md)
- [10-open-questions.md](10-open-questions.md)
- [11-object-field-registry.md](11-object-field-registry.md)

## Build Approach

Frontend is built first with mock data and realistic interaction states. The UI should be structured so API replacement is straightforward once the backend repo begins. Routes should be role-based in one Next.js app:

- `/candidate`
- `/department`
- `/admin`
- public routes for marketing, departments, jobs, resources, auth, and purchase flows

## Dev Coordination

Before starting work, read [00-start-work-rules.md](00-start-work-rules.md). Task ownership is defined in [04-task-groups.md](04-task-groups.md). Shared object names and field keys are defined in [11-object-field-registry.md](11-object-field-registry.md). Two developers should avoid editing the same route families or shared field contracts at the same time unless a handoff is explicitly noted in [05-progress-tracker.md](05-progress-tracker.md).
