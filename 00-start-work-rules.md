# Start Work Rules

Every developer or agent must read this file before starting work in the GetBadged frontend repo.

## Always Read These First

Before coding, reviewing, or changing planning docs, read in this order:

1. [README.md](README.md)
2. [07-agent-context.md](07-agent-context.md)
3. [04-task-groups.md](04-task-groups.md)
4. [05-progress-tracker.md](05-progress-tracker.md)
5. [11-object-field-registry.md](11-object-field-registry.md)
6. [06-theme-design-specs.md](06-theme-design-specs.md)

For feature-specific work, also read:

- Requirements: [02-requirements.md](02-requirements.md)
- User stories: [03-user-stories.md](03-user-stories.md)
- User roles: [08-user-roles.md](08-user-roles.md)
- Data model plan: [09-data-model-plan.md](09-data-model-plan.md)
- Open questions: [10-open-questions.md](10-open-questions.md)

## Source Priority

1. Master source of truth: `MASTER GetBadged Dev Checklist Last Update_ 051226.pdf`
2. Supporting source: `GetBadged_MRD_LATEST.pdf`
3. If sources conflict, follow the Master Checklist.
4. Explicit user decisions recorded in this repo override older document assumptions.

## Before Starting A Task

1. Find your task group in [04-task-groups.md](04-task-groups.md).
2. Check ownership boundaries so you do not clash with the other developer.
3. Mark your task group `In Progress` in [05-progress-tracker.md](05-progress-tracker.md).
4. Check [11-object-field-registry.md](11-object-field-registry.md) before creating or renaming fields.
5. Check [06-theme-design-specs.md](06-theme-design-specs.md) before building UI.
6. Check [10-open-questions.md](10-open-questions.md) for unresolved decisions.

## Field & Mock Data Rules

- Do not invent alternate object names or field keys.
- Add shared fields to [11-object-field-registry.md](11-object-field-registry.md) before using them in multiple areas.
- Keep domain mock data under the owner domain where possible.
- If changing shared types, update all impacted mock data in the same change.
- If a field impacts both Dev A and Dev B, note it in [05-progress-tracker.md](05-progress-tracker.md).

## Clean Architecture Rules

GetBadged must follow clean architecture on both frontend and backend. Keep business rules, UI, data access, and external integrations separated.

### Frontend Clean Architecture

- `app/` is for routes, layouts, metadata, loading/error states, and page composition only.
- Do not bury business rules inside page JSX.
- Domain behavior belongs in feature/domain modules, for example candidate eligibility, Badge Pool visibility, token balance logic, application status labels, form-step completion, and role permissions.
- Generic UI primitives belong in `components/ui`.
- Shared app components belong in `components/common`.
- Domain-specific components belong in `components/candidate`, `components/department`, or `components/admin`.
- Mock data belongs in `lib/mock`.
- Future API clients belong in `lib/api`.
- Shared object contracts belong in `types` and must match [11-object-field-registry.md](11-object-field-registry.md).
- Pages should compose components and call domain helpers; they should not own complex filtering, eligibility, privacy, or state-transition logic.

Recommended frontend layering:

```txt
app/                  route composition only
components/ui/        generic primitives
components/common/    shared layout/app components
components/{domain}/  domain UI components
features/{domain}/    domain logic, hooks, view models, helpers
lib/mock/             mock data source
lib/api/              future backend clients
types/                shared contracts
```

### Backend Clean Architecture

The backend repo will be separate, but frontend planning must assume this structure:

- Controllers handle HTTP only.
- DTOs validate and shape input/output.
- Use cases/services hold business logic.
- Repositories wrap Prisma queries.
- Domain modules map to product areas such as auth, users, candidates, departments, jobs, applications, badge-pool, messages, payments, exams, notifications, and admin.
- External tools such as Stripe, Supabase, SendGrid, and Twilio are infrastructure adapters.
- Business logic must not be embedded directly in controllers, Prisma calls, webhooks, or integration adapters.
- Authorization and privacy boundaries must be enforced in services/use cases and backed by database/RLS rules where applicable.

Recommended backend layering:

```txt
modules/{domain}/
  controllers/
  dto/
  services/ or use-cases/
  repositories/
  entities/ or domain/
  adapters/            external integration adapters when domain-specific
common/
  auth/
  guards/
  decorators/
  filters/
  pipes/
  prisma/
  integrations/
```

## UI Rules

- Follow the screenshots and [06-theme-design-specs.md](06-theme-design-specs.md).
- App workflows use clean white/light-gray shells, navy actions, left rails, center forms, and right progress/status panels.
- Public Department Profile and Job Post pages should show real department/job identity immediately.
- Use dropdown/sub-dropdown filters, not standalone filter button clusters.
- Do not expose protected Badge Pool fields.
- Do not show department notes or private files to candidates.
- Use icons with labels or accessible names.
- In cards and stat panels, place icons to the left of the title/heading text, not as a standalone top element.
- Icon/title cards must use `32px` top padding consistently across all pages.

## Error Handling & API Response Rules

Error handling must be intentional across the app. Do not leave failures as console-only errors or blank broken screens.

Frontend rules:

- Every route should have useful loading, empty, blocked, and error states where applicable.
- Forms must show field-level validation errors and a clear submit-level error when the whole action fails.
- Destructive or irreversible actions need confirmation UI.
- Permission failures should show a clear restricted/unauthorized state, not a generic crash.
- Network/API failures should show retry guidance.
- Error messages should be user-safe and should not expose internal stack traces, SQL, tokens, or private IDs.
- Domain helpers should return typed success/failure results where practical instead of throwing through UI components.

Backend/API response rules:

- API responses must be clean, consistent, and structured.
- Success responses should use a predictable envelope.
- Error responses should use a predictable envelope.
- Pagination, filtering, and sorting metadata should be explicit.
- Validation errors should identify the exact field and message.
- API errors should include stable machine-readable codes.
- Backend logs may contain internal details, but public API responses must not leak internals.

Recommended success shape:

```ts
type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: {
    requestId?: string;
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
};
```

Recommended error shape:

```ts
type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
    details?: Record<string, unknown>;
  };
  meta?: {
    requestId?: string;
  };
};
```

Frontend API clients should normalize responses into this shape before domain UI consumes them.

## Completion Rules

Before marking a task `Done`:

- The route works with mock data.
- The UI follows theme specs.
- Shared fields match the object registry.
- Mobile/tablet layout has been considered.
- Empty, loading, and blocked states exist where relevant.
- Error handling exists for route-level and form/action-level failures.
- Privacy-sensitive fields are checked against requirements.
- Progress tracker is updated.
