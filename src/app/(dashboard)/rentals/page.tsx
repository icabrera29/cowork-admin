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
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Alquileres</h2>
          <p className="text-sm md:text-base text-nordic-on-bg/60">Contratos vigentes y facturación de espacios.</p>
        </div>
        <Button className="w-full md:w-auto mt-2 md:mt-0">
          <Key size={18} className="mr-2" />
          Nueva Contratación
        </Button>
      </header>

      <div className="space-y-4">
        {rentals.map((rental) => (
          <Card key={rental.id} variant="low" className="flex flex-col lg:flex-row lg:items-center justify-between p-4 md:p-6 border border-nordic-outline-variant/10 gap-6 lg:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className={`p-4 rounded-xl self-start sm:self-auto w-fit ${
                rental.status === "Próximo a vencer" ? "bg-orange-400/10 text-orange-400" :
                rental.status === "Activo" ? "bg-nordic-primary/10 text-nordic-primary" :
                "bg-nordic-surface-highest text-nordic-on-bg/40"
              }`}>
                <Key size={24} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-white">{rental.client}</h3>
                  <span className="text-[10px] bg-nordic-surface-highest text-nordic-on-bg/40 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                    {rental.id}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-nordic-on-bg/40">
                  <span className="flex items-center gap-1"><Building2 size={12} className="shrink-0" /> {rental.space}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} className="shrink-0" /> {rental.start} - {rental.end}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4 md:gap-12 pt-4 lg:pt-0 border-t border-nordic-outline-variant/10 lg:border-t-0">
              <div className="text-left lg:text-right">
                <p className="text-[10px] uppercase tracking-widest text-nordic-on-bg/40 font-bold mb-1">Total</p>
                <p className="text-lg md:text-xl font-bold text-white uppercase tracking-tighter">{rental.amount}</p>
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
