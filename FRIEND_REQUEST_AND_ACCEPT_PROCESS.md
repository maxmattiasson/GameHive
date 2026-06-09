# Friend Request and Accept Process

This document outlines the process for sending and accepting friend requests. It shows that only authenticated users can perform these actions, and that requests are made persistent by being stored in a MongoDB collection as "pending" until accepted. 

## 1. Send Friend Request

```mermaid
flowchart TD
  A([User A clicks Add Friend])
  B[/Send POST /api/friends/requests to backend/]
  C{User authenticated?}
  F[Validate request]
  H[Create friendship record with status 'pending']
  I[(Save to MongoDB friendships collection)]
  J([201 Created response])
  K([401 'Unauthorized' response])

  A --> B
  B --> C
  C -- Yes --> F
  C -- No --> K
  F --> H
  H --> I
  I --> J
```

## 2. Load Pending Friend Requests

```mermaid
flowchart TD
  A([User B opens Friend Requests page])
  B[/Send GET /api/friends/requests/]
  C{User authenticated?}
  G[Query pending friendships]
  H[(MongoDB friendships collection)]
  I([200 OK pending requests])
  J([401 'Unauthorized' response])

  A --> B
  B --> C
  C -- Yes --> G
  C -- No --> J
  G --> H
  H --> I
```

## 3. Accept Friend Request

```mermaid
flowchart TD
  A([User B clicks Accept])
  B[/Send PATCH /api/friends/requests/:id/accept/]
  C{User authenticated?}
  F[Validate request]
  H[Update friendship status to 'accepted']
  I[(MongoDB friendships collection)]
  J([200 OK 'accepted' response])
  L([401 'Unauthorized' response])

  A --> B
  B --> C
  C -- Yes --> F
  C -- No --> L
  F --> H
  H --> I
  I --> J
```
