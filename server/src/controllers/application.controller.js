import Application from "../models/Application.js";
import Job from "../models/Job.js";

export async function apply(req, res) {
  try {
    const { jobId, coverLetter } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });
    const app = await Application.create({ job: jobId, user: req.user.id, coverLetter: coverLetter || "" });
    res.status(201).json(app);
  } catch (e) {
    if (e.code === 11000) return res.status(400).json({ error: "Already applied" });
    res.status(400).json({ error: e.message });
  }
}

export async function myApplications(req, res) {
  try {
    const items = await Application.find({ user: req.user.id }).populate("job");
    res.json(items);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function listForJob(req, res) {
  try {
    const items = await Application.find({ job: req.params.jobId }).populate("user", "name email");
    res.json(items);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
