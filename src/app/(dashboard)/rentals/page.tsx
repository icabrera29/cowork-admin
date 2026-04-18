import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Key, Clock, Calendar, AlertCircle } from "lucide-react";

const rentals = [
  { id: "C-9021", client: "Lucas Beltrán", space: "Oficina 302", start: "01/04/2026", end: "01/10/2026", amount: "$8,400", status: "Activo" },
  { id: "C-9022", client: "Ana Poveda", space: "Desk Premium 12", start: "15/04/2026", end: "15/05/2026", amount: "$350", status: "Próximo a vencer" },
  { id: "C-9023", client: "Roberto Gómez", space: "Oficina 101", start: "01/01/2026", end: "01/04/2026", amount: "$4,200", status: "Finalizado" },
];

export default function RentalsPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Alquileres</h2>
          <p className="text-nordic-on-bg/60">Contratos vigentes y facturación de espacios.</p>
        </div>
        <Button>
          <Key size={18} className="mr-2" />
          Nueva Contratación
        </Button>
      </header>

      <div className="space-y-4">
        {rentals.map((rental) => (
          <Card key={rental.id} variant="low" className="flex items-center justify-between p-6 border border-nordic-outline-variant/10">
            <div className="flex items-center gap-6">
              <div className={`p-4 rounded-xl ${
                rental.status === "Próximo a vencer" ? "bg-orange-400/10 text-orange-400" :
                rental.status === "Activo" ? "bg-nordic-primary/10 text-nordic-primary" :
                "bg-nordic-surface-highest text-nordic-on-bg/40"
              }`}>
                <Key size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-white">{rental.client}</h3>
                  <span className="text-[10px] bg-nordic-surface-highest text-nordic-on-bg/40 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                    {rental.id}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-nordic-on-bg/40">
                  <span className="flex items-center gap-1"><Building2 size={12} /> {rental.space}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {rental.start} - {rental.end}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-nordic-on-bg/40 font-bold mb-1">Total Contrato</p>
                <p className="text-xl font-bold text-white uppercase tracking-tighter">{rental.amount}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  rental.status === "Activo" ? "text-green-400" :
                  rental.status === "Próximo a vencer" ? "text-orange-400" :
                  "text-nordic-on-bg/40"
                }`}>
                  {rental.status}
                </span>
                <Button variant="tertiary" size="sm">Gestionar</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Helper to fix missing Lucide import
import { Building2 } from "lucide-react";
