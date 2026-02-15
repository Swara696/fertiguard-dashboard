"use client";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center transition-all duration-150";
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "bg-transparent text-sm"
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
