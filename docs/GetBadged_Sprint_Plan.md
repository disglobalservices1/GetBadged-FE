# GetBadged Project Sprint Plan

Weekly delivery plan for frontend mocks, backend implementation, integrations, and release readiness.

## Sprint Overview

| Sprint | Dates | Primary Focus |
| --- | --- | --- |
| Sprint 1 | May 18 - May 25, 2026 | Complete all frontend mock flows and prepare demo readiness. |
| Holiday Break | May 26 - May 31, 2026 | No planned delivery work. |
| Sprint 2 | June 1 - June 7, 2026 | Start backend foundation and align API contracts with frontend mocks. |
| Sprint 3 | June 8 - June 14, 2026 | Build core backend APIs for auth, profiles, jobs, and public data. |
| Sprint 4 | June 15 - June 21, 2026 | Build application, Badge Request, Badge Pool, file, and audit APIs. |
| Sprint 5 | June 22 - June 28, 2026 | Complete integrations for payments, communications, admin operations, and exams. |
| Sprint 6 | June 29 - July 5, 2026 | Client testing, release hardening, deployment prep, and handoff. |

## Planning Assumptions

- Frontend mock flows are planned for completion during the first working week.
- Holidays are planned from May 26 through May 31, with no delivery work scheduled.
- Sprint 2 begins on June 1 and starts backend foundation work.
- Each sprint is planned as a one-week delivery cycle.
- Client testing and release hardening are included in Sprint 6.

## Sprint 1: Frontend Mock Completion

**Duration:** May 18 - May 25, 2026  
**Sprint Goal:** Complete all frontend mock flows and prepare the product for internal/demo review.

### Frontend Mock Flows

- Complete remaining frontend mock-data workflows across public, candidate, department, and GB Admin experiences.
- Complete candidate flows for profile, documents, exams, direct apply, Badge Requests, and submitted applications.
- Complete department flows for Applicant Pools, status/archive/export, messages, and notifications.
- Complete GB Admin flows for approvals, users/roles, exams/scores, platform config, CMS, reports, and audit logs.

### Frontend QA And Polish

- Complete responsive QA for desktop, tablet, and mobile layouts.
- Complete frontend form validation review.
- Complete privacy QA for Badge Pool and application visibility.
- Align mock data across public, candidate, department, and admin areas.
- Prepare frontend demo readiness.

### Holiday Break

**Dates:** May 26 - May 31, 2026

- No planned delivery work.
- Schedule pause documented before Sprint 2 begins.

### Sprint 1 Key Deliverables

- Frontend mock version ready for internal/demo review.
- Responsive, validation, privacy, and mock-data consistency passes completed.
- Holiday break accounted for before backend kickoff.

## Sprint 2: Backend Foundation

**Duration:** June 1 - June 7, 2026  
**Sprint Goal:** Establish backend architecture, database planning, and API contract direction.

### Project And Architecture

- Set up backend repository and project structure.
- Confirm backend architecture and implementation approach.
- Define standard API response and error handling patterns.

### Data Model Planning

- Plan database schema and core entity relationships.
- Create initial database models for users, departments, candidates, jobs, and applications.
- Define authentication, session, and role model.

### API Contract Alignment

- Review frontend mock data and map it to backend API contracts.
- Prepare mock-to-API integration plan.

### Sprint 2 Key Deliverables

- Backend project structure initialized.
- Authentication, role, and database model direction confirmed.
- Mock-to-API integration plan prepared.

## Sprint 3: Core Backend APIs

**Duration:** June 8 - June 14, 2026  
**Sprint Goal:** Build the core backend APIs needed for auth, profiles, jobs, and public data.

### Authentication And Users

- Implement Supabase Auth, session handling, and role-aware access patterns.
- Build candidate, department, and admin user APIs.

### Core Product APIs

- Build department registration and approval APIs.
- Build candidate profile APIs.
- Build department profile APIs.
- Build job post APIs.
- Build public department and job listing/detail APIs.

### Frontend Integration Start

- Replace high-priority frontend mock data with backend API clients where stable.
- Perform integration QA for authentication, profile, and job journeys.

### Sprint 3 Key Deliverables

- Core backend APIs available for auth, profile, job, and public workflows.
- Initial frontend API integration completed for priority flows.

## Sprint 4: Application, Badge, Upload, And Audit APIs

**Duration:** June 15 - June 21, 2026  
**Sprint Goal:** Build application workflows, Badge Request/Badge Pool APIs, file contracts, and audit foundations.

### Application And Badge Workflows

- Build direct application APIs.
- Build Badge Request APIs.
- Build Badge Pool safe-query APIs with protected candidate data hidden before consent.

### Files And Audit

- Define file, document, and media upload contracts.
- Implement basic audit log model.

### Integration QA

- Replace high-priority frontend mock data with backend API clients.
- Perform integration QA for core user journeys.

### Sprint 4 Key Deliverables

- Direct application, Badge Request, and Badge Pool backend contracts completed.
- File/media upload and audit log foundations defined.
- Integration QA completed for core user journeys.

## Sprint 5: Backend Integrations And Admin Operations

**Duration:** June 22 - June 28, 2026  
**Sprint Goal:** Complete payment, communication, admin, exam, reporting, and platform management integrations.

### Payments And Communications

- Implement Stripe contracts for memberships, application tokens, and department Badge credits.
- Add SendGrid email notification hooks.
- Add Twilio phone verification hooks.
- Build messaging APIs.
- Build notification APIs.

### Department And Admin Operations

- Build Applicant Pool status, archive, and export APIs.
- Build exam management APIs.
- Build score import and publishing APIs.
- Build admin users, roles, and impersonation APIs.

### Platform Management

- Build CMS, platform configuration, template, report, and audit log APIs.
- Expand audit logging coverage across key actions.
- Validate privacy rules and authorization boundaries.

### Sprint 5 Key Deliverables

- Backend feature set completed for MVP scope.
- Payment, messaging, notification, admin, exam, CMS, and reporting contracts completed.
- Privacy and authorization checks validated across backend workflows.

## Sprint 6: Client Testing And Release Hardening

**Duration:** June 29 - July 5, 2026  
**Sprint Goal:** Complete frontend API wiring, support client testing, fix issues, and prepare the release candidate.

### Final Frontend Integration

- Complete remaining frontend API wiring.
- Validate public, candidate, department, and GB Admin workflows against backend services.

### QA And Client Testing

- Perform end-to-end QA across public, candidate, department, and GB Admin workflows.
- Support client testing and review sessions.
- Address client testing feedback and reported issues.

### Release Readiness

- Prepare deployment checklist.
- Complete regression testing for high-priority journeys.
- Prepare release candidate handoff.

### Sprint 6 Key Deliverables

- Frontend fully wired to backend where applicable.
- End-to-end QA completed.
- Client testing feedback addressed.
- Release candidate prepared for deployment/handoff.
