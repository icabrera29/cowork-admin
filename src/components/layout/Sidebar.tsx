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
  Key
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clientes", href: "/clients", icon: Users },
  { name: "Oficinas", href: "/offices", icon: Building2 },
  { name: "Calendario", href: "/calendar", icon: Calendar },
  { name: "Alquileres", href: "/rentals", icon: Key },
  { name: "Logs", href: "/logs", icon: ClipboardList },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-nordic-surface-low flex flex-col items-stretch pt-8 border-none shadow-nordic-ambient z-50">
      <div className="px-8 mb-12">
        <h1 className="text-2xl font-bold tracking-tighter nordic-gradient bg-clip-text text-transparent italic leading-none">
          NORDIC
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-nordic-on-bg/40 font-medium mt-1">
          Co-Work Manager
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
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
        <button className="flex items-center gap-4 px-4 py-3 w-full text-nordic-on-bg/60 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all">
          <LogOut size={20} />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
