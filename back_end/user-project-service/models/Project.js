import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
