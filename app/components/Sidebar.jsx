"use client";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`h-screen py-6 px-3 ${collapsed ? 'w-16' : 'w-56'} transition-all duration-200 border-r`} style={{ borderColor: 'var(--border)' }}>
      <button onClick={() => setCollapsed(!collapsed)} className="mb-6 btn-outline">{collapsed ? '▶' : '◀'}</button>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-md hover:bg-white/2">
          <span className="text-lg">🏠</span>
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link href="/sensors" className="flex items-center gap-3 p-2 rounded-md hover:bg-white/2">
          <span className="text-lg">📡</span>
          {!collapsed && <span>Sensors</span>}
        </Link>
        <Link href="/irrigation" className="flex items-center gap-3 p-2 rounded-md hover:bg-white/2">
          <span className="text-lg">💧</span>
          {!collapsed && <span>Irrigation</span>}
        </Link>
        <Link href="/ai" className="flex items-center gap-3 p-2 rounded-md hover:bg-white/2">
          <span className="text-lg">🤖</span>
          {!collapsed && <span>AI</span>}
        </Link>
      </nav>
    </aside>
  );
}
