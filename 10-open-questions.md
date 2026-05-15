# Open Questions

These are not blockers for frontend mock work unless marked critical.

## Needs Client Confirmation

### OQ-01 Department Credit Pack Size

Question:

- What is the final department badge credit top-up pack size and price?

Current handling:

- Mark as `Needs Client Confirmation`.
- UI can show placeholder package configuration.

### OQ-02 Permanent Deletion Retention Period

Question:

- After inactive accounts are archived at 30 days, when may they be permanently deleted?

Current handling:

- Archive at 30 days.
- Permanent deletion period remains `Needs Client Confirmation`.

### OQ-03 Final Design System

Question:

- What final sample designs, logo assets, fonts, and exact component style should be used?

Current handling:

- Use provided candidate application screenshot as baseline.
- Use navy/blue/white/gray professional dashboard style.

### OQ-04 Backend API Contracts

Question:

- Exact REST endpoints, DTOs, and response shapes.

Current handling:

- Use mock data and typed frontend interfaces now.
- Convert to API clients after backend planning.

### OQ-05 Cover Letter Input Format

Question:

- Should cover letters be typed text, PDF upload, or both?

Current handling:

- Frontend can support typed 300-word cover letter first, with optional file field planned.

### OQ-06 Geocoding Provider for Distance Filters

Question:

- Which provider should power town/city radius filtering?

Current handling:

- Mock distance filtering in frontend.
- Backend later can use a provider or stored lat/lng.

### OQ-07 Exact Department Tier Rules

Question:

- Should final tiers follow Master Checklist, MRD, or latest client pricing sheet if another exists?

Current handling:

- Follow Master Checklist if conflict exists.
- Keep pricing/tier configuration data-driven.

## Assumptions For Now

- Candidate can create free account before purchase.
- Free candidate can complete profile draft but cannot Apply, accept Badge, or enter Badge Pool until active.
- Token balance appears on candidate dashboard and point-of-apply.
- Department Admin and Department User can both edit Department Profile and Job Post content.
- GB Admin approval is required before Department Profile and Job Post become public.
- Message Center is two-way per Master Checklist.
- Frontend mock CSV export is acceptable for MVP UI phase.
- Browser print/download shell is acceptable until backend PDF generation is planned.
- AI assist is deferred.
- Personality and Physical Fitness products are deferred.

## Questions To Ask Later

Ask these only when the related task starts:

- During design implementation: final logo, exact font, color palette, spacing scale.
- During profile wizard implementation: exact step order if user wants it changed from reference.
- During department pricing UI: final tier copy and credit-pack configuration.
- During backend planning: encryption strategy for last 4 SSN and sensitive fields.
- During backend planning: exact webhook/event handling for Stripe, SendGrid, and Twilio.
