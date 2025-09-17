# JobWave — MERN Job Portal

A full-stack job portal with search, filters, related jobs, applications and JWT auth.
Tech: React + Tailwind + Vite, Node.js + Express + MongoDB (Mongoose).

## Quickstart

### 1) Backend
```bash
cd server
cp .env.example .env            # update values if needed
npm install
npm run seed                    # optional: seeds demo users/jobs
npm run dev                     # starts on http://localhost:5000
```
### 2) Frontend
```bash
cd client
npm install
# Create .env with API URL (optional if default used):
# echo "VITE_API_URL=http://localhost:5000" > .env
npm run dev                     # opens http://localhost:5173
```

### Demo accounts (after seeding)
- Employer: `hr@acme.com` / `password`
- Candidate: `jane@example.com` / `password`

### Features
- Register/Login (JWT)
- Browse jobs with search + filters (type, level, salary, tags, location)
- Job details + related jobs
- Apply to a job (once per user/job)
- Employer can post/edit/delete own jobs
- Protected routes via middleware

### Notes
- Change `CLIENT_URL` in `server/.env` if you run frontend elsewhere.
- Ensure MongoDB is running locally or update `MONGO_URI` accordingly.
- For production, build the client and deploy separately (e.g., Vercel) and host API (e.g., Render, Railway, or a VPS).

Happy hacking!
