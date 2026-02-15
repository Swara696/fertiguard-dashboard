"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full glass fixed top-0 left-0 right-0 z-40 p-3 backdrop-blur-md" style={{ borderBottom: '1px solid var(--glass-border)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="rounded-full w-9 h-9 flex items-center justify-center" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-600))'}}>
            🌱
          </div>
          <div>
            <div className="font-bold">FertiGuard</div>
            <div className="text-xs text-muted">AI + IoT • Smart Ag</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/alerts" className="text-sm text-muted">Alerts</Link>
          <Link href="/reports" className="text-sm text-muted">Reports</Link>
          <Link href="/settings" className="text-sm text-muted">Settings</Link>
        </nav>
      </div>
    </header>
  );
}
