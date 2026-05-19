export type TemplateFieldType =
  | "text_short"
  | "text_long"
  | "number"
  | "number_range"
  | "date"
  | "date_range"
  | "dropdown"
  | "multi_select"
  | "checkbox"
  | "yes_no"
  | "repeatable_list"
  | "rich_text"
  | "file_upload"
  | "image_upload"
  | "url"
  | "system";

export type TemplateSection = {
  id: string;
  templateType: "candidate_profile" | "department_profile" | "job_post";
  sectionKey: string;
  title: string;
  order: number;
  isActive: boolean;
};

export type TemplateField = {
  id: string;
  sectionId: string;
  fieldKey: string;
  label: string;
  fieldType: TemplateFieldType;
  isRequired: boolean;
  options?: string[];
  helpText?: string;
  visibilityRules?: Record<string, unknown>;
  order: number;
  isActive: boolean;
};
