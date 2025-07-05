import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany();

await User.create({
  name: "Hoang Huynh Hai",
  title: "DevOps Engineer & Full Stack Developer",
  avatarUrl: "https://yourcdn.com/avatar.jpg",
  description:
    "I create beautiful, functional and user-centered digital experiences...",
  socials: {
    github: "https://github.com/youraccount",
    linkedin: "https://linkedin.com/in/youraccount",
    email: "you@example.com",
  },
  cvUrl: "https://yourcdn.com/cv.pdf",
});

console.log("✅ Seeded user data.");
process.exit();
