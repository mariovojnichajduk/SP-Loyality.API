# Loyalty App API Documentation

## Setup Instructions

### 1. Configure Environment Variables

Edit the `.env` file with your credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_DATABASE=loyality_app

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRATION=7d

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here

# Application
APP_PORT=3000
```

### 2. Create PostgreSQL Database

```sql
CREATE DATABASE loyality_app;
```

### 3. Start the Application

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

---

## API Endpoints

### 1. Register User

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Registration successful. Please check your email for verification code.",
  "email": "user@example.com"
}
```

**Notes:**
- Password must be at least 6 characters
- A 6-digit verification code will be sent to the provided email
- Code expires in 10 minutes

---

### 2. Verify Email

**Endpoint:** `POST /auth/verify-email`

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Response:**
```json
{
  "message": "Email verified successfully"
}
```

**Notes:**
- Must use the 6-digit code sent via email
- Code expires in 10 minutes

---

### 3. Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe",
    "points": 0
  }
}
```

**Notes:**
- Email must be verified before login
- Returns JWT token for authenticated requests
- Token expires in 7 days (configurable)

---

## User Entity Structure

```typescript
{
  id: string (UUID)
  email: string (unique)
  name: string
  password: string (hashed)
  favoriteShops: string[] (array)
  points: number (default: 0)
  isVerified: boolean (default: false)
  verificationCode: string (nullable)
  verificationCodeExpiry: Date (nullable)
  createdAt: Date
  updatedAt: Date
}
```

---

## Protected Routes

To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

---

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, invalid code, etc.)
- `401` - Unauthorized (invalid credentials, unverified email)
- `409` - Conflict (email already exists)
- `500` - Internal Server Error

---

## Testing the API

You can test the API using tools like:
- Postman
- Thunder Client (VS Code extension)
- cURL
- Any HTTP client

Example cURL request:

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","password":"password123"}'

# Verify Email
curl -X POST http://localhost:3000/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","code":"123456"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
