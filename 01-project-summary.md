# Project Summary

## Product

GetBadged is a two-sided recruiting and credentialing marketplace for law-enforcement and public-safety hiring. Candidates create profiles, complete track-specific requirements, upload documents, purchase memberships or exam products, apply directly to department job posts, and receive Badge Requests from departments.

Departments create public Department Profiles, publish job opportunities, browse an anonymized Badge Pool, send Badge Requests, manage Applicant Pools, update application statuses, message candidates, export data, and manage recruitment workflows.

GB Admins control the platform: users, departments, exams, scores, templates, approval workflows, dynamic fields, status options, reports, exports, messaging oversight, impersonation, audit logs, and platform configuration.

## MVP Scope

MVP includes the full Master Checklist scope unless a specific item is marked as deferred or needing confirmation. Phase 1 is Massachusetts only.

Included in MVP:

- Public marketing and browse experience
- Candidate signup, login, dashboard, profile, documents, memberships, tokens, exam registration, Badge Requests, direct applications, submitted applications, messages, notifications, settings
- Department self-registration with approval
- Department dashboard, profile builder, job post builder, Badge Pool, Badge Requests, Applicant Pools, full application view, status pipeline, archive, exports, messages, notifications, settings
- GB Admin portal for approvals, users, departments, candidates, exams, scores, products, statuses, templates, CMS, reports, exports, impersonation, audit logs
- Mock-data frontend first
- Prisma data model planning now

Deferred:

- AI assist for Department Profile and Job Post drafting
- Personality Assessment product
- Physical Fitness Assessment product
- Multi-state rollout beyond Massachusetts
- Native mobile apps

## Repositories

The project will use separate repositories:

- `getbadged-frontend`: Next.js App Router frontend
- `getbadged-backend`: NestJS REST API, Prisma, Supabase Postgres

This folder is the frontend repo and contains planning docs plus, later, the frontend application code.

## Core Roles

- Visitor
- Candidate
- Department Admin
- Department User
- GB Admin

Candidate tracks:

- ELR: Entry-Level Recruit
- CXO: Certified / Experienced Officer
- OPS: Other Public Safety

Current source of truth:

- `MASTER GetBadged Dev Checklist | 1st june.pdf`

## Core Dashboards

- Candidate dashboard, with track-specific eligibility and actions
- OPS dashboard follows the CXO dashboard layout/options unless later client differences are provided
- Department dashboard, shared by Department Admin and Department User with messaging permission differences
- GB Admin dashboard

## Key Product Principles

- Candidates Apply.
- Departments Badge.
- Badge Pool is anonymized before consent.
- Full candidate application data is released to a department only after direct application or Badge acceptance.
- Stripe is the financial source of truth.
- Supabase Auth is the identity source of truth.
- Supabase RLS and backend authorization must protect all cross-role and cross-department data boundaries.
- Candidate contact information expires from department access after the latest checklist grace rules.
- Dynamic profile/job templates should be planned as GB Admin-managed configuration, even when the frontend starts with mock schemas.
