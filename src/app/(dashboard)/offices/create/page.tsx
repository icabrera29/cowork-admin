import OfficeForm from "../_components/OfficeForm";
import { createOffice } from "../actions";
import { Building2 } from "lucide-react";

export default function CreateOfficePage() {
  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-6 md:space-y-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          <span className="p-3 bg-nordic-surface-highest/50 rounded-2xl text-nordic-primary">
            <Building2 size={28} />
          </span>
          Nueva Oficina
        </h2>
        <p className="text-sm md:text-base text-nordic-on-bg/60">
          Registra un nuevo espacio en el sistema para gestionarlo y alquilarlo.
        </p>
      </header>

      <OfficeForm onSubmit={createOffice} buttonText="Crear Oficina" />
    </div>
  );
}
