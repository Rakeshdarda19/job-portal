const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function api(path, { method = "GET", body, auth = false } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth ? authHeader() : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error((await res.json()).error || "Request failed");
  return res.json();
}

export const Auth = {
  async login(email, password) {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  },
  async register(payload) {
    const data = await api("/api/auth/register", {
      method: "POST",
      body: payload,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  me() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export const Jobs = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api(`/api/jobs?${qs}`);
  },
  get: (id) => api(`/api/jobs/${id}`),
  related: (id) => api(`/api/jobs/${id}/related`),
  create: (payload) =>
    api(`/api/jobs`, { method: "POST", body: payload, auth: true }),
};

export const Applications = {
  apply: (jobId, coverLetter) =>
    api(`/api/applications`, {
      method: "POST",
      body: { jobId, coverLetter },
      auth: true,
    }),
  mine: () => api(`/api/applications/me`, { auth: true }),
};
