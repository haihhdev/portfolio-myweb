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
    origin: "http://localhost:3000", // Cập nhật nếu frontend deploy
  })
);
app.use(express.json());

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
