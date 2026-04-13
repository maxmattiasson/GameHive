# GameHive

A fullstack game library project where you can add, read, update, and delete games without losing your mind.

Frontend is React, backend is Express, and MongoDB stores the data.

Quick version:

- Frontend shows the game list
- Backend handles CRUD routes
- Filtering works with query params

## Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: MongoDB + Mongoose
- Monorepo: npm workspaces

## Structure

```text
GameHive/
  apps/
    backend/
    web/frontend/
```

## Get started

Run everything from the repo root:

```bash
npm install
```

## Run the dev environment

Run both (frontend + backend):

```bash
npm run dev:both
```

Run backend only:

```bash
npm run dev:backend
```

Run frontend only:

```bash
npm run dev:web
```

You can also run directly inside each app:

```bash
cd apps/backend
npm run dev
```

```bash
cd apps/web/frontend
npm run dev
```

Default ports:

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

If you only want one command and vibes, use dev:both.

## Environment variables

Create a .env file in apps/backend:

```env
MONGO_URI=your_mongo_connection_string
NODE_ENV=development
PORT=3000
```

## API

Base URL:

```text
http://localhost:3000/api
```

Current routes:

- GET /games (list + filters)
- GET /games/:id (single game)
- POST /games (create)
- PATCH /games/:id (partial update)
- DELETE /games/:id (remove)

Filters on GET /games:

- title
- genre
- created
- dev
- multiplayer (true or false)

Example:

```http
GET /api/games?genre=Horror&multiplayer=true
```

Create a game:

```http
POST /api/games
Content-Type: application/json

{
  "title": "Mimesis",
  "created": "2025",
  "dev": "ReLU Games",
  "genre": "Horror",
  "multiplayer": true
}
```

## Why this project exists

We built this to practice real fullstack flow in one repo:

- build API routes
- connect database
- wire frontend to backend
- debug actual runtime issues

Small app, but very real dev workflow.
