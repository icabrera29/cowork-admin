import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-medium active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "nordic-gradient text-nordic-bg shadow-lg shadow-nordic-primary/10 hover:shadow-nordic-primary/20",
    secondary: "bg-nordic-surface-highest text-nordic-on-bg hover:bg-nordic-surface-high border border-nordic-outline-variant/10",
    tertiary: "text-nordic-primary hover:bg-nordic-primary/5 px-0",
    glass: "glass text-white hover:bg-white/10 border border-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-md",
    md: "px-6 py-2.5 text-sm rounded-lg",
    lg: "px-8 py-3 text-base rounded-xl",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
      {children}
    </button>
  );
}
