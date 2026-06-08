# Sequence Diagrams for Users Data Flows

This file contains Mermaid sequence charts for three key processes in the GameHive project:

1. Registering a new user
2. Authenticating a user logging in (with `user`, `dev`, and `admin` roles)
3. Example case: A user accessing a game in their library and writing a review for that game.

This will demonstrate the application's typical internal interactions, while also highlighting how authentication and role-based access control ensures safe handling of user's data.
---

## 1. Registering a New User

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DB

    User->>Frontend: Fill signup form (username, email, password)
    Frontend->>Backend: POST /api/auth/signup
    Backend->>Backend: validateRequest(signupSchema)
    Backend->>DB: User.findOne({ email: lowercasedEmail })
    alt user exists
        DB-->>Backend: existing user found
        Backend-->>Frontend: 400 User already exists
    else new user
        Backend->>Backend: bcrypt.hash(password)
        Backend->>DB: new User.save()
        DB-->>Backend: saved user document
        Backend->>Backend: sign JWT token with userId, email, username, role
        Backend-->>Frontend: 201 User created + Set-Cookie token
        Frontend->>User: Show account created confirmation
    end
```

---

## 2. Authenticating a User Logging In

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DB

    User->>Frontend: Submit login form (email, password)
    Frontend->>Backend: POST /api/auth/login
    Backend->>Backend: validateRequest(loginSchema)
    Backend->>DB: User.findOne({ email: normalizedEmail })
    alt invalid credentials
        DB-->>Backend: user not found or password mismatch
        Backend-->>Frontend: 401 Invalid email or password
    else valid credentials
        Backend->>Backend: bcrypt.compare(password, passwordHash)
        Backend->>Backend: sign JWT token with userId, email, username, role
        Backend-->>Frontend: 200 Login successful + Set-Cookie token

        alt standard user
            note right of Backend: JWT role = user
        else developer user
            note right of Backend: JWT role = dev
        else admin user
            note right of Backend: JWT role = admin
        end
    end

    note over Frontend,Backend: The role is stored in the JWT cookie and used by protected routes.

    Backend->>Backend: authMiddleware reads token from req.cookies.token
    Backend->>Backend: requireRole("dev","admin") guards dev-only routes like POST /api/games
```

---

## 3. Accessing a Game in Library to Write a Review

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DB

    User->>Frontend: Open library page
    Frontend->>Backend: GET /api/library with cookie
    Backend->>Backend: authMiddleware validates JWT in cookie
    Backend->>DB: Library.find({ user: userId })
    DB-->>Backend: library items
    Backend-->>Frontend: 200 Library games list

    User->>Frontend: Select game from library 
    Frontend->>Backend: GET /api/games/:gameId
    Backend->>DB: Game.findById(gameId)
    DB-->>Backend: game details
    Backend-->>Frontend: 200 Game details
    User->>Frontend: Choose write review
    Frontend->>Backend: POST /api/games/:gameId/reviews
    Backend->>Backend: authMiddleware validates JWT
    Backend->>Backend: validateRequest(params: gameId, body: createReviewSchema)
    Backend->>DB: new Review({ game: gameId, user: userId, text, rating }).save()
    DB-->>Backend: saved review
    Backend->>Backend: updateGameAverageRating(gameId)
    Backend->>DB: Review.aggregate(...) then Game.findByIdAndUpdate(gameId)
    DB-->>Backend: updated avg rating
    Backend-->>Frontend: 201 Review created
    Frontend->>User: Show review published confirmation
```

---

### Notes

- `POST /api/auth/signup` creates a new user, hashes the password, stores the user, then signs a JWT cookie.
- `POST /api/auth/login` authenticates the user and issues a JWT cookie containing `role`.
- `authMiddleware` reads the token from `req.cookies.token` and sets `req.user`.
- `requireRole("dev","admin")` is used for developer/admin restricted routes such as creating games, moderating reviews and managing user accounts.
- Review creation is protected by `authMiddleware` and uses `POST /api/games/:gameId/reviews`. Only authenticated users can write reviews and only for games in their library. The average rating is updated after each new review.
