import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import symptomRoutes from "./routes/symptomRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// Middlewares
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.send("Symptom Checker API is running.");
});

// API routes
app.use("/api/symptoms", symptomRoutes);

// Start
app.listen(PORT, async () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  await connectDB();
});
