"use client";



import Link from "next/link";
import { useEffect, useState } from "react";
import translations from "../lib/translations";

import PipeNetwork from "@/app/components/PipeNetwork";
import Badge from "@/app/components/Badge";
import PrimaryButton from "@/app/components/PrimaryButton";
import ChartCard from "@/app/components/ChartCard";
import LineChart from "@/app/components/LineChart";

import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";

export default function Dashboard() {
  const [lang, setLang] = useState("en");
  const [acidPump, setAcidPump] = useState(false);
  const [tankFlush, setTankFlush] = useState(false);
  const [pressureWash, setPressureWash] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [clogSeverity, setClogSeverity] = useState("medium");
  const [latest, setLatest] = useState([]);

  // Translation mapping
  useEffect(() => {
    const l = localStorage.getItem("lang");
    if (l) setLang(l);
  }, []);

  const t = translations[lang] || {
    subtitle: "Monitoring System",
    pipeline: "Pipeline Network",
    viewML: "ML Predictions",
  };

  const isClogged = true;
  const cloggedBranch = "A";

  // Chart Data Generation
  const labels = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, "0")}:00`
  );

  const [soilData, setSoilData] = useState(() =>
    Array.from({ length: 24 }, () => Math.round(30 + Math.random() * 30))
  );

  const [pressureData, setPressureData] = useState(() =>
    Array.from({ length: 24 }, () =>
      Number((1 + Math.random() * 1.8).toFixed(1))
    )
  );

  // ✅ REALTIME DATABASE LISTENER (FIXED LOGIC)
useEffect(() => {

  const readingsRef = ref(db, "readings");

  onValue(readingsRef, (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    // convert firebase object → array
    const arr = Object.values(data);

    setLatest(arr);
  });

}, []);

  // Live Simulation Interval
  useEffect(() => {
    if (!liveMode) return;
    const interval = setInterval(() => {
      setSoilData((prev) => [
        ...prev.slice(-23),
        Math.round(30 + Math.random() * 30),
      ]);
      setPressureData((prev) => [
        ...prev.slice(-23),
        Number((1 + Math.random() * 1.8).toFixed(1)),
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [liveMode]);

  // ✅ MAP DATA TO NODES
  const node1 = latest?.find((r) => r.deviceId === "FG-01");
  const node2 = latest?.find((r) => r.deviceId === "FG-02");

  return (
    <main
      className="min-h-screen p-4 sm:p-10 text-slate-100 selection:bg-cyan-500/30"
      style={{ background: "radial-gradient(circle at top, #0f172a, #020617)" }}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HERO SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1 w-12 bg-cyan-500 rounded-full"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-cyan-500 uppercase">
                System Active
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
              Farm Overview
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <Badge tone={isClogged ? "critical" : "healthy"}>
                {isClogged ? "Action Required" : "Optimal"}
              </Badge>
              <p className="text-slate-400 text-sm font-medium">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <select
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
                localStorage.setItem("lang", e.target.value);
              }}
              className="bg-transparent px-4 py-2 rounded-xl text-sm font-semibold focus:outline-none cursor-pointer hover:bg-white/5 transition"
            >
              <option value="en" className="bg-slate-900">English</option>
              <option value="hi" className="bg-slate-900">हिंदी</option>
              <option value="mr" className="bg-slate-900">मराठी</option>
            </select>
            <PrimaryButton onClick={() => alert("Quick action")}>
              Quick Action
            </PrimaryButton>
          </div>
        </header>

        {/* NODE CARDS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sensory Node (Node 1) */}
          <div className="group relative overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-br from-cyan-500/20 via-transparent to-indigo-500/20 hover:from-cyan-500/40 transition-all duration-500 shadow-2xl">
            <div className="relative rounded-[2rem] bg-slate-950/80 backdrop-blur-2xl p-8 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20" />
                    <span className="relative flex w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Sensory Node <span className="text-slate-500 font-light mx-2">|</span> FG-01
                  </h3>
                </div>
                <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full border ${node1 ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" : "border-rose-500/20 text-rose-400 bg-rose-500/5"}`}>
                  {node1 ? "LIVE" : "DISCONNECTED"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Metric label="pH Level" value={node1?.ph ?? "--"} unit="" glow="cyan" />
                <Metric label="Turbidity" value={node1?.turbidity ?? "--"} unit="NTU" glow="emerald" />
                <Metric label="Flow Rate" value={node1?.flow ?? "--"} unit="L/min" glow="indigo" />
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Solenoid Matrix</div>
                  <div className="flex flex-wrap gap-2">
                    {["Inlet", "Main", "Acid"].map((s) => (
                      <span key={s} className="px-2 py-1 text-[10px] font-bold rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mitigation Node (Node 2) */}
          <div className="group relative overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-br from-emerald-500/20 via-transparent to-lime-500/20 hover:from-emerald-500/40 transition-all duration-500 shadow-2xl">
            <div className="relative rounded-[2rem] bg-slate-950/80 backdrop-blur-2xl p-8 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
                    <span className="relative flex w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Mitigation Node <span className="text-slate-500 font-light mx-2">|</span> FG-02
                  </h3>
                </div>
                <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full border ${node2 ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" : "border-rose-500/20 text-rose-400 bg-rose-500/5"}`}>
                  {node2 ? "LIVE" : "DISCONNECTED"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Metric label="Output Flow" value={node2?.flow ?? "--"} unit="L/min" glow="emerald" />
                <StatusMetric label="Main Pump" on={pressureWash} />
                <StatusMetric label="Flush Solenoid" on={tankFlush} />
                <StatusMetric label="Acid Injection" on={acidPump} />
              </div>
            </div>
          </div>
        </section>

        {/* ANALYTICS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Soil Moisture Trends">
            <LineChart labels={labels} data={soilData} accent="#10B981" unit="%" height={250} />
          </ChartCard>
          <ChartCard title="Hydraulic Pressure">
            <LineChart labels={labels} data={pressureData} accent="#38bdf8" unit="bar" height={250} />
          </ChartCard>
        </section>

        {/* INFRASTRUCTURE SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold tracking-tight">{t.pipeline}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-tighter">Clog Alert</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-slate-950/50 p-4">
              <PipeNetwork clogged={cloggedBranch} clogSeverity={clogSeverity} />
            </div>
            
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Controls</h3>
              <div className="space-y-3">
                <ControlButton icon="🧪" label="Acid Pump" onClick={() => setShowWarning(true)} active={acidPump} />
                <ControlButton icon="🚿" label="Tank Flush" onClick={() => setTankFlush(!tankFlush)} active={tankFlush} />
                <ControlButton icon="💨" label="Pressure" onClick={() => setPressureWash(!pressureWash)} active={pressureWash} />
              </div>
            </div>
            <Link href="/ml-predictions" className="mt-8 block">
              <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-bold text-sm hover:opacity-90 transition shadow-lg shadow-cyan-900/20">
                {t.viewML} &rarr;
              </button>
            </Link>
          </div>
        </section>

        {/* FOOTER CONTROLS */}
        <footer className="flex flex-wrap items-center justify-center gap-6 pb-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-xs font-bold text-slate-400">Live Simulation:</span>
            <button
              onClick={() => setLiveMode(!liveMode)}
              className={`text-xs font-black px-3 py-1 rounded-full transition-all ${liveMode ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}
            >
              {liveMode ? "ON" : "OFF"}
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-xs font-bold text-slate-400">Severity:</span>
            <select
              value={clogSeverity}
              onChange={(e) => setClogSeverity(e.target.value)}
              className="bg-transparent text-xs font-bold focus:outline-none"
            >
              <option value="low" className="bg-slate-900">Low</option>
              <option value="medium" className="bg-slate-900">Medium</option>
              <option value="high" className="bg-slate-900">High</option>
            </select>
          </div>
        </footer>

        {/* MODAL */}
        {showWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowWarning(false)} />
            <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-4">⚠</div>
              <h3 className="text-xl font-bold mb-2">Safety Protocol</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Acid handling requires protective gear. Ensure the dilution ratio is correct before injection.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowWarning(false)} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">Cancel</button>
                <button
                  onClick={() => { setAcidPump(!acidPump); setShowWarning(false); }}
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// STYLED SUB-COMPONENTS
function Metric({ label, value, unit, glow }) {
  const glowMap = {
    cyan: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] border-cyan-500/10",
    emerald: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)] border-emerald-500/10",
    indigo: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] border-indigo-500/10",
  };

  return (
    <div className={`rounded-2xl p-5 bg-white/[0.03] border transition-all duration-500 ${glowMap[glow] || "border-white/5"}`}>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black text-white">{value}</span>
        <span className="text-xs font-bold text-slate-500">{unit}</span>
      </div>
    </div>
  );
}

function StatusMetric({ label, on }) {
  return (
    <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/5 transition-all">
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{label}</div>
      <div className={`text-lg font-black tracking-tight ${on ? "text-emerald-400" : "text-slate-600"}`}>
        {on ? "ACTIVE" : "STANDBY"}
      </div>
    </div>
  );
}

function ControlButton({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
        active
          ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-bold">{label}</span>
      </div>
      <div className={`w-2 h-2 rounded-full ${active ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]" : "bg-slate-700"}`} />
    </button>
  );
}