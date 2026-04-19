import Sidebar from "@/components/layout/Sidebar";

import { requireRole } from "@/utils/supabase/auth-helpers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(['admin', 'employee']);
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-64 min-h-screen overflow-y-auto pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
