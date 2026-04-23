# GameHive

GameHive is built as a fullstack GameVault project: a mini-Steam style platform where users can manage a personal game library, track playtime, unlock achievements, connect with friends, write reviews, and compete on leaderboards.

This application is developed as part of the Fullstack JavaScript / JavaScript-utvecklarprogrammet at Chas Academy.

## What The Application Is For

The purpose of the app is to provide a domain-specific fullstack gaming platform that handles ownership, progression, social features, and discovery in one system.

Instead of spreading game data across disconnected tools, users and developers get one structured platform for:

- game metadata and catalog management
- personal library ownership and playtime tracking
- social interaction through friendships and reviews
- competitive progression with achievements and leaderboards

## Functionality

### Core Functional Requirements

- Game catalog with genres, platforms, and metadata
- User library with owned games and playtime tracking
- Achievement system with rules and progress tracking
- Friend system with requests and status handling
- Per-game leaderboards with ranking and filtering
- Reviews and ratings with helpful/not-helpful voting
- User registration and login flow with Player as the default role
- Developer application flow through a contact form on the website
- Developer role approval flow that unlocks developer-level access
- Developer login with permission to upload and manage published games

### Authentication And Role Upgrade Flow

1. A new user registers as a Player.
2. The user logs in as a Player and can use player features.
3. A user who wants to become a Developer contacts us through the website form.
4. After approval, the user account gets Developer permissions.
5. The user can then log in as a Developer and upload games to the platform.

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

- Full achievement flow: definitions, unlock rules, and user progress endpoints
- Library ownership and playtime tracking per user
- Friendship requests and friend status management
- Review system with helpful/not-helpful voting
- Per-game leaderboard endpoints with ranking and filtering logic
- Complete RBAC enforcement for Admin, Developer, and Player actions
- GDPR tools for data export and account/game-history deletion requests

### Planned Frontend

- Player dashboard for library, playtime, and achievement progress
- Friends UI for requests, accepted friends.
- Review and rating interface with helpful/not-helpful actions
- Leaderboard pages with sorting and filter controls
- Developer portal for uploading and managing published games end-to-end

## Contributors

<a href="https://github.com/maxmattiasson/GameHive/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxMattiasson/GameHive" alt="contrib.rocks image" />
</a>
