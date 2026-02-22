"use client";

export default function ChartCard({ title, hint, children }) {
  return (
    <div className="bg-[rgba(17,24,39,0.85)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-[rgba(156,163,175,1)]">{title}</div>
          {hint && <div className="text-xs text-[rgba(156,163,175,1)]">{hint}</div>}
        </div>
        <div className="text-xs text-[rgba(156,163,175,1)]">Last 24h</div>
      </div>

      <div className="mt-3 flex-1">{children}</div>
    </div>
  );
}
