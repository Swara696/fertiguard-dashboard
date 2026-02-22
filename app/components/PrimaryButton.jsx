"use client";

export default function PrimaryButton({ children, onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black px-4 py-2 rounded-full font-semibold shadow-md hover:scale-[1.02] transition-transform ${className}`}>{children}</button>
  );
}
