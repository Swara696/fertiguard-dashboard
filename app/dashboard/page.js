"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import translations from "../lib/translations";

/* ---------- PIPE NETWORK ---------- */
function PipeNetwork({ clogged }) {
  return (
    <svg
      viewBox="0 0 400 260"
      width="100%"
      height="260"
      style={{
        background: "#020617",
        borderRadius: "16px",
        padding: "16px"
      }}
    >
      {/* Tank */}
      <rect x="170" y="10" width="60" height="30" rx="6" fill="#38bdf8" />
      <text x="200" y="30" fill="#000" textAnchor="middle" fontWeight="700">
        Tank
      </text>

      {/* Main Pipe */}
      <line x1="200" y1="40" x2="200" y2="100" stroke="#38bdf8" strokeWidth="10" />

      {/* Split */}
      <line x1="200" y1="100" x2="100" y2="150" stroke="#38bdf8" strokeWidth="10" />
      <line x1="200" y1="100" x2="300" y2="150" stroke="#38bdf8" strokeWidth="10" />

      {/* Branch A */}
      <line
        x1="100"
        y1="150"
        x2="100"
        y2="220"
        stroke={clogged === "A" ? "#ef4444" : "#22c55e"}
        strokeWidth="10"
      />

      {/* Branch B */}
      <line
        x1="300"
        y1="150"
        x2="300"
        y2="220"
        stroke={clogged === "B" ? "#ef4444" : "#22c55e"}
        strokeWidth="10"
      />

      <text x="100" y="245" fill="#fff" textAnchor="middle">
        Branch A
      </text>
      <text x="300" y="245" fill="#fff" textAnchor="middle">
        Branch B
      </text>

      {clogged === "A" && <text x="100" y="185" fontSize="26">❌</text>}
      {clogged === "B" && <text x="300" y="185" fontSize="26">❌</text>}
    </svg>
  );
}

/* ---------- STATUS CARD ---------- */
function StatusCard({ title, value, level }) {
  return (
    <div
      style={{
        background: "rgba(17,24,39,0.9)",
        padding: "24px",
        borderRadius: "20px"
      }}
    >
      <p style={{ color: "#9ca3af" }}>{title}</p>
      <h2>{value}</h2>

      <div
        style={{
          marginTop: "14px",
          height: "8px",
          background: "#1f2937",
          borderRadius: "999px"
        }}
      >
        <div
          style={{
            width: `${level}%`,
            height: "100%",
            background: level > 60 ? "#22c55e" : "#facc15",
            borderRadius: "999px"
          }}
        />
      </div>
    </div>
  );
}

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

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "radial-gradient(circle at top,#020617,#000)",
        color: "#ffffff",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      {/* HEADER */}
      <h1 style={{ fontWeight: 900, fontSize: "34px" }}>{t.title}</h1>
      <p style={{ color: "#94a3b8" }}>{t.subtitle}</p>

      {/* LANGUAGE */}
      <select
        value={lang}
        onChange={(e) => {
          setLang(e.target.value);
          localStorage.setItem("lang", e.target.value);
        }}
        style={{
          marginTop: "12px",
          padding: "6px 12px",
          borderRadius: "8px",
          background: "#020617",
          color: "#fff",
          border: "1px solid #334155"
        }}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
      </select>

      {/* STATUS BADGE */}
      <div
        style={{
          marginTop: "16px",
          padding: "10px 22px",
          borderRadius: "999px",
          fontWeight: 900,
          display: "inline-block",
          background: isClogged
            ? "linear-gradient(135deg,#ef4444,#b91c1c)"
            : "linear-gradient(135deg,#22c55e,#16a34a)",
          color: "#000"
        }}
      >
        {isClogged ? `🔴 ${t.clogDetected}` : `🟢 ${t.systemNormal}`}
      </div>

      {/* STATUS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "24px",
          marginTop: "32px"
        }}
      >
        <StatusCard title={t.currentAction} value="Chemical Clog Handling" level={80} />
        <StatusCard title={t.pressureWash} value={pressureWash ? "ON" : "OFF"} level={pressureWash ? 90 : 20} />
        <StatusCard title={t.acidPump} value={acidPump ? "ON" : "OFF"} level={acidPump ? 80 : 10} />
        <StatusCard title={t.tankFlush} value={tankFlush ? "ON" : "OFF"} level={tankFlush ? 70 : 30} />
      </div>

      {/* PIPE NETWORK */}
      <section style={{ marginTop: "48px" }}>
        <h3>{t.pipeline}</h3>
        <div
          style={{
            marginTop: "16px",
            background: "rgba(17,24,39,0.9)",
            padding: "24px",
            borderRadius: "20px"
          }}
        >
          <PipeNetwork clogged={cloggedBranch} />
          <p style={{ color: "#9ca3af", marginTop: "12px", fontSize: "14px" }}>
            Red pipe section indicates detected chemical clog.
          </p>
        </div>
      </section>

      {/* CHEMICAL CONTROLS */}
      <section style={{ marginTop: "48px" }}>
        <h3>🧪 Chemical Clog Actions</h3>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
          <button onClick={() => setShowWarning(true)}>🧪 Acid Pump</button>
          <button onClick={() => setTankFlush(!tankFlush)}>🚿 Tank Flush</button>
          <button onClick={() => setPressureWash(!pressureWash)}>💨 Pressure Wash</button>
        </div>
      </section>

      {/* ML BUTTON (KEPT) */}
      <Link href="/ml-predictions">
        <button
          style={{
            marginTop: "48px",
            padding: "16px 32px",
            borderRadius: "18px",
            border: "none",
            background: "#22c55e",
            color: "#000",
            fontWeight: 900,
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          {t.viewML} →
        </button>
      </Link>

      {/* ACID WARNING MODAL */}
      {showWarning && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "#020617",
              padding: "24px",
              borderRadius: "16px",
              width: "320px",
              textAlign: "center"
            }}
          >
            <h3>⚠ Acid Handling Warning</h3>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>
              Ensure proper dilution, safety gloves, and pressure limits before
              activating acid pump.
            </p>

            <button
              onClick={() => {
                setAcidPump(!acidPump);
                setShowWarning(false);
              }}
            >
              ✅ Proceed
            </button>
            <button onClick={() => setShowWarning(false)}>❌ Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}
