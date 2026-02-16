# Amaliyot Ofisi Platform - Full Setup & Running Guide

## 📋 Project Structure

```
Amaliyot ofisi uchun/
├── Backend/                          # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── router.py         # Main router
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── auth.py       # Auth endpoints
│   │   │   │   │   ├── interns.py    # Intern CRUD
│   │   │   │   │   ├── volunteers.py # Volunteer CRUD
│   │   │   │   │   ├── supervisors.py# Supervisor CRUD
│   │   │   │   │   └── mentors.py    # Mentor CRUD
│   │   ├── core/
│   │   │   ├── config.py             # Configuration
│   │   │   └── security.py           # JWT & Password handling
│   │   ├── db/
│   │   │   ├── database.py           # Database setup
│   │   │   └── __init__.py
│   │   ├── models/
│   │   │   └── __init__.py           # SQLAlchemy models
│   │   └── schemas/
│   │       └── __init__.py           # Pydantic schemas
│   ├── main.py                       # FastAPI app entry point
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment variables template
│   └── .env                          # Your local environment (IGNORE THIS)
│
└── Frontend/
    └── src/
        ├── services/
        │   └── api.ts               # API service (NEW!)
        ├── components/              # React components
        ├── App.tsx
        ├── index.tsx
        ├── index.html
        ├── package.json
        ├── tsconfig.json
        ├── vite.config.ts
        └── ...
```

---

## 🚀 Step-by-Step Setup

### STEP 1: Install & Setup Backend

#### 1.1 Prerequisites
- Python 3.10+ installed
- pip package manager
- PostgreSQL database running

#### 1.2 Install Backend Dependencies

```bash
# Navigate to Backend folder
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

#### 1.3 Setup Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Or on Windows:
copy .env.example .env
```

Edit `.env` file with your settings:

```env
# PostgreSQL Connection
DATABASE_URL=postgresql://username:password@localhost:5432/amaliyot_ofisi

# JWT Configuration (Change these in production!)
SECRET_KEY=your-very-secret-key-change-me-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Server
DEBUG=True
```

#### 1.4 Create Database (PostgreSQL)

```sql
-- Using psql or any PostgreSQL client
CREATE DATABASE amaliyot_ofisi;
```

Or:

```bash
# Using createdb command
createdb -U postgres amaliyot_ofisi
```

---

### STEP 2: Setup Frontend

#### 2.1 Install Frontend Dependencies

```bash
# Navigate to Frontend folder
cd Frontend/src

# Install Node.js packages
npm install
```

#### 2.2 Ensure API Service is Ready

The API service file is already created at:
```
Frontend/src/services/api.ts
```

---

## 🏃 Running the Application

### OPTION A: Running Everything Locally (Recommended for Development)

#### Terminal 1: Start PostgreSQL Database
```bash
# Windows (if installed as service):
# PostgreSQL should be running automatically

# Or start manually:
pg_ctl -D "C:\Program Files\PostgreSQL\data" start

# macOS (if using Homebrew):
brew services start postgresql

# Linux:
sudo systemctl start postgresql
```

#### Terminal 2: Start FastAPI Backend
```bash
# From Backend folder
cd Backend

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Run the server
python main.py

# OR use uvicorn directly:
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

#### Terminal 3: Start Frontend Development Server
```bash
# From Frontend/src folder
cd Frontend/src

# Start Vite dev server
npm run dev

# The frontend will typically run at: http://localhost:5173
```

---

## 📱 Using the Application

### 1. **Registration & Login**
- Go to http://localhost:5173
- Navigate to "Auth" page
- Register new account with email, username, password
- Or login with existing credentials

### 2. **Dashboard Features**
After login, you can:
- View all interns, volunteers, supervisors, and mentors
- Create new records
- Edit existing records
- Delete records

### 3. **API Endpoints Reference**

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user info

#### Interns
- `GET /api/v1/interns/` - Get all interns
- `GET /api/v1/interns/{id}` - Get specific intern
- `POST /api/v1/interns/` - Create intern
- `PUT /api/v1/interns/{id}` - Update intern
- `DELETE /api/v1/interns/{id}` - Delete intern

#### Volunteers
- `GET /api/v1/volunteers/` - Get all volunteers
- `GET /api/v1/volunteers/{id}` - Get specific volunteer
- `POST /api/v1/volunteers/` - Create volunteer
- `PUT /api/v1/volunteers/{id}` - Update volunteer
- `DELETE /api/v1/volunteers/{id}` - Delete volunteer

#### Supervisors
- `GET /api/v1/supervisors/` - Get all supervisors
- `GET /api/v1/supervisors/{id}` - Get specific supervisor
- `POST /api/v1/supervisors/` - Create supervisor
- `PUT /api/v1/supervisors/{id}` - Update supervisor
- `DELETE /api/v1/supervisors/{id}` - Delete supervisor

#### Mentors
- `GET /api/v1/mentors/` - Get all mentors
- `GET /api/v1/mentors/{id}` - Get specific mentor
- `POST /api/v1/mentors/` - Create mentor
- `PUT /api/v1/mentors/{id}` - Update mentor
- `DELETE /api/v1/mentors/{id}` - Delete mentor

---

## 🔧 Testing the Backend (Using Swagger UI)

1. Go to: http://localhost:8000/docs
2. Click on any endpoint to expand it
3. Click "Try it out"
4. Add required parameters/body
5. Click "Execute"

---

## 🔑 JWT Token Management

Tokens are automatically:
- **Created** when user registers or logs in
- **Stored** in browser's localStorage as `access_token`
- **Sent** with every protected API request in the `Authorization: Bearer <token>` header
- **Expire** after 30 minutes (configurable in .env)

---

## 🐛 Troubleshooting

### Backend Issues

#### "psycopg2" error during pip install
```bash
# Windows: Install PostgreSQL development files
pip install psycopg2-binary

# Or use the pre-installed binary version
```

#### "Address already in use" error
```bash
# Backend is already running on port 8000
# Kill the process or use different port:
uvicorn main:app --port 8001
```

#### Database connection error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure database exists: `createdb amaliyot_ofisi`

### Frontend Issues

#### "Cannot find module api service"
- Ensure `Frontend/src/services/api.ts` exists
- Restart frontend dev server: `npm run dev`

#### CORS errors in console
- Backend CORS is configured for localhost:5173
- Make sure backend is running on port 8000

---

## 📦 Build for Production

### Backend
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production settings
# Update .env: DEBUG=False, SECRET_KEY with secure value

# Use Gunicorn for production:
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 main:app
```

### Frontend
```bash
cd Frontend/src

# Build optimized production bundle
npm run build

# Output will be in: dist/
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change `SECRET_KEY` in .env to a strong random string
- [ ] Update `DATABASE_URL` with production database
- [ ] Set `DEBUG=False` in .env
- [ ] Update CORS `allow_origins` to your domain only
- [ ] Use HTTPS for all endpoints
- [ ] Enable database backups
- [ ] Use environment secrets management (AWS Secrets Manager, etc.)
- [ ] Add rate limiting to API
- [ ] Implement API logging and monitoring

---

## 📚 Additional Commands

### Backend
```bash
# Create new migration (if using Alembic)
alembic revision --autogenerate -m "migration message"

# Apply migrations
alembic upgrade head
```

### Frontend
```bash
# Preview production build
npm run preview

# Run type checking
tsc --noEmit
```

---

## 💡 Quick Tips

1. **Hot Reload**: Both backend and frontend support hot reload in development
2. **API Testing**: Use the auto-generated Swagger UI at /docs
3. **Database**: Tables are auto-created when backend starts
4. **Mock Data**: Add dummy data through the API for testing
5. **Environment**: Keep .env out of version control (use .gitignore)

---

## ❓ Need Help?

- Check FastAPI docs: https://fastapi.tiangolo.com
- Check React docs: https://react.dev
- Check PostgreSQL docs: https://www.postgresql.org/docs/
- Review API schemas in backend code for expected data formats

---

**Happy coding! 🎉**
