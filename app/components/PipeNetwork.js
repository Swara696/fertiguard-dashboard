"use client";

export default function PipeNetwork({ cloggedBranch }) {
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
        <text x="100" y="180" fontSize="24" textAnchor="middle">
          ❌
        </text>
      )}

      {cloggedBranch === "B" && (
        <text x="300" y="180" fontSize="24" textAnchor="middle">
          ❌
        </text>
      )}
    </svg>
  );
}
