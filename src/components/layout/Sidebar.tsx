"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar, 
  ClipboardList, 
  LogOut,
  Key,
  Menu,
  X,
  Loader2
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clientes", href: "/clients", icon: Users },
  { name: "Oficinas", href: "/offices", icon: Building2 },
  { name: "Calendario", href: "/calendar", icon: Calendar },
  { name: "Alquileres", href: "/rentals", icon: Key },
  { name: "Logs", href: "/logs", icon: ClipboardList },
];

import { logout } from "@/app/login/actions";

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await logout();
    // We don't set isLoggingOut(false) here because the page will redirect
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-nordic-surface-low border-b border-nordic-outline-variant/10 shadow-sm z-40 flex items-center justify-between px-4">
        <div>
          <h1 className="text-xl font-bold tracking-tighter nordic-gradient bg-clip-text text-transparent italic leading-none">
            NORDIC
          </h1>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-nordic-on-bg/60 hover:text-nordic-primary focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-nordic-surface-low flex flex-col items-stretch pt-8 border-r md:border-none border-nordic-outline-variant/10 shadow-nordic-ambient z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="px-8 mb-12 hidden md:block">
          <h1 className="text-2xl font-bold tracking-tighter nordic-gradient bg-clip-text text-transparent italic leading-none">
            NORDIC
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-nordic-on-bg/40 font-medium mt-1">
            Co-Work Manager
          </p>
        </div>
        <div className="px-8 mt-4 mb-8 md:hidden flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tighter nordic-gradient bg-clip-text text-transparent italic leading-none">
                  NORDIC
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-nordic-on-bg/40 font-medium mt-1">
                  Manager
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-nordic-on-bg/60 p-1">
                <X size={20} />
            </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            // Prevent hydration mismatch by checking if mounted
            const isActive = mounted && pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? "bg-nordic-primary/10 text-nordic-primary font-medium shadow-[inset_0_0_0_1px_rgba(173,198,255,0.1)]"
                    : "text-nordic-on-bg/60 hover:text-nordic-on-bg hover:bg-nordic-surface-high"
                }`}
              >
                <Icon 
                  size={20} 
                  className={`transition-colors ${isActive ? "text-nordic-primary" : "text-nordic-on-bg/40 group-hover:text-nordic-on-bg"}`} 
                />
                <span className="text-sm">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-4 bg-nordic-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-nordic-outline-variant/10">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-4 px-4 py-3 w-full text-nordic-on-bg/60 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoggingOut ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <LogOut size={20} />
            )}
            <span className="text-sm">
              {isLoggingOut ? "Cerrando Sesión..." : "Cerrar Sesión"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
