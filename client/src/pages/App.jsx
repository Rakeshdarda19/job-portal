import React from "react";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Navbar />
      <section className="gradient text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Find your next dream job</h1>
          <p className="mt-4 text-lg text-white/90">Search thousands of roles across React, Node.js, and more.</p>
          <div className="mt-6">
            <SearchBar />
          </div>
          <div className="mt-8 flex gap-3">
            <Link to="/jobs?tags=react" className="btn-outline bg-white/10 text-white hover:bg-white/20">React</Link>
            <Link to="/jobs?tags=nodejs" className="btn-outline bg-white/10 text-white hover:bg-white/20">Node.js</Link>
            <Link to="/jobs?tags=mongodb" className="btn-outline bg-white/10 text-white hover:bg-white/20">MongoDB</Link>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold text-slate-800">Search smart</h3>
          <p className="text-slate-600 mt-2">Use filters for type, level, salary and tags to find the perfect fit.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-800">Apply fast</h3>
          <p className="text-slate-600 mt-2">One-click apply with a short cover letter.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-800">For employers</h3>
          <p className="text-slate-600 mt-2">Post jobs and manage applicants in minutes.</p>
        </div>
      </section>
    </div>
  );
}
