import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "lowest" | "low" | "container" | "high" | "highest";
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  variant = "container",
  className = "",
  hoverable = false,
}: CardProps) {
  const variants = {
    lowest: "bg-nordic-surface-lowest",
    low: "bg-nordic-surface-low",
    container: "bg-nordic-surface-container",
    high: "bg-nordic-surface-high",
    highest: "bg-nordic-surface-highest",
  };

  const hoverStyles = hoverable 
    ? "hover:shadow-nordic-ambient hover:scale-[1.01] transition-all duration-300 cursor-pointer" 
    : "";

  return (
    <div className={`p-6 rounded-2xl ${variants[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
