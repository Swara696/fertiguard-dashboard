"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- SMALL COMPONENTS ---------- */

const Card = ({ title, children }) => (
  <div className="bg-[rgba(17,24,39,0.9)] border border-white/5 rounded-2xl p-6 shadow-xl">
    <p className="text-sm text-slate-400">{title}</p>
    <div className="mt-2 text-lg font-semibold">{children}</div>
  </div>
);

const ActionButton = ({ label, color, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-5 py-3 rounded-xl font-bold ${color}`}
  >
    {label}
  </motion.button>
);

/* ---------- MAIN PAGE ---------- */

export default function MLPredictionPage() {
  const [prediction, setPrediction] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [actionText, setActionText] = useState("");

  /* ---- Fake ML Load ---- */
  useEffect(() => {
    setTimeout(() => {
      setPrediction({
        clog_risk: 82,
        clog_type: "Chemical Scaling",
        recommendation: "Acid Flush",
        duration: 5,
        explanation:
          "AI detected decreasing pH trend with pressure instability. Pattern matches historical chemical scaling events.",
      });
    }, 1200);
  }, []);

  /* ---- Execute AI Action ---- */
  const runAction = (text) => {
    setActionText(text);
    setExecuting(true);

    setTimeout(() => {
      setExecuting(false);
    }, 2200);
  };

  return (
    <main className="min-h-screen p-10 text-white"
      style={{ background: "radial-gradient(circle at top,#020617,#000)" }}
    >

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold">
            🤖 AI Clog Intelligence
          </h1>
          <p className="text-slate-400 mt-1">
            Machine learning prediction & preventive automation
          </p>
        </div>

        <div className="px-4 py-2 bg-red-500 rounded-full font-bold text-black">
          AI ACTIVE
        </div>
      </div>

      {/* LOADING */}
      {!prediction && (
        <p className="mt-10 font-bold animate-pulse">
          Running neural inference...
        </p>
      )}

      {/* CONTENT */}
      {prediction && (
        <>
          {/* RISK BAR */}
          <div className="mt-10 bg-slate-900 rounded-2xl p-6">
            <p className="font-bold mb-3">Clog Risk Probability</p>

            <div className="w-full h-4 bg-black rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${prediction.clog_risk}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
              />
            </div>

            <p className="mt-2 text-right text-red-400 font-bold">
              {prediction.clog_risk}%
            </p>
          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            {/* ML RESULT */}
            <div className="space-y-4">
              <Card title="Clog Type">
                🧪 {prediction.clog_type}
              </Card>

              <Card title="Recommended Action">
                ⚡ {prediction.recommendation}
              </Card>

              <Card title="Flush Duration">
                ⏱ {prediction.duration} sec
              </Card>
            </div>

            {/* AI AUTOMATION */}
            <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-lg">
                Preventive Automation
              </h3>

              <div className="p-4 bg-emerald-900/30 rounded-xl">
                🧪 Acid Flush — prevents next 5% clog probability
              </div>

              <div className="p-4 bg-blue-900/20 rounded-xl">
                💧 Water Stabilization — balances turbulence
              </div>

              <div className="p-4 bg-slate-800 rounded-xl">
                🛠 No maintenance required for 14 days
              </div>
            </div>
          </div>

          {/* AI REASONING */}
          <div className="mt-8 bg-slate-900 rounded-2xl p-6">
            <h3 className="font-bold mb-2">AI Reasoning</h3>
            <p className="text-slate-300">
              {prediction.explanation}
            </p>
          </div>

          {/* ACTION CONTROLS */}
          <div className="mt-10">
            <h3 className="font-bold mb-4">
              Preventive Controls
            </h3>

            <div className="flex flex-wrap gap-4">
              <ActionButton
                label="🧪 Acid Flush (2s)"
                color="bg-emerald-500 text-black"
                onClick={() => runAction("Acid Flush Initiated")}
              />

              <ActionButton
                label="💧 Water Flush (2s)"
                color="bg-blue-500 text-black"
                onClick={() => runAction("Water Flush Running")}
              />

              <ActionButton
                label="⏭ Ignore Recommendation"
                color="bg-slate-700"
                onClick={() => runAction("Recommendation Ignored")}
              />
            </div>
          </div>

          {/* BACK */}
          <Link href="/">
            <button className="mt-12 px-6 py-3 bg-white text-black rounded-xl font-bold">
              ← Back to Dashboard
            </button>
          </Link>
        </>
      )}

      {/* EXECUTION MODAL */}
      <AnimatePresence>
        {executing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-slate-900 p-8 rounded-2xl text-center"
            >
              <div className="animate-spin text-3xl mb-4">⚙️</div>
              <p className="font-bold">{actionText}</p>
              <p className="text-sm text-slate-400 mt-2">
                AI executing preventive automation...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}