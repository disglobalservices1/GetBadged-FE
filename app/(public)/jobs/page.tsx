import { JobBrowsePage } from "@/components/public/job-browse-page";

type PublicJobsPageProps = {
  searchParams?: Promise<{
    city?: string;
    jobType?: string;
    departmentId?: string;
  }>;
};

export default async function PublicJobsPage({ searchParams }: PublicJobsPageProps) {
  const filters = await searchParams;

  return <JobBrowsePage filters={filters} />;
}
