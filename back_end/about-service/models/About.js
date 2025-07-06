import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    skills: [String],
    certifications: [
      {
        name: String,
        issuer: String,
        date: String,
        url: String,
      },
    ],
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);
