# API Integration Guide for Frontend

This file explains how to connect your existing frontend to the new FastAPI backend.

## 📝 Available API Service Functions

The `Frontend/src/services/api.ts` file provides ready-to-use functions for all backend operations.

### ✅ Authentication Functions

```javascript
// Register new user
async registerUser(email, username, password, fullName?)

// Login user
async loginUser(email, password)

// Get current user info
async getCurrentUser()

// Logout user
logout()
```

**Example Usage:**
```javascript
import { loginUser, logout } from './services/api';

// In your component
const handleLogin = async (email, password) => {
  try {
    const data = await loginUser(email, password);
    console.log('Logged in user:', data.user);
    // Navigate to dashboard
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
```

---

### 👥 Intern Functions

```javascript
// Get all interns
async getInterns()

// Get specific intern
async getIntern(id)

// Create new intern
async createIntern({ name, role, status, progress, avatar, supervisor_id })

// Update intern
async updateIntern(id, { name, role, status, progress, avatar, supervisor_id })

// Delete intern
async deleteIntern(id)
```

**Example Usage:**
```javascript
import { getInterns, createIntern } from './services/api';

// Fetch all interns
const interns = await getInterns();

// Create new intern
const newIntern = await createIntern({
  name: "John Doe",
  role: "Frontend Dev",
  status: "Active",
  progress: 50,
  avatar: "https://i.pravatar.cc/150?u=1"
});
```

---

### 🤝 Volunteer Functions

```javascript
// Get all volunteers
async getVolunteers()

// Get specific volunteer
async getVolunteer(id)

// Create new volunteer
async createVolunteer({ name, role, project, status, hours, avatar })

// Update volunteer
async updateVolunteer(id, { name, role, project, status, hours, avatar })

// Delete volunteer
async deleteVolunteer(id)
```

---

### 👔 Supervisor Functions

```javascript
// Get all supervisors
async getSupervisors()

// Get specific supervisor
async getSupervisor(id)

// Create new supervisor
async createSupervisor({ role, department, avatar, user_id })

// Update supervisor
async updateSupervisor(id, { role, department, avatar, user_id })

// Delete supervisor
async deleteSupervisor(id)
```

---

### 🎓 Mentor Functions

```javascript
// Get all mentors
async getMentors()

// Get specific mentor
async getMentor(id)

// Create new mentor
async createMentor({ role, department, avatar, user_id })

// Update mentor
async updateMentor(id, { role, department, avatar, user_id })

// Delete mentor
async deleteMentor(id)
```

---

## 🔗 How to Update Your Components

### Example 1: LoginPage Component (AuthPage.tsx)

```typescript
// Original: Uses mock data or Google OAuth
// New: Connect to backend

import { loginUser } from '../services/api';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await loginUser(email, password);
    console.log('Authenticated:', response.user);
    onLogin(); // Navigate to dashboard
  } catch (error) {
    setError(error.message);
  }
};
```

### Example 2: Dashboard Component (AdminDashboard.tsx)

```typescript
// Original: Uses mock data in component
// New: Fetch from backend

import { useEffect, useState } from 'react';
import { getInterns, getSupervisors } from '../services/api';

export default function AdminDashboard() {
  const [interns, setInterns] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const internsList = await getInterns();
      const supervisorsList = await getSupervisors();
      
      setInterns(internsList);
      setSupervisors(supervisorsList);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of component remains the same...
}
```

### Example 3: Create New Item Form

```typescript
import { createIntern } from '../services/api';

const handleCreateIntern = async (formData) => {
  try {
    const newIntern = await createIntern({
      name: formData.name,
      role: formData.role,
      status: 'Pending',
      progress: 0,
      avatar: formData.avatar
    });
    
    console.log('Intern created:', newIntern);
    // Refresh list or navigate
  } catch (error) {
    console.error('Creation failed:', error.message);
  }
};
```

---

## 🔐 Token Management (Automatic!)

The API service automatically:

1. **Stores token** after login/register in localStorage
2. **Attaches token** to all protected requests
3. **Removes token** on logout

No manual token management needed!

```javascript
// Automatic:
// After login, token is stored
localStorage.getItem('access_token') // Returns the JWT token

// For custom logout with cleanup:
import { logout } from './services/api';
logout(); // Clears token from storage
```

---

## 🎯 API Response Format

All endpoints follow consistent response formats:

### Auth Endpoints
```json
{
  "access_token": "eyJhbGc...",
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

### CRUD Endpoints
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "role": "Frontend Dev",
    "status": "Active",
    "progress": 75,
    "avatar": "https://i.pravatar.cc/150?u=1",
    "created_at": "2024-02-16T10:00:00",
    "updated_at": "2024-02-16T12:00:00"
  }
]
```

---

## ⚠️ Error Handling

All functions throw errors that should be caught:

```javascript
try {
  const data = await getInterns();
  // Process data
} catch (error) {
  console.error('Error:', error.message);
  // Handle error: show toast, alert, etc.
}
```

Common errors:
- `"No token found"` - User not logged in
- `"Invalid authentication credentials"` - Token expired or invalid
- `"Failed to fetch [item]"` - Network or server error

---

## 🚀 Frontend Component Integration Checklist

- [ ] Import api service functions
- [ ] Replace hardcoded mock data with API calls
- [ ] Add loading states while fetching
- [ ] Add error handling for failed requests
- [ ] Store auth token after login
- [ ] Include token in protected requests (automatic via api.ts)
- [ ] Implement logout to clear token
- [ ] Test all CRUD operations
- [ ] Verify CORS is working (should be automatic)

---

## 📌 Important Notes

1. **Token Storage**: Currently uses localStorage (fine for development, use secure httpOnly cookies in production)
2. **API Base URL**: Currently `http://localhost:8000/api/v1` (change for production)
3. **CORS**: Already configured in backend for localhost:5173
4. **Errors**: All errors include descriptive messages from backend

---

## 🎨 Design Preservation

✅ **No HTML/CSS changes made**
✅ **No layout modifications**
✅ **Only JavaScript API calls added**
✅ **Components remain visually identical**

Simply update the data source from mock data to API calls!

---

**Start integrating! 🔗**
