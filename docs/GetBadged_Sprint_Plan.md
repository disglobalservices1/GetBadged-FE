# Get Badged Sprint Plan

June 1st - August 14th

11 Sprints

## Sprint 1: June 1 - June 5

Focus: Priority frontend UI delivery

Deliverables:

- Public page: `/`
- Login: `/auth/login`
- Department Dashboard: `/department`
- Candidate Dashboard: `/candidate`
- Candidate personal information: `/candidate/profile/personal_information`
- Shared shell polish for priority pages: navigation, header, side menu, cards, buttons, responsive behavior
- Desktop/tablet/mobile QA for these priority screens

## Sprint 2: June 8 - June 12

Focus: Remaining implemented Candidate routes

Deliverables:

- Candidate routes:
  - `/candidate/profile`
  - `/candidate/profile/[step]`
  - `/candidate/jobs`
  - `/candidate/jobs/[jobId]`
  - `/candidate/apply/[jobId]`
- Candidate modules:
  - Documents
  - Exams
  - Exam detail
  - Application flow
  - Profile sections
- Responsive QA and mock-data consistency for all currently implemented Candidate screens

## Sprint 3: June 15 - June 19

Focus: Remaining implemented Department routes

Deliverables:

- Department routes:
  - `/department/profile`
  - `/department/profile/edit`
  - `/department/jobs`
  - `/department/jobs/new`
  - `/department/jobs/[jobId]/edit`
- Department modules:
  - Pending approval
  - Profile builder
  - Job builder
  - Reports
  - Notifications
- Responsive QA and mock-data consistency for all currently implemented Department screens

## Sprint 4: June 22 - June 26

Focus: Remaining Department frontend mocks

Deliverables:

- Department modules:
  - Badge Pool
  - Applicant Pool
  - Application detail
  - Messages
  - Message thread
  - Team members
  - Membership/billing
- Responsive QA and mock-data consistency for these Department screens

## Sprint 5: June 29 - July 3

Focus: Public pages, Admin foundation, and frontend finishing

Deliverables:

- Public routes:
  - `/jobs`
  - `/jobs/[jobId]`
  - `/departments`
  - `/departments/[departmentId]`
  - `/resources`
  - `/about`
- Admin UI foundation: `/admin`
- Final frontend mock gaps from latest Master document
- Shared UI cleanup: cards, nav states, drawers, responsive tables, empty states, validation, status chips
- Frontend demo-ready build with known gaps documented

## Sprint 6: July 6 - July 10

Focus: Backend foundation and core architecture

Deliverables:

- Backend repo structure and environment setup
- Backend architecture and module boundaries
- Database schema foundation
- Auth/session/role model
- Standard API response and error format
- Core models: users, candidates, departments, jobs, applications
- Initial API contract alignment against frontend mock data

## Sprint 7: July 13 - July 17

Focus: Core backend APIs

Deliverables:

- Candidate signup/login APIs
- Department registration APIs
- Department approval status APIs
- Candidate profile APIs
- Department profile APIs
- Public department and public job APIs
- Job post APIs

## Sprint 8: July 20 - July 24

Focus: Primary workflow wiring

Deliverables:

- Frontend API wiring for priority auth, dashboard, profile, department registration, public job, and public department flows
- Direct application APIs
- Badge Request APIs
- Badge Pool safe-query APIs
- Department applicant pool APIs
- Archive/status/export API shells

## Sprint 9: July 27 - July 31

Focus: Admin APIs, workflow APIs, and backend hardening

Deliverables:

- GB Admin approval, revision, rejection, user, role, exam, score, CMS/config, and report APIs
- Messaging and notification API foundations
- Privacy and authorization checks
- Backend regression QA for core role journeys

## Sprint 10: August 3 - August 7

Focus: Payment, email, and phone integrations

Deliverables:

- Stripe membership, subscription, token, and badge credit contracts
- Stripe checkout and webhook flows
- Badge credit top-up handling, pending final pack-size confirmation
- SendGrid transactional email templates and triggers
- Twilio phone verification flow
- Integration logging, retry, and failure handling
- Environment/secrets setup for staging

## Sprint 11: August 10 - August 14

Focus: Remaining integrations, final QA, and release handoff

Deliverables:

- Maps/geocoding provider integration for city/radius filtering, pending provider confirmation
- File/document/media upload storage integration
- Secure document/media access rules
- Final PDF/download/export handling
- End-to-end integration QA
- Production environment checklist
- Final client demo data
- Release handoff package
