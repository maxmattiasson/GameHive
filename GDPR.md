## Data

**Public**

- username

Stored in the database and visible publicly. Used only for display purposes and is not used for authentication or contact.

**Private**

- email

Stored in the database but not visible to other users. Used for authentication and contact purposes.

- hashedPassword

Stored in the database but not visible to other users. Used for authentication purposes. We use bcrypt hashing to store passwords, and we never log or expose this information.

- Logged playtime

Stored in the database and currently only visible to the user themselves. might be made visible to friends in the future as part of social features, but is not currently shared with other users.

**Visible to logged-in users**

- game library
- reviews
- friends
- achievements

Stored in the database and visible to other logged-in users. This information is part of the social and interactive features of the application, allowing users to share their gaming activity and connect with others.

**System-only**

- password

Used for authentication but _**not**_ stored in the database. We only store the hashed version of the password, and we never log or expose the raw password.

## Logging

We log the following information for every request:

- HTTP-method
- Status code
- Response time
- User-ID (but not email)
- IP-adress (anonymized after 30 days)

We **NEVER** log:

- Passwords 
- Email adresses
- Authentication headers
- Request body content
- Personal identification numbers or other sensitive data

## Deletion Policy

This application applies a deletion policy of NO SOFT DELETIONS. When a user requests account deletion, all their data is permanently removed from our database and cannot be recovered. This ensures compliance with GDPR's right to erasure while maintaining a clean data environment.

This policy applies to all data removal, including user accounts (by admins and the users themselves), uploaded game titles (for game developer accounts), game libraries, reviews, and friend connections. Once a deletion request is processed, the data is irreversibly deleted from our systems.

## Contact information

If user needs more information about data collection, storage, or deletion, they can contact us at:

gdpr-enquiries@gamehive.com
```
Breaking the fourth wall:
This is a placeholder email address for the sake of course work. In a real project, this would be a monitored support email or contact form.
```
