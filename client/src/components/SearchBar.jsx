import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  function go() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    nav(`/jobs?${params.toString()}`);
  }
  return (
    <div className="card flex flex-col md:flex-row gap-3 items-center">
      <input className="input text-black" placeholder="Search roles, skills, companies..." value={search} onChange={e=>setSearch(e.target.value)} />
      <input className="input text-black" placeholder="Location (e.g., Pune, Remote)" value={location} onChange={e=>setLocation(e.target.value)} />
      <button className="btn-primary w-full md:w-auto" onClick={go}>Search</button>
    </div>
  );
}
