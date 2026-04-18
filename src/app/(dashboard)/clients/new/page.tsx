"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, Save } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NewClientPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/clients" 
          className="inline-flex items-center gap-2 text-sm text-nordic-on-bg/60 hover:text-nordic-primary transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Volver a Clientes
        </Link>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Nuevo Cliente</h1>
          <p className="text-nordic-on-bg/60">Completa la información para registrar un nuevo miembro en la base de datos.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-nordic-surface-low/50 border border-nordic-outline-variant/10 rounded-3xl p-8 backdrop-blur-xl shadow-nordic-ambient">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name and Surname */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <User size={16} className="text-nordic-primary" />
                Nombre y Apellido
              </label>
              <input
                type="text"
                placeholder="Ej. Lucas Beltrán"
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <Mail size={16} className="text-nordic-primary" />
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <Phone size={16} className="text-nordic-primary" />
                Teléfono de Contacto
              </label>
              <input
                type="tel"
                placeholder="+34 600 000 000"
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-nordic-outline-variant/10 flex flex-col md:flex-row justify-end gap-4">
            <Link href="/clients">
              <Button variant="secondary" className="w-full md:w-auto">
                Cancelar
              </Button>
            </Link>
            <Button variant="primary" className="gap-2 w-full md:w-auto">
              <Save size={18} />
              Guardar Cliente
            </Button>
          </div>
        </form>
      </div>

      {/* Helper Info */}
      <div className="bg-nordic-primary/5 border border-nordic-primary/10 rounded-2xl p-6">
        <div className="flex gap-4 items-start">
          <div className="bg-nordic-primary/20 p-2 rounded-lg text-nordic-primary">
            <User size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-nordic-primary mb-1">Privacidad y Datos</h4>
            <p className="text-xs text-nordic-on-bg/60 leading-relaxed">
              Toda la información personal del cliente será almacenada de forma segura siguiendo los estándares de protección de datos escandinavos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
