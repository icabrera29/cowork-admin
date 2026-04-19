"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Loader2, X } from "lucide-react";

export default function RentalSearch() {
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
  }, [query, pathname, router, searchParams]);

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="relative group flex-1 max-w-md">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
        {isPending ? (
          <Loader2 className="text-nordic-primary animate-spin" size={18} />
        ) : (
          <Search className="text-white/20 group-focus-within:text-nordic-primary transition-colors" size={18} />
        )}
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por cliente u oficina..."
        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-nordic-primary/50 transition-all shadow-inner"
      />

      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all flex items-center justify-center"
          title="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
