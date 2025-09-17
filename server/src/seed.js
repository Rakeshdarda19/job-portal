import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Job from "./models/Job.js";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/job_portal";

async function run() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await Promise.all([User.deleteMany({}), Job.deleteMany({})]);

  const employer = await User.create({ name: "Acme HR", email: "hr@acme.com", password: "password", role: "employer" });
  const candidate = await User.create({ name: "Jane Doe", email: "jane@example.com", password: "password", role: "candidate" });

  const jobs = await Job.insertMany([
    {
      title: "React Developer",
      company: "Acme Inc",
      location: "Pune, India",
      type: "Full-time",
      experience: "Junior",
      salaryMin: 600000,
      salaryMax: 1000000,
      tags: ["react", "javascript", "frontend"],
      description: "Build delightful UIs using React and Tailwind.",
      postedBy: employer._id
    },
    {
      title: "Node.js Backend Engineer",
      company: "Zeus Learning",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "Mid",
      salaryMin: 900000,
      salaryMax: 1400000,
      tags: ["nodejs", "express", "mongodb", "api"],
      description: "Design REST APIs and microservices with Node.js and Express.",
      postedBy: employer._id
    },
    {
      title: "Full Stack MERN Developer",
      company: "Zuai",
      location: "Remote",
      type: "Remote",
      experience: "Senior",
      salaryMin: 1500000,
      salaryMax: 2400000,
      tags: ["react", "nodejs", "mongodb", "graphql"],
      description: "Own features end-to-end across the MERN stack.",
      postedBy: employer._id
    }
  ]);

  console.log("Seeded users and jobs:", { employer: employer.email, candidate: candidate.email, jobs: jobs.length });
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
