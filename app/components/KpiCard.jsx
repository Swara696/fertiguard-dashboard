"use client";

export default function KpiCard({ title, value, hint, level, icon, loading }) {
  return (
    <div className="bg-[rgba(17,24,39,0.85)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-5 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(90deg,#10B981,#059669)' }}>
          <span className="text-base">{icon}</span>
        </div>

        <div className="flex-1">
          <div className="text-sm text-[rgba(156,163,175,1)]">{title}</div>
          <div className="mt-1 text-2xl font-extrabold">{loading ? <div className="w-20 h-6 rounded-md bg-[rgba(255,255,255,0.03)] animate-pulse" /> : value}</div>
        </div>

        {typeof level === 'number' && (
          <div className="ml-3 w-20">
            <div className="h-2 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
              <div className={`h-full rounded-full`} style={{ width: `${level}%`, background: level > 60 ? '#22c55e' : '#f59e0b' }} />
            </div>
          </div>
        )}
      </div>

      {hint && <div className="mt-3 text-xs text-[rgba(156,163,175,1)]">{hint}</div>}
    </div>
  );
}
