# Example Component Integration

This file shows how to integrate the API service into your existing React components.

---

## 📍 Location
When ready to integrate: Update your components in `Frontend/src/components/`

---

## 🔐 AuthPage.tsx Integration Example

**Current State**: Uses mock authentication  
**After Integration**: Uses real backend API

```typescript
// BEFORE (Current - with mock data)
const handleLogin = () => {
  // Mock login - doesn't persist or validate
  onLogin();
};

// AFTER (With Backend API)
import { loginUser, registerUser } from '../services/api';

const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [isLogin, setIsLogin] = useState(true);

// Login handler
const handleLogin = async (email: string, password: string) => {
  setIsLoading(true);
  setError(null);
  
  try {
    const data = await loginUser(email, password);
    console.log('Logged in:', data.user);
    // Store user info in state/context if needed
    onLogin(); // Navigate to dashboard
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Login failed');
  } finally {
    setIsLoading(false);
  }
};

// Register handler
const handleRegister = async (email: string, username: string, password: string, fullName?: string) => {
  setIsLoading(true);
  setError(null);
  
  try {
    const data = await registerUser(email, username, password, fullName);
    console.log('Registered:', data.user);
    onLogin();
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Registration failed');
  } finally {
    setIsLoading(false);
  }
};
```

---

## 📊 AdminDashboard.tsx Integration Example

**Current State**: Uses hardcoded mock data  
**After Integration**: Fetches from backend, supports CRUD

```typescript
// BEFORE (Current - mock data)
const internsData = [
  { id: 1, name: "Alice Johnson", role: "Frontend Dev", ... },
  // ... more mock data
];

// AFTER (With Backend API)
import { 
  getInterns, 
  getSupervisors, 
  getVolunteers, 
  getMentors,
  createIntern,
  updateIntern,
  deleteIntern 
} from '../services/api';

export default function AdminDashboard() {
  const [interns, setInterns] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [internsList, supervisorsList, volunteersList, mentorsList] = await Promise.all([
        getInterns(),
        getSupervisors(),
        getVolunteers(),
        getMentors()
      ]);

      setInterns(internsList);
      setSupervisors(supervisorsList);
      setVolunteers(volunteersList);
      setMentors(mentorsList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new intern
  const handleCreateIntern = async (newInternData: any) => {
    try {
      const newIntern = await createIntern({
        name: newInternData.name,
        role: newInternData.role,
        status: 'Pending',
        progress: 0,
        avatar: newInternData.avatar
      });
      
      // Add to local state
      setInterns([...interns, newIntern]);
      // Show success message
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create intern');
    }
  };

  // Update existing intern
  const handleUpdateIntern = async (internId: number, updates: any) => {
    try {
      const updated = await updateIntern(internId, updates);
      
      // Update local state
      setInterns(interns.map(i => i.id === internId ? updated : i));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update intern');
    }
  };

  // Delete intern
  const handleDeleteIntern = async (internId: number) => {
    try {
      await deleteIntern(internId);
      
      // Remove from local state
      setInterns(interns.filter(i => i.id !== internId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete intern');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Use interns, supervisors, volunteers, mentors from state instead of mock data */}
      {/* Pass handlers to child components for create/update/delete */}
    </div>
  );
}
```

---

## 📝 InternSubmission.tsx Integration Example

Usage for submission form:

```typescript
import { createIntern } from '../services/api';

export default function InternSubmission() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await createIntern({
        name: formData.name,
        role: formData.role,
        status: 'Pending',
        progress: 0,
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
      });

      console.log('Submission successful:', result);
      setSuccess(true);
      setFormData({ name: '', role: '', email: '' });

      // Show success message, then redirect
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields remain the same */}
      <button disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
      {success && <p>✅ Submitted successfully!</p>}
    </form>
  );
}
```

---

## 🎯 AnalyticsReport.tsx Integration Example

Fetching analytics data:

```typescript
import { getInterns, getVolunteers } from '../services/api';

export default function AnalyticsReport() {
  const [stats, setStats] = useState({
    totalInterns: 0,
    activeInterns: 0,
    averageProgress: 0,
    totalVolunteers: 0,
    activeVolunteers: 0
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const interns = await getInterns();
      const volunteers = await getVolunteers();

      const activeInterns = interns.filter(i => i.status === 'Active').length;
      const avgProgress = interns.length > 0 
        ? interns.reduce((sum, i) => sum + i.progress, 0) / interns.length 
        : 0;
      const activeVolunteers = volunteers.filter(v => v.status === 'Active').length;

      setStats({
        totalInterns: interns.length,
        activeInterns,
        averageProgress: Math.round(avgProgress),
        totalVolunteers: volunteers.length,
        activeVolunteers
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  return (
    <div>
      <p>Total Interns: {stats.totalInterns}</p>
      <p>Active Interns: {stats.activeInterns}</p>
      <p>Average Progress: {stats.averageProgress}%</p>
      {/* ... more stats */}
    </div>
  );
}
```

---

## 🏠 LandingPage.tsx Integration Example

Optional: Fetch platform stats to show in landing page:

```typescript
import { getInterns, getVolunteers, getSupervisors, getMentors } from '../services/api';

export default function LandingPage() {
  const [stats, setStats] = useState({
    interns: 0,
    volunteers: 0,
    supervisors: 0,
    mentors: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [interns, volunteers, supervisors, mentors] = await Promise.all([
        getInterns(),
        getVolunteers(),
        getSupervisors(),
        getMentors()
      ]);

      setStats({
        interns: interns.length,
        volunteers: volunteers.length,
        supervisors: supervisors.length,
        mentors: mentors.length
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  return (
    <div>
      {/* Show live stats instead of hardcoded numbers */}
      <h2>Platform Statistics</h2>
      <p>Active Interns: {stats.interns}</p>
      <p>Volunteers: {stats.volunteers}</p>
      <p>Supervisors: {stats.supervisors}</p>
      <p>Mentors: {stats.mentors}</p>
    </div>
  );
}
```

---

## 🔧 Common Integration Patterns

### 1. Fetch Data on Mount
```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getInterns();
      setInterns(data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  fetchData();
}, []);
```

### 2. Handle Loading States
```typescript
const [loading, setLoading] = useState(false);

const handleFetch = async () => {
  setLoading(true);
  try {
    const data = await getInterns();
    setInterns(data);
  } finally {
    setLoading(false);
  }
};
```

### 3. Handle Errors
```typescript
const [error, setError] = useState<string | null>(null);

try {
  const result = await createIntern(data);
  setError(null);
} catch (err) {
  setError(err instanceof Error ? err.message : 'Unknown error');
}
```

### 4. Optimistic Updates
```typescript
// Update UI immediately
const tempId = Date.now();
setInterns([...interns, { ...newIntern, id: tempId }]);

// Then update from server
try {
  const created = await createIntern(newIntern);
  setInterns(interns.map(i => i.id === tempId ? created : i));
} catch (error) {
  // Rollback on error
  setInterns(interns.filter(i => i.id !== tempId));
}
```

---

## ✅ Integration Checklist

When updating each component:
- [ ] Import needed functions from `../services/api`
- [ ] Add state for data (useState)
- [ ] Add state for loading (useState)
- [ ] Add state for errors (useState)
- [ ] Add useEffect to fetch data
- [ ] Replace hardcoded mock data with state
- [ ] Add error boundary/error display
- [ ] Add loading indicator
- [ ] Update handlers for create/update/delete
- [ ] Test all operations
- [ ] Verify CORS is working

---

## 🎨 Design Preservation

✅ All existing:
- HTML elements
- CSS classes
- Component structure
- Layout
- Styling

Only changing:
- Data source (from mock to API)
- API handlers

---

**Ready to integrate? Start with one component and test it first!**
