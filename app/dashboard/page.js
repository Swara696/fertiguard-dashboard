"use client";

export const runtime = 'edge';

import Link from "next/link";
import { useEffect, useState } from "react";
import translations from "../lib/translations";

import PipeNetwork from "../../src/components/visuals/PipeNetwork";

import KpiCard from "../../src/components/visuals/KpiCard";
import Badge from "../../src/components/visuals/Badge";
import PrimaryButton from "../../src/components/visuals/PrimaryButton";
import Skeleton from "../../src/components/visuals/Skeleton";
import ChartCard from "../../src/components/visuals/ChartCard";
import LineChart from "../../src/components/visuals/LineChart";


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

  // Live update simulation
  useEffect(() => {
    if (!liveMode) return;
    const t = setInterval(() => {
      setSoilData(prev => [...prev.slice(-23), Math.round(30 + Math.random() * 30)]);
      setPressureData(prev => [...prev.slice(-23), Number((1 + Math.random() * 1.8).toFixed(1))]);
    }, 2000);
    return () => clearInterval(t);
  }, [liveMode]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <KpiCard title="Flow Rate" value="18.4 L/min" level={72} hint="Node A" icon="💧" />
          <KpiCard title="Line Pressure" value="2.1 bar" level={61} hint="Node B" icon="⚙️" />
          <KpiCard title="Turbidity" value="6.2 NTU" level={45} hint="Safe range" icon="🧪" />
          <KpiCard title="Crop Health" value="Optimal" level={82} hint="AI preview" icon="🌾" />
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
                <div className="p-4 bg-[rgba(255,255,255,0.02)] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 hover:scale-105">
                  <div className="flex items-center gap-2">
                    <span>🧪</span>
                    <span className="font-semibold text-white">Acid Flush</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${acidPump ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{acidPump ? 'ON' : 'OFF'}</span>
                  </div>
                  <p className="text-sm text-[rgba(156,163,175,1)] mt-1">Removes chemical clogging in pipes</p>
                </div>

                <div className="p-4 bg-[rgba(255,255,255,0.02)] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 hover:scale-105">
                  <div className="flex items-center gap-2">
                    <span>💨</span>
                    <span className="font-semibold text-white">Pressure Wash</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${pressureWash ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{pressureWash ? 'ON' : 'OFF'}</span>
                  </div>
                  <p className="text-sm text-[rgba(156,163,175,1)] mt-1">Clears physical blockages using high-pressure water</p>
                </div>

                <div className="p-4 bg-[rgba(255,255,255,0.02)] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 hover:scale-105">
                  <div className="flex items-center gap-2">
                    <span>🚿</span>
                    <span className="font-semibold text-white">Tank Flush</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${tankFlush ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{tankFlush ? 'ON' : 'OFF'}</span>
                  </div>
                  <p className="text-sm text-[rgba(156,163,175,1)] mt-1">Cleans nutrient tank to prevent contamination</p>
                </div>

                <div>
                  <div className="text-[rgba(156,163,175,1)]">{t.currentAction}</div>
                  <div className="text-lg font-semibold mt-1 text-white">Chemical Clog Handling</div>
                  <div className="mt-3 h-2 bg-[rgba(255,255,255,0.03)] rounded-full overflow-hidden">
                    <div style={{ width: '80%', background: '#22c55e' }} className="h-full rounded-full" />
                  </div>
                </div>
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
