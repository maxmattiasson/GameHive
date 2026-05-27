# GameHive

GameHive is a fullstack "mini-Steam" platform where users can manage their game library, track playtime, unlock achievements, connect with friends, write reviews, and compete on leaderboards.

Developed as part of the Fullstack JavaScript program at Chas Academy.

## Quick Overview

- Manage your personal game library and track playtime
- Unlock achievements and view progression
- Connect with friends and send friend requests
- Write reviews and rate games
- Compete on per-game leaderboards
- Role-based login (player/developer/admin)

## Folder Structure

```text
GameHive/
  apps/
    backend/      # REST API, database, authentication, seeders
    web/frontend/ # React UI, pages, components, hooks
```

**backend/**: Node.js/Express, MongoDB, authentication, API, data models, seeders

**web/frontend/**: React, TypeScript, Vite, UI components, hooks, pages

## Features

- Game catalog with genres and metadata
- REST API for game resources and filtering
- Frontend game list and game management views
- MongoDB persistence with Mongoose models
- Monorepo setup with separate backend and frontend apps

## Roles (RBAC)

- Admin
- Developer
- Player

## Data Models

- User
- Game
- Genre
- Library
- Achievement
- UserAchievement
- Friendship
- Review
- Leaderboard

## GDPR

- User data (games, friends, profile) is treated as personal data
- Users can export and delete their game history

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB, Mongoose
- **Repo:** npm workspaces (monorepo)

## Contributing

1. Fork and create a new branch
2. Make your changes and commit
3. Submit a Pull Request

## Installation & Getting Started

### 1. Clone the repo and install dependencies

```bash
git clone <repo-url>
cd GameHive
npm install
```

### 2. Environment variables

Create a `.env` file in `apps/backend`:

```env
MONGO_URI=your_mongodb_url
NODE_ENV=development
PORT=3000
```

### 3. Start the project

Start both backend and frontend:

```bash
npm run dev:both
```

Backend only:

```bash
npm run dev:backend
```

Frontend only:

```bash
npm run dev:web
```

**Default URLs:**

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Test the API

Example with [route.rest](apps/backend/route.rest) or curl:

```bash
curl http://localhost:3000/api/games
```

Example routes:

- GET /api/games
- GET /api/games/:id
- POST /api/games
- PATCH /api/games/:id
- DELETE /api/games/:id

Filtering on GET /games: `title`, `genre`, `created`, `dev`, `multiplayer`

## Main Features in This Repository

- REST API for game resources and filtering
- Frontend game list and game management views
- MongoDB persistence with Mongoose models
- Monorepo setup with separate backend and frontend apps

## Planned (Missing / In Progress)

### Planned Backend

- Per-game leaderboard endpoints with ranking
- Complete RBAC enforcement for Admin, Developer, and Player actions
- GDPR tools for data export and account/game history deletion

### Planned Frontend

- Leaderboard pages
- Improved UI for friend management and friend requests

## Contributors

<a href="https://github.com/maxmattiasson/GameHive/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxMattiasson/GameHive" alt="contrib.rocks image" />
</a>
