import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import appRoutes from "./routes/application.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, message: "Job Portal API" }));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", appRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/job_portal";
  await mongoose.connect(uri);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start().catch(err => {
  console.error("Failed to start:", err);
  process.exit(1);
});
