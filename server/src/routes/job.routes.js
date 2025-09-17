import { Router } from "express";
import { auth, requireRole } from "../middleware/auth.js";
import { createJob, updateJob, deleteJob, listJobs, getJob, relatedJobs } from "../controllers/job.controller.js";

const r = Router();

r.get("/", listJobs);
r.get("/:id", getJob);
r.get("/:id/related", relatedJobs);

r.post("/", auth, requireRole("employer", "admin"), createJob);
r.put("/:id", auth, requireRole("employer", "admin"), updateJob);
r.delete("/:id", auth, requireRole("employer", "admin"), deleteJob);

export default r;
