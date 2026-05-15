import { Building2 } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";

export default function PublicDepartmentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <EmptyState
        icon={<Building2 size={28} />}
        title="Public department browse foundation"
        description="TG-A2 will build the Department Profile browse and detail experience here."
      />
    </div>
  );
}
