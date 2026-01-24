"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import translations from "./lib/translations";

/* ---------- FIELD ZONE COMPONENT ---------- */
function Zone({ name, status, color }) {
  return (
    <div
      style={{
        background: "#020617",
        padding: "18px",
        borderRadius: "16px",
        textAlign: "center",
        border: `2px solid ${color}`
      }}
    >
      <p style={{ fontWeight: 700 }}>{name}</p>
      <p style={{ color, marginTop: "6px" }}>{status}</p>
    </div>
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

  /* 🌍 LANGUAGE STATE */
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  const t = translations[lang];

  useEffect(() => {
    const farmerInfo = localStorage.getItem("farmerInfo");
    if (!farmerInfo) router.push("/welcome");
  }, [router]);

  const isClogged = true;

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
      <h1 style={{ fontWeight: 900, fontSize: "34px" }}>
        {t.title}
      </h1>

      <p style={{ color: "#94a3b8" }}>
        {t.subtitle}
      </p>

      {/* 🌍 LANGUAGE SELECTOR */}
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

      {/* PIPELINE CONDITION */}
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
          <p style={{ fontWeight: 700 }}>Main Pipeline</p>

          <div
            style={{
              marginTop: "12px",
              height: "14px",
              background: "#1f2937",
              borderRadius: "999px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                height: "100%",
                width: isClogged ? "35%" : "95%",
                background: isClogged
                  ? "repeating-linear-gradient(45deg,#ef4444,#ef4444 10px,#7f1d1d 10px,#7f1d1d 20px)"
                  : "linear-gradient(90deg,#38bdf8,#22c55e)",
                transition: "width 1s"
              }}
            />
          </div>
        </div>
      </section>

      {/* FIELD VISUALIZATION */}
      <section style={{ marginTop: "48px" }}>
        <p style={{ color: "#9ca3af", marginBottom: "14px" }}>
          {t.fieldZones}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "14px"
          }}
        >
          <Zone name="Zone A" status="Healthy" color="#22c55e" />
          <Zone name="Zone B" status="Stress" color="#facc15" />
          <Zone name="Zone C" status="Dry" color="#ef4444" />
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
