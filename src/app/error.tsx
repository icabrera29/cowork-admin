"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-nordic-bg flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full glass border border-red-500/20 rounded-3xl p-10 space-y-8 shadow-2xl">
        <div className="flex justify-center">
          <div className="bg-red-500/10 p-4 rounded-full text-red-400">
            <AlertCircle size={48} />
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white tracking-tight">Algo salió mal</h2>
          <p className="text-nordic-on-bg/60 text-sm leading-relaxed">
            Se ha producido un error inesperado en el sistema. Hemos sido notificados y estamos trabajando en ello.
          </p>
        </div>

        <div className="bg-black/20 rounded-xl p-4 text-left overflow-hidden">
          <code className="text-xs text-red-300/80 break-all font-mono">
            {error.message || "Error desconocido"}
          </code>
        </div>

        <Button 
          variant="primary" 
          onClick={() => reset()}
          className="w-full gap-2"
        >
          <RefreshCcw size={18} />
          Reintentar Carga
        </Button>
      </div>
    </div>
  );
}
