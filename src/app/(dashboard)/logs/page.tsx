import Card from "@/components/ui/Card";
import { Terminal, Clock, Shield, Search } from "lucide-react";

const logs = [
  { id: 1, type: "auth", message: "Inicio de sesión exitoso: Admin", user: "admin@nordic.com", time: "Hace 2 min" },
  { id: 2, type: "system", message: "Reserva de Oficina 302 confirmada automáticamente", user: "System", time: "Hace 15 min" },
  { id: 3, type: "security", message: "Intento de acceso fallido (API Key)", user: "IP 192.168.1.45", time: "Hace 1 hora" },
  { id: 4, type: "auth", message: "Cambio de contraseña: Lucas Beltrán", user: "admin@nordic.com", time: "Hace 3 horas" },
  { id: 5, type: "system", message: "Copia de seguridad semanal completada", user: "System", time: "Hace 6 horas" },
];

export default function LogsPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Logs del Sistema</h2>
          <p className="text-nordic-on-bg/60">Auditoría técnica y registros de actividad.</p>
        </div>
      </header>

      <Card variant="low" className="p-0 overflow-hidden border border-nordic-outline-variant/10 bg-black/20">
        <div className="p-4 bg-nordic-surface-highest/20 flex items-center gap-4 border-b border-nordic-outline-variant/10">
          <Terminal size={18} className="text-nordic-primary" />
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nordic-on-bg/40" size={14} />
            <input 
              type="text" 
              placeholder="Filtrar eventos (grep style)..." 
              className="w-full bg-transparent text-sm pl-10 pr-4 py-2 text-nordic-primary placeholder:text-nordic-on-bg/20 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="divide-y divide-nordic-outline-variant/5 font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center gap-6 px-6 py-4 hover:bg-white/5 transition-colors group">
              <span className="text-nordic-on-bg/20 w-24">{log.time}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold w-20 text-center ${
                log.type === "auth" ? "bg-nordic-primary/10 text-nordic-primary" :
                log.type === "security" ? "bg-red-400/10 text-red-400" :
                "bg-nordic-on-bg/10 text-nordic-on-bg/60"
              }`}>
                {log.type}
              </span>
              <span className="flex-1 text-nordic-on-bg/80 group-hover:text-white transition-colors">{log.message}</span>
              <span className="text-nordic-on-bg/40 text-[10px]">{log.user}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
