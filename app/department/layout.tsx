import { AppShell } from "@/components/common/app-shell";
import { departmentNavItems } from "@/lib/routes/navigation";

type DepartmentLayoutProps = {
  children: React.ReactNode;
};

export default function DepartmentLayout({ children }: DepartmentLayoutProps) {
  return (
    <AppShell navItems={departmentNavItems} roleLabel="Department">
      {children}
    </AppShell>
  );
}
