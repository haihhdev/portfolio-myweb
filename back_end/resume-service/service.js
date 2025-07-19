import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import resumeRoutes from "./routes/resume.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN || "http://localhost:3000",
      "https://portfolio-myweb-hai.vercel.app",
      "https://portfolio-myweb-hai-git-main-hoang-hais-projects-6b077895.vercel.app",
      "https://portfolio-myweb-lu97k9ol6-hoang-hais-projects-6b077895.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/resume", resumeRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Resume Service running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
