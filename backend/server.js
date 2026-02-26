require("dotenv").config();
const Reading = require("./models/Reading");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Command = require("./models/Command");
const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- MONGODB CONNECT ---------------- */

mongoose.connect("mongodb://127.0.0.1:27017/fertiguard");

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});



/* ---------------- SAVE DATA FROM ESP ---------------- */

app.post("/api/readings", async (req, res) => {
  try {
    const reading = await Reading.create(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

/* ---------------- SEND DATA TO DASHBOARD ---------------- */

app.get("/api/readings/latest", async (req, res) => {
  const data = await Reading.find()
    .sort({ timestamp: -1 })
    .limit(5);

  res.json(data);
});

/* ---------------- START SERVER ---------------- */

app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Backend running on port 5000 (Network Enabled)");
});