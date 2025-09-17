import { Router } from "express";
import { auth, requireRole } from "../middleware/auth.js";
import { apply, myApplications, listForJob } from "../controllers/application.controller.js";

const r = Router();

r.post("/", auth, requireRole("candidate", "admin"), apply);
r.get("/me", auth, myApplications);
r.get("/job/:jobId", auth, requireRole("employer", "admin"), listForJob);

export default r;
