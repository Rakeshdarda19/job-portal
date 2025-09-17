import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Jobs } from "../lib/api.js";
import { useAuth } from "../lib/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [payload, setPayload] = useState({
    title: "", company: "", location: "", type: "Full-time", experience: "Junior",
    salaryMin: "", salaryMax: "", tags: "", description: ""
  });
  const [msg, setMsg] = useState("");

  if (!user || (user.role !== "employer" && user.role !== "admin")) {
    nav("/login");
  }

  function set(k, v) { setPayload(p => ({ ...p, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    const body = { ...payload, tags: payload.tags.split(",").map(t=>t.trim()).filter(Boolean),
      salaryMin: Number(payload.salaryMin||0), salaryMax: Number(payload.salaryMax||0) };
    try {
      const job = await Jobs.create(body);
      setMsg("Job posted!");
      setTimeout(()=> nav(`/jobs/${job._id}`), 600);
    } catch (e) { setMsg(e.message); }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="card">
          <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
          <form onSubmit={submit} className="grid grid-cols-2 gap-3">
            <input className="input col-span-2" placeholder="Job title" value={payload.title} onChange={e=>set("title", e.target.value)} />
            <input className="input" placeholder="Company" value={payload.company} onChange={e=>set("company", e.target.value)} />
            <input className="input" placeholder="Location" value={payload.location} onChange={e=>set("location", e.target.value)} />
            <select className="input" value={payload.type} onChange={e=>set("type", e.target.value)}>
              <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Remote</option>
            </select>
            <select className="input" value={payload.experience} onChange={e=>set("experience", e.target.value)}>
              <option>Junior</option><option>Mid</option><option>Senior</option><option>Lead</option>
            </select>
            <input className="input" type="number" placeholder="Min Salary" value={payload.salaryMin} onChange={e=>set("salaryMin", e.target.value)} />
            <input className="input" type="number" placeholder="Max Salary" value={payload.salaryMax} onChange={e=>set("salaryMax", e.target.value)} />
            <input className="input col-span-2" placeholder="Tags (comma separated)" value={payload.tags} onChange={e=>set("tags", e.target.value)} />
            <textarea className="input col-span-2 h-40" placeholder="Description" value={payload.description} onChange={e=>set("description", e.target.value)} />
            <button className="btn-primary col-span-2">Post Job</button>
            {msg && <div className="col-span-2 text-slate-700">{msg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
