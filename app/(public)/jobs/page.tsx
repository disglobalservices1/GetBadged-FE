import { BriefcaseBusiness } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";

export default function PublicJobsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <EmptyState
        icon={<BriefcaseBusiness size={28} />}
        title="Public job browse foundation"
        description="TG-A2 will build the public jobs list and job detail pages here."
      />
    </div>
  );
}
