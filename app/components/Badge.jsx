"use client";

export default function Badge({ children, tone = 'default' }) {
  const bg = tone === 'success' ? 'var(--success)' : tone === 'danger' ? 'var(--danger)' : 'var(--muted)';
  return (
    <span className="badge" style={{ background: bg, color: '#000' }}>
      {children}
    </span>
  );
}
