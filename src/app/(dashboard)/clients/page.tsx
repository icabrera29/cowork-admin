import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { UserPlus, Filter } from "lucide-react";
import SearchClients from "./_components/SearchClients";
import { requireRole } from "@/utils/supabase/auth-helpers";
import { Suspense } from "react";
import ClientTable from "./_components/ClientTable";
import ClientTableSkeleton from "./_components/ClientTableSkeleton";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireRole(['admin', 'employee']);
  const { q } = await searchParams;

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Clientes</h2>
          <p className="text-sm md:text-base text-nordic-on-bg/60">Gestiona la base de datos de miembros y empresas.</p>
        </div>
        <Link href="/clients/create" className="w-full md:w-auto">
          <Button className="w-full">
            <UserPlus size={18} className="mr-2" />
            Nuevo Cliente
          </Button>
        </Link>
      </header>

      <Card variant="low" className="overflow-hidden p-0 border border-nordic-outline-variant/10">
        <div className="p-4 bg-nordic-surface-highest/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-nordic-outline-variant/10">
          <SearchClients />
          <Button variant="secondary" size="sm" className="w-full md:w-auto justify-center">
            <Filter size={14} className="mr-2" />
            Filtros
          </Button>
        </div>

        <Suspense key={q} fallback={<ClientTableSkeleton />}>
          <ClientTable query={q} />
        </Suspense>
      </Card>
    </div>
  );
}
