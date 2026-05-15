import { AppShell } from "@/components/common/app-shell";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AppShell navRole="admin" roleLabel="GB Admin">
      {children}
    </AppShell>
  );
}
