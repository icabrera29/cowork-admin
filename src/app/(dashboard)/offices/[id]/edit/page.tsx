import OfficeForm from "../../_components/OfficeForm";
import { getOfficeById, updateOffice } from "../../actions";
import { Building2 } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditOfficePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const office = await getOfficeById(id);

  if (!office) {
    notFound();
  }

  const updateOfficeWithId = updateOffice.bind(null, id);

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-6 md:space-y-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          <span className="p-3 bg-nordic-surface-highest/50 rounded-2xl text-nordic-primary">
            <Building2 size={28} />
          </span>
          Editar Oficina
        </h2>
        <p className="text-sm md:text-base text-nordic-on-bg/60">
          Modifica los detalles, disponibilidad o precio de este espacio.
        </p>
      </header>

      <OfficeForm 
        initialData={office} 
        onSubmit={updateOfficeWithId} 
        buttonText="Guardar Cambios" 
        isEdit 
      />
    </div>
  );
}
