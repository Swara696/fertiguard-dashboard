"use client";

export default function ChartCard({ title, hint, children }) {
  return (
    <div className="group relative overflow-hidden bg-[#0B0F1A]/80 border border-white/5 rounded-2xl p-5 h-full flex flex-col transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
      {/* Background Radial Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-colors duration-700" />
      
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1 leading-none">
            {title}
          </div>
          {hint && (
            <div className="text-xl font-semibold text-white tracking-tight leading-tight">
              {hint}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Live</span>
        </div>
      </div>

      <div className="mt-6 flex-1 relative z-10 w-full min-h-[180px]">
        {children}
      </div>
    </div>
  );
}