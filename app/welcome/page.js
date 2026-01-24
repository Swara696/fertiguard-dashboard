"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    crop: "",
    land: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save farmer info (can be sent to backend later)
    localStorage.setItem("farmerInfo", JSON.stringify(form));

    // Go to dashboard
    router.push("/");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top,#0f172a,#020617)",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(17,24,39,0.9)",
          padding: "32px",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.7)"
        }}
      >
        <h1 style={{ fontWeight: 900, fontSize: "28px" }}>
          Welcome to FertiGuard  
        </h1>

        <p style={{ color: "#94a3b8", marginTop: "6px" }}>
          Enter farmer details to continue
        </p>

        <Input
          label="Farmer Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <Input
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          label="Type of Crop"
          name="crop"
          value={form.crop}
          onChange={handleChange}
        />

        <Input
          label="Land Area (acres)"
          name="land"
          value={form.land}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            marginTop: "20px",
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
          Proceed to Dashboard →
        </button>
      </form>
    </main>
  );
}

/* ---------------- INPUT COMPONENT ---------------- */

function Input({ label, name, value, onChange }) {
  return (
    <div style={{ marginTop: "14px" }}>
      <label style={{ color: "#9ca3af", fontSize: "14px" }}>
        {label}
      </label>
      <input
        required
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          marginTop: "6px",
          padding: "10px",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          background: "#020617",
          color: "white"
        }}
      />
    </div>
  );
}
