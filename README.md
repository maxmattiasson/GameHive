# GameHive

GameHive is a fullstack "mini-Steam" platform where users can manage their game library, track playtime, unlock achievements, connect with friends, write reviews, and compete on leaderboards.

Developed as part of the Fullstack JavaScript program at Chas Academy.

## Quick Overview

- Personal game library and playtime tracking
- Achievements and progression
- Friend system
- Reviews and ratings
- Per-game leaderboards
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

## Features

- Game catalog with genres and metadata
- Personal library and playtime
- Achievements and progression
- Friend system and friend requests
- Per-game leaderboards
- Reviews and ratings
- Role-based login (player/developer/admin)

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

## Contact

Questions or bugs? Create an issue or contact the project owner via GitHub.

---

_See also [DOKUMENTATION.md](DOKUMENTATION.md) and [PROJEKTBESKRIVNING.md](PROJEKTBESKRIVNING.md) for more info._

## Getting Started Locally

### 1. Prerequisites

- Node.js (LTS recommended)
- npm
- A running MongoDB instance (local or cloud)

### 2. Install Dependencies

From the project root:

```bash
npm install
```

### 3. Configure Environment Variables

Create a file named .env in apps/backend with the following values:

```env
MONGO_URI=your_mongo_connection_string
NODE_ENV=development
PORT=3000
```

### 4. Run the Project

Run frontend and backend together:

```bash
npm run dev:both
```

Run only backend:

```bash
npm run dev:backend
```

Run only frontend:

```bash
npm run dev:web
```

Default local URLs:

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

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

## Roles (RBAC)

- Admin
- Developer
- Player

## GDPR Considerations

- Personal gameplay and usage history are treated as user data
- Friendship connections and user profiles are personal data
- Users should be able to export and delete their gameplay history

## Main Features in This Repository

- REST API for game resources and filtering
- Frontend game list and game management views
- MongoDB persistence with Mongoose models
- Monorepo setup with separate backend and frontend apps

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: MongoDB, Mongoose
- Repository setup: npm workspaces (monorepo)

## Project Structure

```text
GameHive/
  apps/
    backend/
    web/frontend/
```

## API Overview

Base URL:

```text
http://localhost:3000/api
```

Current routes:

- GET /games
- GET /games/:id
- POST /games
- PATCH /games/:id
- DELETE /games/:id

Available filters on GET /games:

- title
- genre
- created
- dev
- multiplayer

## Planned (Missing / In Progress)

### Planned Backend

- Friendship requests and friend management
- Review system with helpful/not-helpful voting
- Per-game leaderboard endpoints with ranking
- Complete RBAC enforcement for Admin, Developer, and Player actions
- GDPR tools for data export and account/game-history deletion requests

### Planned Frontend

- Player dashboard for library, playtime, and achievement progress
- Friends UI for requests, accepted friends
- Review and rating interface with helpful/not-helpful actions
- Leaderboard pages
- **Admin profile page** with:
  - Form to add new achievements
  - Ability to remove users from the platform

## Contributors

<a href="https://github.com/maxmattiasson/GameHive/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxMattiasson/GameHive" alt="contrib.rocks image" />
</a>
