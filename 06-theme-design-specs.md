# Theme & Design Specs

This file is the current visual and interaction contract for GetBadged. It is based on the Master Checklist plus the provided demo UI screenshots for candidate application, department profile creation, public Department Profile, public Job Post, and department candidate application review.

## Design Direction

GetBadged should feel like a polished civic recruiting SaaS product:

- Serious, trustworthy, and law-enforcement appropriate
- Clean, white, structured, and form-first
- Operational rather than decorative
- Confident navy/gold branding with restrained use of accent color
- Built for long forms, status tracking, applicant review, and daily department work
- Easy to scan on dense pages without feeling cramped

Avoid:

- Marketing-heavy dashboard pages
- Oversized decorative hero sections inside app workflows
- Purple/gradient SaaS styling
- Rounded bubbly consumer UI
- Dense unstructured forms with no progress context
- Card-on-card nesting

## Screenshot References

Current visual references now include:

- Candidate Application, submitted/review PDF-style view
- Candidate Application wizard steps:
  - Personal Information
  - Education & Preferences
  - Training & Experience
- Department Profile builder
- Public Department Profile page
- Public Job Post viewed by Candidate

These screenshots are reference designs, not pixel-perfect final source files. Use them to guide layout, density, color, rhythm, and interaction behavior.

## Brand Tokens

Use these as the baseline until final tokens are extracted from design files:

- Brand navy: `#001F3F`
- Deep action navy/blue: `#002B73` to `#063B91`
- CTA blue: `#1B33B5`
- Badge gold: `#FEBF3F`
- Success green: `#079455` or close equivalent
- Warning gold: badge gold family
- Error red: muted civic red, not neon
- Page background: `#F5F6F8` or very light gray
- Main surface: `#FFFFFF`
- Section border: `#D9DEE8`
- Muted border: `#E6EAF0`
- Main text: dark navy / near black
- Secondary text: slate gray
- Disabled/locked: gray with clear iconography

## Logo & Brand Use

- Logo lockup uses shield/badge icon plus `GET BADGED`.
- `GET` appears navy.
- `BADGED` appears gold.
- Keep logo on white or navy, never on busy imagery.
- Public footer may use white/gold logo on navy.
- Use `GetBadged` in copy, not `getbadged`, except footer/domain treatment where sample shows `getbadged.com`.

## Typography

Baseline:

- Use a clean sans-serif.
- Prefer Inter/system until final font assets are confirmed.
- Headings are uppercase or title case depending on context.
- Workflow/page labels may use uppercase: `CANDIDATE APPLICATION`, `DEPARTMENT PROFILE`.
- Section headings use navy, bold, compact spacing.
- Form labels are medium/semi-bold and readable.
- Supporting text is smaller and slate-toned.

Rules:

- No viewport-scaled font sizing.
- Letter spacing should remain normal unless matching logo/small labels.
- Use large typography only on public feature pages, not form workflows.

## Core App Layout Pattern

Most authenticated workflow pages use a three-column shell:

1. Left navigation rail
2. Center content/form area
3. Right progress/help/status panel

## Public Page Width & Side Margins

All new public pages must use the shared public wrapper spacing:

- Wrapper class pattern: `mx-auto max-w-7xl px-4 sm:px-6`
- At desktop widths around `1280px`, visible side spacing should be `24px` from the viewport edge.
- Do not use narrower wrappers like `max-w-6xl` for browse/detail public pages unless the design explicitly requires a focused reading layout.
- Existing public pages to match: `/departments`, `/jobs`, `/departments/[departmentId]`, public resources/about pages, and public job detail pages.

### Header

The app workflow header should include:

- Logo at left
- Page title centered or left-center
- Context subtitle when useful, e.g. `Entry Level | New Recruit`
- Autosave indicator with check icon and text like `Last saved 2 minutes ago`
- Secondary action such as `Save & Exit` or `Save Draft`
- Primary action such as `Continue`, `Preview Profile`, or `Save & Continue`

Header style:

- White background
- Thin bottom border
- Compact height
- Button alignment to right

### Left Rail

Left rail style:

- White/light gray rail
- Section list with icons and step numbers
- Active item uses solid navy/blue background and white text
- Completed item shows green check at right
- Incomplete item shows gray outlined circle
- Locked item shows lock icon where applicable
- Help card pinned near bottom when vertical space allows

### Center Content

Center form/content style:

- White background
- Strong navy page/section headings
- Horizontal divider after page intro
- Form groups separated by spacing or thin navy/gray divider
- Two-column desktop layouts where fields naturally pair
- Full-width textareas and upload areas
- Primary action at bottom right; previous/back at bottom left

### Right Panel

Right panel style:

- White background
- Left border
- Progress title like `YOUR PROGRESS`
- Large percent value in green
- Horizontal progress bar
- Step status list with complete/in-progress/not-started states
- Helper cards near bottom

## Candidate Application Wizard

Use the screenshots as the strongest reference for candidate profile/application UI.

### Step List

Candidate steps:

1. Contact Information
2. Personal Information
3. Education & Preferences
4. Training & Experience
5. Background
6. Certifications & Credentials
7. Essay Responses
8. Attachments
9. Review & Submit

Step behavior:

- Current step appears in active navy button.
- Completed steps show green checks.
- Not-started steps show gray circles.
- Locked steps show lock icon.
- Step labels remain concise and stable.

### Form Controls

Use:

- Text input for short text
- Textarea for long text with character counter when relevant
- Select dropdown for controlled option sets
- Radio controls for single yes/no or gender-style options
- Checkbox grids for multi-select option sets
- Upload drop zones for files/media
- Date input with calendar icon where appropriate

Control style:

- Rectangular, modest radius
- Light gray border
- Navy focus ring/border
- Clear active radio/checkbox with navy fill
- Required asterisk in red or navy-compatible alert color

### Autosave

- Always show save state in long workflows.
- Text example: `Last saved 1 minute ago`.
- Include a small check/status icon.
- Use mock autosave in frontend phase.

### Footer

- Workflow pages use a solid navy footer bar.
- Left footer text: copyright.
- Right footer text: `getbadged.com` or support/contact link depending page.

## Department Profile Builder

The Department Profile builder mirrors the candidate wizard, but with department-specific sections.

### Sections

Default visible sections from screenshots:

1. Profile Intro
2. Inside the Department
3. Training & Specialty Units
4. The Community
5. The Schools & Housing
6. Benefits & Compensation
7. Why Join Us
8. Media
9. Review & Publish

### Layout

- Same three-column workflow shell.
- Header title: `DEPARTMENT PROFILE`
- Header subtitle: `Create & Showcase Your Agency`
- Actions: `Save Draft`, `Preview Profile`
- Right panel shows `1 of 9 sections complete` and percent.
- Right helper cards include preview guidance and tips.

### Builder Fields

- Use a mix of text, textarea, date, radio, checkbox grids, selects, and upload drop zones.
- Long text fields show character counters.
- Required fields show clear asterisk.
- File/media upload drop zone should show accepted formats and size limits.
- Tips cards should use compact, useful guidance only.

## Department Candidate Application Review

The submitted/review view should feel like a clean document inside the web app.

### Layout

- White document canvas with thin border.
- Logo top left.
- Application metadata top right:
  - `CANDIDATE APPLICATION`
  - Application ID
  - Submitted date
- Candidate name large in navy.
- Track below in gold.
- Status pill/card on upper right using deep navy.
- Left sidebar quick summary and quick actions.
- Main content uses accordion sections.

### Quick Summary

Use icon + label + value rows for:

- Exam Score
- Education
- FT Academy
- POST Status
- Military
- Certifications
- Languages

### Quick Actions

Use bordered action buttons:

- Download PDF
- Message Candidate
- Add Internal Note
- Archive Application

### Accordion Sections

Use navy section dividers, icon, title, and chevron:

- Contact Information
- Training & Experience
- Background
- Certifications & Credentials
- Essay Responses
- Attachments
- Internal Notes

Internal Notes must be visually department-only and never candidate-facing.

## Public Department Profile Page

Public Department Profile pages are content-rich but still restrained.

### Layout

- Public top navigation with logo, menu items, search, and account/apply CTA.
- Breadcrumbs are allowed on public browse pages if matching reference, even though app workflows avoid global breadcrumbs.
- Main content has department identity, intro, location, badge/logo, media gallery, and available jobs.
- Right sidebar lists available positions as stacked cards.
- Secondary right cards include `Why Join` and contact/help.

### Department Hero

- Use real department imagery where available.
- Department badge/logo appears prominently.
- Department name is a first-viewport signal.
- Video/media controls can be represented as buttons/carousel dots.

### At A Glance

Use compact icon-stat rows/cards for:

- Chief
- Chief sworn in
- Department type
- Population
- Department size
- Patrol officers
- Call volume
- Hiring timeline
- Open positions
- Community type

### Explore Cards

Use image-backed cards with dark overlays for:

- Inside the Department
- Training & Specialty Units
- The Community
- Schools & Housing

Cards should stay readable and not overly dark/blurred.

## Public Job Post Page

Public Job Post pages should match the sample:

- Header/nav and breadcrumbs
- Department badge/logo
- Job title and job type badge
- Location
- Strong job intro
- Media gallery on the right/top
- Primary `Apply Now` button
- Secondary `Save Job` button
- Metadata row: posted date, hiring timeline, openings, department type
- Tabbed content: Overview, Requirements, Schedule & Pay, Benefits
- Right sidebar `Job Details`, `Why Join`, and Questions/contact
- Related available positions section near bottom
- Navy footer

Do not create a generic marketing hero. The job itself and department identity must be visible immediately.

## Cards & Panels

Card style:

- White surface
- Thin gray border
- Small radius
- Light shadow only if needed
- Icon in navy
- Card icons must sit to the left of the title/heading text in the same row. Icon, title, and any right-side number/status should be vertically center aligned; workflow card icons may use about 7px top offset to match the reference visual balance.
- Cards with icon/title header rows must use `32px` top padding everywhere. Do not use tighter default card padding for these cards.
- Dashboard/summary metric cards must use the shared `StatCard` component from `components/common/stat-card.tsx`. `StatCard` is the approved exception to the 32px header-card rule and uses `20px` padding on all sides for consistent compact metric cards across the app.
- List cards with a left media/image column must also start media at `32px` from the card top, matching the text column. Do not flush images to the top border unless the whole card is intentionally image-led.
- Green check icons for positive bullet lists
- Gold used for job type labels or brand accent, not large backgrounds

Do not:

- Put cards inside larger decorative cards
- Use floating gradient sections
- Use large rounded pill-heavy layouts

## Buttons

Primary:

- Navy/blue fill
- White text, always. Primary blue buttons and blue link-buttons must never render dark/black text.
- Optional right arrow icon
- Compact but easy to click

Secondary:

- White background
- Navy border/text
- Used for `Save & Exit`, `Save Draft`, `Previous`, `Save Job`

Dropdown/select controls:

- Standard dropdown height is `56px` (`min-h-14`) so filter bars and form selects feel substantial without becoming oversized.
- Use a custom chevron with `16px` right spacing; do not rely on inconsistent native browser arrow placement.

Icon/action buttons:

- Use familiar icons from lucide-react where possible.
- Add tooltip or accessible label for icon-only buttons.

## Iconography

- Use simple outline icons, preferably lucide-react.
- Icons should feel civic/administrative: user, shield, calendar, document, graduation cap, building, message, archive, download, briefcase.
- Use icons consistently in rails, quick summaries, metadata, and cards.
- In cards and stat panels, align icons beside the heading/title text, then place supporting text below the heading row.

## Tables

Tables remain the pattern for Applicant Pool, Badge Pool, admin records, exports, and audit logs.

Requirements:

- Sortable columns
- Dropdown filters only
- Bulk selection
- Compact row height
- Clear status chips
- Empty and loading states
- No protected Badge Pool fields

## Responsive Rules

Desktop:

- Preserve three-column workflow for candidate/department builders.
- Public pages use main content plus right sidebar where helpful.

Tablet:

- Collapse right progress panel below or into drawer if space is tight.
- Keep left step rail usable.

Mobile:

- Step rail becomes compact top stepper or drawer.
- Right progress panel becomes collapsible section.
- Forms become single-column.
- Sticky primary action can appear at bottom.
- Text must not overflow buttons, cards, or sidebars.
- Job card titles in browse/list cards must stay on one line with ellipsis so card heights remain aligned.

## Accessibility

- Target WCAG 2.2 AA.
- Color is never the only indicator.
- Forms must be keyboard-navigable.
- Inputs need visible focus states.
- Errors must be associated with fields.
- Buttons must have clear labels.
- Icon-only buttons require accessible labels/tooltips.
- Progress and step status should be announced through text, not only icon/color.

## Copy Rules

- Use `GetBadged` exactly in prose.
- Candidates `Apply`.
- Departments `Badge`.
- Do not use `GetBadged` as a candidate-side verb.
- Use `Department Profile`, not legacy alternatives.
- Candidate-facing exam name should follow Master Checklist terminology.
- Keep helper text short and practical.

## Implementation Guidance

- Build reusable workflow shell components:
  - `WorkflowHeader`
  - `WorkflowSidebar`
  - `WorkflowProgressPanel`
  - `WorkflowFooter`
  - `FormSection`
  - `StepStatusList`
- Build reusable public page components:
  - `PublicHeader`
  - `PublicFooter`
  - `MediaGallery`
  - `AtAGlanceGrid`
  - `AvailablePositionsSidebar`
  - `JobDetailTabs`
- Build reusable review components:
  - `ApplicationDocumentShell`
  - `QuickSummaryPanel`
  - `QuickActionsPanel`
  - `AccordionReviewSection`

## Pending Inputs

- Final logo asset
- Final font files/licensing
- Exact color tokens from design source if available
- Mobile reference screens
- Final dashboard examples for Candidate, Department, and GB Admin
