# GameHive

GameHive is a fullstack "mini-Steam" platform where users can build and manage a game library, track playtime, unlock achievements, connect with friends, and write reviews.

Developed as part of the Fullstack JavaScript program at Chas Academy.

## Project Status

This project is complete for the scope in this repository.

Delivered:

- Backend REST API (Node.js, Express, TypeScript, MongoDB)
- Web frontend (React, TypeScript, Vite)
- Authentication with JWT cookie and role-based access control
- Core social and library flows (friends, reviews, achievements, profile)

## Project Documents

- [Users Data Flows](USERS_DATA_FLOWS.md)

  Graphs of the signup och login flows, showing how user data is processed and stored in the system.

- [Friends Data Flows](FRIENDS_REQUEST_AND_ACCEPT_PROCESS.md)

  Graphs of the friend request and accept process, showing a good example of API interactions and data flows between users and the system.

- [GDPR Compliance](GDPR.md)

  Overview of how user data is stored, logged, and protected in compliance with GDPR regulations.
  
## Monorepo Structure

```text
GameHive/
  apps/
    backend/      # REST API, authentication, DB models, tests
    web/frontend/ # React web app
```

## Implemented Features

**Authentication**
- Signup, login, logout, and "me" endpoint
- JWT cookie-based sessions
- Role-based authorization (user, dev, admin)

**Games**
- List and filter games
- Get game by id
- Create/update/delete games (role-protected)
- Dev-only endpoint for "my games"

**Library**
- Get own library
- Add game to library
- Update playtime
- Remove game from library

**Reviews**
- Create review per game
- List reviews per game
- Update and delete own review (admin override)
- Vote helpful/not helpful and remove vote
- Automatic game average rating updates

**Friends**
- Send friend request
- List pending requests
- Accept/reject requests
- Remove friend
- List own friends and friends by user id

**Users & Profile**
- List/search users (role-aware output)
- Get user profile by id
- Get user library, achievements, and reviews
- Update own avatar
- Delete user with related data cleanup

**Achievements & Genres**
- List achievements
- List genres

**External Data**
- RAWG proxy endpoint for game search

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Backend: Node.js, Express 5, TypeScript
- Database: MongoDB, Mongoose
- Validation: Zod
- Testing: Jest + Supertest
- Workspace: npm workspaces

## Requirements

- Node.js (LTS recommended)
- npm
- MongoDB instance (local or cloud)
- RAWG API key (only needed for `/api/rawg`)

## Installation

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd GameHive
npm install
```

### 2. Configure environment variables

Create a `.env` file in `apps/backend`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
RAWG_KEY=your_rawg_api_key
```

**Notes:**

`MONGO_URI` and `JWT_SECRET` are required. To generate a secure `JWT_SECRET`, we recommend running the following command in your terminal: 
```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
``` 
`RAWG_KEY` is required if you use `/api/rawg`.

### 3. Start the project

Start backend and frontend together:

```bash
npm run dev:both
```

Or start separately:

```bash
npm run dev:backend
npm run dev:web
```

Default URLs:

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Testing

Run backend test suite:

```bash
npm run test -w @gamehive/backend
```

## API Examples

Example with `route.rest` in `apps/backend/route.rest` or curl:

```bash
curl http://localhost:3000/api/games
```

Key route groups:

- `/api/auth`
- `/api/games`
- `/api/library`
- `/api/reviews`
- `/api/friends`
- `/api/users`
- `/api/profile`
- `/api/achievements`
- `/api/genres`
- `/api/rawg`



## Swagger API Documentation

The backend exposes static API docs at:

- `http://localhost:3000/api/docs`

This UI is driven by `apps/backend/src/swagger.json` and documents the available REST endpoints, request bodies, and response models.

**Note:**

- This tool is setup to only work in development mode on a local instance. It is not intended for production use but is a helpful reference for development and testing.
- The documentation is manually maintained, so if changes are made to the API routes, the `swagger.json` file should be updated accordingly to keep the docs accurate.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## Contributors

<p align="center">
  <a href="https://github.com/maxmattiasson/GameHive/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=maxMattiasson/GameHive" alt="contrib.rocks image" />
  </a>
</p>
