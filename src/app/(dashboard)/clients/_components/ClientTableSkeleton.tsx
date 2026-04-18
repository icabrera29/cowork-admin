import React from "react";

export default function ClientTableSkeleton() {
  return (
    <div className="overflow-x-auto custom-scrollbar animate-pulse">
      <table className="w-full text-left min-w-[600px]">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest text-nordic-on-bg/20 border-b border-nordic-outline-variant/10">
            <th className="px-6 py-4 font-bold">Nombre</th>
            <th className="px-6 py-4 font-bold">Empresa</th>
            <th className="px-6 py-4 font-bold">Teléfono</th>
            <th className="px-6 py-4 font-bold">Estado</th>
            <th className="px-6 py-4 font-bold text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-nordic-outline-variant/5">
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-white/5 rounded-md" />
                  <div className="h-3 w-48 bg-white/5 rounded-md opacity-50" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-24 bg-white/5 rounded-md" />
                  <div className="h-3 w-16 bg-white/5 rounded-md opacity-30" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-28 bg-white/5 rounded-md" />
              </td>
              <td className="px-6 py-4">
                <div className="h-5 w-16 bg-white/5 rounded-full" />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end">
                  <div className="h-8 w-8 bg-white/5 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
