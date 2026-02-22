"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Activity, ShieldAlert, Zap, Droplets, ArrowLeft, 
  BrainCircuit, Gauge, History, RefreshCcw, 
  Database, Cpu, Waves, Thermometer, Info,
  Layers, Terminal, Radio, Server, MessageSquare, X, Send, Bot, Sparkles
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
} from "recharts";

/* ---------------- UI SUB-COMPONENTS ---------------- */

const StatMini = ({ label, val, color = "text-emerald-500" }) => (
  <div className="flex flex-col border-l border-white/20 pl-3">
    <span className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">{label}</span>
    <span className={`text-xs font-mono font-bold ${color}`}>{val}</span>
  </div>
);

const Card = ({ children, title, icon: Icon, badge, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ borderColor: "rgba(16, 185, 129, 0.4)" }}
    className={`bg-[#050a18] border border-white/20 rounded-3xl p-5 lg:p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 ${className}`}
  >
    <motion.div 
      animate={{ y: ["-100%", "300%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent pointer-events-none"
    />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/30 group-hover:border-emerald-500 transition-colors">
            <Icon className="text-emerald-400 w-4 h-4" />
          </div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 group-hover:text-white transition-colors">{title}</h2>
        </div>
        {badge && (
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[8px] font-bold text-emerald-400 border border-emerald-500/30">{badge}</span>
        )}
      </div>
      {children}
    </div>
  </motion.div>
);

/* ---------------- DATA ---------------- */

const radarData = [
  { subject: "pH Stability", A: 85 },
  { subject: "Pressure", A: 65 },
  { subject: "Flow Rate", A: 90 },
  { subject: "Saturation", A: 70 },
  { subject: "Temp", A: 78 },
];

const riskHistory = [
  { t: "12:00", risk: 20 },
  { t: "12:05", risk: 28 },
  { t: "12:10", risk: 42 },
  { t: "12:15", risk: 35 },
  { t: "12:20", risk: 24 },
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function MLPredictionPage() {
  const [prediction, setPrediction] = useState(null);
  const [executing, setExecuting] = useState(null);
  const [risk, setRisk] = useState(24);
  const [countdown, setCountdown] = useState(8);
  const [logs, setLogs] = useState(["Neural cluster online", "Sensor sync: 100%"]);

  // --- CHATBOT STATE ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Core-AI Online. I am monitoring Valve Node 04. How can I assist with the current scaling detection?' }
  ]);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrediction({
        clog_type: "Chemical Scaling",
        confidence: 98.4,
        explanation: "Neural engine detected calcium precipitation patterns in Valve Node 04."
      });
      setLogs(prev => ["ML Analysis: scaling_detected", ...prev]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCountdown(p => (p <= 0 ? 8 : p - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const runAction = (type) => {
    setExecuting(type);
    setLogs(prev => [`Initiating ${type}...`, ...prev]);
    setTimeout(() => {
      setRisk(r => Math.max(10, r - 14));
      setExecuting(null);
      setLogs(prev => [`${type} Completed Successfully.`, ...prev]);
    }, 4000);
  };

  // --- FIXED CHAT LOGIC ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput.toLowerCase();
    setChatInput("");

    // Simulated AI Response Logic
    setTimeout(() => {
      let aiText = "I'm processing that request. My sensors indicate stable flow, but manual inspection is advised.";
      
      if (currentInput.includes("risk")) aiText = `The current risk level is ${risk}%. The probability of total blockage is low if action is taken now.`;
      if (currentInput.includes("acid") || currentInput.includes("flush")) aiText = "An Acid Flush will clear calcium deposits in Valve Node 04. Shall I prepare the sequence?";
      if (currentInput.includes("status")) aiText = "System is nominal. Neural inference is running at 99.2% accuracy.";
      
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    }, 8000); // 800ms delay for realism
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 lg:p-8 font-sans">
      
      {/* HEADER */}
      <nav className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/10 pb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] border border-white/20">
            <BrainCircuit className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Core-AI <span className="text-emerald-500">Predict</span></h1>
            <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500 font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-1"><Radio size={10} className="animate-pulse text-emerald-500" /> LIVE_STREAM</span>
              <span className="flex items-center gap-1"><Server size={10} /> CLUSTER_NORTH_02</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 pr-6 border-r border-white/10">
            <StatMini label="Inference" val={`${countdown}S`} />
            <StatMini label="Accuracy" val="99.2%" />
            <StatMini label="Latency" val="14ms" />
          </div>
          <Link href="/">
            <button className="p-3 bg-white/5 hover:bg-emerald-500 transition-all rounded-xl group border border-white/10 hover:border-emerald-400">
              <ArrowLeft className="w-5 h-5 group-hover:text-black transition-colors" />
            </button>
          </Link>
        </div>
      </nav>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card title="Risk Probability" icon={ShieldAlert} className="md:col-span-2">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-6xl font-black text-white">{risk}%</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">System Threat</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden mb-8 border border-white/10">
                <motion.div animate={{ width: `${risk}%` }} className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[{i: Thermometer, v: "42°C"}, {i: Waves, v: "1.2m/s"}, {i: Gauge, v: "104 PSI"}, {i: Layers, v: "0.4mm"}].map((s, i) => (
                  <div key={i} className="p-3 bg-white/[0.03] rounded-xl border border-white/10 text-center hover:bg-white/[0.08] transition-colors">
                     <s.i size={14} className="text-emerald-500 mb-1 mx-auto" />
                     <p className="text-[10px] font-mono text-white font-bold">{s.v}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Neural Inference" icon={Zap} badge="Match Found">
              {prediction ? (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-500/10 border-l-2 border-emerald-500 rounded-r-xl">
                    <p className="text-[9px] text-emerald-400 font-black uppercase mb-1">Diagnosis</p>
                    <p className="text-xs font-bold text-white uppercase tracking-tight">{prediction.clog_type}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 italic leading-relaxed">"{prediction.explanation}"</p>
                </div>
              ) : <div className="h-32 flex items-center justify-center animate-pulse text-[10px] font-mono text-emerald-500/50 italic">SCANNING FLUIDS...</div>}
            </Card>
          </div>

          <Card title="System Control Hub" icon={Cpu}>
            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => runAction("Acid Flush")} 
                disabled={executing}
                className="flex-1 h-14 bg-emerald-500 hover:brightness-110 rounded-2xl text-black font-black uppercase text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                <Droplets className="w-4 h-4" /> Initiate Acid Flush
              </button>
              <button 
                onClick={() => runAction("Manual Purge")} 
                disabled={executing}
                className="flex-1 h-14 bg-slate-900 border border-white/20 text-white font-bold rounded-2xl uppercase text-xs hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                Manual Purge Sequence
              </button>
            </div>
          </Card>

          {/* Node Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
             {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white/5 border border-white/20 p-3 rounded-2xl flex flex-col items-center group hover:border-emerald-500/50 transition-colors">
                   <div className={`w-2 h-2 rounded-full mb-2 ${i === 4 ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`} />
                   <span className="text-[8px] font-mono text-slate-500 group-hover:text-white transition-colors uppercase font-bold">Node_{i}</span>
                </div>
             ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-5">
          <Card title="Confidence Model" icon={Gauge}>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
                  <Radar dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* RESTORED: RISK HISTORY */}
          <Card title="Risk History" icon={History}>
            <div className="h-[160px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskHistory}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="risk" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
                  <Tooltip contentStyle={{ backgroundColor: '#050a18', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="System Terminal" icon={Terminal}>
            <div className="h-[140px] overflow-y-auto space-y-2 font-mono text-[9px] pr-2 custom-scrollbar">
              {logs.map((msg, i) => (
                <div key={i} className="flex gap-2 border-b border-white/5 pb-1.5 hover:bg-white/[0.02] transition-colors">
                  <span className="text-slate-600">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                  <span className={i === 0 ? "text-emerald-400 font-bold" : "text-slate-400"}>{msg}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* --- POP-UP MODAL --- */}
      <AnimatePresence>
        {executing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#050a18] p-10 rounded-[3rem] border border-emerald-500/40 text-center shadow-[0_0_60px_rgba(16,185,129,0.2)] max-w-sm w-full">
               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-16 h-16 mb-6 mx-auto border-4 border-t-emerald-500 border-emerald-500/10 rounded-full flex items-center justify-center">
                 <RefreshCcw className="text-emerald-500 w-8 h-8" />
               </motion.div>
               <h3 className="text-white font-black uppercase tracking-widest text-lg italic">{executing}</h3>
               <p className="text-emerald-500 font-mono text-[10px] animate-pulse mt-2 uppercase">Hardware Sync In Progress...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CHATBOT --- */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-[#0b1224] border border-white/20 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
            >
              <div className="p-5 bg-emerald-500 flex items-center justify-between text-black">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest italic"><Bot size={18} /> Core-AI Support</div>
                <button onClick={() => setIsChatOpen(false)}><X size={20}/></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed ${m.role === 'user' ? 'bg-emerald-500 text-black font-bold' : 'bg-white/5 text-slate-300 border border-white/10'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex gap-2 bg-black/60">
                <input 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                  placeholder="Ask a question..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500" 
                />
                <button type="submit" className="p-2 bg-emerald-500 rounded-xl text-black transition-transform active:scale-90"><Send size={16}/></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-white/20">
          {isChatOpen ? <X size={24} className="text-black" /> : <MessageSquare size={24} className="text-black" />}
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.3); border-radius: 10px; }
      `}</style>
    </main>
  );
}