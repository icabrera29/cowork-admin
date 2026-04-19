"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import Portal from "./Portal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-nordic-bg/60 backdrop-blur-md transition-opacity duration-300" 
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative bg-nordic-surface-low border border-nordic-outline-variant/10 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300 transform transition-all">
          {/* Header */}
          <div className="px-6 py-4 border-b border-nordic-outline-variant/5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 text-nordic-on-bg/40 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}
