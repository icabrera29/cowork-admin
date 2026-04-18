"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteClientModal from "./DeleteClientModal";
import { deleteClient } from "../actions";

interface ClientActionsProps {
  client: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

export default function ClientActions({ client }: ClientActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteClient(client.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete client:", error);
      alert("Error al eliminar el cliente");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`p-2 rounded-lg transition-all ${isMenuOpen ? "bg-nordic-surface-highest text-white" : "text-nordic-on-bg/40 hover:text-white hover:bg-nordic-surface-highest/50"}`}
      >
        <MoreVertical size={18} />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-nordic-surface-low border border-nordic-outline-variant/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link 
            href={`/clients/${client.id}/edit`}
            className="flex items-center gap-3 px-4 py-2 text-sm text-nordic-on-bg/60 hover:text-white hover:bg-nordic-surface-highest/50 transition-colors"
          >
            <Edit size={16} />
            Editar Info
          </Link>
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        clientName={`${client.first_name} ${client.last_name}`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
