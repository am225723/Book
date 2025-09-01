# Client Portal (Vercel-Ready)

Vite + React + Tailwind with **role-based routing** and **two auth modes**:

- **DEMO (default)**: No external services. Any email/password works. Add `+admin` in the email to see the admin dashboard.
- **SUPABASE**: Real auth via Supabase.

## Run locally
```bash
npm i
npm run dev
```
Open http://localhost:5173

## Deploy to Vercel
- Framework: **Vite**
- Build: `npm run build`
- Output: `dist`
- SPA Rewrites: included via `vercel.json`

## Switch to Supabase
```bash
npm i @supabase/supabase-js
```
Then set Vercel env vars:
```
VITE_AUTH_MODE=supabase
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```
Re-deploy.
