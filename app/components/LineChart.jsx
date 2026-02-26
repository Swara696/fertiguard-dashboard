"use client";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function LineChart({ labels = [], data = [], accent = '#10B981', height = 220 }) {
  const datasets = useMemo(() => ({
    labels,
    datasets: [
      {
        data,
        fill: true,
        tension: 0.45, // Smoother "Startup" curves
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: accent,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        borderColor: accent,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, `${accent}33`); // Transparent accent
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          return gradient;
        },
      }
    ]
  }), [labels, data, accent]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#111827',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#4B5563', font: { size: 10 } }
      },
      y: {
        border: { display: false },
        grid: { color: 'rgba(255, 255, 255, 0.03)' },
        ticks: { color: '#4B5563', font: { size: 10 }, maxTicksLimit: 5 }
      }
    }
  };

  return (
    <div style={{ height }} className="w-full">
      <Line data={datasets} options={options} />
    </div>
  );
}