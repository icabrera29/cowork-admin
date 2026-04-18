"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-nordic-bg flex items-center justify-center z-[9999]">
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Rings */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-nordic-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-nordic-primary rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 border-t-4 border-nordic-primary rounded-full animate-spin"></div>
        </div>
        
        {/* Text with shimmer effect */}
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold tracking-[0.2em] text-white/90 uppercase animate-pulse">
            Nordic
          </h2>
          <div className="h-0.5 w-12 bg-nordic-primary/40 mx-auto rounded-full overflow-hidden">
            <div className="h-full w-full bg-nordic-primary animate-shimmer"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
