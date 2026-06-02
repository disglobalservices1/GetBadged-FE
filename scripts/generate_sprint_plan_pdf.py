from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
INPUT_PATH = ROOT / "docs" / "GetBadged_Sprint_Plan.md"
OUTPUT_PATH = ROOT / "docs" / "GetBadged_Sprint_Plan.pdf"

NAVY = colors.HexColor("#00264D")
BLUE = colors.HexColor("#173B99")
GOLD = colors.HexColor("#F5B942")
BORDER = colors.HexColor("#D9E2EC")
TEXT = colors.HexColor("#334155")
MUTED = colors.HexColor("#667085")


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=30,
            textColor=NAVY,
            spaceAfter=12,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=15,
            textColor=MUTED,
            spaceAfter=14,
        ),
        "sprint": ParagraphStyle(
            "Sprint",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=15,
            leading=19,
            textColor=BLUE,
            borderColor=BORDER,
            borderWidth=0.6,
            borderPadding=7,
            backColor=colors.HexColor("#F8FAFC"),
            spaceBefore=14,
            spaceAfter=8,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=14,
            textColor=NAVY,
            spaceBefore=6,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13.5,
            textColor=TEXT,
            alignment=TA_LEFT,
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=12.8,
            textColor=TEXT,
            leftIndent=16,
            firstLineIndent=-10,
            spaceAfter=3,
        ),
        "subbullet": ParagraphStyle(
            "SubBullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.9,
            leading=12.4,
            textColor=TEXT,
            leftIndent=31,
            firstLineIndent=-10,
            spaceAfter=2,
        ),
    }


def clean(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("`", "")
    )


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(BORDER)
    canvas.line(0.7 * inch, 0.55 * inch, 7.8 * inch, 0.55 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.7 * inch, 0.35 * inch, "Get Badged Sprint Plan")
    canvas.drawRightString(7.8 * inch, 0.35 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build_pdf():
    style = styles()
    story = []
    lines = INPUT_PATH.read_text(encoding="utf-8").splitlines()

    for line in lines:
        if not line.strip():
            story.append(Spacer(1, 5))
            continue

        stripped = line.strip()
        if stripped.startswith("# "):
            story.append(Paragraph(clean(stripped[2:]), style["title"]))
        elif stripped.startswith("## "):
            story.append(Paragraph(clean(stripped[3:]), style["sprint"]))
        elif stripped in {"Deliverables:", "Focus:"}:
            story.append(Paragraph(clean(stripped), style["label"]))
        elif stripped.startswith("- "):
            story.append(Paragraph(f"- {clean(stripped[2:])}", style["bullet"]))
        elif stripped.startswith("  - "):
            story.append(Paragraph(f"- {clean(stripped[4:])}", style["subbullet"]))
        else:
            paragraph_style = style["subtitle"] if "Sprint" in stripped and "weekly" in stripped.lower() else style["body"]
            story.append(Paragraph(clean(stripped), paragraph_style))

    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        rightMargin=0.7 * inch,
        leftMargin=0.7 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.75 * inch,
        title="Get Badged Sprint Plan",
        author="GetBadged",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT_PATH)
