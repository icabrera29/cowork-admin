"use client";

import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteRentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rentalInfo: string;
  isDeleting: boolean;
}

export default function DeleteRentalModal({
  isOpen,
  onClose,
  onConfirm,
  rentalInfo,
  isDeleting,
}: DeleteRentalModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Alquiler"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 text-red-500 bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
          <div className="p-2 bg-red-500 rounded-xl text-white">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm">¿Estás absolutamente seguro?</h4>
            <p className="text-xs text-red-500/70">Esta acción no se puede deshacer.</p>
          </div>
        </div>

        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
          <p className="text-xs text-nordic-on-bg/40 uppercase tracking-widest mb-1 font-bold">Contrato a eliminar</p>
          <p className="text-white font-medium">{rentalInfo}</p>
        </div>

        <p className="text-sm text-nordic-on-bg/60 leading-relaxed">
          Al eliminar este contrato, se perderá el registro histórico de los pagos y la reserva de la oficina. Asegúrate de haber procesado cualquier saldo pendiente.
        </p>

        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            isLoading={isDeleting}
            className="flex-1 bg-red-500 hover:bg-red-600 border-none text-white shadow-lg shadow-red-500/20"
          >
            <Trash2 size={16} className="mr-2" />
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
