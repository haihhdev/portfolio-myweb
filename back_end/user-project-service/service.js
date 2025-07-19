import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import projectRoutes from "./routes/project.routes.js";
import userRoutes from "./routes/user.routes.js";

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
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use((req, res, next) => {
  console.log("Request size:", req.headers["content-length"]);
  next();
});

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
