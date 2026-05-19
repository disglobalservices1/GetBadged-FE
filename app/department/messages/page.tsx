import { MessageSquare } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentMessagesPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Messages"
      title="Messages"
      description="View department conversations with candidates and GetBadged support."
      emptyTitle="Messaging is not enabled yet"
      emptyDescription="This route preserves the Department navigation experience until the message center is implemented."
      icon={<MessageSquare className="h-8 w-8" />}
    />
  );
}
