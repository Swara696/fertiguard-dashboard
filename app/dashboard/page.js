"use client";

export const runtime = 'edge';

import Link from "next/link";
import { useEffect, useState } from "react";
import translations from "../lib/translations";

import PipeNetwork from "@/app/components/PipeNetwork";
import KpiCard from "@/app/components/KpiCard";
import Badge from "@/app/components/Badge";
import PrimaryButton from "@/app/components/PrimaryButton";
import Skeleton from "@/app/components/Skeleton";
import ChartCard from "@/app/components/ChartCard";
import LineChart from "@/app/components/LineChart";

import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

/* ---------- DASHBOARD ---------- */
export default function Dashboard() {
  const [lang, setLang] = useState("en");

  const [acidPump, setAcidPump] = useState(false);
  const [tankFlush, setTankFlush] = useState(false);
  const [pressureWash, setPressureWash] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const l = localStorage.getItem("lang");
    if (l) setLang(l);
  }, []);

  const t = translations[lang];

  // Demo clog state
  const isClogged = true;
  const cloggedBranch = "A";
  const [loading, setLoading] = useState(false);

  // Live charts state
  const [liveMode, setLiveMode] = useState(false);
  const labels = Array.from({ length: 24 }, (_, i) => `${(i % 24).toString().padStart(2, '0')}:00`);
  const [soilData, setSoilData] = useState(() => Array.from({ length: 24 }, () => Math.round(30 + Math.random() * 30)));
  const [pressureData, setPressureData] = useState(() => Array.from({ length: 24 }, () => Number((1 + Math.random() * 1.8).toFixed(1))));
  const [clogSeverity, setClogSeverity] = useState('medium');

  // 🔴 Live Firebase sensor data
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "readings"), orderBy("timestamp", "desc"), limit(5));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLatest(docs);
    });
    return () => unsub();
  }, []);

  // Live update simulation (charts)
  useEffect(() => {
    if (!liveMode) return;
    const t = setInterval(() => {
      setSoilData(prev => [...prev.slice(-23), Math.round(30 + Math.random() * 30)]);
      setPressureData(prev => [...prev.slice(-23), Number((1 + Math.random() * 1.8).toFixed(1))]);
    }, 2000);
    return () => clearInterval(t);
  }, [liveMode]);

  const node1 = latest?.find(r => r.deviceId === "node1");
  const node2 = latest?.find(r => r.deviceId === "node2");

  return (
    <main className="min-h-screen p-6 sm:p-10" style={{ background: 'radial-gradient(circle at top,#020617,#030417)' }}>
      <div className="max-w-6xl mx-auto">
        {/* HERO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Farm Overview</h1>
            <p className="text-sm text-[rgba(156,163,175,1)] mt-1">Real-time insights for your fields</p>

            <div className="mt-3 flex items-center gap-3">
              <Badge tone={isClogged ? 'critical' : 'healthy'}>{isClogged ? 'Degraded' : 'Healthy'}</Badge>
              <span className="text-xs text-[rgba(156,163,175,1)]">{t.subtitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
                localStorage.setItem("lang", e.target.value);
              }}
              className="bg-transparent border border-[rgba(255,255,255,0.04)] px-3 py-2 rounded-md text-sm text-[rgba(230,238,241,1)]"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>

            <PrimaryButton onClick={() => alert('Quick action')}>Quick Action</PrimaryButton>
          </div>
        </div>

        {/* KPI GRID */}
        {/* NODE CARDS */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  {/* Sensory Node (Node 1) */}
  <div className="bg-[rgba(17,24,39,0.85)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold">🟦 Sensory Node (Node 1)</h3>
      <span className={`text-xs px-2 py-1 rounded-full ${node1 ? "bg-emerald-600/20 text-emerald-400" : "bg-rose-600/20 text-rose-400"}`}>
        {node1 ? "Online" : "Offline"}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <div className="text-xs text-[rgba(156,163,175,1)]">pH Level</div>
        <div className="text-2xl font-bold">{node1?.ph ?? "—"}</div>
      </div>

      <div>
        <div className="text-xs text-[rgba(156,163,175,1)]">Turbidity</div>
        <div className="text-2xl font-bold">{node1 ? `${node1.turbidity ?? "—"} NTU` : "—"}</div>
      </div>

      <div>
        <div className="text-xs text-[rgba(156,163,175,1)]">Flow Rate</div>
        <div className="text-2xl font-bold">{node1 ? `${node1.flow ?? "—"} L/min` : "—"}</div>
      </div>

      <div>
        <div className="text-xs text-[rgba(156,163,175,1)]">Solenoids</div>
        <div className="text-sm mt-1 text-emerald-400">Inlet • Main • Acid</div>
      </div>
    </div>
  </div>

  {/* Mitigation Node (Node 2) */}
  <div className="bg-[rgba(17,24,39,0.85)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold">🟩 Mitigation Node (Node 2)</h3>
      <span className={`text-xs px-2 py-1 rounded-full ${node2 ? "bg-emerald-600/20 text-emerald-400" : "bg-rose-600/20 text-rose-400"}`}>
        {node2 ? "Online" : "Offline"}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <div className="text-xs text-[rgba(156,163,175,1)]">Flow Rate</div>
        <div className="text-2xl font-bold">{node2 ? `${node2.flow ?? "—"} L/min` : "—"}</div>
      </div>

      <div>
        <div className="text-xs text-[rgba(156,163,175,1)]">Pump Status</div>
        <div className={`text-lg font-semibold ${pressureWash ? "text-emerald-400" : "text-rose-400"}`}>
          {pressureWash ? "ON" : "OFF"}
        </div>
      </div>

      <div>
        <div className="text-xs text-[rgba(156,163,175,1)]">Flush Solenoid</div>
        <div className={`text-lg font-semibold ${tankFlush ? "text-emerald-400" : "text-rose-400"}`}>
          {tankFlush ? "OPEN" : "CLOSED"}
        </div>
      </div>

      <div>
        <div className="text-xs text-[rgba(156,163,175,1)]">Acid Pump</div>
        <div className={`text-lg font-semibold ${acidPump ? "text-emerald-400" : "text-rose-400"}`}>
          {acidPump ? "ON" : "OFF"}
        </div>
      </div>
    </div>
  </div>

</div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <ChartCard title="Soil Moisture (avg)" hint="Live sensor avg">
            <LineChart labels={labels} data={soilData} accent="#10B981" unit="%" height={200} />
          </ChartCard>

          <ChartCard title="Pump Pressure" hint="Realtime">
            <LineChart labels={labels} data={pressureData} accent="#38bdf8" unit="bar" height={200} />
          </ChartCard>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-[rgba(17,24,39,0.85)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-5">
            <div className="text-sm text-[rgba(156,163,175,1)]">Actions & Status</div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ... your existing action cards unchanged ... */}
            </div>
          </div>

          {/* PIPE NETWORK */}
          <div className="bg-[rgba(17,24,39,0.85)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-5">
            <h3 className="text-lg font-semibold">{t.pipeline}</h3>
            <div className="mt-4 rounded-xl overflow-hidden">
              <PipeNetwork clogged={cloggedBranch} clogSeverity={clogSeverity} />
            </div>
            <p className="text-xs text-[rgba(156,163,175,1)] mt-3">Red pipe section indicates detected chemical clog.</p>
          </div>
        </div>

        {/* Controls & CTA */}
        <div className="flex items-center gap-3 mt-8">
          <button onClick={() => setShowWarning(true)} className="px-4 py-2 bg-[rgba(255,255,255,0.02)] rounded-full border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.03)] transition">🧪 Acid Pump</button>
          <button onClick={() => setTankFlush(!tankFlush)} className="px-4 py-2 rounded-full border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.03)] transition">🚿 Tank Flush</button>
          <button onClick={() => setPressureWash(!pressureWash)} className="px-4 py-2 rounded-full border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.03)] transition">💨 Pressure Wash</button>

          <Link href="/ml-predictions" className="ml-auto">
            <PrimaryButton>{t.viewML} →</PrimaryButton>
          </Link>

          <button onClick={() => setLoading(!loading)} className="ml-4 text-sm text-[rgba(156,163,175,1)]">{loading ? 'Stop Loading' : 'Simulate Loading'}</button>

          <button onClick={() => setLiveMode(!liveMode)} className={`ml-4 px-3 py-1 rounded-md text-sm ${liveMode ? 'bg-emerald-600 text-black' : 'bg-[rgba(255,255,255,0.02)] text-[rgba(156,163,175,1)]'} transition`}>{liveMode ? 'Live: ON' : 'Live: OFF'}</button>

          <select value={clogSeverity} onChange={(e) => setClogSeverity(e.target.value)} className="ml-4 bg-transparent border border-[rgba(255,255,255,0.04)] px-2 py-1 rounded text-sm">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* MODAL */}
        {showWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowWarning(false)} />
            <div className="relative bg-[#0b1220] rounded-xl p-6 z-10 w-full max-w-md border border-[rgba(255,255,255,0.04)]">
              <h3 className="text-lg font-bold">⚠ Acid Handling Warning</h3>
              <p className="text-sm text-[rgba(156,163,175,1)] mt-2">Ensure proper dilution, safety gloves, and pressure limits before activating acid pump.</p>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setShowWarning(false)} className="px-3 py-2 rounded-md border border-[rgba(255,255,255,0.04)]">Cancel</button>
                <PrimaryButton onClick={() => { setAcidPump(!acidPump); setShowWarning(false); }}>Proceed</PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}