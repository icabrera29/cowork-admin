"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Phone, Mail, Save, Building2, CreditCard } from "lucide-react";
import Button from "@/components/ui/Button";

interface ClientData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  plan: string | null;
  status: string | null;
}

interface ClientFormProps {
  initialData?: ClientData;
  onSubmit: (formData: FormData) => Promise<{ error?: string } | void>;
  buttonText: string;
  isEdit?: boolean;
}

export default function ClientForm({ initialData, onSubmit, buttonText, isEdit = false }: ClientFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    try {
      const result = await onSubmit(formData);
      if (result?.error) {
        setError(result.error);
        setIsPending(false);
      }
    } catch (e) {
      setError("Ocurrió un error inesperado al procesar la solicitud.");
      setIsPending(false);
    }
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
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="first_name">
              <User size={16} className="text-nordic-primary" />
              Nombre
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required
              defaultValue={initialData?.first_name || ""}
              placeholder="Ej. Lucas"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Apellido */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="last_name">
              <User size={16} className="text-nordic-primary" />
              Apellido
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required
              defaultValue={initialData?.last_name || ""}
              placeholder="Ej. Beltrán"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="email">
              <Mail size={16} className="text-nordic-primary" />
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={initialData?.email || ""}
              placeholder="ejemplo@correo.com"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="phone">
              <Phone size={16} className="text-nordic-primary" />
              Teléfono de Contacto
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={initialData?.phone || ""}
              placeholder="1133445566"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Empresa */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="company">
              <Building2 size={16} className="text-nordic-primary" />
              Empresa
            </label>
            <input
              id="company"
              name="company"
              type="text"
              defaultValue={initialData?.company || ""}
              placeholder="Nombre de la empresa"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {/* Plan */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="plan">
              <CreditCard size={16} className="text-nordic-primary" />
              Tipo de Plan
            </label>
            <input
              id="plan"
              name="plan"
              type="text"
              defaultValue={initialData?.plan || ""}
              placeholder="Ej. Premium Desk"
              className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all text-sm"
            />
          </div>

          {isEdit && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="status">
                <span className="w-1.5 h-1.5 rounded-full bg-nordic-primary animate-pulse" />
                Estado del Cliente
              </label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status || "Activo"}
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all appearance-none cursor-pointer text-sm"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-nordic-outline-variant/10 flex flex-col md:flex-row justify-end gap-4">
          <Link href="/clients">
            <Button variant="secondary" className="w-full md:w-auto" type="button" disabled={isPending}>
              Cancelar
            </Button>
          </Link>
          <Button variant="primary" className="gap-2 w-full md:w-auto" type="submit" disabled={isPending}>
            <Save size={18} />
            {isPending ? "Guardando..." : buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
}
