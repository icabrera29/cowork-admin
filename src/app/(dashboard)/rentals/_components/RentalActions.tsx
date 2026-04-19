"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteRentalModal from "./DeleteRentalModal";
import { deleteRental } from "../actions";
import Portal from "@/components/ui/Portal";

interface RentalActionsProps {
  rental: {
    id: string;
    client_name: string;
    office_name: string;
  };
}

export default function RentalActions({ rental }: RentalActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const toggleMenu = () => {
    if (!isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.right - 208,
      });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    
    function handleScroll() {
      setIsMenuOpen(false);
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isMenuOpen]);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteRental(rental.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete rental:", error);
      alert("Error al eliminar el alquiler");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={toggleMenu}
        className={`p-2 rounded-lg transition-all ${isMenuOpen ? "bg-nordic-surface-highest text-white" : "text-nordic-on-bg/40 hover:text-white hover:bg-nordic-surface-highest/50"}`}
      >
        <MoreVertical size={18} />
      </button>

      {isMenuOpen && (
        <Portal>
          <div 
            ref={menuRef}
            style={{ 
              position: 'fixed', 
              top: `${coords.top - window.scrollY}px`, 
              left: `${coords.left}px`,
              zIndex: 9999 
            }}
            className="w-52 bg-nordic-surface-low/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300"
          >
            <div className="px-4 py-2 pb-1 text-[10px] uppercase tracking-widest text-nordic-on-bg/30 font-bold">
              Acciones
            </div>
            <Link 
              href={`/rentals/${rental.id}/edit`}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-nordic-on-bg/70 hover:text-white hover:bg-white/5 transition-all group"
            >
              <div className="p-1.5 rounded-lg bg-nordic-primary/10 text-nordic-primary group-hover:bg-nordic-primary group-hover:text-nordic-bg transition-all">
                <Edit size={14} />
              </div>
              <span className="font-medium">Editar Alquiler</span>
            </Link>
            <div className="mx-2 my-1 border-t border-white/5" />
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all group"
            >
              <div className="p-1.5 rounded-lg bg-red-400/10 text-red-400 group-hover:bg-red-400 group-hover:text-white transition-all">
                <Trash2 size={14} />
              </div>
              <span className="font-medium">Eliminar</span>
            </button>
          </div>
        </Portal>
      )}

      <DeleteRentalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        rentalInfo={`${rental.client_name} - ${rental.office_name}`}
        isDeleting={isDeleting}
      />
    </>
  );
}
