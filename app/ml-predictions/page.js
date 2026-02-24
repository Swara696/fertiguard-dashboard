"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Activity, ShieldAlert, Zap, Droplets, ArrowLeft, 
  BrainCircuit, Gauge, History, RefreshCcw, 
  Database, Cpu, Waves, Thermometer, Info,
  Layers, Terminal, Radio, Server, MessageSquare, X, Send, Bot, Sparkles,
  FlaskConical, Droplet, Wind
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
    className={`bg-[#050a18]/80 backdrop-blur-md border border-white/10 rounded-3xl p-5 lg:p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 ${className}`}
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
  { subject: "pH Balance", A: 85 },
  { subject: "Flow Speed", A: 90 },
  { subject: "Clarity", A: 75 },
  { subject: "Viscosity", A: 65 },
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
  const [risk, setRisk] = useState(38);
  const [countdown, setCountdown] = useState(8);
  const [logs, setLogs] = useState(["Neural cluster online", "Sensor sync: 100%", "Monitoring Water Flow..."]);

  // --- CHATBOT STATE ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hydraulic AI online. Monitoring Clog Farming parameters. How can I assist?' }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrediction({
        clog_type: "Particulate Buildup",
        confidence: 94.8,
        explanation: "Elevated turbidity and decreased flow in Node 04 suggest sediment accumulation."
      });
      setLogs(prev => ["ML Analysis: sedimentation_warning", ...prev]);
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

  // --- CHAT LOGIC ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    setMessages(prev => [...prev, userMessage]);
    const prompt = chatInput.toLowerCase();
    setChatInput("");

    setTimeout(() => {
      let aiText = "I'm analyzing that query against our flow database. Generally, maintaining pH below 7.5 helps prevent clog hardening.";
      
      if (prompt.includes("clog") || prompt.includes("farming")) {
        aiText = "In clog farming, we optimize particulate capture. Currently, Node 04 is showing 94% capture efficiency with a 38% risk of total blockage.";
      } else if (prompt.includes("ph")) {
        aiText = "The current pH is 7.2. If it exceeds 8.0, we expect calcium carbonate precipitation, which accelerates clogging.";
      } else if (prompt.includes("turbidity")) {
        aiText = "Turbidity is at 4.2 NTU. Higher turbidity usually correlates with faster buildup in the filter mesh.";
      } else if (prompt.includes("status") || prompt.includes("risk")) {
        aiText = `The current system risk is ${risk}%. Neural inference suggests a 'Backwash Sequence' if this exceeds 50%.`;
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 lg:p-8 font-sans selection:bg-emerald-500/30">
      
      {/* HEADER */}
      <nav className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/10 pb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] border border-white/20">
            <Waves className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Flow<span className="text-emerald-500">Sense</span> AI</h1>
            <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500 font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-1"><Radio size={10} className="animate-pulse text-emerald-500" /> SENSOR_ACTIVE</span>
              <span className="flex items-center gap-1"><Database size={10} /> HYDRAULIC_DB_01</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 pr-6 border-r border-white/10">
            <StatMini label="Sync Rate" val="144Hz" />
            <StatMini label="Accuracy" val="94.8%" />
            <StatMini label="Inference" val={`${countdown}S`} />
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
            
            {/* FIRST COMPONENT BOX: RISK % + SENSORS */}
            <Card title="Live Flow Metrics" icon={Activity} className="md:col-span-2">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-6xl font-black text-white tracking-tighter">{risk}%</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">Clog Risk Probability</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden mb-8 border border-white/10">
                <motion.div animate={{ width: `${risk}%` }} className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                    {i: FlaskConical, v: "7.2 pH", l: "Acidity"}, 
                    {i: Droplet, v: "4.2 NTU", l: "Turbidity"}, 
                    {i: Wind, v: "1.8 m/s", l: "Flow Rate"}
                ].map((s, i) => (
                  <div key={i} className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 text-center hover:bg-white/[0.08] transition-all hover:-translate-y-1">
                      <s.i size={18} className="text-emerald-500 mb-2 mx-auto" />
                      <p className="text-xs font-mono text-white font-black uppercase">{s.v}</p>
                      <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Neural Diagnosis" icon={Zap} badge="Match Found">
              {prediction ? (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-500/10 border-l-2 border-emerald-500 rounded-r-xl">
                    <p className="text-[9px] text-emerald-400 font-black uppercase mb-1">Status</p>
                    <p className="text-xs font-bold text-white uppercase tracking-tight">{prediction.clog_type}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 italic leading-relaxed">"{prediction.explanation}"</p>
                  <div className="pt-2">
                    <div className="flex justify-between text-[9px] font-bold mb-1">
                      <span>CONFIDENCE</span>
                      <span className="text-emerald-500">{prediction.confidence}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{width: 0}} animate={{width: '94.8%'}} className="h-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
              ) : <div className="h-32 flex items-center justify-center animate-pulse text-[10px] font-mono text-emerald-500/50 italic uppercase tracking-widest">Scanning Fluids...</div>}
            </Card>
          </div>

          <Card title="System Control Hub" icon={Cpu}>
            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => runAction("Acid Flush")} 
                disabled={executing}
                className="flex-1 h-14 bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] rounded-2xl text-black font-black uppercase text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <Droplets className="w-4 h-4" /> Initiate Acid Flush
              </button>
              <button 
                onClick={() => runAction("Backwash Sequence")} 
                disabled={executing}
                className="flex-1 h-14 bg-slate-900 border border-white/20 text-white font-bold rounded-2xl uppercase text-xs hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                Backwash Sequence
              </button>
            </div>
          </Card>

          {/* Node Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-[#050a18]/50 border border-white/10 p-4 rounded-2xl flex flex-col items-center group hover:border-emerald-500/50 transition-all">
                   <div className={`w-2.5 h-2.5 rounded-full mb-3 shadow-lg ${i === 4 ? 'bg-orange-500 animate-pulse shadow-orange-500/50' : 'bg-emerald-500 shadow-emerald-500/50'}`} />
                   <span className="text-[9px] font-mono text-slate-500 group-hover:text-white transition-colors uppercase font-black">Node_{i.toString().padStart(2, '0')}</span>
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-5">
          <Card title="Sensor Fusion Radar" icon={Gauge}>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8, fontWeight: 800 }} />
                  <Radar dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

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
                  <Tooltip contentStyle={{ backgroundColor: '#050a18', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '10px', borderRadius: '12px' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Inference Terminal" icon={Terminal}>
            <div className="h-[140px] overflow-y-auto space-y-2 font-mono text-[9px] pr-2 custom-scrollbar">
              {logs.map((msg, i) => (
                <div key={i} className="flex gap-2 border-b border-white/5 pb-1.5 hover:bg-white/[0.02] transition-colors">
                  <span className="text-emerald-500/50">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="bg-[#050a18] p-10 rounded-[3rem] border border-emerald-500/40 text-center shadow-[0_0_80px_rgba(16,185,129,0.15)] max-w-sm w-full">
               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-20 h-20 mb-6 mx-auto border-4 border-t-emerald-500 border-emerald-500/10 rounded-full flex items-center justify-center">
                 <RefreshCcw className="text-emerald-500 w-8 h-8" />
               </motion.div>
               <h3 className="text-white font-black uppercase tracking-widest text-lg italic">{executing}</h3>
               <p className="text-emerald-500/60 font-mono text-[10px] animate-pulse mt-3 uppercase tracking-tighter">Overriding manual valves...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CHATBOT --- */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-[#0b1224]/95 border border-white/20 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden backdrop-blur-3xl"
            >
              <div className="p-6 bg-emerald-500 flex items-center justify-between text-black">
                <div className="flex items-center gap-3 font-black text-sm uppercase tracking-tighter italic"><Bot size={20} /> Flow-AI Assistant</div>
                <button onClick={() => setIsChatOpen(false)} className="hover:rotate-90 transition-transform"><X size={20}/></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-black/20 custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-emerald-500 text-black font-bold rounded-tr-none' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex gap-2 bg-[#050a18]">
                <input 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                  placeholder="Ask about pH, Clogs or Farming..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors" 
                />
                <button type="submit" className="p-3 bg-emerald-500 rounded-2xl text-black hover:scale-105 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"><Send size={18}/></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.4)] border border-white/20 hover:rotate-12 transition-all active:scale-90 group">
          {isChatOpen ? <X size={24} className="text-black" /> : <MessageSquare size={24} className="text-black group-hover:scale-110 transition-transform" />}
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16,185,129,0.4); }
      `}</style>
    </main>
  );
}