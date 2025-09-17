import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Applications, Jobs } from "../lib/api.js";
import { useAuth } from "../lib/auth.jsx";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [related, setRelated] = useState([]);
  const [coverLetter, setCoverLetter] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    Jobs.get(id).then(setJob);
    Jobs.related(id).then(setRelated);
  }, [id]);

  async function apply() {
    try {
      if (!user) return nav("/login");
      await Applications.apply(id, coverLetter);
      setMsg("Applied successfully!");
    } catch (e) {
      setMsg(e.message);
    }
  }

  if (!job) return <div><Navbar /><div className="max-w-6xl mx-auto px-4 py-6">Loading...</div></div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        <main className="md:col-span-2">
          <div className="card">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-slate-600">{job.company} • {job.location}</p>
            <div className="mt-2 flex gap-2 flex-wrap">
              {job.tags?.map(t => <span key={t} className="px-2 py-1 bg-slate-100 rounded-full text-xs">{t}</span>)}
            </div>
            <div className="mt-4 prose max-w-none">
              <p>{job.description}</p>
            </div>
          </div>
          <div className="card mt-4">
            <h3 className="font-semibold">Apply</h3>
            <textarea className="input h-32" placeholder="Short cover letter (optional)" value={coverLetter} onChange={e=>setCoverLetter(e.target.value)} />
            <div className="mt-3 flex gap-3">
              <button className="btn-primary" onClick={apply}>Apply Now</button>
              {msg && <div className="text-slate-700">{msg}</div>}
            </div>
          </div>
        </main>
        <aside>
          <div className="card">
            <h3 className="font-semibold mb-3">Role details</h3>
            <div className="text-sm text-slate-700 space-y-1">
              <div>Type: <span className="font-medium">{job.type}</span></div>
              <div>Level: <span className="font-medium">{job.experience}</span></div>
              {(job.salaryMin||job.salaryMax) && <div>Salary: <span className="font-medium">₹{(job.salaryMin||0).toLocaleString()} - ₹{(job.salaryMax||0).toLocaleString()}</span></div>}
            </div>
          </div>
          <div className="card mt-4">
            <h3 className="font-semibold mb-2">Related Jobs</h3>
            <div className="space-y-2">
              {related.map(r => (
                <Link key={r._id} to={`/jobs/${r._id}`} className="block p-2 rounded-lg hover:bg-slate-50">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-sm text-slate-600">{r.company} • {r.location}</div>
                </Link>
              ))}
              {related.length === 0 && <div className="text-sm text-slate-600">No similar roles yet.</div>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
