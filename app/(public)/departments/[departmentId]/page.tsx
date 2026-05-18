import { notFound } from "next/navigation";
import { DepartmentDetailPage } from "@/components/public/department-detail-page";
import { getPublicDepartmentBySlug } from "@/features/public/directory";

type PublicDepartmentDetailRouteProps = {
  params: Promise<{
    departmentId: string;
  }>;
};

export default async function PublicDepartmentDetailRoute({ params }: PublicDepartmentDetailRouteProps) {
  const { departmentId } = await params;
  const department = getPublicDepartmentBySlug(departmentId);

  if (!department) {
    notFound();
  }

  return <DepartmentDetailPage department={department} />;
}
