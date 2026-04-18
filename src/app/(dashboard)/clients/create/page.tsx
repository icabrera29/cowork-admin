import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "../actions";
import { requireRole } from "@/utils/supabase/auth-helpers";
import ClientForm from "../_components/ClientForm";

export default async function CreateClientPage() {
  await requireRole(['admin', 'employee']);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 text-sm text-nordic-on-bg/60 hover:text-nordic-primary transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Volver a Clientes
        </Link>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Nuevo Cliente</h1>
          <p className="text-nordic-on-bg/60">Completa la información para registrar un nuevo miembro en la base de datos.</p>
        </div>
      </div>

      <ClientForm 
        onSubmit={createClient} 
        buttonText="Guardar Cliente" 
      />
    </div>
  );
}
