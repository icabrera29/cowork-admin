import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function ConfirmedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-nordic-bg">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-nordic-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-nordic-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass shadow-nordic-ambient border border-nordic-outline-variant/30 rounded-3xl p-8 md:p-10 text-center space-y-8">
          
          {/* Success Icon with Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-nordic-primary/20 blur-xl rounded-full animate-pulse" />
              <div className="relative bg-nordic-surface-high rounded-full p-6 border border-nordic-primary/30">
                <CheckCircle2 className="w-16 h-16 text-nordic-primary" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-light tracking-tight text-white">
              ¡Email verificado!
            </h1>
            <p className="text-nordic-on-bg/60 text-lg font-light leading-relaxed">
              Tu cuenta ha sido confirmada con éxito. Ya puedes acceder a todas las funcionalidades de <span className="text-nordic-primary font-medium">Nordic Co-Work</span>.
            </p>
          </div>

          <div className="pt-4">
            <Link 
              href="/login"
              className="group relative flex items-center justify-center gap-2 w-full py-4 px-6 bg-white text-nordic-bg font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/10"
            >
              Iniciar sesión
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          </div>

          <p className="text-sm text-nordic-on-bg/40 font-light">
            ¿Necesitas ayuda? <Link href="/soporte" className="text-nordic-primary/60 hover:text-nordic-primary transition-colors underline underline-offset-4">Contacta a soporte</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
