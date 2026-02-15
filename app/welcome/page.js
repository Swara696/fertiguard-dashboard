"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    landArea: "",
    crop: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("farmerInfo", JSON.stringify(form));
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,#0B1220,transparent_60%)] bg-[#0B0E14] px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              FertiGuard
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Smart fertigation starts with your farm details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Farmer Name */}
          <div>
            <label className="text-xs text-slate-400">Farmer Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0B0E14] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-xs text-slate-400">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              placeholder="10-digit mobile number"
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0B0E14] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Land Area */}
          <div>
            <label className="text-xs text-slate-400">Land Area (acres)</label>
            <input
              type="number"
              name="landArea"
              value={form.landArea}
              onChange={handleChange}
              required
              placeholder="e.g. 2.5"
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0B0E14] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Crop Type */}
          <div>
            <label className="text-xs text-slate-400">Crop Grown</label>
            <select
              name="crop"
              value={form.crop}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0B0E14] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            >
              <option value="">Select crop</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Cotton">Cotton</option>
              <option value="Soybean">Soybean</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 px-4 py-3 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01] hover:shadow-emerald-500/40 active:scale-[0.99]"
          >
            Continue to Dashboard →
          </button>
        </form>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Your data is used only to personalize recommendations.
        </p>
      </div>
    </main>
  );
}
