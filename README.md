# Patientor

A full-stack web application for managing patient medical information.

## Tech Stack

**Frontend:** React, TypeScript, Vite, React Router, Tailwind CSS  
**Backend:** Node.js, Express, TypeScript

## Project Structure

```
patientor/
├── backend/                    # API server
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   └── server.ts          # Express configuration
│   ├── build/                 # Compiled output
│   ├── package.json           # Backend dependencies
│   ├── tsconfig.json          # TypeScript config
│   └── eslint.config.mjs      # ESLint configuration
│
├── frontend/                  # React client
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── layouts/
│   │   │   └── main-layout.tsx
│   │   ├── pages/
│   │   │   ├── patient-list.tsx
│   │   │   └── home.tsx
│   │   ├── types/
│   │   │   └── patient.ts     # Type definitions
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── public/
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite configuration
│   └── tsconfig.json          # TypeScript config
│
└── README.md                  # Project documentation
```

## Setup

### Backend

```bash
cd backend
pnpm install
pnpm dev
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

## Development

- Backend: http://localhost:3000
- Frontend: http://localhost:5173
