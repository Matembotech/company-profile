# Matembo Tech — Company Website

**Full-stack web application** for Matembo Tech, a technology company specializing in AI automation, software development, and digital transformation. Built with Next.js 16 on the frontend and Express.js 5 on the backend.

---

## Tech Stack

| Layer      | Technology                                                                |
| ---------- | ------------------------------------------------------------------------- |
| Frontend   | Next.js 16, React 19, TypeScript, Tailwind CSS v4                         |
| Backend    | Express.js 5, Node.js, MongoDB (Mongoose)                                 |
| Auth       | JWT + Passport (Local & Google OAuth), Supabase Auth                      |
| AI         | Z-AI (OpenAI-compatible), OpenAI API                                      |
| Email      | Resend                                                                    |
| Booking    | Cal.com embed                                                            |
| Animation  | GSAP (ScrollTrigger), Framer Motion                                       |
| UI         | Reshaped, Lucide React, Font Awesome                                      |
| Fonts      | Mona Sans (local), Geist                                                  |

---

## Project Structure

```
matembo-company/
├── frontend-nextjs/          # Next.js 16 frontend
│   ├── app/
│   │   ├── (auth)/           # Sign in / Sign up pages
│   │   ├── about/            # About page
│   │   ├── api/contact/      # Contact form API route (Resend)
│   │   ├── contact/          # Contact page
│   │   ├── context/          # AuthContext (Supabase)
│   │   ├── portfolio/        # Portfolio sub-pages
│   │   │   ├── website-design/
│   │   │   ├── app-design/
│   │   │   └── graphics-design/
│   │   ├── privacy-policy/
│   │   ├── services/
│   │   ├── terms-and-conditions/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx          # Landing page (Home)
│   ├── components/
│   │   ├── Auth/             # Login, Signup, LogoutModal
│   │   ├── NavBar/           # Navigation + mobile sidebar
│   │   ├── ui/               # Shared UI primitives
│   │   ├── BookCallButton.tsx  # Cal.com booking CTA
│   │   ├── FAQ.tsx           # FAQ accordion section
│   │   ├── Footer.tsx        # Site-wide footer
│   │   ├── HeroPage.tsx      # Hero section
│   │   ├── NavLink.tsx       # Nav link component
│   │   ├── Projects.tsx      # Projects showcase
│   │   ├── ReadyToStart.tsx  # CTA section
│   │   ├── Services.tsx      # Services overview
│   │   └── TechStack.tsx     # Tech stack showcase
│   ├── fonts/                # Mona Sans (woff2)
│   ├── icons/                # SVG icon library
│   ├── public/               # Static assets & images
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
│
└── backend-expressjs/        # Express.js 5 backend
    ├── src/
    │   ├── config/           # DB, env, Passport, Z-AI client
    │   ├── controllers/      # Auth, User, AI controllers
    │   ├── middleware/        # Auth, role, validation
    │   ├── models/           # Mongoose models (User)
    │   ├── routes/           # Auth, User, AI routes
    │   ├── utils/            # Utility helpers
    │   └── validators/       # Express-validator schemas
    ├── app.js                # Express app setup
    ├── server.js             # HTTP server entry point
    └── package.json
```

---

## Features

### Frontend
- **Landing Page** — Hero, Achievements, About, Services, Projects, FAQ, CTA, Tech Stack
- **Portfolio** — Categorized sub-pages (Website Design, App Design, Graphics Design) with lightbox galleries
- **Authentication** — Sign in / Sign up with email or Google OAuth via Supabase
- **Contact Form** — Multi-step form with Resend email delivery
- **Booking** — Cal.com modal integration for scheduling calls
- **Responsive** — Mobile sidebar navigation, fully adaptive layout
- **Animations** — GSAP ScrollTrigger reveal animations, Framer Motion transitions
- **Dark Theme** — Custom dark UI with `#242424` background and accent `#0F9BD0`

### Backend
- **Authentication** — JWT-based auth with local (email/password) and Google OAuth strategies
- **AI Chat** — Chat endpoint powered by Z-AI (OpenAI-compatible) with `glm-4.7-flash` model
- **User Management** — CRUD operations with role-based access control
- **Security** — Password hashing (bcrypt), input validation (express-validator), CORS
- **Database** — MongoDB with Mongoose ODM

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** (local or Atlas)

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Matembotech/matembo-company.git
cd matembo-company

# Install frontend dependencies
cd frontend-nextjs
npm install

# Install backend dependencies
cd ../backend-expressjs
npm install
```

### 2. Environment Variables

**Frontend** (`frontend-nextjs/.env`):

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
RESEND_API_KEY=<your-resend-api-key>
RESEND_FROM_EMAIL=<sender-email>
RESEND_TO_EMAIL=<recipient-email>
```

**Backend** (`backend-expressjs/.env`):

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=7d
ZAI_API_KEY=<your-z-ai-api-key>
OPENAI_API_KEY=<your-openai-api-key>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
SESSION_SECRET=<your-session-secret>
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend-expressjs
npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend-nextjs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Available Scripts

### Frontend

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start Next.js dev server (port 3000) |
| `npm run build` | Production build                   |
| `npm run start` | Start production server            |
| `npm run lint`  | Run ESLint                         |

### Backend

| Command      | Description                          |
| ------------ | ------------------------------------ |
| `npm run dev` | Start Express server with nodemon (port 5000) |

---

## API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| POST   | `/api/auth/register`  | Register new user      |
| POST   | `/api/auth/login`     | Login (returns JWT)    |
| GET    | `/api/auth/google`    | Initiate Google OAuth  |
| GET    | `/api/auth/google/callback` | Google OAuth callback |

### Users — `/api/users`

| Method | Endpoint       | Description       | Auth Required |
| ------ | -------------- | ----------------- | ------------- |
| GET    | `/api/users/me` | Get current user  | Yes           |

### AI Chat — `/api/ai`

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| POST   | `/api/ai/chat` | Send prompt, get AI response |

---

## Deployment

### Frontend (Vercel)

```bash
cd frontend-nextjs
npm run build
```

Deploy the `frontend-nextjs` folder to [Vercel](https://vercel.com). Set environment variables in the Vercel dashboard.

### Backend

The Express server can be deployed to any Node.js hosting platform (Railway, Render, DigitalOcean, etc.).

```bash
cd backend-expressjs
node server.js
```

---

## Key Dependencies

### Frontend

| Package              | Purpose                          |
| -------------------- | -------------------------------- |
| next                 | React framework                  |
| react / react-dom    | UI library                       |
| typescript           | Type safety                      |
| tailwindcss          | Utility-first CSS                |
| gsap / @gsap/react   | Scroll & entrance animations     |
| framer-motion        | Declarative animations           |
| @supabase/supabase-js| Auth & database client           |
| resend               | Transactional email              |
| @calcom/embed-react  | Booking widget                   |
| lucide-react         | Icon library                     |
| reshaped             | UI component primitives          |
| axios                | HTTP client                      |

### Backend

| Package              | Purpose                          |
| -------------------- | -------------------------------- |
| express              | HTTP framework                   |
| mongoose             | MongoDB ODM                      |
| bcrypt               | Password hashing                 |
| jsonwebtoken         | JWT auth tokens                  |
| passport             | Auth middleware                   |
| passport-google-oauth20 | Google OAuth strategy         |
| openai               | OpenAI API client                |
| express-validator    | Input validation                 |
| cors                 | Cross-origin requests            |
| dotenv               | Environment variables            |

---

## License

This project is proprietary. All rights reserved © Matembo Tech.
