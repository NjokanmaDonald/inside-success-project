Decision Room App
A full-stack application that allows users to join decision rooms, post comments, and reply to others — built with modern web technologies.

Thought Process
I approached this task by first breaking it down into key features: user authentication, decision room creation/joining, comments and replies, and real-time UI updates.

To maintain clean separation of concerns, I structured the app into two separate folders:

client – for the Next.js frontend

server – for the Node.js backend with Express and Prisma

I prioritized schema design early on to ensure that relationships (like decision room to comments and comments to replies) were properly defined in the database.

Routing, API structure, and validations followed REST principles and best practices. I also used express-validator to enforce server-side input validation.

Challenges & Limitations
Validation Conflicts: Integrating express-validator with nested replies and layered route parameters required additional care.

Deployment Quirks: Render's directory-based deployment required specifying the correct working directory (/client and /server) separately.

Rate Limiting (Not Implemented): To prevent spam in the comment section, a rate-limiting mechanism could be added later.

User Auth: Anonymous users are supported with an unregisteredUserId, but persistent sessions aren't stored beyond the frontend.

Technologies Used
Frontend (Client)
Next.js – v15+

React – v18+

Tailwind CSS – for UI styling

Axios – HTTP client

React Hot Toast – for notifications

TypeScript – static typing

Context API – for auth state

Backend (Server)
Node.js – v18+

Express – v4+

Prisma – ORM for PostgreSQL

PostgreSQL – database

express-validator – for input validation

dotenv – for managing environment variables

cors – for cross-origin API access

Render – for deployment

 Deployment Links
Frontend: [https://your-frontend-url.com](https://inside-success-1hg5.vercel.app/rooms)

Backend: [https://your-backend-url.com](https://inside-success.onrender.com)
