"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ChartCard from "../../src/components/visuals/ChartCard";
import Badge from "../../src/components/visuals/Badge";
import PrimaryButton from "../../src/components/visuals/PrimaryButton";

export default function MLPredictionPage() {

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confidence, setConfidence] = useState(0);

  /* ---------------- ML SIMULATION ---------------- */
  useEffect(() => {

    setTimeout(() => {
      setPrediction({
        clog_risk: "HIGH",
        probability: 82,
        predicted_clog_type: "Chemical Scaling",
        recommended_action: "Acid Flush",
        recommended_duration_sec: 5,
        maintenance_prediction: "No maintenance required for next 14 days",
        explanation:
          "ML model detected decreasing pH trend and pressure instability. Pattern matches historical chemical scaling events.",
      });

      setLoading(false);
    }, 1500);

  }, []);

  /* confidence animation */
  useEffect(() => {
    if (!prediction) return;

    let i = 0;
    const timer = setInterval(() => {
      i += 2;
      setConfidence(i);
      if (i >= prediction.probability) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [prediction]);

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen p-6 sm:p-10"
      style={{ background: "radial-gradient(circle at top,#020617,#000)" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold">
              AI Clog Intelligence
            </h1>

            <p className="text-sm text-slate-400 mt-1">
              Machine learning prediction & preventive automation
            </p>
          </div>

          <Badge tone={prediction?.clog_risk === "HIGH" ? "critical" : "healthy"}>
            AI ACTIVE
          </Badge>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-lg font-semibold text-slate-400">
            Running ML model analysis...
          </div>
        )}

        {/* RESULTS */}
        {prediction && (

          <>
            {/* RISK VISUAL */}
            <div className="bg-[rgba(17,24,39,0.85)] rounded-2xl p-6 border border-white/5">

              <div className="flex justify-between mb-4">
                <h2 className="font-bold text-lg">Clog Risk Probability</h2>
                <span className="text-red-400 font-bold">
                  {confidence}%
                </span>
              </div>

              <div className="h-3 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-red-500 transition-all duration-300"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* ML OUTPUT */}
              <ChartCard title="ML Prediction Result" hint="Neural inference output">

                <div className="space-y-4">

                  <InfoRow label="Clog Type" value={prediction.predicted_clog_type}/>
                  <InfoRow label="Recommended Action" value={prediction.recommended_action}/>
                  <InfoRow label="Flush Duration" value={`${prediction.recommended_duration_sec} sec`} />

                </div>

              </ChartCard>

              {/* PREVENTION PANEL */}
              <ChartCard title="Preventive Automation" hint="AI mitigation plan">

                <div className="space-y-4">

                  <ActionCard
                    title="Acid Flush"
                    desc="Prevents next 5% clog probability"
                    active
                  />

                  <ActionCard
                    title="Pressure Stabilization"
                    desc="Balances pipeline turbulence"
                  />

                  <ActionCard
                    title="Auto Maintenance Delay"
                    desc={prediction.maintenance_prediction}
                  />

                </div>

              </ChartCard>
            </div>

            {/* AI EXPLANATION */}
            <div className="bg-[rgba(17,24,39,0.85)] rounded-2xl p-6 border border-white/5">

              <h3 className="font-semibold text-lg mb-3">
                AI Reasoning
              </h3>

              <p className="text-slate-300 leading-relaxed">
                {prediction.explanation}
              </p>
            </div>

          </>
        )}

        {/* BACK BUTTON */}
        <Link href="/dashboard">
          <PrimaryButton>
            ← Back to Dashboard
          </PrimaryButton>
        </Link>

      </div>
    </main>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function ActionCard({ title, desc, active }) {
  return (
    <div className={`p-4 rounded-xl border transition
      ${active
        ? "border-emerald-500/30 bg-emerald-500/10"
        : "border-white/5 bg-white/5"}
    `}>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-slate-400 mt-1">{desc}</p>
    </div>
  );
}