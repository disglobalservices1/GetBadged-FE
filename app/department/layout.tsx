import { AppShell } from "@/components/common/app-shell";
import { DepartmentBackButton } from "@/components/department/department-back-button";

type DepartmentLayoutProps = {
  children: React.ReactNode;
};

export default function DepartmentLayout({ children }: DepartmentLayoutProps) {
  return (
    <AppShell navRole="department" roleLabel="Department">
      <div className="grid gap-6">
        <DepartmentBackButton />
        {children}
      </div>
    </AppShell>
  );
}
