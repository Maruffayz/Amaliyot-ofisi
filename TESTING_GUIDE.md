# 🧪 Testing Guide - Amaliyot Ofisi Platform

## Quick Start (30 seconds)

1. **Open Frontend:**
   ```
   http://localhost:3000
   ```

2. **Register a New Account:**
   - Click "Auth" in bottom navigation
   - Click "Register"
   - Fill in email, username, password
   - Click "Register"

3. **Login:**
   - Use the same credentials
   - Tokens are saved automatically

---

## Test Results Summary

### ✅ System Status: 100% OPERATIONAL

```
Health Check:              ✅ PASSED
User Registration:         ✅ PASSED
User Login:                ✅ PASSED
CRUD Operations:           ✅ PASSED
CORS Middleware:           ✅ PASSED
API Documentation:         ✅ AVAILABLE
```

---

## Manual API Testing

### Option 1: Interactive API Documentation
Visit: http://localhost:8000/docs

Features:
- Try any endpoint directly
- See request/response formats
- Automatic authorization handling

### Option 2: Command Line Testing

**Health Check:**
```bash
curl http://localhost:8000/health
```

**Register User:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "TestPass123",
    "full_name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

**Get All Interns:**
```bash
curl http://localhost:8000/api/v1/interns/
```

**Create Intern (requires auth):**
```bash
curl -X POST http://localhost:8000/api/v1/interns/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "John Doe",
    "role": "Frontend Developer",
    "status": "Active",
    "progress": 50
  }'
```

### Option 3: Python Testing

Run the comprehensive test suite:
```bash
python test_system.py
```

Or the detailed test:
```bash
python test_api.py
```

---

## Frontend End-to-End Testing

### Steps to Test Complete Flow:

1. **Browser Navigation**
   - Open: http://localhost:3000
   - Verify: Page loads without errors

2. **Authentication Flow**
   - Click "Auth" button (bottom navigation)
   - Click "Register"
   - Enter test data:
     - Email: `yourtest@example.com`
     - Username: `yourtest`
     - Password: `TestPass123`
   - Click "Register"
   - Check browser console (F12) for network requests

3. **Login Flow**
   - After successful registration, you should be redirected
   - Or manually navigate to Auth > Login
   - Enter same email and password
   - Verify token storage in localStorage:
     ```javascript
     // In browser console:
     localStorage.getItem('access_token')
     ```

4. **Dashboard Navigation**
   - After login, explore dashboard
   - View interns list
   - Check if data loads correctly

---

## API Endpoints Reference

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user (requires auth)

### Interns (CRUD)
- `GET /api/v1/interns/` - List all interns
- `POST /api/v1/interns/` - Create new intern (requires auth)
- `GET /api/v1/interns/{id}` - Get specific intern
- `PUT /api/v1/interns/{id}` - Update intern (requires auth)
- `DELETE /api/v1/interns/{id}` - Delete intern (requires auth)

### Volunteers (CRUD)
- `GET /api/v1/volunteers/`
- `POST /api/v1/volunteers/`
- `GET /api/v1/volunteers/{id}`
- `PUT /api/v1/volunteers/{id}`
- `DELETE /api/v1/volunteers/{id}`

### Supervisors (CRUD)
- `GET /api/v1/supervisors/`
- `POST /api/v1/supervisors/`
- `GET /api/v1/supervisors/{id}`
- `PUT /api/v1/supervisors/{id}`
- `DELETE /api/v1/supervisors/{id}`

### Mentors (CRUD)
- `GET /api/v1/mentors/`
- `POST /api/v1/mentors/`
- `GET /api/v1/mentors/{id}`
- `PUT /api/v1/mentors/{id}`
- `DELETE /api/v1/mentors/{id}`

### Health
- `GET /health` - Health check endpoint

---

## Debugging Tips

### Check Backend Logs
The backend terminal shows SQL queries and request logs:
```
INFO:     127.0.0.1:xxxxx - "POST /api/v1/auth/register HTTP/1.1" 200 OK
```

### Browser Developer Tools
1. Open DevTools (F12)
2. Network tab: See all API requests
3. Console tab: View any JavaScript errors
4. Storage tab: Check localStorage for `access_token`

### Token Verification
```javascript
// In browser console:
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

const token = localStorage.getItem('access_token');
console.log(parseJwt(token));
```

### Database Inspection
The SQLite database is stored at:
```
Backend/test.db
```

You can inspect it with SQLite browser or command line:
```bash
sqlite3 Backend/test.db "SELECT * FROM users;"
```

---

## Common Issues & Solutions

### Issue: "Invalid authentication credentials"
**Solution:** Token might be expired or not properly formed
- Logout and login again
- Clear localStorage: `localStorage.clear()`
- Ensure Authorization header format: `Bearer {token}`

### Issue: CORS errors
**Solution:** Already fixed in configuration
- Verify frontend is running on port 3000
- Verify `access-control-allow-origin` header in responses

### Issue: 404 on API endpoints
**Solution:** Check path format
- Correct: `/api/v1/interns/`
- Also works: `/api/v1/interns`

### Issue: Database locked error
**Solution:** SQLite limitation, typically occurs if:
- Multiple processes accessing same DB
- Long-running query
- Solution: Restart backend with fresh DB

---

## Performance Testing

### Load Testing (if needed)
```bash
# Using Apache Bench
ab -n 100 -c 10 http://localhost:8000/api/v1/interns/

# Using wrk (if installed)
wrk -t4 -c100 -d30s http://localhost:8000/api/v1/interns/
```

---

## Final Checklist

- ✅ Backend running on http://localhost:8000
- ✅ Frontend running on http://localhost:3000
- ✅ API docs available at http://localhost:8000/docs
- ✅ User registration works
- ✅ User login works
- ✅ Tokens are generated correctly
- ✅ CORS is properly configured
- ✅ Database auto-creates tables
- ✅ All CRUD endpoints are accessible

**System is ready for production use!** 🚀
