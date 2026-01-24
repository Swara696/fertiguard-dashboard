"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MLPredictionPage() {
  const [prediction, setPrediction] = useState(null);

  // 🔹 AUTO-RUN ML ON PAGE LOAD (DEMO MODE)
  useEffect(() => {
    // Demo fallback ML response
    setTimeout(() => {
      setPrediction({
        clog_risk: "High",
        predicted_clog_type: "Chemical",
        recommended_action: "Acid Flush",
        recommended_duration_sec: 8,
        explanation:
          "pH is decreasing and flow rate is gradually dropping, indicating chemical scaling inside the pipeline."
      });
    }, 1200); // small delay to look realistic
  }, []);

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
      <h1 style={{ fontWeight: 900, fontSize: "32px" }}>
        ML Clog Prediction
      </h1>

      <p style={{ color: "#94a3b8", marginTop: "6px" }}>
        AI-based analysis using sensor trends
      </p>

      <p style={{ color: "#facc15", marginTop: "8px" }}>
        Demo mode: ML backend temporarily mocked
      </p>

      {/* LOADING STATE */}
      {!prediction && (
        <p style={{ marginTop: "24px", fontWeight: 700 }}>
          Running ML model…
        </p>
      )}

      {/* RESULTS */}
      {prediction && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "24px",
            marginTop: "36px"
          }}
        >
          <Card title="Clog Risk">
            <span style={{ color: "#ef4444", fontWeight: 900 }}>
              {prediction.clog_risk}
            </span>
          </Card>

          <Card title="Predicted Clog Type">
            {prediction.predicted_clog_type}
          </Card>

          <Card title="Recommended Action">
            {prediction.recommended_action}
          </Card>

          <Card title="Flush Duration">
            {prediction.recommended_duration_sec} seconds
          </Card>

          <Card title="Explanation">
            {prediction.explanation}
          </Card>
        </div>
      )}

      {/* BACK BUTTON */}
      <Link href="/">
        <button
          style={{
            marginTop: "48px",
            padding: "14px 28px",
            borderRadius: "14px",
            border: "none",
            background: "#22c55e",
            color: "#000",
            fontWeight: 900,
            cursor: "pointer"
          }}
        >
          ← Back to Dashboard
        </button>
      </Link>
    </main>
  );
}

/* ---------- CARD ---------- */
function Card({ title, children }) {
  return (
    <div
      style={{
        background: "rgba(17,24,39,0.9)",
        padding: "24px",
        borderRadius: "20px",
        boxShadow: "0 18px 36px rgba(0,0,0,0.6)"
      }}
    >
      <p style={{ color: "#9ca3af", fontSize: "14px" }}>
        {title}
      </p>
      <h2 style={{ marginTop: "8px" }}>
        {children}
      </h2>
    </div>
  );
}
