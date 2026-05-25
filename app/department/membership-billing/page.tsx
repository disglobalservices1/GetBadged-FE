import { CreditCard } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentMembershipBillingPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Manage"
      title="Membership & Billing"
      description="Review membership details, billing status, and badge token usage."
      icon={<CreditCard className="h-10 w-10" />}
    />
  );
}
