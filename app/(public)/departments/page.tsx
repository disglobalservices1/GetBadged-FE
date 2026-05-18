import { DepartmentBrowsePage } from "@/components/public/department-browse-page";

type PublicDepartmentsPageProps = {
  searchParams?: Promise<{
    city?: string;
    departmentType?: string;
  }>;
};

export default async function PublicDepartmentsPage({ searchParams }: PublicDepartmentsPageProps) {
  const filters = await searchParams;

  return <DepartmentBrowsePage filters={filters} />;
}
