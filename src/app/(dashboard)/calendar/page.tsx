"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, Plus, Filter, Calendar as MapIcon, Columns } from "lucide-react";

// Mock data setups
const OFICINAS = ["Todas las Oficinas", "Sala de Reuniones A", "Sala de Reuniones B", "Oficina 302", "Desk 12", "Oficina Ejecutiva"];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 8); // 08:00 to 22:00

type Event = {
  id: number;
  day: number;
  time: string; // HH:MM
  duration?: number; // In hours, defaults to 1
  title: string;
  office: string;
  type: "meeting" | "booking" | "maintenance";
};

const MOCK_EVENTS: Event[] = [
  { id: 1, day: 3, time: "10:00", title: "Revisión Mensual", office: "Sala de Reuniones A", type: "meeting" },
  { id: 2, day: 5, time: "14:30", title: "Reserva Skyline", office: "Oficina 302", type: "booking" },
  { id: 3, day: 12, time: "08:00", title: "Mantenimiento AC", office: "Desk 12", type: "maintenance" },
  
  // Día 15 muy concurrido
  { id: 4, day: 15, time: "09:00", duration: 2, title: "Directorio Q2", office: "Sala de Reuniones B", type: "meeting" },
  { id: 5, day: 15, time: "09:30", duration: 1, title: "Entrevistas HR", office: "Oficina Ejecutiva", type: "booking" },
  { id: 10, day: 15, time: "12:00", duration: 1.5, title: "Kickoff Proyecto", office: "Sala de Reuniones A", type: "meeting" },
  { id: 11, day: 15, time: "14:00", duration: 2, title: "Demo de Producto", office: "Oficina 302", type: "booking" },
  { id: 12, day: 15, time: "17:30", duration: 1, title: "Team Building", office: "Desk 12", type: "meeting" },
  
  { id: 6, day: 18, time: "15:00", title: "Reunión Creativa", office: "Sala de Reuniones A", type: "meeting" },
  { id: 7, day: 22, time: "11:00", title: "Visita Guiada", office: "Todas las Oficinas", type: "meeting" },
  { id: 8, day: 26, time: "07:00", title: "Pintura General", office: "Oficina 302", type: "maintenance" },
  { id: 9, day: 28, time: "16:00", title: "Cierre de Mes", office: "Sala de Reuniones A", type: "meeting" },
];

export default function CalendarPage() {
  const [selectedOffice, setSelectedOffice] = useState("Todas las Oficinas");
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  
  const daysInMonth = Array.from({ length: 35 }, (_, i) => i - 3); // Simple mock month (starting Mon -3)
  
  // For week view, let's focus on the busy week of May 11-17 (Mon-Sun)
  const weekDays = [11, 12, 13, 14, 15, 16, 17];

  // Filter events based on selection
  const filteredEvents = MOCK_EVENTS.filter(
    (e) => selectedOffice === "Todas las Oficinas" || e.office === selectedOffice || e.office === "Todas las Oficinas"
  );

  const getTimePosition = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const startHour = 8;
    const hourHeight = 80; // px per hour
    return (hours - startHour) * hourHeight + (minutes / 60) * hourHeight;
  };

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8">
      <header className="flex items-end justify-between">
        <div className="flex items-end gap-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Calendario</h2>
            <p className="text-nordic-on-bg/60">Disponibilidad de salas y eventos programados.</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-nordic-surface-high p-1 rounded-xl border border-nordic-outline-variant/10 self-end mb-1">
            <button 
              onClick={() => setViewMode("month")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "month" ? "bg-nordic-primary text-nordic-bg shadow-lg" : "text-nordic-on-bg/40 hover:text-nordic-on-bg"
              }`}
            >
              <MapIcon size={14} /> Mes
            </button>
            <button 
              onClick={() => setViewMode("week")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "week" ? "bg-nordic-primary text-nordic-bg shadow-lg" : "text-nordic-on-bg/40 hover:text-nordic-on-bg"
              }`}
            >
              <Columns size={14} /> Semana
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-nordic-surface-high rounded-xl p-1 border border-nordic-outline-variant/10">
            <button className="p-2 hover:bg-nordic-surface-highest rounded-lg transition-colors"><ChevronLeft size={18} /></button>
            <span className="px-4 text-sm font-bold uppercase tracking-widest text-white">
              {viewMode === "month" ? "Mayo 2026" : "11 — 17 Mayo"}
            </span>
            <button className="p-2 hover:bg-nordic-surface-highest rounded-lg transition-colors"><ChevronRight size={18} /></button>
          </div>
          <Button>
            <Plus size={18} className="mr-2" />
            Nuevo Evento
          </Button>
        </div>
      </header>

      {/* Toolbar / Filters */}
      <div className="flex items-center gap-4 pb-2 border-b border-nordic-outline-variant/10">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-nordic-on-bg/40" />
          <span className="text-sm font-medium text-nordic-on-bg/60">Filtrar por oficina:</span>
        </div>
        <select 
          value={selectedOffice}
          onChange={(e) => setSelectedOffice(e.target.value)}
          className="bg-black/20 border border-nordic-outline-variant/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-nordic-primary/50 transition-colors"
        >
          {OFICINAS.map(office => (
            <option key={office} value={office} className="bg-nordic-surface-high">{office}</option>
          ))}
        </select>
      </div>

      <Card variant="low" className="p-0 overflow-hidden border border-nordic-outline-variant/10 bg-black/10">
        {viewMode === "month" ? (
          /* MONTH VIEW */
          <>
            <div className="grid grid-cols-7 border-b border-nordic-outline-variant/10">
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                <div key={day} className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-nordic-on-bg/40">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-[140px]">
              {daysInMonth.map((day, i) => {
                const hasEvents = filteredEvents
                  .filter(e => e.day === day)
                  .sort((a, b) => a.time.localeCompare(b.time));
                
                return (
                  <div 
                    key={i} 
                    className={`p-2 border-r border-b border-nordic-outline-variant/5 transition-colors hover:bg-nordic-surface-highest/20 overflow-y-auto custom-scrollbar ${
                      day <= 0 || day > 31 ? "opacity-10 bg-nordic-bg/50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 px-1">
                      <span className={`text-sm font-medium ${hasEvents.length > 0 && day > 0 ? "text-white font-bold" : "text-nordic-on-bg/60"}`}>
                        {day > 0 && day <= 31 ? day : ""}
                      </span>
                      {hasEvents.length > 3 && (
                        <span className="text-[9px] bg-nordic-surface-highest text-nordic-on-bg/60 px-1.5 rounded">
                          {hasEvents.length} eventos
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1.5">
                      {day > 0 && hasEvents.map(event => (
                        <div 
                          key={event.id}
                          className={`p-1.5 rounded text-left border-l-2 mb-1 group relative ${
                            event.type === 'meeting' ? "bg-nordic-primary/10 border-nordic-primary text-nordic-primary" :
                            event.type === 'maintenance' ? "bg-orange-400/10 border-orange-400 text-orange-400" :
                            "bg-green-400/10 border-green-400 text-green-400"
                          }`}
                        >
                          <p className="text-[10px] font-bold truncate leading-tight">
                            <span className="opacity-70 mr-1">{event.time}</span>
                            {event.title}
                          </p>
                          <p className="text-[9px] truncate opacity-70 mt-0.5">{event.office}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* WEEKLY VIEW (Hourly Grid) */
          <div className="flex flex-col h-[700px] overflow-hidden">
            <div className="flex border-b border-nordic-outline-variant/20 bg-nordic-surface-low">
              <div className="w-20 border-r border-nordic-outline-variant/10" />
              <div className="flex-1 grid grid-cols-7">
                {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((dayName, idx) => (
                  <div key={dayName} className="py-4 text-center border-r border-nordic-outline-variant/5 last:border-r-0">
                    <p className="text-[10px] uppercase tracking-widest text-nordic-on-bg/40 font-bold mb-1">{dayName}</p>
                    <p className={`text-xl font-bold ${weekDays[idx] === 15 ? 'text-nordic-primary' : 'text-white'}`}>
                      {weekDays[idx]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar relative px-1">
              <div className="flex min-h-[1200px]">
                {/* Time Indicators */}
                <div className="w-20 border-r-2 border-nordic-primary/20 sticky left-0 bg-nordic-surface-low/95 backdrop-blur-xl z-10 shadow-xl shadow-black/20">
                  {HOURS.map(hour => (
                    <div key={hour} className="h-20 flex items-start justify-center pt-2">
                      <span className="text-[11px] font-bold text-white tracking-widest bg-nordic-surface-highest/50 px-2 py-0.5 rounded shadow-sm border border-white/5">
                        {hour}:00
                      </span>
                    </div>
                  ))}
                </div>

                {/* Grid Columns */}
                <div className="flex-1 grid grid-cols-7 relative">
                  {/* Horizontal Lines */}
                  {HOURS.map(hour => (
                    <div 
                      key={hour} 
                      className="absolute left-0 right-0 border-b border-nordic-outline-variant/10" 
                      style={{ top: `${(hour - 8) * 80}px`, height: '80px' }}
                    />
                  ))}

                  {/* Columns */}
                  {weekDays.map((dayNum, colIdx) => {
                    const dayEvents = filteredEvents.filter(e => e.day === dayNum);
                    
                    return (
                      <div key={dayNum} className="relative border-r border-nordic-outline-variant/5 last:border-r-0 h-full">
                        {dayEvents.map(event => {
                          const top = getTimePosition(event.time);
                          const height = (event.duration || 1) * 80;
                          
                          return (
                            <div 
                              key={event.id}
                              className={`absolute left-1 right-1 rounded-lg border-l-4 p-2 z-20 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300 ${
                                event.type === 'meeting' ? "bg-nordic-primary/20 border-nordic-primary text-nordic-primary" :
                                event.type === 'maintenance' ? "bg-orange-400/20 border-orange-400 text-orange-400" :
                                "bg-green-400/20 border-green-400 text-green-400"
                              }`}
                              style={{ top: `${top}px`, height: `${height}px` }}
                            >
                              <p className="text-[10px] font-bold leading-tight mb-1">{event.time} - {event.title}</p>
                              <p className="text-[9px] font-medium opacity-80 uppercase tracking-tighter">{event.office}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}



