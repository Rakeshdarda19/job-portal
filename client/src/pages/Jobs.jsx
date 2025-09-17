import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Filters from "../components/Filters.jsx";
import JobCard from "../components/JobCard.jsx";
import { Jobs } from "../lib/api.js";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(
    () => Object.fromEntries(new URLSearchParams(search)),
    [search]
  );
}

export default function JobsPage() {
  const initial = useQuery();
  const [query, setQuery] = useState(initial);
  const [data, setData] = useState({
    items: [],
    total: 0,
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Jobs.list(query).then(setData).finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <Filters query={query} setQuery={setQuery} />
        </aside>
        <main className="md:col-span-3">
          {loading ? (
            <div className="card">Loading...</div>
          ) : (
            <div className="grid gap-4">
              {data.items.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
              {data.items.length === 0 && (
                <div className="card">
                  No jobs found. Try adjusting filters.
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
