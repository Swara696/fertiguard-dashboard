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

    // Save farmer info (optional but useful)
    localStorage.setItem("farmerInfo", JSON.stringify(form));

    // Go to dashboard
    router.push("/dashboard");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top,#020617,#000)",
        color: "#ffffff",
        fontFamily: "Segoe UI, sans-serif",
        padding: "20px"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(17,24,39,0.9)",
          padding: "32px",
          borderRadius: "24px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: 900 }}>
          Farmer Details
        </h1>

        <p style={{ color: "#94a3b8", marginTop: "6px", marginBottom: "24px" }}>
          Please enter basic farm information
        </p>

        {/* NAME */}
        <label style={{ fontSize: "14px", color: "#9ca3af" }}>
          Farmer Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
          style={inputStyle}
        />

        {/* CONTACT */}
        <label style={{ fontSize: "14px", color: "#9ca3af" }}>
          Contact Number
        </label>
        <input
          type="tel"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          required
          placeholder="Enter contact number"
          style={inputStyle}
        />

        {/* LAND AREA */}
        <label style={{ fontSize: "14px", color: "#9ca3af" }}>
          Land Area (in acres)
        </label>
        <input
          type="number"
          name="landArea"
          value={form.landArea}
          onChange={handleChange}
          required
          placeholder="e.g. 2.5"
          style={inputStyle}
        />

        {/* CROP TYPE */}
        <label style={{ fontSize: "14px", color: "#9ca3af" }}>
          Crop Grown
        </label>
        <select
          name="crop"
          value={form.crop}
          onChange={handleChange}
          required
          style={inputStyle}
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

        {/* SUBMIT */}
        <button
          type="submit"
          style={{
            marginTop: "28px",
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background: "#22c55e",
            color: "#000",
            fontWeight: 900,
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Continue to Dashboard →
        </button>
      </form>
    </main>
  );
}

/* ---------- INPUT STYLE ---------- */
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff",
  fontSize: "15px"
};
