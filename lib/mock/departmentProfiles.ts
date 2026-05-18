import type { DepartmentProfile } from "@/types/department";

export const mockDepartmentProfiles: DepartmentProfile[] = [
  {
    id: "department_profile_1",
    departmentId: "department_1",
    status: "revisions_needed",
    submittedAt: "2026-05-14T16:20:00.000Z",
    submittedByUserId: "user_department_admin_1",
    adminNotes:
      "Please add clearer hiring-track details and replace the cover image with a public-facing station or community image before resubmitting.",
    sections: [
      {
        id: "department_profile_section_1_overview",
        sectionKey: "overview",
        title: "Overview",
        order: 1,
        fields: [
          {
            fieldKey: "profileIntro",
            label: "Profile intro",
            fieldType: "text_long",
            value: "Westview Police Department serves a growing coastal community with a community-first approach to public safety.",
            isRequired: true
          },
          {
            fieldKey: "missionStatement",
            label: "Mission statement",
            fieldType: "rich_text",
            value:
              "We partner with residents, schools, and local organizations to deliver professional, transparent, and compassionate policing.",
            isRequired: true
          }
        ]
      },
      {
        id: "department_profile_section_1_recruiting",
        sectionKey: "recruiting",
        title: "Recruiting details",
        order: 2,
        fields: [
          {
            fieldKey: "hiringTracks",
            label: "Hiring tracks",
            fieldType: "multi_select",
            value: ["Entry-level recruit", "Certified lateral"],
            isRequired: true
          },
          {
            fieldKey: "candidateRequirements",
            label: "Candidate requirements",
            fieldType: "repeatable_list",
            value: ["Massachusetts driver's license", "POST eligibility", "Strong community communication skills"],
            isRequired: true
          }
        ]
      },
      {
        id: "department_profile_section_1_benefits",
        sectionKey: "benefits",
        title: "Benefits and culture",
        order: 3,
        fields: [
          {
            fieldKey: "benefits",
            label: "Benefits",
            fieldType: "repeatable_list",
            value: ["Medical and dental coverage", "Education incentives", "Specialty assignment opportunities"],
            isRequired: true
          },
          {
            fieldKey: "shiftSchedule",
            label: "Shift schedule",
            fieldType: "dropdown",
            value: "4x2 rotation",
            isRequired: false
          }
        ]
      }
    ],
    media: [
      {
        id: "media_department_profile_cover_1",
        ownerType: "department",
        ownerId: "department_1",
        fileName: "westview-station-cover.jpg",
        fileType: "image",
        url: "/mock/department/westview-station-cover.jpg",
        altText: "Westview Police Department station exterior",
        uploadedAt: "2026-05-14T15:10:00.000Z"
      },
      {
        id: "media_department_profile_logo_1",
        ownerType: "department",
        ownerId: "department_1",
        fileName: "westview-police-logo.png",
        fileType: "image",
        url: "/mock/department/westview-police-logo.png",
        altText: "Westview Police Department logo",
        uploadedAt: "2026-05-14T15:12:00.000Z"
      }
    ],
    updatedAt: "2026-05-14T16:20:00.000Z"
  }
];
