"use client";

import React, { useRef, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  TimeScale,
  Title
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, TimeScale, Title);

export default function LineChart({ labels = [], data = [], accent = '#10B981', unit = '', height = 200 }) {
  const chartRef = useRef(null);

  const datasets = useMemo(() => ({
    labels,
    datasets: [
      {
        label: unit || 'Value',
        data,
        fill: true,
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderColor: accent,
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return accent;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, `${accent}33`); // 20% alpha
          gradient.addColorStop(0.6, `${accent}15`);
          gradient.addColorStop(1, `rgba(10,10,10,0.02)`);
          return gradient;
        }
      }
    ]
  }), [labels, data, accent, unit]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0b1220',
        titleColor: '#e6eef1',
        bodyColor: '#e6eef1',
        borderColor: 'rgba(255,255,255,0.04)',
        borderWidth: 1,
        padding: 8
      }
    },
    scales: {
      x: {
        ticks: { color: 'rgba(230,238,241,0.9)', maxRotation: 0 },
        grid: { color: 'rgba(255,255,255,0.03)' }
      },
      y: {
        ticks: { color: 'rgba(230,238,241,0.9)' },
        grid: { color: 'rgba(255,255,255,0.03)' }
      }
    },
    elements: { point: { hoverRadius: 6 } },
    transitions: { show: { animations: { x: { from: 0 }, y: { from: 0 } } }, hide: { animations: { x: { to: 0 }, y: { to: 0 } } } }
  }), []);

  return (
    <div style={{ height }} className="w-full">
      <Line ref={chartRef} data={datasets} options={options} />
    </div>
  );
}
