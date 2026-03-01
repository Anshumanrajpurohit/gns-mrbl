# Ganpati Marble Goa – Premium Web Experience

Modern React + Node.js codebase for Ganpati Marble Goa (GMG) featuring a personalized marketing site, enquiry workflow, and secure admin dashboard.

## Highlights

- Tailored storytelling for owner **Vishan Singh Rajpurohit** with premium white–gold–charcoal art direction.
- Pages: Home, About, Services, Gallery, Contact, plus `/admin/login` and `/admin/dashboard`.
- Enquiries persist to MongoDB via secure Express API (`backend/`).
- Admin dashboard with JWT auth, search, status tagging, and destructive actions.
- WhatsApp floating CTA, SEO-ready `<head>` tags via `react-helmet-async`, responsive layouts, and accessibility-friendly semantics.

## Tech Stack

- **Frontend:** Vite + React 18 + TypeScript, Tailwind CSS, shadcn/ui, React Router, React Query.
- **Backend:** Node.js + Express + MongoDB + Mongoose, Zod validation, Helmet, CORS, Rate limiting.
- **Tooling:** Vitest, ESLint, react-hook-form, sonner toasts.

## Setup

```bash
# install deps
cd gns-mrbl
npm install

# env var for frontend API target
cp .env.example .env.local

# run frontend
npm run dev

# backend setup
cd backend
npm install
cp .env.example .env
npm run dev
```

Update `.env` files with:

```env
VITE_API_URL=http://localhost:5000

PORT=5000
MONGO_URI=mongodb+srv://...
MONGO_DB_NAME=ganpati_marble_goa
JWT_SECRET=super-long-random-string
JWT_EXPIRES_IN=12h
ADMIN_DEFAULT_USERNAME=owner
ADMIN_DEFAULT_PASSWORD=changeThisPassword
CLIENT_URL=http://localhost:5173
```

The backend bootstraps the first admin user from the default credentials if no admin exists. Afterwards, change the password via Mongo shell.

## Scripts

Frontend (root `package.json`):

- `npm run dev` – Vite dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build
- `npm run test` – Vitest suite

Backend (`backend/package.json`):

- `npm run dev` – Nodemon server with live reload
- `npm start` – Production server

## Admin Workflow

1. Navigate to `/admin/login`, sign in with JWT-protected credentials.
2. `/admin/dashboard` lists enquiries, supports search, status toggle, and deletion.
3. All API routes live under `/api/*` with rate limiting for enquiry submissions.

## Deployment Notes

- Deploy frontend (e.g., Vercel/Netlify). Ensure `VITE_API_URL` points to your backend domain.
- Deploy backend (Render, Railway, etc.) with environment variables configured and whitelist `CLIENT_URL`.
- MongoDB Atlas recommended; enable IP allowlisting.

## Testing & QA Checklist

- `npm run test` for unit tests.
- Verify contact form submission hits `/api/enquiries` and data appears in `/admin/dashboard`.
- Smoke test responsive breakpoints and WhatsApp CTA.

Feel free to tailor content or sections inside `src/data/content.ts` to reflect new work, statistics, or photography.
