import { AppShell } from "@/components/common/app-shell";

type DepartmentLayoutProps = {
  children: React.ReactNode;
};

export default function DepartmentLayout({ children }: DepartmentLayoutProps) {
  return (
    <AppShell navRole="department" roleLabel="Department">
      {children}
    </AppShell>
  );
}
