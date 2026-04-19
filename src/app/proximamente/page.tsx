import Link from 'next/link'
import { Rocket, LogOut, Clock } from 'lucide-react'
import { logout } from '../login/actions'

export default function ProximamentePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-nordic-bg relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] bg-nordic-primary/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] bg-nordic-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="glass shadow-nordic-ambient border border-nordic-outline-variant/30 rounded-3xl p-10 md:p-16 text-center space-y-10">
          
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-nordic-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative bg-nordic-surface-high/50 rounded-3xl p-8 border border-nordic-outline-variant/40 shadow-inner">
                <Rocket className="w-20 h-20 text-nordic-primary animate-bounce-slow" strokeWidth={1} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nordic-primary/10 border border-nordic-primary/20 text-nordic-primary text-xs font-semibold tracking-wider uppercase mb-2">
              <Clock className="w-3.5 h-3.5" />
              Muy pronto
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Casi estamos listos
            </h1>
            <p className="text-nordic-on-bg/60 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
              Estamos preparando tu espacio personalizado de <span className="text-nordic-primary font-medium">Nordic Co-Work</span>. Pronto podrás gestionar tus reservas y servicios desde aquí.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm mx-auto pt-4">
             <form action={logout}>
              <button 
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-nordic-surface-high hover:bg-nordic-surface-highest text-white font-medium rounded-xl border border-nordic-outline-variant/50 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </form>
            <Link 
              href="/soporte"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-transparent hover:bg-nordic-surface-low text-nordic-on-bg/80 font-medium rounded-xl border border-transparent transition-all duration-300"
            >
              Contactar soporte
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Minimalist branding or info */}
            <span className="text-xs tracking-[0.2em] font-light uppercase">Nordic Co-Work Experience</span>
          </div>
        </div>
      </div>
    </main>
  )
}
