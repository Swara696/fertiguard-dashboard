"use client";

export default function ChartCard({ title, children, hint }) {
  return (
    <div className="card glass p-4 h-full flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-muted">{title}</div>
          {hint && <div className="text-xs text-muted">{hint}</div>}
        </div>
        <div className="text-sm text-muted">Last 24h</div>
      </div>

      <div className="mt-4 flex-1 flex items-center justify-center text-muted">{children}</div>
    </div>
  );
}
