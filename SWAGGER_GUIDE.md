# Swagger API Documentation Guide

## Accessing Swagger UI

Once your application is running, you can access the interactive API documentation at:

```
http://localhost:3000/api
```

## Features

### Interactive API Testing
- **Try it out** - Test all endpoints directly from the browser
- **Request/Response examples** - See example payloads for each endpoint
- **Schema validation** - View required fields and data types
- **Error responses** - See all possible error codes and descriptions

### Available Endpoints

#### 1. POST /auth/register
Register a new user account
- Sends a 6-digit verification code to the provided email
- Code expires in 10 minutes

#### 2. POST /auth/verify-email
Verify user email with the 6-digit code
- Must be called after registration
- Required before login

#### 3. POST /auth/login
Login with verified credentials
- Returns JWT access token
- Token is valid for 7 days (configurable)

## How to Use Swagger UI

### Testing Registration Flow:

1. **Open Swagger UI** at `http://localhost:3000/api`

2. **Click on "POST /auth/register"**
   - Click "Try it out"
   - Fill in the request body:
     ```json
     {
       "email": "test@example.com",
       "name": "Test User",
       "password": "password123"
     }
     ```
   - Click "Execute"
   - Check your email for the 6-digit code

3. **Click on "POST /auth/verify-email"**
   - Click "Try it out"
   - Fill in the request body:
     ```json
     {
       "email": "test@example.com",
       "code": "123456"
     }
     ```
   - Click "Execute"

4. **Click on "POST /auth/login"**
   - Click "Try it out"
   - Fill in the request body:
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - Click "Execute"
   - Copy the `access_token` from the response

### Using JWT Token for Protected Routes:

When you add protected routes later:

1. Click the **"Authorize"** button at the top right of Swagger UI
2. Paste your JWT token (without "Bearer" prefix)
3. Click "Authorize"
4. All subsequent requests will include the token automatically

## Benefits of Swagger

- **No need for Postman** - Test all endpoints directly in the browser
- **Always up-to-date** - Documentation is generated from your code
- **Share with team** - Easy to share API documentation with frontend developers
- **Request validation** - See validation errors in real-time
- **Response schemas** - Clear understanding of what the API returns

## Swagger JSON

The raw OpenAPI specification is available at:

```
http://localhost:3000/api-json
```

This can be imported into other tools like Postman or used to generate client SDKs.

## Customization

The Swagger configuration is located in `src/main.ts`:
- Title, description, and version
- Tags for organizing endpoints
- Bearer authentication setup

To add more tags or modify the configuration, edit the `DocumentBuilder` section in `main.ts`.
