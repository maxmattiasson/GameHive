# GameHive API
Static OpenAPI documentation for the GameHive backend.

## Version: 1.0.0

### POST /auth/login

Login user

**Responses**

**200**: *Login successful*

**401**: *Invalid credentials*

---

### POST /auth/signup

Create a new account

**Responses**

**201**: *User created*

**400**: *User already exists or validation failed*

---

### POST /auth/logout

Logout current user

**Responses**

**200**: *Logged out*

---

### GET /auth/me

Get currently authenticated user

**Responses**

**200**: *Authenticated user info*

**401**: *Unauthorized*

**Security Schema**: cookieAuth

---

### GET /users

List users

**Responses**

**200**: *List of users*

**Security Schema**: cookieAuth

---

### GET /users/search

Search users by query

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| query | query |  | Yes | string |

**Responses**

**200**: *Search results*

**Security Schema**: cookieAuth

---

### GET /users/{id}

Get a user by ID

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *User data*
**404**: *User not found*

**Security Schema**: cookieAuth

---

### DELETE /users/{id}

Delete a user by ID

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *User deleted*

**Security Schema**: cookieAuth

---

### GET /users/{id}/library

Get a user's library

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *User library entries*

**Security Schema**: cookieAuth

---

### GET /users/{id}/achievements

Get achievements for a user

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *User achievements*

**Security Schema**: cookieAuth

---

### GET /users/{id}/reviews

Get reviews written by a user

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *User reviews*

**Security Schema**: cookieAuth

---

### PATCH /users/me/avatar

Update avatar for authenticated user

**Responses**

**200**: *Avatar updated*

**Security Schema**: cookieAuth

---

### GET /games

List all games

**Responses**

**200**: *List of games*

---

### POST /games

Create a new game

**Responses**

**201**: *Game created*

**Security Schema**: cookieAuth

---

### GET /games/my-games

List games owned by authenticated developer

**Responses**

**200**: *Developer owned games*

**Security Schema**: cookieAuth

---

### GET /games/{id}

Get game details

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *Game details*

---

#### PATCH /games/{id}

Update a game

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *Game updated*

**Security Schema**: cookieAuth

---

#### DELETE /games/{id}

Delete a game

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *Game deleted*

**Security Schema**: cookieAuth

---

### GET /games/{gameId}/reviews

List reviews for a game

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [GameIdParam](#gameidparam) |

**Responses**

**200**: *Game reviews*

---

#### POST /games/{gameId}/reviews

Create a review for a game

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [GameIdParam](#gameidparam) |

**Responses**

**201**: *Review created*

**Security Schema**: cookieAuth

---

### GET /library

Get current user's library

**Responses**

**200**: *Library entries*

**Security Schema**: cookieAuth

---

#### POST /library

Add a game to library

**Responses**

**201**: *Game added to library*

**Security Schema**: cookieAuth

---

### PATCH /library/{gameId}

Update library entry

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [GameIdParam](#gameidparam) |

**Responses**

**200**: *Library entry updated*

**Security Schema**: cookieAuth

---

#### DELETE /library/{gameId}

Remove a game from library

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [GameIdParam](#gameidparam) |

**Responses**

**200**: *Library entry removed*

**Security Schema**: cookieAuth

---

### POST /friends/requests

Send a friend request

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [FriendIdParam](#friendidparam) |

**Responses**

**201**: *Friend request sent*

**Security Schema**: cookieAuth

---

#### GET /friends/requests

Get pending friend requests

**Responses**

**200**: *Pending requests*

**Security Schema**: cookieAuth

---

### PATCH /friends/requests/{id}/accept

Accept a friend request

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *Request accepted*

**Security Schema**: cookieAuth

---

### DELETE /friends/requests/{id}

Reject a friend request

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *Request rejected*

**Security Schema**: cookieAuth

---

### DELETE /friends/{id}

Remove a friend

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *Friend removed*

**Security Schema**: cookieAuth

---

#### GET /friends/{id}

Get friends for a user

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [IdParam](#idparam) |

**Responses**

**200**: *Friends list*

**Security Schema**: cookieAuth

---

### GET /friends

Get the current user's friends

**Responses**

**200**: *Friends list*

**Security Schema**: cookieAuth

---

### DELETE /reviews/{reviewId}

Delete a review

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [ReviewIdParam](#reviewidparam) |

**Responses**

**200**: *Review deleted*

**Security Schema**: cookieAuth

---

#### PATCH /reviews/{reviewId}

Update a review

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [ReviewIdParam](#reviewidparam) |

**Responses**

**200**: *Review updated*

**Security Schema**: cookieAuth

---

### POST /reviews/{reviewId}/vote

Vote on a review

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [ReviewIdParam](#reviewidparam) |

**Responses**

**200**: *Vote added*

**Security Schema**: cookieAuth

---

#### DELETE /reviews/{reviewId}/vote

Remove a vote from a review

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
|  |  |  | No | [ReviewIdParam](#reviewidparam) |

**Responses**

**200**: *Vote removed*

**Security Schema**: cookieAuth

---

### GET /achievements

List all achievements

**Responses**

**200**: *Achievement list*

---

### GET /profile

Get authenticated profile

**Responses**

**200**: *Current user profile*

**Security Schema**: cookieAuth

---

### GET /profile/dev

Get authenticated developer profile

**Responses**

**200**: *Developer profile*

**Security Schema**: cookieAuth

---

### GET /genres

List all genres

**Responses**

**200**: *Genre list*

--

### GET /rawg

Search external RAWG game data

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| search | query |  | No | string |

**Responses**

**200**: *RAWG external API response*
