# FixFlow — Community Maintenance Platform

A full-stack web application that connects residents, property managers, and maintenance workers in managed residential communities. Residents report maintenance issues with photo proof, managers assign workers with priority levels, workers log progress and mark jobs done, and residents confirm repairs or dispute them. Monthly maintenance fees are collected via Stripe.

---

## Live Demo

> Frontend: [your-frontend-url]
> Backend API: [your-backend-url]

### Demo Credentials

| Role     | Email                        | Password    |
|----------|------------------------------|-------------|
| Admin    | admin@gmail.com              | 123456      |
| Manager  | manager@fixflow.com          | 123456      |
| Worker   | worker1@fixflow.com          | worker123   |
| Resident | shahiluddinahamed@gmail.com  | newpass123  |

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animation:** motion/react
- **State/Data:** TanStack Query v5
- **Forms:** TanStack Form + react-hook-form + Zod
- **HTTP:** ofetch
- **Auth:** JWT (httpOnly cookies) + Google OAuth (@react-oauth/google)
- **Package manager:** Bun

### Backend
- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **Database:** PostgreSQL via Prisma ORM
- **Cache:** Redis (OTP codes, registration payloads)
- **File uploads:** Multer → Cloudinary
- **Email:** Nodemailer + EJS templates
- **Payments:** Stripe (Checkout Sessions + Webhooks)
- **Auth:** JWT access + refresh tokens, bcrypt, Google OAuth (google-auth-library)

---

## Features

### Resident
- Register with email + OTP verification, or Google OAuth
- Report maintenance issues with up to 5 photos
- Track issue status in real time
- Chat with the assigned maintenance worker
- Confirm repairs (with 1–5 star rating) or dispute them
- View and pay monthly maintenance invoices via Stripe

### Manager
- Review and prioritize the community issue queue
- Assign workers with priority levels (Low / Medium / High / Urgent)
- Monitor all open jobs in one dashboard
- Generate maintenance invoices for all residents or individual ones
- View community stats (issues by status, revenue, avg resolution time)

### Worker
- See only jobs assigned to them
- Start jobs and log progress notes with photos
- Mark jobs as done (triggers resident confirmation)
- Chat with the resident on each job

### Admin
- Full platform oversight
- Create Manager, Worker and Admin accounts (sends credentials by email)
- Ban, unban or soft-delete any user
- Manage communities and issue categories
- View platform-wide stats and a complete audit log

---

## Issue Lifecycle
REPORTED → ASSIGNED → IN_PROGRESS → PENDING_CONFIRMATION → CLOSED
→ DISPUTED → ASSIGNED (cycle repeats)
REPORTED → REJECTED


---

## Project Structure

src/
├── app/ # Next.js App Router
│ ├── (public)/ # Public pages (home, about, auth)
│ ├── (private)/ # Protected dashboard pages
│ │ ├── resident/
│ │ ├── manager/
│ │ ├── worker/
│ │ └── admin/
│ └── api/session/ # Session route handler
├── components/
│ ├── layout/ # Navbar, footer, theme toggle
│ └── ui/ # shadcn components + loaders
├── features/
│ ├── auth/ # Auth forms, hooks, API
│ ├── issues/ # Issue components, hooks, API
│ ├── manager/ # Manager-specific components
│ ├── worker/ # Worker-specific hooks, API
│ ├── admin/ # Admin components, hooks, API
│ ├── chat/ # Chat box, hooks, API
│ ├── payments/ # Invoice components, hooks, API
│ ├── profile/ # Profile view and edit
│ └── home/ # Landing page sections
├── providers/ # QueryProvider, ThemeProvider, GoogleProvider
├── lib/
│ ├── api/ # ofetch client (browser + server)
│ ├── auth/ # JWT session reader
│ └── constants/ # Cookie names, role homes
└── shared/types/ # Shared TypeScript types


---

## Getting Started

### Prerequisites
- Node.js 20+
- Bun 1.4+
- PostgreSQL
- Redis
- Stripe account
- Google OAuth credentials
- Cloudinary account

### Frontend setup

```bash
# Clone the repo
git clone [repo-url]
cd fix-flow-frontend

# Install dependencies
bun install

# Create environment file
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
API_URL=http://localhost:5000/api/v1
```

```bash
# Run development server
bun dev
```

### Backend setup

```bash
cd fix-flow-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Seed the first admin account
npx prisma db seed

# Run development server
npm run dev
```

### Stripe webhooks (local development)

```bash
# Install Stripe CLI, then run:
stripe listen --forward-to localhost:5000/api/v1/payment/webhook
```

Keep this running in a separate terminal while testing payments.

---

## Environment Variables

### Frontend (`.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Public API base URL (used by browser) |
| `NEXT_PUBLIC_APP_URL` | Frontend app URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `API_URL` | Server-side API URL (used by proxy middleware) |

### Backend (`.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | JWT access token secret |
| `JWT_REFRESH_SECRET` | JWT refresh token secret |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiry (e.g. `1d`) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry (e.g. `7d`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `REDIS_HOST` | Redis host |
| `REDIS_PORT` | Redis port |
| `REDIS_USER` | Redis username |
| `REDIS_PASSWORD` | Redis password |
| `SMTP_USER` | Email sender address |
| `SMTP_PASSWORD` | Email sender password |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `FRONTEND_URL` | Frontend URL for Stripe redirects |
| `BCRYPT_SALT_ROUNDS` | bcrypt salt rounds (e.g. `12`) |

---

## API Overview

All endpoints are prefixed with `/api/v1`.

| Module | Base path |
|--------|-----------|
| Auth | `/auth` |
| Profile | `/users` |
| Communities | `/community` |
| Categories | `/categories` |
| Issues | `/issue` |
| Chat | `/issue/messages` |
| Invoices | `/invoice` |
| Payments | `/payment` |
| Admin | `/admin` |

---

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Railway / Render)
1. Push to GitHub
2. Connect to Railway or Render
3. Set environment variables
4. Deploy

### Post-deployment checklist
- [ ] Add production URL to Google OAuth authorized origins
- [ ] Add production webhook URL in Stripe dashboard
- [ ] Update `FRONTEND_URL` in backend env to production URL
- [ ] Update `NEXT_PUBLIC_API_URL` and `API_URL` in frontend env to production backend URL

---

## Known Limitations

- `InvoiceStatus.OVERDUE` is computed client-side by comparing `dueDate` to the current date. The backend never auto-flips it.
- Chat uses REST polling (5-second interval) instead of WebSockets.
- No push notifications (planned for future release).
- Worker payment (paying workers for completed jobs) is out of scope and handled outside the platform.

---

## License

MIT
