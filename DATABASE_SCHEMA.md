# Database Schema

## User Table
```
users
├── id (Primary Key)
├── email (UNIQUE)
├── username (UNIQUE)
├── full_name
├── hashed_password
├── is_active
└── created_at
```

## Intern Table
```
interns
├── id (Primary Key)
├── name
├── role
├── status (Active, Reviewing, Pending, Completed)
├── progress (0-100)
├── avatar (URL)
├── supervisor_id (Foreign Key → users)
├── created_at
└── updated_at
```

## Volunteer Table
```
volunteers
├── id (Primary Key)
├── name
├── role
├── project
├── status (Active, Inactive)
├── hours
├── avatar (URL)
├── created_at
└── updated_at
```

## Supervisor Table
```
supervisors
├── id (Primary Key)
├── user_id (Foreign Key → users, optional)
├── role
├── department
├── avatar (URL)
├── created_at
└── updated_at
```

## Mentor Table
```
mentors
├── id (Primary Key)
├── user_id (Foreign Key → users, optional)
├── role
├── department
├── avatar (URL)
├── created_at
└── updated_at
```

---

## Relationships

```
User (1) ─── (Many) Intern
User (1) ─── (Many) Supervisor
User (1) ─── (Many) Mentor
```

---

## SQL Scripts

### Create all tables (automatic on first run)
Tables are automatically created when the backend starts for the first time.

### Insert sample data
```sql
-- User
INSERT INTO users (email, username, full_name, hashed_password, is_active)
VALUES ('admin@example.com', 'admin', 'Admin User', '$2b$12$...', true);

-- Intern
INSERT INTO interns (name, role, status, progress, avatar)
VALUES ('Alice Johnson', 'Frontend Dev', 'Active', 75, 'https://i.pravatar.cc/150?u=20');

-- Volunteer
INSERT INTO volunteers (name, role, project, status, hours, avatar)
VALUES ('Emma Watson', 'Event Volunteer', 'Charity Run', 'Active', 120, 'https://i.pravatar.cc/150?u=50');

-- Supervisor
INSERT INTO supervisors (role, department, avatar)
VALUES ('Senior Dev', 'Engineering', 'https://i.pravatar.cc/150?u=5');

-- Mentor
INSERT INTO mentors (role, department, avatar)
VALUES ('Professor', 'Computer Science', 'https://i.pravatar.cc/150?u=15');
```

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/amaliyot_ofisi

# JWT
SECRET_KEY=your-secret-key-change-me
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Debug
DEBUG=True
```

---

## Schema Evolution

When you need to add new fields:

1. Update model in `app/models/__init__.py`
2. Restart the backend (tables auto-create if they don't exist)
3. For existing databases, use Alembic migrations:
   ```bash
   alembic revision --autogenerate -m "Add new field"
   alembic upgrade head
   ```
