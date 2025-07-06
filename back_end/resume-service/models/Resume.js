import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    experience: [
      {
        company: String,
        position: String,
        location: String,
        period: String,
        current: Boolean,
        description: [String],
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        period: String,
        location: String,
        description: String,
      },
    ],
    cvUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
