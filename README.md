## Resume Project 1

Full‑stack MERN application with an Express/MongoDB API and a React (Vite) client. Includes authentication (email/password and Google OAuth), user profile management, and listings CRUD endpoints.

### Stack
- **Server**: Node.js, Express, Mongoose, JWT, Cookie Parser, dotenv
- **Client**: React 19, Vite, React Router, Redux Toolkit, Redux Persist, Tailwind CSS
- **Auth**: JWT; Google OAuth via Firebase (client)

## Prerequisites
- Node.js 18+ and npm
- A MongoDB connection string
- Firebase project for Google auth (if using OAuth)

## Monorepo Layout
- `api/` — Express server and routes
- `client/` — React app (Vite)

## Setup
1) Clone and install root/server deps
```bash
npm install
```

2) Install client deps
```bash
cd client && npm install
```

3) Create a server `.env` file in `api/`
```bash
# api/.env
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=3000
```

4) Configure Firebase in the client
- Update `client/src/firebase.js` with your Firebase config for Google OAuth.

## Scripts
- Root/server (from repo root):
  - `npm run dev` — start API with nodemon at `http://localhost:3000`
  - `npm start` — start API with node
- Client (from `client/`):
  - `npm run dev` — Vite dev server (defaults to `http://localhost:5173`)
  - `npm run build` — production build
  - `npm run preview` — preview built client

## How to Run (Local)
In two terminals:
1) API (root):
```bash
npm run dev
```
2) Client (in `client/`):
```bash
npm run dev
```

## API
Base URL: `http://localhost:3000/api`

### Auth Routes (`/auth`)
- `POST /signup` — Register new user
- `POST /signin` — Sign in with email/password
- `POST /google` — Sign in with Google (token from client)
- `GET /signout` — Clear auth session

### User Routes (`/user`)
- `GET /test` — Health/test endpoint
- `POST /update/:id` — Update user info (JWT required)
- `DELETE /delete/:id` — Delete user (JWT required)
- `GET /listings/:id` — Get listings for a user (JWT required)

### Listing Routes (`/listing`)
- `POST /create` — Create a listing (consider protecting with JWT)
- `GET /:id` — Get a listing by id (JWT required)

### Middleware
- `verifyToken` — protects routes with JWT; reads token from cookies/headers

## Environment and Config Notes
- Server reads env from `api/.env` via `dotenv`.
- Server listens on `PORT` (defaults to 3000 in code) and connects to `MONGO`.
- Client uses Firebase for Google OAuth; ensure the authorized domains include your dev URL.

## Development Notes
- The root `package.json` `dependencies` include both `mongoose` and a placeholder `mogoose`. Keep only `mongoose`.
- In `api/index.js`, the import is `mongooose`; ensure it matches `mongoose`:
  - Example: `import mongoose from 'mongoose'` then `mongoose.connect(process.env.MONGO)`.
- Protect listing creation with `verifyToken` if listings should be user‑scoped.

## License
ISC (see `package.json`).





