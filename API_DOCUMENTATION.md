# Backend API Documentation

## 🔧 Endpoints Reference

### Base URL
```
http://localhost:8000/api/v1
```

### Interactive API Docs
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "securepassword",
  "full_name": "John Doe"
}
```

**Response (201):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "john_doe",
    "full_name": "John Doe",
    "created_at": "2024-02-16T10:30:00"
  }
}
```

**Error (400):**
```json
{
  "detail": "Email or username already registered"
}
```

---

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "john_doe",
    "full_name": "John Doe",
    "created_at": "2024-02-16T10:30:00"
  }
}
```

**Error (401):**
```json
{
  "detail": "Invalid email or password"
}
```

---

### 3. Get Current User (Protected)
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "john_doe",
  "full_name": "John Doe",
  "created_at": "2024-02-16T10:30:00"
}
```

---

## 👥 Intern Endpoints

### 1. Get All Interns
**GET** `/interns/`

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "role": "Frontend Dev",
    "status": "Active",
    "progress": 75.0,
    "avatar": "https://i.pravatar.cc/150?u=20",
    "supervisor_id": null,
    "created_at": "2024-02-16T10:00:00",
    "updated_at": "2024-02-16T12:00:00"
  }
]
```

---

### 2. Get Specific Intern
**GET** `/interns/{intern_id}`

**Path Parameters:**
- `intern_id` (integer): The ID of the intern

**Response (200):**
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "role": "Frontend Dev",
  "status": "Active",
  "progress": 75.0,
  "avatar": "https://i.pravatar.cc/150?u=20",
  "supervisor_id": null,
  "created_at": "2024-02-16T10:00:00",
  "updated_at": "2024-02-16T12:00:00"
}
```

**Error (404):**
```json
{
  "detail": "Intern with id 999 not found"
}
```

---

### 3. Create Intern (Protected)
**POST** `/interns/`

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Bob Smith",
  "role": "Backend Dev",
  "status": "Pending",
  "progress": 0.0,
  "avatar": "https://i.pravatar.cc/150?u=21",
  "supervisor_id": null
}
```

**Response (201):**
```json
{
  "id": 6,
  "name": "Bob Smith",
  "role": "Backend Dev",
  "status": "Pending",
  "progress": 0.0,
  "avatar": "https://i.pravatar.cc/150?u=21",
  "supervisor_id": null,
  "created_at": "2024-02-16T15:30:00",
  "updated_at": "2024-02-16T15:30:00"
}
```

---

### 4. Update Intern (Protected)
**PUT** `/interns/{intern_id}`

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:** (All fields optional)
```json
{
  "status": "Active",
  "progress": 50.0
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "role": "Frontend Dev",
  "status": "Active",
  "progress": 50.0,
  "avatar": "https://i.pravatar.cc/150?u=20",
  "supervisor_id": null,
  "created_at": "2024-02-16T10:00:00",
  "updated_at": "2024-02-16T16:00:00"
}
```

---

### 5. Delete Intern (Protected)
**DELETE** `/interns/{intern_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (204):** No content

---

## 🤝 Volunteer Endpoints

### Available Operations
- **GET** `/volunteers/` - Get all volunteers
- **GET** `/volunteers/{volunteer_id}` - Get specific volunteer
- **POST** `/volunteers/` - Create volunteer (Protected)
- **PUT** `/volunteers/{volunteer_id}` - Update volunteer (Protected)
- **DELETE** `/volunteers/{volunteer_id}` - Delete volunteer (Protected)

**Fields:**
```json
{
  "name": "string",
  "role": "string",
  "project": "string",
  "status": "Active|Inactive",
  "hours": 0.0,
  "avatar": "string (URL)"
}
```

---

## 👔 Supervisor Endpoints

### Available Operations
- **GET** `/supervisors/` - Get all supervisors
- **GET** `/supervisors/{supervisor_id}` - Get specific supervisor
- **POST** `/supervisors/` - Create supervisor (Protected)
- **PUT** `/supervisors/{supervisor_id}` - Update supervisor (Protected)
- **DELETE** `/supervisors/{supervisor_id}` - Delete supervisor (Protected)

**Fields:**
```json
{
  "role": "string",
  "department": "string",
  "avatar": "string (URL)",
  "user_id": "integer (optional)"
}
```

---

## 🎓 Mentor Endpoints

### Available Operations
- **GET** `/mentors/` - Get all mentors
- **GET** `/mentors/{mentor_id}` - Get specific mentor
- **POST** `/mentors/` - Create mentor (Protected)
- **PUT** `/mentors/{mentor_id}` - Update mentor (Protected)
- **DELETE** `/mentors/{mentor_id}` - Delete mentor (Protected)

**Fields:**
```json
{
  "role": "string",
  "department": "string",
  "avatar": "string (URL)",
  "user_id": "integer (optional)"
}
```

---

## 📊 Status Enum Values
Valid values for status fields:
- `"Active"`
- `"Inactive"`
- `"Reviewing"`
- `"Pending"`
- `"Completed"`

---

## 🔄 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - User inactive |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## 🔐 Authentication

All protected endpoints require the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Example with curl:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:8000/api/v1/interns/
```

---

## ⏱️ Token Expiration

- Tokens expire after 30 minutes (configurable in `.env`)
- User must login again to get a new token
- Expired token returns 401 Unauthorized response

---

## 📝 Request/Response Examples

### cURL Example
```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "john_doe",
    "password": "securepassword",
    "full_name": "John Doe"
  }'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'

# Get all interns
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/v1/interns/
```

### JavaScript/Fetch Example
```javascript
// Register
const registerResponse = await fetch('http://localhost:8000/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    username: 'john_doe',
    password: 'securepassword',
    full_name: 'John Doe'
  })
});
const data = await registerResponse.json();
const token = data.access_token;

// Get interns with token
const internResponse = await fetch('http://localhost:8000/api/v1/interns/', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const interns = await internResponse.json();
```

---

## 🐛 Common Errors

### 401 Unauthorized
```json
{
  "detail": "Invalid authentication credentials"
}
```
**Solution:** Ensure token is valid and not expired. Re-login if needed.

### 404 Not Found
```json
{
  "detail": "Intern with id 999 not found"
}
```
**Solution:** Verify the resource ID exists.

### 400 Bad Request
```json
{
  "detail": "Email or username already registered"
}
```
**Solution:** Check request body format and ensure unique values.

---

## 🎯 Best Practices

1. **Always include Authorization header** for protected endpoints
2. **Handle token expiration** - catch 401 errors and prompt re-login
3. **Validate input** before sending to API
4. **Use appropriate HTTP methods** - GET for retrieval, POST for creation, etc.
5. **Check response status codes** before processing response body
6. **Log errors** for debugging purposes

---

**API Version:** 1.0.0
**Last Updated:** February 16, 2024
