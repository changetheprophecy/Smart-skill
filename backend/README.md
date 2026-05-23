# SkillSwap Backend

Node.js + Express + MongoDB backend API for the SkillSwap platform.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB URI and JWT secret.

3. **Start MongoDB:**
   ```bash
   mongod
   ```

4. **Run the server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/profile` - Update profile (requires token)

### Users
- `GET /api/users` - Get all users for discovery (requires token)
- `GET /api/users/:id` - Get user by ID (requires token)
- `POST /api/users/:id/match` - Add a match (requires token)

### Messages
- `GET /api/messages/:userId` - Get messages with user (requires token)
- `POST /api/messages` - Send a message (requires token)

## Authentication

Use JWT tokens. Include in request headers:
```
Authorization: Bearer <your_token>
```
