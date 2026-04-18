"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Mail, Lock, UserPlus, ArrowLeft, Loader2 } from "lucide-react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setMessage(null);

    const result = mode === "login" ? await login(formData) : await signup(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setMessage(result.success);
      setLoading(false);
      if (mode === "signup") {
        // Option to switch back to login after success
        // setMode("login");
      }
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/login-bg.png"
        alt="Nordic Interior"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-nordic-bg/40 backdrop-blur-[2px]" />

      {/* Content Card */}
      <div className="glass relative w-full max-w-md p-6 md:p-10 mx-4 md:mx-0 rounded-3xl md:rounded-[2rem] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter text-white italic mb-2">NORDIC</h1>
          <p className="text-sm text-white/60 tracking-wider">
            {mode === "login" ? "GESTIÓN DE CO-WORK" : "SOLICITAR ACCESO"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-xs text-center animate-shake">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-xs text-center">
            {message}
          </div>
        )}

        <form className="space-y-6" action={handleSubmit}>
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Nombre</label>
                <input 
                  name="firstName"
                  required
                  placeholder="Tu nombre"
                  className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-nordic-primary/40 focus:bg-black/40 transition-all font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Apellido</label>
                <input 
                  name="lastName"
                  required
                  placeholder="Tu apellido"
                  className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-nordic-primary/40 focus:bg-black/40 transition-all font-light"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-nordic-primary transition-colors" size={18} />
              <input 
                name="email"
                type="email" 
                required
                placeholder="nombre@ejemplo.com"
                className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-nordic-primary/40 focus:bg-black/40 transition-all font-light"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Contraseña</label>
              {mode === "login" && (
                <Link href="#" className="text-[10px] text-nordic-primary hover:underline">¿Olvidaste tu contraseña?</Link>
              )}
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-nordic-primary transition-colors" size={18} />
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-nordic-primary/40 focus:bg-black/40 transition-all font-light"
              />
            </div>
          </div>

          <Button 
            type="submit"
            disabled={loading}
            className="w-full py-4 text-base mt-4 shadow-xl shadow-nordic-primary/20 flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : (
              mode === "login" ? "Iniciar Sesión" : "Registrarse"
            )}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
          {mode === "login" ? (
            <>
              <p className="text-sm text-white/40">¿No tienes una cuenta?</p>
              <Button 
                variant="secondary" 
                className="w-full border-white/10 hover:bg-white/5"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                  setMessage(null);
                }}
              >
                <UserPlus size={18} className="mr-2" />
                Solicitar Acceso
              </Button>
            </>
          ) : (
            <button 
              onClick={() => {
                setMode("login");
                setError(null);
                setMessage(null);
              }}
              className="flex items-center text-sm text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver al inicio de sesión
            </button>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="absolute bottom-8 text-white/20 text-[10px] uppercase tracking-[0.5em] font-medium">
        Editorial Design System v1.0
      </div>
    </div>
  );
}
