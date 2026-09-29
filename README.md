# Registrationlogin

React and Express authentication app with JWT-based registration, login, protected profile access, and password reset.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Set a private, random `JWT_SECRET` in `backend/.env`, then start the API:

```powershell
npm start
```

The API runs on port `5000` by default. SQLite creates `backend/data/users.sqlite` on first start; this local database is not committed.

## Frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build, run `npm run build` from `frontend`.

## Password reset

Password reset is currently simulated: the backend prints a reset link to its console rather than sending email.