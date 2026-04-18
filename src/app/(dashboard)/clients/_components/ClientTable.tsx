import React from "react";
import { getClients } from "../actions";
import ClientActions from "./ClientActions";

interface ClientTableProps {
  query?: string;
}

export default async function ClientTable({ query }: ClientTableProps) {
  const clients = await getClients(query);

  if (clients.length === 0) {
    return (
      <div className="p-20 text-center space-y-4">
        <p className="text-nordic-on-bg/40 italic">
          {query ? `No se encontraron resultados para "${query}"` : "No se encontraron clientes en la base de datos."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
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
    </div>
  );
}
