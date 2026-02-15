"use client";

export default function KpiCard({ title, value, level, hint, icon }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 
      bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] 
      backdrop-blur-xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.6)]
      hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] transition">
      
      {/* Soft glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-400/10 blur-2xl opacity-40" />

      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl 
          bg-gradient-to-br from-emerald-400 to-cyan-400 text-black text-lg shadow">
          {icon}
        </div>

        <div className="flex-1">
          <div className="text-xs uppercase tracking-widest text-slate-400">
            {title}
          </div>
          <div className="mt-1 text-2xl font-extrabold">
            {value}
          </div>
          {hint && (
            <div className="mt-1 text-xs text-slate-400">
              {hint}
            </div>
          )}
        </div>
      </div>

      {/* Level bar */}
      {typeof level === "number" && (
        <div className="relative mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${level}%`,
              background:
                level > 60
                  ? "linear-gradient(90deg,#22c55e,#16a34a)"
                  : "linear-gradient(90deg,#f59e0b,#f97316)",
            }}
          />
        </div>
      )}
    </div>
  );
}
