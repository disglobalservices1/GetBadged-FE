import { mockExamSittings } from "@/lib/mock/exams";

type ResourceSection = {
  title: string;
  body: string;
};

type ResourceLink = {
  label: string;
  href: string;
};

type PublishedDepartmentResource = {
  id: string;
  label: string;
  detail: string;
  href: string;
  published: boolean;
  type: "exam_schedule" | "faq" | "guide";
  sections?: ResourceSection[];
  links?: ResourceLink[];
};

type ExamScheduleEntry = {
  id: string;
  title: string;
  formatLabel: string;
  examDateLabel: string;
  examTimeLabel: string;
  checkInLabel: string;
  registrationDeadlineLabel: string;
  locationLabel: string;
  seatsRemainingLabel: string;
};

export type DepartmentResourceCard = {
  id: string;
  label: string;
  detail: string;
  href: string;
};

export type DepartmentResourceDetailModel = DepartmentResourceCard & {
  type: "exam_schedule" | "faq" | "guide";
  sections: ResourceSection[];
  links: ResourceLink[];
  examScheduleEntries: ExamScheduleEntry[];
  publishedLabel: string;
};

const publishedDepartmentResources: PublishedDepartmentResource[] = [
  {
    id: "elr-exam-schedule",
    label: "ELR Exam Schedule",
    detail: "View scheduled entry-level exam dates and registration details.",
    href: "/department/resources/elr-exam-schedule",
    published: true,
    type: "exam_schedule",
    sections: [
      {
        title: "How to use this schedule",
        body: "Share these upcoming exam dates with entry-level candidates who ask when the next ELR opportunities will open. This schedule is populated from the currently active exam options published by GetBadged."
      }
    ]
  },
  {
    id: "help-faq",
    label: "Help & FAQs",
    detail: "Get answers to recruiting workflow and platform questions.",
    href: "/department/resources/help-faq",
    published: true,
    type: "faq",
    sections: [
      {
        title: "Recruiting workflow",
        body: "Use Applicant Pools to review direct applications and accepted Badges, update statuses, and export filtered records. Department Users can review workflows and templates, while Department Admins can also send messages."
      },
      {
        title: "Messaging and notifications",
        body: "Candidate replies appear in Department Message Center and trigger department notifications. Expired departments cannot send messages or receive new notifications until membership is renewed."
      },
      {
        title: "Badge Pool and credits",
        body: "Sending a Badge Request consumes one badge credit tied to a specific job type. At two remaining credits the dashboard shows a low-credit warning, and at zero credits the send flow is blocked until additional credits are added."
      }
    ],
    links: [
      {
        label: "Open Department Messages",
        href: "/department/messages"
      },
      {
        label: "Open Billing",
        href: "/department/billing"
      }
    ]
  },
  {
    id: "department-hiring-guide",
    label: "Department Hiring Guide",
    detail: "Review GB guidance for job posts, badges, and applicant follow-up.",
    href: "/department/resources/department-hiring-guide",
    published: true,
    type: "guide",
    sections: [
      {
        title: "Stronger job posts",
        body: "Keep requirements clear, call out required certifications explicitly, and make sure role-specific hiring expectations are reflected in the approved department profile and job template before publishing."
      },
      {
        title: "Badge follow-up",
        body: "Use Badge Pool for targeted outreach, then move accepted Badges through the same review workflow as direct applications. If a candidate applies directly after a Badge from the same department, the badge credit is returned."
      },
      {
        title: "Applicant review consistency",
        body: "Use department notes, status updates, and structured filters to keep review standards consistent across direct applications and accepted Badge submissions."
      }
    ],
    links: [
      {
        label: "Manage Job Posts",
        href: "/department/jobs"
      },
      {
        label: "Open Applicant Pools",
        href: "/department/applicant-pools"
      }
    ]
  }
];

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function getActiveExamScheduleEntries(): ExamScheduleEntry[] {
  const now = new Date();

  return mockExamSittings
    .filter((sitting) => sitting.status === "published")
    .filter((sitting) => new Date(`${sitting.examDate}T00:00:00.000Z`).getTime() >= now.getTime() - 1000 * 60 * 60 * 24)
    .sort((first, second) => new Date(first.examDate).getTime() - new Date(second.examDate).getTime())
    .map((sitting) => {
      const seatsRemaining = Math.max(sitting.maxQuantity - sitting.registeredCount, 0);
      const locationLabel =
        sitting.format === "online"
          ? "Online proctored exam"
          : [sitting.locationName, sitting.city, sitting.state].filter(Boolean).join(", ");

      return {
        id: sitting.id,
        title: sitting.title,
        formatLabel: sitting.format === "online" ? "Online" : "In person",
        examDateLabel: formatShortDate(sitting.examDate),
        examTimeLabel: sitting.examTime,
        checkInLabel: sitting.checkInTime ?? "Check-in details provided after registration",
        registrationDeadlineLabel: formatShortDate(sitting.registrationDeadline),
        locationLabel,
        seatsRemainingLabel: `${seatsRemaining} seats remaining`
      };
    });
}

function getPublishedDepartmentResources(): PublishedDepartmentResource[] {
  return publishedDepartmentResources.filter((resource) => resource.published);
}

export function getMockDepartmentResources(): DepartmentResourceCard[] {
  return getPublishedDepartmentResources().map((resource) => ({
    id: resource.id,
    label: resource.label,
    detail: resource.detail,
    href: resource.href
  }));
}

export function getMockDepartmentResource(resourceId: string): DepartmentResourceDetailModel | null {
  const resource = getPublishedDepartmentResources().find((item) => item.id === resourceId);

  if (!resource) {
    return null;
  }

  return {
    id: resource.id,
    label: resource.label,
    detail: resource.detail,
    href: resource.href,
    type: resource.type,
    sections: resource.sections ?? [],
    links: resource.links ?? [],
    examScheduleEntries: resource.type === "exam_schedule" ? getActiveExamScheduleEntries() : [],
    publishedLabel: "Published by GB Admin"
  };
}
