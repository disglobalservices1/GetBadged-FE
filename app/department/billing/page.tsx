import { CreditCard } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentBillingPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Manage"
      title="Billing"
      description="Review department membership billing, payment status, and badge credit usage."
      icon={<CreditCard className="h-10 w-10" />}
    />
  );
}
