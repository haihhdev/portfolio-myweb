import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import aboutRoutes from "./routes/about.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // Update if frontend is deployed
  })
);
app.use(express.json());

// Routes
app.use("/api/about", aboutRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 About Service running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
