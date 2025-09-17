import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Applications } from "../lib/api.js";

export default function ApplicationsPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { Applications.mine().then(setItems); }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card">
          <h1 className="text-2xl font-bold mb-4">My Applications</h1>
          <div className="space-y-3">
            {items.map(a => (
              <div key={a._id} className="p-3 border rounded-xl">
                <div className="font-medium">{a.job?.title}</div>
                <div className="text-sm text-slate-600">{a.job?.company} • {a.job?.location}</div>
                <div className="text-sm mt-1">Status: <span className="font-medium">{a.status}</span></div>
              </div>
            ))}
            {items.length === 0 && <div>No applications yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
