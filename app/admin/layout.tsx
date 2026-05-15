import { AppShell } from "@/components/common/app-shell";
import { adminNavItems } from "@/lib/routes/navigation";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AppShell navItems={adminNavItems} roleLabel="GB Admin">
      {children}
    </AppShell>
  );
}
