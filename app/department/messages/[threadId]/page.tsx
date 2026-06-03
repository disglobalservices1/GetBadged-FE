import { DepartmentMessageThreadView } from "@/components/department/messages/department-message-thread";
import { getMockDepartmentMessageThread } from "@/features/department/messages/get-mock-department-messages";

type DepartmentMessageThreadPageProps = {
  params: Promise<{ threadId: string }>;
};

export default async function DepartmentMessageThreadPage({ params }: DepartmentMessageThreadPageProps) {
  const { threadId } = await params;

  return <DepartmentMessageThreadView threadId={threadId} initialModel={getMockDepartmentMessageThread(threadId)} />;
}
