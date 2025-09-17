import Job from "../models/Job.js";

export async function createJob(req, res) {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(job);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function updateJob(req, res) {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user.id },
      req.body, { new: true }
    );
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function deleteJob(req, res) {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user.id });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function listJobs(req, res) {
  try {
    const { search, location, type, experience, tags, minSalary, maxSalary, page = 1, limit = 10 } = req.query;
    const q = {};
    if (search) {
      q.$text = { $search: search };
    }
    if (location) q.location = new RegExp(location, "i");
    if (type) q.type = type;
    if (experience) q.experience = experience;
    if (tags) q.tags = { $in: (Array.isArray(tags) ? tags : String(tags).split(",")).map(t => t.trim()) };
    if (minSalary || maxSalary) {
      q.$and = [];
      if (minSalary) q.$and.push({ salaryMax: { $gte: Number(minSalary) } });
      if (maxSalary) q.$and.push({ salaryMin: { $lte: Number(maxSalary) } });
      if (q.$and.length === 0) delete q.$and;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Job.find(q).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Job.countDocuments(q)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit) || 1) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function getJob(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function relatedJobs(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    const related = await Job.find({
      _id: { $ne: job._id },
      $or: [
        { tags: { $in: job.tags } },
        { title: new RegExp(job.title.split(" ")[0], "i") },
        { company: job.company }
      ]
    }).limit(6);
    res.json(related);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
