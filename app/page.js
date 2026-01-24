"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

      {/* STATUS BAR */}
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
            background:
              level > 60 ? "#22c55e" : "#facc15",
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
        FertiGuard – Smart Pipeline Dashboard
      </h1>

      <p style={{ color: "#94a3b8" }}>
        System telemetry, pipe health & field visualization
      </p>

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
        {isClogged ? "🔴 CLOG DETECTED" : "🟢 SYSTEM NORMAL"}
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
        <StatusCard title="Current Action" value="Monitoring" level={70} />
        <StatusCard title="Pressure Wash" value="OFF" level={20} />
        <StatusCard title="Acid Pump" value="OFF" level={10} />
        <StatusCard title="Tank Flush" value="OFF" level={30} />
      </div>

      {/* PIPELINE CONDITION */}
      <section style={{ marginTop: "48px" }}>
        <h3>Pipeline Condition</h3>

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

          {isClogged && (
            <p
              style={{
                color: "#ef4444",
                marginTop: "12px",
                fontWeight: 700
              }}
            >
              ⚠ Partial blockage detected in pipeline
            </p>
          )}
        </div>
      </section>

      {/* TELEMETRY + HEALTH INDEX */}
      <section style={{ marginTop: "48px" }}>
        <h3>System Telemetry & Health</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "24px",
            marginTop: "16px"
          }}
        >
          {/* FLOW TELEMETRY */}
          <div
            style={{
              background: "rgba(17,24,39,0.9)",
              padding: "24px",
              borderRadius: "20px"
            }}
          >
            <p style={{ color: "#9ca3af" }}>
              Flow Rate Telemetry (L/min)
            </p>

            <div
              style={{
                marginTop: "14px",
                height: "12px",
                background: "#1f2937",
                borderRadius: "999px",
                position: "relative"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "30%",
                  width: "40%",
                  height: "100%",
                  background: "#22c55e",
                  borderRadius: "999px"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "55%",
                  top: "-6px",
                  width: "4px",
                  height: "24px",
                  background: "#facc15"
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                color: "#9ca3af",
                marginTop: "8px"
              }}
            >
              <span>Low (20)</span>
              <span>Optimal (40–70)</span>
              <span>High (90)</span>
            </div>

            <p style={{ marginTop: "12px", fontWeight: 700 }}>
              Current Flow:{" "}
              <span style={{ color: "#facc15" }}>
                58 L/min
              </span>
            </p>
          </div>

          {/* PIPE HEALTH INDEX */}
          <div
            style={{
              background: "rgba(17,24,39,0.9)",
              padding: "24px",
              borderRadius: "20px",
              textAlign: "center"
            }}
          >
            <p style={{ color: "#9ca3af" }}>
              Pipe Health Index (PHI)
            </p>

            <div
              style={{
                width: "160px",
                height: "160px",
                margin: "16px auto",
                borderRadius: "50%",
                background:
                  "conic-gradient(#22c55e 0% 72%, #1f2937 72% 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  background: "#020617",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  fontWeight: 900
                }}
              >
                72
              </div>
            </div>

            <p style={{ color: "#22c55e", fontWeight: 700 }}>
              Healthy
            </p>
          </div>
        </div>

        {/* FIELD VISUALIZATION */}
        <div
          style={{
            marginTop: "32px",
            background: "rgba(17,24,39,0.9)",
            padding: "24px",
            borderRadius: "20px"
          }}
        >
          <p style={{ color: "#9ca3af", marginBottom: "14px" }}>
            Field Irrigation Zones
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
          View ML Predictions →
        </button>
      </Link>
    </main>
  );
}
