import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coverLetter: { type: String, default: "" },
  status: { type: String, enum: ["applied", "review", "interview", "offer", "rejected"], default: "applied" }
}, { timestamps: true });

applicationSchema.index({ job: 1, user: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);
