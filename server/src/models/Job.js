import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, index: "text" },
  company: { type: String, required: true },
  location: { type: String, required: true, index: true },
  type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"], default: "Full-time" },
  experience: { type: String, enum: ["Junior", "Mid", "Senior", "Lead"], default: "Junior" },
  salaryMin: { type: Number, default: 0 },
  salaryMax: { type: Number, default: 0 },
  tags: [{ type: String, index: true }],
  description: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

jobSchema.index({ title: "text", company: "text", location: "text", tags: "text" });

export default mongoose.model("Job", jobSchema);
