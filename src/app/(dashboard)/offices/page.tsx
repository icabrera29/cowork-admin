import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Building2, Plus, Info } from "lucide-react";
import { getOffices } from "./actions";

export default async function OfficesPage() {
  const offices = await getOffices();

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Oficinas</h2>
          <p className="text-sm md:text-base text-nordic-on-bg/60">Gestiona los espacios físicos y su disponibilidad.</p>
        </div>
        <Link href="/offices/create" className="w-full md:w-auto">
          <Button className="w-full">
            <Plus size={18} className="mr-2" />
            Nuevo Espacio
          </Button>
        </Link>
      </header>

      {offices.length === 0 ? (
        <div className="p-20 text-center space-y-4 bg-nordic-surface-low/50 border border-nordic-outline-variant/10 rounded-3xl">
          <p className="text-nordic-on-bg/40 italic">No hay oficinas registradas en el sistema.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office) => (
            <Card key={office.id} variant="low" hoverable className="group border border-nordic-outline-variant/10">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-nordic-surface-highest text-nordic-primary">
                  <Building2 size={24} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  office.status === "Disponible" ? "bg-green-400/10 text-green-400" : 
                  office.status === "Ocupado" ? "bg-nordic-primary/10 text-nordic-primary" : 
                  "bg-nordic-outline-variant/20 text-nordic-on-bg/40"
                }`}>
                  {office.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-nordic-primary transition-colors">{office.name}</h3>
              <p className="text-xs text-nordic-on-bg/40 mb-4">{office.type} • {office.capacity} personas</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-nordic-outline-variant/10">
                <span className="text-lg font-bold text-nordic-primary">${office.price_per_hour}/hora</span>
                <Link href={`/offices/${office.id}/edit`}>
                  <Button variant="tertiary" size="sm">
                    Detalles
                    <Info size={14} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
