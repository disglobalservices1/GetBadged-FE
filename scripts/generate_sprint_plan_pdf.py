from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT_PATH = "docs/GetBadged_Sprint_Plan.pdf"

NAVY = colors.HexColor("#00264D")
BLUE = colors.HexColor("#0B3B8C")
GOLD = colors.HexColor("#F5B942")
LIGHT_BLUE = colors.HexColor("#EEF5FF")
LIGHT_GRAY = colors.HexColor("#F4F7FB")
BORDER = colors.HexColor("#D9E2EC")
TEXT = colors.HexColor("#334155")
MUTED = colors.HexColor("#667085")


def make_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=32,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=11,
            leading=16,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=20,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=NAVY,
            spaceBefore=14,
            spaceAfter=8,
        ),
        "sprint": ParagraphStyle(
            "Sprint",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=BLUE,
            spaceBefore=12,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=14,
            textColor=TEXT,
            spaceAfter=6,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=12,
            textColor=TEXT,
        ),
        "table_header": ParagraphStyle(
            "TableHeader",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11,
            textColor=colors.white,
            alignment=TA_LEFT,
        ),
        "table_cell": ParagraphStyle(
            "TableCell",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=11.5,
            textColor=TEXT,
        ),
        "table_cell_bold": ParagraphStyle(
            "TableCellBold",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=11.5,
            textColor=NAVY,
        ),
    }


def p(text, style):
    return Paragraph(text, style)


def bullet_list(items, style):
    rows = []
    for item in items:
        rows.append([p("-", style), p(item, style)])
    table = Table(rows, colWidths=[0.16 * inch, 6.5 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )
    return table


def sprint_table(rows, styles):
    data = [
        [
            p("Workstream", styles["table_header"]),
            p("Planned Tasks", styles["table_header"]),
            p("Deliverable", styles["table_header"]),
        ]
    ]
    for workstream, tasks, deliverable in rows:
        data.append(
            [
                p(workstream, styles["table_cell_bold"]),
                bullet_list(tasks, styles["table_cell"]),
                p(deliverable, styles["table_cell"]),
            ]
        )

    table = Table(data, colWidths=[1.35 * inch, 4.45 * inch, 1.35 * inch], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
            ]
        )
    )
    return table


def overview_table(styles):
    data = [
        [p("Sprint", styles["table_header"]), p("Dates", styles["table_header"]), p("Primary Focus", styles["table_header"])],
        [p("Sprint 1", styles["table_cell_bold"]), p("May 18 - May 25, 2026", styles["table_cell"]), p("Complete all frontend mock flows and prepare demo readiness.", styles["table_cell"])],
        [p("Holiday Break", styles["table_cell_bold"]), p("May 26 - May 31, 2026", styles["table_cell"]), p("No planned delivery work.", styles["table_cell"])],
        [p("Sprint 2", styles["table_cell_bold"]), p("June 1 - June 7, 2026", styles["table_cell"]), p("Start backend foundation and align API contracts with frontend mocks.", styles["table_cell"])],
        [p("Sprint 3", styles["table_cell_bold"]), p("June 8 - June 14, 2026", styles["table_cell"]), p("Build core backend APIs for auth, profiles, jobs, and public data.", styles["table_cell"])],
        [p("Sprint 4", styles["table_cell_bold"]), p("June 15 - June 21, 2026", styles["table_cell"]), p("Build application, Badge Request, Badge Pool, file, and audit APIs.", styles["table_cell"])],
        [p("Sprint 5", styles["table_cell_bold"]), p("June 22 - June 28, 2026", styles["table_cell"]), p("Complete integrations for payments, communications, admin operations, and exams.", styles["table_cell"])],
        [p("Sprint 6", styles["table_cell_bold"]), p("June 29 - July 5, 2026", styles["table_cell"]), p("Client testing, release hardening, deployment prep, and handoff.", styles["table_cell"])],
    ]
    table = Table(data, colWidths=[1.2 * inch, 1.8 * inch, 4.15 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BLUE),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(BORDER)
    canvas.line(0.75 * inch, 0.55 * inch, 7.75 * inch, 0.55 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.75 * inch, 0.35 * inch, "GetBadged Project Sprint Plan")
    canvas.drawRightString(7.75 * inch, 0.35 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build():
    styles = make_styles()
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=letter,
        rightMargin=0.7 * inch,
        leftMargin=0.7 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.7 * inch,
        title="GetBadged Project Sprint Plan",
        author="GetBadged",
    )

    story = []
    story.append(Spacer(1, 0.12 * inch))
    story.append(p("GetBadged Project Sprint Plan", styles["title"]))
    story.append(p("Weekly delivery plan for frontend mocks, backend implementation, integrations, and release readiness", styles["subtitle"]))
    story.append(overview_table(styles))
    story.append(Spacer(1, 0.18 * inch))
    story.append(p("Planning Assumptions", styles["section"]))
    story.append(
        bullet_list(
            [
                "Frontend mock flows are planned for completion during the first working week.",
                "Holidays are planned from May 26 through May 31, with no delivery work scheduled.",
                "Holidays are planned from May 26 through May 31, with no delivery work scheduled.",
                "Sprint 2 begins on June 1 and starts backend foundation work.",
                "Each sprint is planned as a one-week delivery cycle.",
                "Client testing and release hardening are included in Sprint 6.",
            ],
            styles["body"],
        )
    )

    story.append(PageBreak())
    story.append(p("Sprint 1: Frontend Mock Completion", styles["sprint"]))
    story.append(p("<b>Duration:</b> May 18 - May 25, 2026", styles["body"]))
    story.append(p("<b>Sprint Goal:</b> Complete all frontend mock flows and prepare the product for internal/demo review.", styles["body"]))
    story.append(
        sprint_table(
            [
                (
                    "Frontend Mock Flows",
                    [
                        "Complete remaining frontend mock-data workflows across public, candidate, department, and GB Admin experiences.",
                        "Complete candidate flows for profile, documents, exams, direct apply, Badge Requests, and submitted applications.",
                        "Complete department flows for Applicant Pools, status/archive/export, messages, and notifications.",
                        "Complete GB Admin flows for approvals, users/roles, exams/scores, platform config, CMS, reports, and audit logs.",
                    ],
                    "Frontend mock workflows completed.",
                ),
                (
                    "Frontend QA And Polish",
                    [
                        "Complete responsive QA for desktop, tablet, and mobile layouts.",
                        "Complete frontend form validation review.",
                        "Complete privacy QA for Badge Pool and application visibility.",
                        "Align mock data across public, candidate, department, and admin areas.",
                        "Prepare frontend demo readiness.",
                    ],
                    "Frontend mock version ready for internal/demo review.",
                ),
                (
                    "May 26 - May 31: Holiday Break",
                    ["No planned delivery work."],
                    "Schedule pause documented before Sprint 2 begins.",
                ),
            ],
            styles,
        )
    )

    story.append(Spacer(1, 0.14 * inch))
    story.append(p("Sprint 1 Key Deliverables", styles["section"]))
    story.append(
        bullet_list(
            [
                "Frontend mock version ready for internal/demo review.",
                "Responsive, validation, privacy, and mock-data consistency passes completed.",
                "Holiday break accounted for before backend kickoff.",
            ],
            styles["body"],
        )
    )

    story.append(PageBreak())
    story.append(p("Sprint 2: Backend Foundation", styles["sprint"]))
    story.append(p("<b>Duration:</b> June 1 - June 7, 2026", styles["body"]))
    story.append(p("<b>Sprint Goal:</b> Establish backend architecture, database planning, and API contract direction.", styles["body"]))
    story.append(
        sprint_table(
            [
                (
                    "Project And Architecture",
                    [
                        "Set up backend repository and project structure.",
                        "Confirm backend architecture and implementation approach.",
                        "Define standard API response and error handling patterns.",
                    ],
                    "Backend foundation initialized.",
                ),
                (
                    "Data Model Planning",
                    [
                        "Plan database schema and core entity relationships.",
                        "Create initial database models for users, departments, candidates, jobs, and applications.",
                        "Define authentication, session, and role model.",
                    ],
                    "Initial backend data model plan established.",
                ),
                (
                    "API Contract Alignment",
                    [
                        "Review frontend mock data and map it to backend API contracts.",
                        "Prepare mock-to-API integration plan.",
                    ],
                    "API direction confirmed for implementation sprints.",
                ),
            ],
            styles,
        )
    )

    story.append(Spacer(1, 0.14 * inch))
    story.append(p("Sprint 2 Key Deliverables", styles["section"]))
    story.append(
        bullet_list(
            [
                "Backend project structure initialized.",
                "Authentication, role, and database model direction confirmed.",
                "Mock-to-API integration plan prepared.",
            ],
            styles["body"],
        )
    )

    story.append(PageBreak())
    story.append(p("Sprint 3: Core Backend APIs", styles["sprint"]))
    story.append(p("<b>Duration:</b> June 8 - June 14, 2026", styles["body"]))
    story.append(p("<b>Sprint Goal:</b> Build the core backend APIs needed for auth, profiles, jobs, and public data.", styles["body"]))
    story.append(
        sprint_table(
            [
                (
                    "Authentication And Users",
                    [
                        "Implement Supabase Auth, session handling, and role-aware access patterns.",
                        "Build candidate, department, and admin user APIs.",
                    ],
                    "User/session foundation available for integration.",
                ),
                (
                    "Core Product APIs",
                    [
                        "Build department registration and approval APIs.",
                        "Build candidate profile APIs.",
                        "Build department profile APIs.",
                        "Build job post APIs.",
                        "Build public department and job listing/detail APIs.",
                    ],
                    "Primary data flows available through backend APIs.",
                ),
                (
                    "Frontend Integration Start",
                    [
                        "Replace high-priority frontend mock data with backend API clients where stable.",
                        "Perform integration QA for authentication, profile, and job journeys.",
                    ],
                    "Priority frontend flows begin using backend APIs.",
                ),
            ],
            styles,
        )
    )

    story.append(Spacer(1, 0.14 * inch))
    story.append(p("Sprint 3 Key Deliverables", styles["section"]))
    story.append(
        bullet_list(
            [
                "Core backend APIs available for auth, profile, job, and public workflows.",
                "Initial frontend API integration completed for priority flows.",
            ],
            styles["body"],
        )
    )

    story.append(PageBreak())
    story.append(p("Sprint 4: Application, Badge, Upload, And Audit APIs", styles["sprint"]))
    story.append(p("<b>Duration:</b> June 15 - June 21, 2026", styles["body"]))
    story.append(p("<b>Sprint Goal:</b> Build application workflows, Badge Request/Badge Pool APIs, file contracts, and audit foundations.", styles["body"]))
    story.append(
        sprint_table(
            [
                (
                    "Application And Badge Workflows",
                    [
                        "Build direct application APIs.",
                        "Build Badge Request APIs.",
                        "Build Badge Pool safe-query APIs with protected candidate data hidden before consent.",
                    ],
                    "Apply, Badge Request, and Badge Pool contracts ready.",
                ),
                (
                    "Files And Audit",
                    [
                        "Define file, document, and media upload contracts.",
                        "Implement basic audit log model.",
                    ],
                    "Upload and audit foundations available.",
                ),
                (
                    "Integration QA",
                    [
                        "Replace high-priority frontend mock data with backend API clients.",
                        "Perform integration QA for core user journeys.",
                    ],
                    "Priority frontend flows connected to backend services.",
                ),
            ],
            styles,
        )
    )

    story.append(Spacer(1, 0.14 * inch))
    story.append(p("Sprint 4 Key Deliverables", styles["section"]))
    story.append(
        bullet_list(
            [
                "Direct application, Badge Request, and Badge Pool backend contracts completed.",
                "File/media upload and audit log foundations defined.",
                "Integration QA completed for core user journeys.",
            ],
            styles["body"],
        )
    )

    story.append(PageBreak())
    story.append(p("Sprint 5: Backend Integrations And Admin Operations", styles["sprint"]))
    story.append(p("<b>Duration:</b> June 22 - June 28, 2026", styles["body"]))
    story.append(p("<b>Sprint Goal:</b> Complete payment, communication, admin, exam, reporting, and platform management integrations.", styles["body"]))
    story.append(
        sprint_table(
            [
                (
                    "Payments And Communications",
                    [
                        "Implement Stripe contracts for memberships, application tokens, and department Badge credits.",
                        "Add SendGrid email notification hooks.",
                        "Add Twilio phone verification hooks.",
                        "Build messaging APIs.",
                        "Build notification APIs.",
                    ],
                    "Payment and communication contracts ready.",
                ),
                (
                    "Department And Admin Operations",
                    [
                        "Build Applicant Pool status, archive, and export APIs.",
                        "Build exam management APIs.",
                        "Build score import and publishing APIs.",
                        "Build admin users, roles, and impersonation APIs.",
                    ],
                    "Operational workflows supported by backend APIs.",
                ),
                (
                    "Platform Management",
                    [
                        "Build CMS, platform configuration, template, report, and audit log APIs.",
                        "Expand audit logging coverage across key actions.",
                        "Validate privacy rules and authorization boundaries.",
                    ],
                    "Admin platform controls and compliance coverage completed.",
                ),
            ],
            styles,
        )
    )

    story.append(Spacer(1, 0.14 * inch))
    story.append(p("Sprint 5 Key Deliverables", styles["section"]))
    story.append(
        bullet_list(
            [
                "Backend feature set completed for MVP scope.",
                "Payment, messaging, notification, admin, exam, CMS, and reporting contracts completed.",
                "Privacy and authorization checks validated across backend workflows.",
            ],
            styles["body"],
        )
    )

    story.append(PageBreak())
    story.append(p("Sprint 6: Client Testing And Release Hardening", styles["sprint"]))
    story.append(p("<b>Duration:</b> June 29 - July 5, 2026", styles["body"]))
    story.append(p("<b>Sprint Goal:</b> Complete frontend API wiring, support client testing, fix issues, and prepare the release candidate.", styles["body"]))
    story.append(
        sprint_table(
            [
                (
                    "Final Frontend Integration",
                    [
                        "Complete remaining frontend API wiring.",
                        "Validate public, candidate, department, and GB Admin workflows against backend services.",
                    ],
                    "Frontend fully wired to backend where applicable.",
                ),
                (
                    "QA And Client Testing",
                    [
                        "Perform end-to-end QA across public, candidate, department, and GB Admin workflows.",
                        "Support client testing and review sessions.",
                        "Address client testing feedback and reported issues.",
                    ],
                    "Client feedback reviewed and prioritized fixes completed.",
                ),
                (
                    "Release Readiness",
                    [
                        "Prepare deployment checklist.",
                        "Complete regression testing for high-priority journeys.",
                        "Prepare release candidate handoff.",
                    ],
                    "Client-tested release candidate prepared.",
                ),
            ],
            styles,
        )
    )

    story.append(Spacer(1, 0.14 * inch))
    story.append(p("Sprint 6 Key Deliverables", styles["section"]))
    story.append(
        bullet_list(
            [
                "Frontend fully wired to backend where applicable.",
                "End-to-end QA completed.",
                "Client testing feedback addressed.",
                "Release candidate prepared for deployment/handoff.",
            ],
            styles["body"],
        )
    )

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)


if __name__ == "__main__":
    build()
