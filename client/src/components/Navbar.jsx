import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          <span className="text-primary-700">Job</span><span className="text-slate-800">Wave</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link className="text-slate-700 hover:text-primary-700" to="/jobs">Browse Jobs</Link>
          {user?.role === "employer" && (
            <Link className="btn-outline" to="/post-job">Post a Job</Link>
          )}
          {user ? (
            <>
              <Link className="btn-outline" to="/applications">My Applications</Link>
              <button className="btn-primary" onClick={() => { logout(); nav("/"); }}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn-outline" to="/login">Login</Link>
              <Link className="btn-primary" to="/register">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
