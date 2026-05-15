export type ExamFormat = "online" | "in_person";

export type ExamSitting = {
  id: string;
  format: ExamFormat;
  title: string;
  examDate: string;
  examTime: string;
  checkInTime?: string;
  locationName?: string;
  streetAddress?: string;
  city?: string;
  state: "MA";
  registrationDeadline: string;
  maxQuantity: number;
  registeredCount: number;
  status: "draft" | "published" | "closed" | "completed" | "cancelled";
  customConfirmationSendAt?: string;
};
