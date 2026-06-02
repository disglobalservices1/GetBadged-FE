import { notFound } from "next/navigation";
import { DepartmentResourceDetail } from "@/components/department/resources/department-resource-detail";
import { getMockDepartmentResource } from "@/features/department/resources/get-mock-department-resources";

export default async function DepartmentResourceDetailPage({
  params
}: {
  params: Promise<{ resourceId: string }>;
}) {
  const { resourceId } = await params;
  const resource = getMockDepartmentResource(resourceId);

  if (!resource) {
    notFound();
  }

  return <DepartmentResourceDetail resource={resource} />;
}
