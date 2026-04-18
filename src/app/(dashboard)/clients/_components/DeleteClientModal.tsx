"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

interface DeleteClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clientName: string;
  isDeleting: boolean;
}

export default function DeleteClientModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  clientName,
  isDeleting
}: DeleteClientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-nordic-surface-low border border-nordic-outline-variant/10 rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-nordic-on-bg/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-red-500/10 p-4 rounded-2xl text-red-500">
            <AlertTriangle size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">¿Eliminar Cliente?</h3>
            <p className="text-nordic-on-bg/60 text-sm leading-relaxed">
              Estás a punto de eliminar a <span className="text-white font-medium">{clientName}</span>. 
              Esta acción no se puede deshacer y se perderán todos los datos asociados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
            <Button 
              variant="secondary" 
              className="w-full justify-center" 
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button 
              className="w-full justify-center bg-red-500 hover:bg-red-600 border-none group" 
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Eliminando...
                </span>
              ) : (
                "Eliminar Cliente"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
