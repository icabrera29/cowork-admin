import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  MoreHorizontal,
  Search
} from "lucide-react";

const stats = [
  { name: "Ocupación Total", value: "84%", icon: Building2, trend: "+2.5%", trendUp: true },
  { name: "Clientes Activos", value: "128", icon: Users, trend: "+12", trendUp: true },
  { name: "Ingresos (Mes)", value: "$12,450", icon: TrendingUp, trend: "+8.3%", trendUp: true },
  { name: "Tareas Pendientes", value: "24", icon: Clock, trend: "-4", trendUp: false },
];

const recentActivity = [
  { id: 1, user: "Elena Sorolla", action: "Alquiló Oficina 302", time: "Hace 14 min", status: "Completado" },
  { id: 2, user: "Marcos Ruiz", action: "Check-in Desk 12", time: "Hace 45 min", status: "Pendiente" },
  { id: 3, user: "Juan Pérez", action: "Extendió suscripción", time: "Hace 2 horas", status: "Completado" },
  { id: 4, user: "Sofía Martínez", action: "Reporte de incidencia", time: "Hace 5 horas", status: "En revisión" },
];

export default function Dashboard() {
  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-8 md:space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Resumen General</h2>
          <p className="text-sm md:text-base text-nordic-on-bg/60">Bienvenido de nuevo al panel editorial de Nordic.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nordic-on-bg/40 group-focus-within:text-nordic-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="bg-nordic-surface-high text-sm pl-10 pr-4 py-2.5 rounded-xl border border-nordic-outline-variant/10 focus:outline-none focus:border-nordic-primary/40 transition-all w-full md:w-64"
            />
          </div>
          <Button className="w-full sm:w-auto">Nuevo Alquiler</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} variant="high" hoverable className="group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-nordic-surface-highest group-hover:bg-nordic-primary/10 group-hover:text-nordic-primary transition-colors">
                <stat.icon size={22} />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.trendUp ? 'text-green-400 bg-green-400/10' : 'text-orange-400 bg-orange-400/10'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-nordic-on-bg/40 text-sm mb-1">{stat.name}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts / Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2" variant="low">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Actividad Reciente</h3>
            <Button variant="tertiary">Ver todo</Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-nordic-surface-highest transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-nordic-surface-highest flex items-center justify-center font-bold text-xs text-nordic-primary">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-white group-hover:text-nordic-primary transition-colors">{activity.user}</h4>
                    <p className="text-xs text-nordic-on-bg/60">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-nordic-on-bg/40 mb-1">{activity.time}</p>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-nordic-on-bg/40 px-2 py-0.5 border border-nordic-outline-variant/20 rounded">
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="high" className="flex flex-col">
          <h3 className="text-xl font-bold mb-6">Próximos Vencimientos</h3>
          <div className="flex-1 space-y-6">
            <div className="p-4 rounded-xl border border-dashed border-nordic-outline-variant/30 flex flex-col items-center justify-center gap-2 text-center">
              <p className="text-xs text-nordic-on-bg/40">Sin vencimientos para hoy</p>
              <Button variant="secondary" size="sm">Actualizar</Button>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-nordic-on-bg/40 font-bold">Mañana</h4>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <p className="text-sm">Oficina 201 - Contrato expira</p>
                <ArrowUpRight size={14} className="ml-auto text-nordic-on-bg/40" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
