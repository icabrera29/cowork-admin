import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Building2, Plus, Info, CheckCircle2, XCircle } from "lucide-react";

const offices = [
  { id: 101, name: "Suite del Norte", type: "Oficina Privada", capacity: "4-6 personas", status: "Disponible", price: "$1,200/mes" },
  { id: 102, name: "Estudio Creativo", type: "Sala de Reuniones", capacity: "8 personas", status: "Ocupado", price: "$40/hora" },
  { id: 201, name: "Área Ejecutiva", type: "Oficina Privada", capacity: "2 personas", status: "Disponible", price: "$800/mes" },
  { id: 202, name: "Espacio Zen", type: "Lounge/Flex", capacity: "15 personas", status: "Mantenimiento", price: "-" },
];

export default function OfficesPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Oficinas</h2>
          <p className="text-nordic-on-bg/60">Gestiona los espacios físicos y su disponibilidad.</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Nuevo Espacio
        </Button>
      </header>

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
            <p className="text-xs text-nordic-on-bg/40 mb-4">{office.type} • {office.capacity}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-nordic-outline-variant/10">
              <span className="text-lg font-bold text-nordic-primary">{office.price}</span>
              <Button variant="tertiary" size="sm">
                Detalles
                <Info size={14} className="ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
