import { getMockDepartmentApplicantPool } from "@/features/department/applicants/get-mock-department-applicant-pool";

export function getMockDepartmentReports() {
  const applicantPool = getMockDepartmentApplicantPool();
  const archivedRows = applicantPool.rows.filter((row) => row.archivedAt);

  return {
    departmentName: applicantPool.departmentName,
    applicantRows: applicantPool.rows,
    stats: {
      totalApplicants: applicantPool.rows.length,
      activeApplicants: applicantPool.rows.filter((row) => !row.archivedAt).length,
      archivedApplicants: archivedRows.length
    },
    exports: [
      {
        id: "applicant_pool",
        title: "Applicant Pool CSV",
        description: "Candidate, job, status, source, and submitted date fields from the department Applicant Pool.",
        rowCount: applicantPool.rows.length
      },
      {
        id: "archived_applicants",
        title: "Archived Applicants CSV",
        description: "Archived application records for operational reporting and audit review.",
        rowCount: archivedRows.length
      }
    ]
  };
}

export type DepartmentReportsViewModel = ReturnType<typeof getMockDepartmentReports>;
