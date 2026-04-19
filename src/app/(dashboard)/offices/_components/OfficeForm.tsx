"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Save, Building2, FileText, DollarSign, AlignLeft, LayoutPanelLeft, Users, Activity, Trash2, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { deleteOffice } from "../actions";
import { useRouter } from "next/navigation";

interface OfficeData {
  id?: string;
  name: string;
  description: string;
  price_per_hour: number;
  details: string;
  type: string;
  capacity: number;
  status: string;
}

interface OfficeFormProps {
  initialData?: OfficeData;
  onSubmit: (formData: FormData) => Promise<{ error?: string } | void>;
  buttonText: string;
  isEdit?: boolean;
}

export default function OfficeForm({ initialData, onSubmit, buttonText, isEdit = false }: OfficeFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const result = await onSubmit(formData);
        if (result?.error) {
          setError(result.error);
        }
      } catch (e: any) {
        // En Next.js, redirect() lanza un error que NO debe ser capturado para que la redirección funcione.
        // Si el mensaje del error incluye "NEXT_REDIRECT", no hacemos nada y dejamos que Next lo maneje.
        if (e?.message?.includes("NEXT_REDIRECT")) {
          throw e;
        }
        setError("Ocurrió un error inesperado al procesar la solicitud.");
        console.error(e);
      }
    });
  }

  function handleDelete() {
    if (!initialData?.id) return;
    
    startTransition(async () => {
      try {
        const result = await deleteOffice(initialData.id!);
        if (result?.error) {
          setError(result.error);
          setShowDeleteModal(false);
        } else {
          router.push("/offices");
        }
      } catch (e: any) {
        setError("Ocurrió un error al intentar eliminar la oficina.");
        setShowDeleteModal(false);
      }
    });
  }

  return (
    <div className="bg-nordic-surface-low/50 border border-nordic-outline-variant/10 rounded-3xl p-8 backdrop-blur-xl shadow-nordic-ambient">
      <form action={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm animate-shake">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nombre */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="name">
              <Building2 size={16} className="text-nordic-primary" />
              Nombre de la Oficina
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={initialData?.name || ""}
              placeholder="Ej. Suite del Norte"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Precio por Hora */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="price_per_hour">
              <DollarSign size={16} className="text-nordic-primary" />
              Precio por Hora
            </label>
            <input
              id="price_per_hour"
              name="price_per_hour"
              type="number"
              step="0.01"
              required
              defaultValue={initialData?.price_per_hour || ""}
              placeholder="Ej. 40"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Tipo */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="type">
              <LayoutPanelLeft size={16} className="text-nordic-primary" />
              Tipo de Espacio
            </label>
            <input
              id="type"
              name="type"
              type="text"
              required
              defaultValue={initialData?.type || ""}
              placeholder="Ej. Oficina Privada, Sala de Reuniones"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Capacidad */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="capacity">
              <Users size={16} className="text-nordic-primary" />
              Capacidad (Personas)
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              required
              defaultValue={initialData?.capacity || ""}
              placeholder="Ej. 6"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Estado */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="status">
              <Activity size={16} className="text-nordic-primary" />
              Estado
            </label>
            <select
              id="status"
              name="status"
              defaultValue={initialData?.status || "Disponible"}
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="Disponible">Disponible</option>
              <option value="Ocupado">Ocupado</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>
          
           {/* Descripción Corta */}
           <div className="space-y-3 md:col-span-2">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="description">
              <FileText size={16} className="text-nordic-primary" />
              Descripción Corta
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              defaultValue={initialData?.description || ""}
              placeholder="Breve resumen para las tarjetas..."
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Detalles Completos */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="details">
              <AlignLeft size={16} className="text-nordic-primary" />
              Detalles Completos
            </label>
            <textarea
              id="details"
              name="details"
              required
              rows={4}
              defaultValue={initialData?.details || ""}
              placeholder="Describe amenities, equipamiento, horarios, y toda la información relevante de la oficina..."
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm resize-y"
            ></textarea>
          </div>

        </div>

        <div className="pt-6 border-t border-nordic-outline-variant/10 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {isEdit && (
              <Button 
                variant="secondary" 
                type="button" 
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300 border-red-500/20 w-full md:w-auto"
                onClick={() => setShowDeleteModal(true)}
                disabled={isPending}
              >
                <Trash2 size={18} className="mr-2" />
                Eliminar Oficina
              </Button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/offices" className="w-full md:w-auto">
              <Button variant="secondary" className="w-full" type="button" disabled={isPending}>
                Cancelar
              </Button>
            </Link>
            <Button variant="primary" className="gap-2 w-full md:w-auto" type="submit" isLoading={isPending}>
              {!isPending && <Save size={18} />}
              {isPending ? (isEdit ? "Guardando cambios..." : "Creando oficina...") : buttonText}
            </Button>
          </div>
        </div>
      </form>

      {/* Modal de Confirmación de Borrado */}
      <Modal 
        isOpen={showDeleteModal} 
        onClose={() => !isPending && setShowDeleteModal(false)}
        title="Confirmar Eliminación"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <div className="p-2 bg-red-500/20 rounded-xl text-red-500">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-white font-semibold">¿Estás seguro?</p>
              <p className="text-nordic-on-bg/60 text-sm mt-1">
                Esta acción eliminará permanentemente la oficina <strong>{initialData?.name}</strong>. Esta operación no se puede deshacer.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              variant="primary" 
              className="bg-red-600 hover:bg-red-500 text-white border-transparent w-full"
              onClick={handleDelete}
              isLoading={isPending}
            >
              Sí, eliminar oficina
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => setShowDeleteModal(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
