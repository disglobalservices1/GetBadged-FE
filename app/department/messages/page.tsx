import { DepartmentMessages } from "@/components/department/messages/department-messages";
import { getMockDepartmentMessages } from "@/features/department/messages/get-mock-department-messages";

export default function DepartmentMessagesPage() {
  return <DepartmentMessages initialModel={getMockDepartmentMessages()} />;
}
