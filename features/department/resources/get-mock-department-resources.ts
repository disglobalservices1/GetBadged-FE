import { mockDepartmentDashboard } from "@/lib/mock/departmentDashboard";

export function getMockDepartmentResources() {
  return mockDepartmentDashboard.resourceCenter.map((resource) => ({
    ...resource
  }));
}

export function getMockDepartmentResource(resourceId: string) {
  return getMockDepartmentResources().find((resource) => resource.id === resourceId) ?? null;
}
