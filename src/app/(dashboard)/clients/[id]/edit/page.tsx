import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getClientById, updateClient } from "../../actions";
import { notFound } from "next/navigation";
import { requireRole } from "@/utils/supabase/auth-helpers";
import ClientForm from "../../_components/ClientForm";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireRole(['admin', 'employee']);
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  // Wrapper for updateClient to include the ID
  async function handleUpdate(formData: FormData) {
    "use server";
    return await updateClient(id, formData);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumbs / Header */}
      <div className="flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-sm text-nordic-on-bg/40">
          <Link href="/clients" className="hover:text-nordic-primary transition-colors">Clientes</Link>
          <ChevronRight size={14} />
          <span className="text-nordic-on-bg/60">Editar Perfil</span>
        </nav>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Editar: {client.first_name} {client.last_name}
          </h1>
          <p className="text-nordic-on-bg/60">Modifica los datos del cliente para mantener la base de datos actualizada.</p>
        </div>
      </div>

      <ClientForm 
        initialData={client}
        onSubmit={handleUpdate}
        buttonText="Guardar Cambios"
        isEdit={true}
      />
    </div>
  );
}
