import Link from "next/link";
import { Search, UserPlus, Filter } from "lucide-react";
import { getClients } from "./actions";
import ClientActions from "./_components/ClientActions";
import { requireRole } from "@/utils/supabase/auth-helpers";

export default async function ClientsPage() {
  await requireRole(['admin', 'employee']);
  const clients = await getClients();

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
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nordic-on-bg/40" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, empresa o email..." 
              className="w-full bg-nordic-bg/50 text-sm pl-10 pr-4 py-2 rounded-lg border border-nordic-outline-variant/10 focus:outline-none focus:border-nordic-primary/40 transition-all"
            />
          </div>
          <Button variant="secondary" size="sm" className="w-full md:w-auto justify-center">
            <Filter size={14} className="mr-2" />
            Filtros
          </Button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          {clients.length === 0 ? (
            <div className="p-20 text-center space-y-4">
              <p className="text-nordic-on-bg/40 italic">No se encontraron clientes en la base de datos.</p>
            </div>
          ) : (
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-nordic-on-bg/40 border-b border-nordic-outline-variant/10">
                  <th className="px-6 py-4 font-bold">Nombre</th>
                  <th className="px-6 py-4 font-bold">Empresa</th>
                  <th className="px-6 py-4 font-bold">Teléfono</th>
                  <th className="px-6 py-4 font-bold">Estado</th>
                  <th className="px-6 py-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nordic-outline-variant/5">
                {clients.map((client) => (
                  <tr key={client.id} className="group hover:bg-nordic-surface-highest/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {client.first_name} {client.last_name}
                        </span>
                        <span className="text-xs text-nordic-on-bg/40">{client.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-nordic-on-bg/80">{client.company}</span>
                        <span className="text-[10px] text-nordic-primary/60">{client.plan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-nordic-on-bg/60">{client.phone || "—"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        client.status === "Activo" ? "bg-green-400/10 text-green-400" : "bg-nordic-outline-variant/20 text-nordic-on-bg/40"
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ClientActions client={client} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
