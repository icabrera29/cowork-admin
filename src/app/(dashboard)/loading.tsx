import React from "react";

export default function Loading() {
  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="h-10 w-48 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-white/5 rounded-lg animate-pulse opacity-50" />
        </div>
        <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />
      </header>

      <div className="w-full h-96 bg-nordic-surface-low/30 backdrop-blur-sm border border-white/5 rounded-2xl animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-nordic-primary/20 border-t-nordic-primary rounded-full animate-spin" />
          <span className="text-[10px] uppercase tracking-widest text-nordic-on-bg/40 font-bold">Cargando sección...</span>
        </div>
      </div>
    </div>
  );
}
