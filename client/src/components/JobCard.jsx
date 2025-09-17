import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="card hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{job.title}</h3>
          <p className="text-slate-600">{job.company} • {job.location}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.tags?.map(t => (
              <span key={t} className="px-2 py-1 bg-slate-100 rounded-full text-xs">{t}</span>
            ))}
          </div>
        </div>
        <div className="text-right text-sm text-slate-600">
          <div>{job.type}</div>
          <div>{job.experience}</div>
          {(job.salaryMin || job.salaryMax) && (
            <div className="font-medium">₹{(job.salaryMin||0).toLocaleString()} - ₹{(job.salaryMax||0).toLocaleString()}</div>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Link to={`/jobs/${job._id}`} className="btn-outline">View Details</Link>
      </div>
    </div>
  );
}
