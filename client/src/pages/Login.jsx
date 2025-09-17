import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../lib/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="card">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form onSubmit={submit} className="space-y-3">
            <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            {error && <div className="text-red-600">{error}</div>}
            <button className="btn-primary w-full">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
