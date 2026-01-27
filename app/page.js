"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import translations from "./lib/translations";

/* ---------- PIPE NETWORK COMPONENT ---------- */
function PipeNetwork({ cloggedBranch }) {
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
      {/* TANK */}
      <rect x="170" y="10" width="60" height="30" rx="6" fill="#38bdf8" />
      <text x="200" y="30" fill="#000" textAnchor="middle" fontWeight="700">
        Tank
      </text>

      {/* MAIN PIPE */}
      <line x1="200" y1="40" x2="200" y2="100" stroke="#38bdf8" strokeWidth="10" />

      {/* SPLIT */}
      <line x1="200" y1="100" x2="100" y2="150" stroke="#38bdf8" strokeWidth="10" />
      <line x1="200" y1="100" x2="300" y2="150" stroke="#38bdf8" strokeWidth="10" />

      {/* BRANCH A */}
      <line
        x1="100"
        y1="150"
        x2="100"
        y2="220"
        stroke={cloggedBranch === "A" ? "#ef4444" : "#22c55e"}
        strokeWidth="10"
      />

      {/* BRANCH B */}
      <line
        x1="300"
        y1="150"
        x2="300"
        y2="220"
        stroke={cloggedBranch === "B" ? "#ef4444" : "#22c55e"}
        strokeWidth="10"
      />

      {/* LABELS */}
      <text x="100" y="245" fill="#fff" textAnchor="middle">
        Branch A
      </text>
      <text x="300" y="245" fill="#fff" textAnchor="middle">
        Branch B
      </text>

      {/* CLOG ICON */}
      {cloggedBranch === "A" && (
        <text x="100" y="185" fontSize="26" textAnchor="middle">
          ❌
        </text>
      )}
      {cloggedBranch === "B" && (
        <text x="300" y="185" fontSize="26" textAnchor="middle">
          ❌
        </text>
      )}
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
  const router = useRouter();

  /* 🌍 LANGUAGE */
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  const t = translations[lang];

 useEffect(() => {
  router.push("/welcome");
}, [router]);


  /* DEMO STATE */
  const isClogged = true;
  const cloggedBranch = "A"; // change to "B" or null for demo

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

      {/* LANGUAGE SELECTOR */}
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
          marginTop: "14px",
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
        <StatusCard title={t.currentAction} value="Monitoring" level={70} />
        <StatusCard title={t.pressureWash} value="OFF" level={20} />
        <StatusCard title={t.acidPump} value="OFF" level={10} />
        <StatusCard title={t.tankFlush} value="OFF" level={30} />
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
          <PipeNetwork cloggedBranch={cloggedBranch} />

          <p style={{ color: "#9ca3af", marginTop: "12px", fontSize: "14px" }}>
            Red section indicates detected clog in the irrigation pipeline.
          </p>
        </div>
      </section>

      {/* ML BUTTON */}
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
    </main>
  );
}
