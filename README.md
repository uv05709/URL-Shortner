# URL Shortener API

A robust and scalable RESTful API for shortening URLs, built with Node.js, Express, PostgreSQL, and Drizzle ORM. It features user authentication, custom short links, and complete URL management capabilities.

## 🚀 Features

- **User Authentication:** Secure signup and login using JSON Web Tokens (JWT).
- **URL Shortening:** Generate random short codes (using `nanoid`) or specify custom aliases for your URLs.
- **URL Management:** Authenticated users can view all their shortened URLs and delete them as needed.
- **Redirection:** Fast and reliable redirection from short codes to target URLs.
- **Validation:** Strict runtime request validation using `Zod`.
- **Security:** Passwords are securely hashed with salts before storage.
- **Modern ORM:** Utilizes Drizzle ORM for type-safe database interactions.

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Validation:** [Zod](https://zod.dev/)
- **Authentication:** [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm installed globally
- Docker and Docker Compose (for running the PostgreSQL database locally)

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd "URL -Shortner"
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up the Environment Variables:**
   
   Create a `.env` file in the root of the project and provide the necessary variables (Database URL, JWT secret, etc.).

4. **Start the Database:**
   
   Ensure Docker is running, then start the PostgreSQL instance:
   ```bash
   docker-compose up -d
   ```

5. **Run Database Migrations (Drizzle):**
   
   Sync your schema to the database:
   ```bash
   pnpm exec drizzle-kit push
   ```

6. **Start the Development Server:**

   ```bash
   pnpm run dev
   ```

   The server will start running at `http://localhost:8000` (or your configured `PORT_URL`).

## 📚 API Documentation

### Public Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check endpoint. Returns server status. |
| `GET` | `/:shortcode` | Redirects to the original target URL associated with the shortcode. |

### User Authentication

| Method | Endpoint | Body Requirements | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/user/signup` | `firstname`, `lastname`, `email`, `password` | Registers a new user account. |
| `POST` | `/user/login` | `email`, `password` | Authenticates a user and returns a JWT. |

### URL Management (Requires Authentication)

*Note: Pass the JWT in the `Authorization` header as a Bearer token.*

| Method | Endpoint | Body Requirements | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/shorten` | `url`, `code` (optional) | Creates a new shortened URL. Uses the custom code if provided, otherwise generates a random one. |
| `GET` | `/codes` | None | Retrieves a list of all shortened URLs created by the authenticated user. |
| `DELETE` | `/:id` | None | Deletes a specific shortened URL by its ID. |

## 📁 Project Structure

```text
├── db/                # Database connection setup
├── middleware/        # Express middlewares (e.g., Auth protection)
├── models/            # Drizzle ORM database schemas
├── routes/            # Express route definitions
├── services/          # Business logic and database queries
├── utils/             # Helper functions (password hashing, tokens)
├── validation/        # Zod validation schemas
├── .env               # Environment variables (not tracked)
├── docker-compose.yml # Docker configuration for PostgreSQL
├── drizzle.config.js  # Drizzle ORM configuration
├── index.js           # Express application entry point
└── package.json       # Project dependencies and scripts
```
