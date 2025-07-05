import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  title: String,
  avatarUrl: String,
  description: String,
  socials: {
    github: String,
    linkedin: String,
    email: String,
  },
  cvUrl: String,
});

export default mongoose.model("User", UserSchema);
