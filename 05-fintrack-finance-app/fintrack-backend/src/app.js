// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js"; // ✅ Add this line

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Request logging

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ Register protected dashboard routes

// Health check
app.get("/", (_, res) => res.send("✅ FinTrack API is live"));

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

export default app;
