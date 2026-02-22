"use client";

export default function Badge({ children, tone = 'default' }) {
  const colors = {
    healthy: 'bg-[linear-gradient(135deg,#10B981,#059669)] text-black',
    warning: 'bg-[linear-gradient(135deg,#f59e0b,#f97316)] text-black',
    critical: 'bg-[linear-gradient(135deg,#ef4444,#b91c1c)] text-black',
    default: 'bg-[rgba(255,255,255,0.04)] text-[rgba(230,238,241,1)]'
  };

  return (
    <span className={`px-3 py-1 rounded-full font-bold text-xs ${colors[tone] || colors.default}`}>{children}</span>
  );
}
