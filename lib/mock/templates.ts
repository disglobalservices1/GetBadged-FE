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
  },
  {
    id: "template_section_job_basics",
    templateType: "job_post",
    sectionKey: "basics",
    title: "Job basics",
    order: 1,
    isActive: true
  },
  {
    id: "template_section_job_details",
    templateType: "job_post",
    sectionKey: "details",
    title: "Role details",
    order: 2,
    isActive: true
  },
  {
    id: "template_section_job_process",
    templateType: "job_post",
    sectionKey: "process",
    title: "Hiring process",
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
  },
  {
    id: "template_field_job_title",
    sectionId: "template_section_job_basics",
    fieldKey: "title",
    label: "Job title",
    fieldType: "text_short",
    isRequired: true,
    order: 1,
    isActive: true
  },
  {
    id: "template_field_job_type",
    sectionId: "template_section_job_basics",
    fieldKey: "jobType",
    label: "Job type",
    fieldType: "dropdown",
    isRequired: true,
    options: ["entry_level", "certified_officer", "dispatcher_ops", "specialty_command", "other"],
    order: 2,
    isActive: true
  },
  {
    id: "template_field_job_employment_type",
    sectionId: "template_section_job_basics",
    fieldKey: "employmentType",
    label: "Employment type",
    fieldType: "dropdown",
    isRequired: true,
    options: ["full_time", "part_time", "contract", "other"],
    order: 3,
    isActive: true
  },
  {
    id: "template_field_job_openings",
    sectionId: "template_section_job_basics",
    fieldKey: "numberOfOpenings",
    label: "Number of openings",
    fieldType: "dropdown",
    isRequired: false,
    options: ["1 opening", "1 - 2 Officers", "2 Dispatchers", "3 - 4 Officers", "5+ openings"],
    order: 4,
    isActive: true
  },
  {
    id: "template_field_job_deadline",
    sectionId: "template_section_job_basics",
    fieldKey: "applicationDeadline",
    label: "Application deadline",
    fieldType: "date",
    isRequired: false,
    order: 5,
    isActive: true
  },
  {
    id: "template_field_job_responsibilities",
    sectionId: "template_section_job_details",
    fieldKey: "responsibilities",
    label: "Responsibilities",
    fieldType: "text_long",
    isRequired: true,
    order: 1,
    isActive: true
  },
  {
    id: "template_field_job_benefits",
    sectionId: "template_section_job_details",
    fieldKey: "benefits",
    label: "Benefits",
    fieldType: "repeatable_list",
    isRequired: false,
    order: 2,
    isActive: true
  },
  {
    id: "template_field_job_hiring_process",
    sectionId: "template_section_job_process",
    fieldKey: "hiringProcess",
    label: "Hiring process",
    fieldType: "repeatable_list",
    isRequired: true,
    order: 1,
    isActive: true
  }
];
