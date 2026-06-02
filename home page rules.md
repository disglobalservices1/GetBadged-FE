# Home Page Rules

Source: `MASTER GetBadged Dev Checklist | 1st june.pdf`

Important rule: this document uses only written checklist text, tables, and stated business rules. Images/screenshots in the Master doc are UI/theme references only and must not be treated as functional requirements unless the written checklist explicitly says so.

## Purpose

The public home page is the unauthenticated entry point for GetBadged. It should introduce the platform, route visitors into candidate or department workflows, expose public browsing paths for jobs and departments, and surface CMS-managed public content without exposing protected candidate data.

The written Master doc labels a `Sample - Home Page` and a `Home Page - Sample Design`, but it does not define exact homepage card titles, exact copy, exact card count, or exact visual layout in text. Therefore, all homepage cards should be treated as configurable public content slots unless the written checklist defines the behavior below.

## Who Can See The Home Page

### Public Visitor

Can see:

- Public home page.
- Public navigation.
- Public jobs.
- Public department listings.
- Public approved department profiles.
- Public active job posts.
- Public resources/about content.
- Login entry point.
- Candidate signup/purchase entry points.
- Department signup/registration entry point.

Cannot see:

- Candidate private profile data.
- Badge Pool candidate identity.
- Candidate contact information.
- Candidate application history.
- Department dashboards.
- Candidate dashboards.
- GB Admin dashboards.
- Department internal applicant pools.
- Department message center.
- Department notes.
- Supporting documents.
- Essays.
- Application change logs.

### Candidate

If already authenticated as candidate:

- Home navigation can still show public browse paths.
- Candidate-focused CTAs should route to `/candidate` or candidate job/apply flows where appropriate.
- Applying to a job must still pass through candidate eligibility, token, membership, profile, and consent rules.

### Department Admin / Department User

If already authenticated as department:

- Home navigation can still show public browse paths.
- Department-focused CTAs should route to `/department` or department setup flows where appropriate.
- Public pages must not expose private dashboard data.

### GB Admin

If already authenticated as GB Admin:

- Can use public pages normally.
- GB Admin CMS/config permissions control homepage statistics, news captions, announcements, text headlines, and announcement blocks.

## Public Header Navigation

The public header should include the GetBadged brand and public navigation. The written Master doc confirms the brand rule:

- `GetBadged` is one word.
- Capital `G`.
- Capital `B`.

Recommended public header links based on public route scope and written feature areas:

| Header Item | Route | Purpose |
| --- | --- | --- |
| Logo / GetBadged | `/` | Return to public home page |
| For Candidates | Candidate information section or candidate public page if created | Explain candidate path and route to candidate signup/login/purchase |
| For Departments | Department information section or department public page if created | Explain department path and route to department signup/login |
| Resources | `/resources` | Public resource content |
| About Us | `/about` | Public about content |
| Search | Search overlay or search route | Search public jobs/departments/resources when implemented |
| Sign In / Login | `/auth/login` | Shared login page |
| Apply Now | Candidate signup/login/apply entry | Starts candidate path; if job-specific context is absent, route to candidate signup or jobs browse |

## Public Footer Navigation

Footer should include public-safe links only:

- Home.
- For Candidates.
- For Departments.
- Resources.
- About.
- Jobs.
- Departments.
- Privacy Policy.
- Terms of Use.
- Contact Us.
- Social links if approved/configured.

Footer must not link directly to private dashboards unless user is authenticated and the link is clearly account-specific.

## Home Page Content Sections

Because exact card copy/card count is not written in the Master doc, implement the home page as configurable sections. The following sections are supported by written requirements and current public scope.

### Hero / Main Intro Section

Purpose:

- Explain GetBadged public-safety recruiting value.
- Provide clear entry points for candidates and departments.
- Provide route into public browsing.

Data shown:

- GetBadged brand.
- Public headline.
- Public supporting text.
- Candidate CTA.
- Department CTA.
- Browse jobs/departments CTA if desired.

CTA routing:

| CTA | Route / Behavior |
| --- | --- |
| Candidate signup / Get started as candidate | `/auth/signup/candidate` or candidate purchase/signup flow |
| Sign in | `/auth/login` |
| Browse jobs | `/jobs` |
| Browse departments | `/departments` |
| Register department | `/auth/signup/department` |

Rules:

- Do not claim dashboard access requires profile completion. Written Master doc says candidate dashboard is granted to all purchasers, and profile completion is not required to receive a dashboard.
- Candidate purchase can happen without subscription/profile/documents. Written flow: name, email, full address, payment, process, prompt to create password, account created, system emails user to encourage profile completion.
- Phone is SMS verified during profile completion, not account creation.

### Candidate Path Card / Section

Purpose:

- Explain how candidates enter GetBadged.
- Route users to candidate signup, login, jobs, or candidate purchase flow.

Data shown:

- Candidate track options should be supported conceptually:
  - ELR: Entry-Level Recruit.
  - CXO: Certified / Experienced Officer.
  - OPS: Other Public Safety.
- Candidate can browse public jobs/departments before login.
- Candidate can create account/purchase depending on flow.

CTA routing:

| CTA | Route / Behavior |
| --- | --- |
| Start candidate profile | `/auth/signup/candidate` |
| Browse jobs | `/jobs` |
| Sign in | `/auth/login` |
| Candidate dashboard | `/candidate`, only if authenticated |

Rules from written Master doc:

- Login is email + password only.
- Web is the supported platform.
- Single login / single account.
- Legacy username migration message appears on first email-login after migration.
- Forgot email/username recovery sends credentials to email on file.
- Forgot password flow continues.
- Inactive session shows continue-session pop-up after 10 minutes of inactivity per checklist text, with autosave for long essay work.
- There is a conflicting final review note elsewhere saying 15 minutes; keep timeout configurable until final decision is confirmed.

### Department Path Card / Section

Purpose:

- Explain department participation.
- Route departments to registration or login.

Data shown:

- Departments can create/edit profile and job content after account setup.
- Department profile/job publishing requires GB Admin approval.
- Department Admin and Department User can update profile/job content.

CTA routing:

| CTA | Route / Behavior |
| --- | --- |
| Register department | `/auth/signup/department` |
| Department login | `/auth/login` |
| Department dashboard | `/department`, only if authenticated |
| Browse public department profiles | `/departments` |

Rules from written Master doc:

- Department Profile cannot become active until approved by GB Admin.
- Job Post cannot become active until approved by GB Admin.
- Candidate-facing Department Profiles are hidden if inactive.
- Available jobs are automatically removed/hidden upon membership expiration.
- Department Profile drafts remain visible on Department Admin/User dashboards but hidden from candidate-facing pages.
- Job Post drafts remain internal until approval/publishing.

### Browse Jobs Card / Section

Purpose:

- Route visitors into public job browsing.

CTA routing:

- `Browse Jobs` -> `/jobs`
- Job card/detail -> `/jobs/[jobId]`
- Job Apply -> candidate apply flow if logged in, otherwise signup/login.

Public job data shown:

- Active/approved job posts only.
- Department name.
- Job title/position.
- Position category.
- Job type/track eligibility.
- Location.
- Department profile link if available.
- Job details and requirements.
- Hiring process.
- Salary/benefits if configured.
- Apply entry point.

Position categories supported by written Master doc:

- Entry Level Recruit Officer.
- Certified Officer.
- Lateral Transfer Officer.
- Reserve Officer.
- Campus Police Officer.
- Corrections Officer.
- Deputy Sheriff.
- School Resource Officer.
- Harbormaster/Marine Unit.
- Leadership & Command Staff.
- Dispatcher.
- Communications Officer.
- Security Officer - Armed.
- Security Officer - Un-Armed.
- Court Officer.

Job detail data supported by written Master doc:

- Role.
- State requirements.
- Exam requirement Y/N.
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

Apply rules:

- Apply requires candidate account/session.
- Direct application costs 1 candidate application token.
- Badge acceptance never consumes a candidate token.
- Candidate must meet job minimums before applying.
- Candidate must check consent before applying.
- Minimum requirements are displayed above consent checkbox and Apply button.
- Optional cover letter may be attached per application.
- One application per job type per department per candidate.

### Browse Departments Card / Section

Purpose:

- Route visitors into public department browsing.

CTA routing:

- `Browse Departments` -> `/departments`
- Department card/detail -> `/departments/[departmentId]`
- Available job from profile -> `/jobs/[jobId]`

Public department data shown:

- Approved/active department profiles only.
- Department name.
- Department location.
- Department profile content entered through approved template fields.
- Department photo/short video if approved/published.
- Available active job posts.

Public department profile rules:

- Department Profile cannot become active until approved by GB Admin.
- Candidate-facing Department Profiles are hidden if inactive.
- Department Profile content is dynamic; GB Admin controls fields, sections, required states, permissions, order, and visibility.
- Candidate-facing display must be mobile optimized with larger text, section cards, icon buttons, collapsible panels, and logical section order.

Do not show:

- Draft profile content.
- Pending approval profile content.
- Revisions Needed profile content.
- Inactive department profiles.
- Expired/inactive available jobs.
- Department internal notes.
- Department dashboard data.

### Resources Card / Section

Purpose:

- Route visitors to public resource content.

CTA routing:

- `Resources` -> `/resources`
- Individual resource -> `/resources/[resourceId]` or configured CMS route.

Data shown:

- Public-safe resource title.
- Short description.
- Content type if useful: article, PDF, video, link, FAQ.
- New/unread state only for authenticated audience-specific dashboards; public home should not depend on unread state unless CMS defines it.

Written Master doc resource types for candidate dashboards include:

- GetBadged News & Announcements.
- Physical Fitness Standards & Prep.
- ELR Exam Study Guide.
- Application Tips & Best Practices.
- Help & FAQs.

Homepage/public resource note:

- The written checklist clearly gives GB Admin CMS powers for news, announcements, homepage statistics, text headlines, and announcement blocks.
- If resource cards appear on the home page, treat them as CMS-managed public content, not hard-coded functional requirements.

### Statistics / Trust Metrics Card Section

Purpose:

- Show homepage statistics if configured by GB Admin.

Data shown:

- Homepage statistics configured by GB Admin.
- Some stats may auto-update.
- Some stats may be manual.

Rules:

- GB Admin can update homepage statistics.
- Avoid hard-coding stats unless they are mock placeholders.
- Stats must not expose private candidate or department data.

### News / Announcements Section

Purpose:

- Show public news captions, announcements, and headline blocks.

Data shown:

- CMS-managed public news.
- Announcements.
- Text headlines.
- Announcement blocks.

Rules:

- GB Admin can add/edit news captions and announcements.
- GB Admin can edit text headlines and announcement blocks.
- Content updates should not require developer support.
- Public announcements must not expose private candidate data, private department applicant data, or internal admin notes.

### About / Platform Explanation Section

Purpose:

- Explain what GetBadged does for candidates and departments.
- Route to `/about` for more detail.

CTA routing:

- `About Us` -> `/about`
- Candidate CTA -> `/auth/signup/candidate` or `/jobs`
- Department CTA -> `/auth/signup/department`

Rules:

- Public copy should use product language correctly:
  - Candidates Apply.
  - Departments Badge.
- Avoid implying departments can see protected candidate identity before consent.
- Avoid implying candidate application history is visible across departments.

## Public Navigation To Nested Pages

The home page can route to these public/nested pages:

| Page / Flow | Route | Who Can Access | Data Rules |
| --- | --- | --- | --- |
| Login | `/auth/login` | Public/authenticated users | Email + password login only |
| Candidate signup | `/auth/signup/candidate` | Public visitors | Starts candidate account/purchase path |
| Department signup | `/auth/signup/department` | Public visitors | Starts department registration path |
| Jobs list | `/jobs` | Public visitors | Active/approved public jobs only |
| Job detail | `/jobs/[jobId]` | Public visitors | Active/approved job post data only |
| Departments list | `/departments` | Public visitors | Active/approved department profiles only |
| Department profile | `/departments/[departmentId]` | Public visitors | Active/approved profile content only |
| Resources | `/resources` | Public visitors | Public-safe CMS/resource content |
| Resource detail | `/resources/[resourceId]` | Public visitors if created | Public-safe CMS/resource content |
| About | `/about` | Public visitors | Public about/platform content |
| Contact | `/contact` if created | Public visitors | Public contact form/info only |
| Privacy Policy | `/privacy` if created | Public visitors | Legal/static content |
| Terms of Use | `/terms` if created | Public visitors | Legal/static content |

Private destinations should not be treated as public nested pages:

- `/candidate`
- `/department`
- `/admin`

If a public CTA targets a private route:

- If authenticated with correct role, route to dashboard.
- If unauthenticated, route to `/auth/login` or appropriate signup flow.
- If authenticated with wrong role, route by role or show access message.

## Button Routing Rules

| Button / Link | Default Route | Notes |
| --- | --- | --- |
| Logo / GetBadged | `/` | Always returns home |
| Sign In / Login | `/auth/login` | Shared login page |
| Apply Now | `/jobs` or `/auth/signup/candidate` | If no job context, use browse/signup entry |
| Start as Candidate | `/auth/signup/candidate` | Candidate account/purchase/profile start |
| Browse Jobs | `/jobs` | Public job list |
| Browse Departments | `/departments` | Public department list |
| Register Department | `/auth/signup/department` | Department account registration |
| For Candidates | Candidate info section/page | If no route exists, anchor to candidate section |
| For Departments | Department info section/page | If no route exists, anchor to department section |
| Resources | `/resources` | Public resources |
| About Us | `/about` | Public about page |
| View Job Details | `/jobs/[jobId]` | Public active jobs only |
| View Department Profile | `/departments/[departmentId]` | Public active profiles only |
| Apply to Job | `/candidate/apply/[jobId]` if authenticated, otherwise signup/login | Must enforce candidate eligibility/consent/token rules |

## Public Data Rules

### Allowed On Home Page

- Public brand content.
- Public marketing copy.
- CMS-managed public headlines.
- CMS-managed public announcements.
- CMS-managed public homepage statistics.
- Public active/approved job summaries.
- Public active/approved department summaries.
- Public resources.
- Public about content.

### Not Allowed On Home Page

- Candidate private profile fields.
- Candidate phone, email, address, DOB/age, gender, ethnicity, last 4 SSN.
- Badge Pool identity or protected candidate details.
- Candidate application history.
- Candidate supporting documents.
- Candidate essay responses.
- Department applicant pool data.
- Application status details for private applications.
- Department notes.
- Application change logs.
- Internal dashboard metrics that are not explicitly public CMS stats.
- Draft, pending, revisions-needed, expired, or inactive department/job content.

## Authentication And Session Rules Connected To Home

Login behavior:

- Email + password only.
- No username login.
- Single login / single account.
- Web platform.

Legacy username migration:

- On first email-login after migration, display: `Your username has been retired. Please use your email address to log in going forward.`

Recovery:

- Forgot email/username recovery sends credentials to email on file.
- Forgot password flow continues unchanged.

Candidate account/purchase flow:

- Candidate dashboard is granted to all purchasers: exam, membership, or additional product purchase.
- Profile completion is not required to receive dashboard.
- Non-member purchase flow can collect name, email, full address, payment, then prompt password creation.
- System emails user to encourage profile completion after account creation.
- SMS phone verification occurs during profile completion, not account creation.

Session:

- Checklist text says after 10 minutes of inactivity, show popup to continue session, then log out if nothing is done.
- Essay/profile work should autosave in real time so nothing is lost.
- Final review text elsewhere says 15 minutes; keep value configurable until final confirmation.

Cart:

- If ELR exam registration is added to cart and not purchased, after 30 minutes the exam is returned to available inventory.

## CMS / Admin Management For Home Page

GB Admin can:

- Update homepage statistics.
- Add/edit news captions.
- Add/edit announcements.
- Edit text headlines.
- Edit announcement blocks.

Implementation rules:

- Homepage stats, announcements, headline blocks, and public resource cards should be CMS/config-driven.
- Content updates should not require developer support.
- Do not hard-code final statistics or announcement copy unless using mock data before CMS/API exists.

## Open Items / Not Defined In Written Master Text

The following are not specifically defined in written home page requirements:

- Exact homepage card count.
- Exact homepage card titles.
- Exact homepage card copy.
- Exact hero headline.
- Exact visual order of home page sections.
- Exact public search behavior.
- Exact dedicated `For Candidates` and `For Departments` page routes.
- Exact public contact route.
- Exact public resource detail route.

Recommended handling:

- Build the homepage with configurable content sections/cards.
- Use screenshots only for theme, visual tone, spacing, and layout inspiration.
- Keep routing and data visibility aligned with the written rules in this file.

## Implementation Checklist

- Home page exists at `/`.
- Header logo returns to `/`.
- Public header contains candidate, department, resources, about, login/sign in, and apply/browse entry points.
- Public CTAs route correctly.
- Jobs and departments shown on home are active/approved only.
- No private candidate/dept/admin data appears.
- Homepage statistics are mock/CMS-ready.
- News/announcements are mock/CMS-ready.
- Resource cards are mock/CMS-ready.
- Candidate apply CTA checks authentication before private flow.
- Department dashboard CTA checks authentication before private flow.
- Mobile navigation exposes the same public routes.
- Footer contains public-safe links only.
