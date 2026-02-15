"use client";

export default function PipeNetwork({ clogged, clogSeverity = 'medium' }) {
  // Severity mapping: controls glow blur, pulse duration and scale
  const severityMap = {
    low: { blur: 4, pulseDur: '1.8s', pulseScale: 1.3, glowColor: '#fca5a5' },
    medium: { blur: 6, pulseDur: '1.4s', pulseScale: 1.6, glowColor: '#fb7185' },
    high: { blur: 10, pulseDur: '1.0s', pulseScale: 2.0, glowColor: '#ef4444' }
  };

  const s = severityMap[clogSeverity] || severityMap.medium;

  return (
    <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border border-[rgba(255,255,255,0.04)] rounded-2xl p-4">
      <div className="relative">
        <svg
          viewBox="0 0 400 260"
          width="100%"
          height="260"
          role="img"
          aria-label={`Pipe network${clogged ? ` — clogged branch ${clogged}` : ''}`}
        >
          <defs>
            <linearGradient id="gMain" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <linearGradient id="gHealthy" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            <linearGradient id="gClog" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={s.blur} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Animations scoped and tuned by severity */}
            <style>{`
              .flow { stroke-dasharray: 10 8; animation: dash 1.4s linear infinite; }
              @keyframes dash { to { stroke-dashoffset: -18; } }

              .pulse { transform-origin: center; animation: pulse ${s.pulseDur} ease-out infinite; opacity: 0.95; }
              @keyframes pulse { 0% { transform: scale(0.92); opacity: 0.95; } 70% { transform: scale(${s.pulseScale}); opacity: 0; } 100% { opacity: 0; } }

              .label { font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; fill: #e6eef1; font-size: 12px; font-weight: 600; }
            `}</style>
          </defs>

          <rect x="6" y="6" width="388" height="248" rx="14" fill="none" stroke="rgba(255,255,255,0.02)" />

          <rect x="168" y="8" width="64" height="28" rx="6" fill="#38bdf8" opacity="0.95" />
          <text x="200" y="28" textAnchor="middle" fill="#041014" fontWeight="700" fontSize="12">Tank</text>

          <path
            d="M200 40 L200 100"
            stroke="url(#gMain)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flow"
            filter="url(#glow)"
          >
            <title>Main flow</title>
          </path>

          <g>
            <path
              d="M200 100 C200 118, 160 132, 100 150 L100 220"
              stroke={clogged === "A" ? "url(#gClog)" : "url(#gHealthy)"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flow"
              filter={clogged === "A" ? "url(#glow)" : undefined}
            >
              <title>{clogged === 'A' ? 'Clog detected' : 'Flow OK'}</title>
            </path>

            {clogged === 'A' && (
              <>
                <path
                  d="M200 100 C200 118, 160 132, 100 150 L100 220"
                  stroke={s.glowColor}
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.12"
                  filter="url(#glow)"
                />
                <circle cx="100" cy="180" r="8" fill="#ef4444" />
                <circle cx="100" cy="180" r="18" fill="#ef4444" className="pulse" opacity="0.14" />
              </>
            )}
          </g>

          <g>
            <path
              d="M200 100 C200 118, 260 132, 320 150 L320 220"
              stroke={clogged === "B" ? "url(#gClog)" : "url(#gHealthy)"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flow"
              filter={clogged === "B" ? "url(#glow)" : undefined}
            >
              <title>{clogged === 'B' ? 'Clog detected' : 'Flow OK'}</title>
            </path>

            {clogged === 'B' && (
              <>
                <path
                  d="M200 100 C200 118, 260 132, 320 150 L320 220"
                  stroke={s.glowColor}
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.12"
                  filter="url(#glow)"
                />
                <circle cx="320" cy="180" r="8" fill="#ef4444" />
                <circle cx="320" cy="180" r="18" fill="#ef4444" className="pulse" opacity="0.14" />
              </>
            )}
          </g>

          {/* subtle guide strokes for depth (draw before icons/labels so they stay on top) */}
          <path d="M200 40 L200 100" stroke="#9be7ff" strokeWidth="3" strokeLinecap="round" opacity="0.22" className="flow" />
          <path d="M200 100 C200 118, 160 132, 100 150 L100 220" stroke={clogged === "A" ? '#ffb3bb' : '#7ef0b1'} strokeWidth="3" strokeLinecap="round" opacity="0.22" className="flow" />
          <path d="M200 100 C200 118, 260 132, 320 150 L320 220" stroke={clogged === "B" ? '#ffb3bb' : '#7ef0b1'} strokeWidth="3" strokeLinecap="round" opacity="0.22" className="flow" />

          {/* Labels (aligned cleanly under each branch) */}
          <text x="100" y="245" textAnchor="middle" className="label"><title>{clogged === 'A' ? 'Clog detected' : 'Flow OK'}</title>Node A – Greenhouse</text>
          <text x="320" y="252" textAnchor="middle" className="label"><title>{clogged === 'B' ? 'Clog detected' : 'Flow OK'}</title>Node B – Open Field</text>

          {/* Sensor icons for Node A (icons stacked left of branch end) */}
          <text x="70" y="200" className="label" fontSize="14">🧪</text>
          <text x="70" y="215" className="label" fontSize="14">💧</text>
          <text x="70" y="230" className="label" fontSize="14">⚙️</text>

          {/* Sensor icons for Node B (moved right to avoid overlap) */}
          <text x="330" y="195" className="label" fontSize="14">🧪</text>
          <text x="330" y="210" className="label" fontSize="14">💧</text>
          <text x="330" y="225" className="label" fontSize="14">⚙️</text>
          <text x="350" y="238" className="label" fontSize="10" fill="#9ca3af">(pH soon)</text>
        </svg>

        <div className="absolute top-3 right-3 flex items-center gap-3 bg-[rgba(11,14,20,0.6)] border border-[rgba(255,255,255,0.03)] rounded-md px-3 py-1 text-xs text-[rgba(156,163,175,1)]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'linear-gradient(90deg,#34d399,#10b981)' }} />
            <span>Normal Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'linear-gradient(90deg,#fb7185,#ef4444)' }} />
            <span>Clogged</span>
          </div>
        </div>
      </div>
    </div>
  );
}
