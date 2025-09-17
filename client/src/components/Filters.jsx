import React from "react";

export default function Filters({ query, setQuery }) {
  function update(key, value) {
    setQuery((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="card grid gap-3">
      {/* Type */}
      <select
        className="input w-full"
        value={query.type || ""}
        onChange={(e) => update("type", e.target.value)}
      >
        <option value="">All Types</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
        <option>Internship</option>
        <option>Remote</option>
      </select>

      {/* Experience */}
      <select
        className="input w-full"
        value={query.experience || ""}
        onChange={(e) => update("experience", e.target.value)}
      >
        <option value="">All Levels</option>
        <option>Junior</option>
        <option>Mid</option>
        <option>Senior</option>
        <option>Lead</option>
      </select>

      {/* Min Salary */}
      <input
        className="input w-full"
        type="number"
        placeholder="Min Salary"
        value={query.minSalary || ""}
        onChange={(e) => update("minSalary", e.target.value)}
      />

      {/* Max Salary */}
      <input
        className="input w-full"
        type="number"
        placeholder="Max Salary"
        value={query.maxSalary || ""}
        onChange={(e) => update("maxSalary", e.target.value)}
      />

      {/* Tags */}
      <input
        className="input w-full"
        placeholder="Tags (comma separated)"
        value={query.tags || ""}
        onChange={(e) => update("tags", e.target.value)}
      />
    </div>
  );
}
