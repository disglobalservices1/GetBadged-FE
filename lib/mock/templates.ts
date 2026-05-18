import type { TemplateField, TemplateSection } from "@/types/template";

export const mockTemplateSections: TemplateSection[] = [
  {
    id: "template_section_department_overview",
    templateType: "department_profile",
    sectionKey: "overview",
    title: "Overview",
    order: 1,
    isActive: true
  },
  {
    id: "template_section_department_recruiting",
    templateType: "department_profile",
    sectionKey: "recruiting",
    title: "Recruiting details",
    order: 2,
    isActive: true
  },
  {
    id: "template_section_department_benefits",
    templateType: "department_profile",
    sectionKey: "benefits",
    title: "Benefits and culture",
    order: 3,
    isActive: true
  }
];

export const mockTemplateFields: TemplateField[] = [
  {
    id: "template_field_department_profile_intro",
    sectionId: "template_section_department_overview",
    fieldKey: "profileIntro",
    label: "Profile intro",
    fieldType: "text_long",
    isRequired: true,
    helpText: "Short public summary for candidates browsing departments.",
    order: 1,
    isActive: true
  },
  {
    id: "template_field_department_mission",
    sectionId: "template_section_department_overview",
    fieldKey: "missionStatement",
    label: "Mission statement",
    fieldType: "rich_text",
    isRequired: true,
    order: 2,
    isActive: true
  },
  {
    id: "template_field_department_hiring_tracks",
    sectionId: "template_section_department_recruiting",
    fieldKey: "hiringTracks",
    label: "Hiring tracks",
    fieldType: "multi_select",
    isRequired: true,
    options: ["Entry-level recruit", "Certified lateral", "Dispatcher", "Civilian support"],
    order: 1,
    isActive: true
  },
  {
    id: "template_field_department_candidate_requirements",
    sectionId: "template_section_department_recruiting",
    fieldKey: "candidateRequirements",
    label: "Candidate requirements",
    fieldType: "repeatable_list",
    isRequired: true,
    order: 2,
    isActive: true
  },
  {
    id: "template_field_department_benefits",
    sectionId: "template_section_department_benefits",
    fieldKey: "benefits",
    label: "Benefits",
    fieldType: "repeatable_list",
    isRequired: true,
    order: 1,
    isActive: true
  },
  {
    id: "template_field_department_shift_schedule",
    sectionId: "template_section_department_benefits",
    fieldKey: "shiftSchedule",
    label: "Shift schedule",
    fieldType: "dropdown",
    isRequired: false,
    options: ["4x2 rotation", "5x2 schedule", "12-hour shifts", "Flexible by assignment"],
    order: 2,
    isActive: true
  }
];
