"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Loader2, X } from "lucide-react";

export default function SearchClients() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentParam = searchParams.get("q") || "";
      if (query === currentParam) return;

      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query, pathname, router]);

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="relative w-full md:w-96 group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
        {isPending ? (
          <Loader2 className="text-nordic-primary animate-spin" size={16} />
        ) : (
          <Search className="text-nordic-on-bg/40 group-focus-within:text-nordic-primary/60 transition-colors" size={16} />
        )}
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nombre, empresa o email..."
        className="w-full bg-nordic-bg/50 text-sm pl-10 pr-10 py-2.5 rounded-xl border border-nordic-outline-variant/10 focus:outline-none focus:border-nordic-primary/40 focus:ring-4 focus:ring-nordic-primary/5 transition-all placeholder:text-nordic-on-bg/30 text-white shadow-inner"
      />

      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/5 rounded-full text-nordic-on-bg/40 hover:text-white transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Limpiar búsqueda"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
