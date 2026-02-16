```
📦 Amaliyot Ofisi Platform
│
├── 📚 ROOT DOCUMENTATION
│   ├── README.md                          ← START HERE! Project overview
│   ├── QUICK_START.md                     ← Get running in 5 minutes
│   ├── SETUP_AND_RUN_GUIDE.md            ← Detailed setup instructions
│   ├── API_DOCUMENTATION.md               ← Complete API reference
│   ├── FRONTEND_INTEGRATION_GUIDE.md      ← How to use API in components
│   ├── DATABASE_SCHEMA.md                 ← Database structure
│   ├── COMPONENT_INTEGRATION_EXAMPLES.md  ← Code examples for each component
│   ├── IMPLEMENTATION_SUMMARY.md          ← What was built
│   └── VERIFICATION_CHECKLIST.md          ← Verify everything is created
│
├── 🔌 BACKEND (NEW!)
│   ├── main.py                           ← Application entry point
│   │                                      Run: python main.py
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   │
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── router.py              ← Main API router
│   │   │       └── endpoints/
│   │   │           ├── auth.py            ← Authentication (register, login, me)
│   │   │           ├── interns.py         ← Intern CRUD operations
│   │   │           ├── volunteers.py      ← Volunteer CRUD operations
│   │   │           ├── supervisors.py     ← Supervisor CRUD operations
│   │   │           └── mentors.py         ← Mentor CRUD operations
│   │   │
│   │   ├── core/
│   │   │   ├── config.py                  ← Settings & configuration
│   │   │   └── security.py                ← JWT & password handling
│   │   │
│   │   ├── db/
│   │   │   └── database.py                ← PostgreSQL connection & setup
│   │   │
│   │   ├── models/
│   │   │   └── __init__.py                ← SQLAlchemy ORM models
│   │   │           • User
│   │   │           • Intern
│   │   │           • Volunteer
│   │   │           • Supervisor
│   │   │           • Mentor
│   │   │
│   │   └── schemas/
│   │       └── __init__.py                ← Pydantic validation schemas
│   │           • UserRegister, UserLogin
│   │           • InternCreate, InternUpdate, InternResponse
│   │           • VolunteerCreate, VolunteerUpdate, VolunteerResponse
│   │           • SupervisorCreate, SupervisorUpdate, SupervisorResponse
│   │           • MentorCreate, MentorUpdate, MentorResponse
│   │
│   ├── requirements.txt                   ← Python dependencies
│   ├── .env.example                       ← Environment template
│   ├── .gitignore                         ← Git ignore rules
│   └── README.md                          ← Backend specific docs
│       
│       API Runs at: http://localhost:8000
│       Swagger Docs: http://localhost:8000/docs
│       ReDoc: http://localhost:8000/redoc
│
│
├── 📱 FRONTEND (EXISTING + API SERVICE)
│   └── src/
│       ├── services/
│       │   └── api.ts                     ← ✨ NEW! API service (ready-to-use functions)
│       │           • registerUser()
│       │           • loginUser()
│       │           • getCurrentUser()
│       │           • logout()
│       │           • getInterns(), createIntern(), updateIntern(), deleteIntern()
│       │           • getVolunteers(), createVolunteer(), updateVolunteer(), deleteVolunteer()
│       │           • getSupervisors(), createSupervisor(), updateSupervisor(), deleteSupervisor()
│       │           • getMentors(), createMentor(), updateMentor(), deleteMentor()
│       │
│       ├── components/
│       │   ├── LandingPage.tsx            ← Home page (can show live stats via API)
│       │   ├── AuthPage.tsx               ← Login/Register (ready for API integration)
│       │   ├── AdminDashboard.tsx         ← Dashboard (ready for API integration)
│       │   ├── InternSubmission.tsx       ← Form submission (ready for API integration)
│       │   ├── AnalyticsReport.tsx        ← Analytics (ready for API integration)
│       │   └── Onboarding.tsx             ← Onboarding page
│       │
│       ├── App.tsx                        ← Main component (UNCHANGED)
│       ├── index.tsx                      ← Entry point (UNCHANGED)
│       ├── index.html                     ← HTML (UNCHANGED)
│       ├── package.json                   ← Dependencies (UNCHANGED)
│       ├── tsconfig.json                  ← TypeScript config (UNCHANGED)
│       ├── vite.config.ts                 ← Vite config (UNCHANGED)
│       └── ...                            ← All other files (UNCHANGED)
│
│       Frontend Runs at: http://localhost:5173
│       Design: ✅ PRESERVED (No changes to HTML/CSS)
│
│
└── 🗄️ DATABASE
    PostgreSQL (auto-created tables)
    • users - User accounts
    • interns - Intern records
    • volunteers - Volunteer records
    • supervisors - Supervisor profiles
    • mentors - Mentor profiles
    
    Database: amaliyot_ofisi
    Port: 5432 (default)
```

---

## 📡 API Endpoints Overview

```
╔═══════════════════════════════════════════════════════════════════╗
║               API Base: http://localhost:8000/api/v1             ║
╚═══════════════════════════════════════════════════════════════════╝

🔐 AUTHENTICATION (Public + Protected)
├── POST   /auth/register              → Register new user
├── POST   /auth/login                 → Login user
└── GET    /auth/me                    → Get current user (Protected)

👥 INTERNS (Protected)
├── GET    /interns/                   → Get all interns
├── GET    /interns/{id}               → Get specific intern
├── POST   /interns/                   → Create intern
├── PUT    /interns/{id}               → Update intern
└── DELETE /interns/{id}               → Delete intern

🤝 VOLUNTEERS (Protected)
├── GET    /volunteers/                → Get all volunteers
├── GET    /volunteers/{id}            → Get specific volunteer
├── POST   /volunteers/                → Create volunteer
├── PUT    /volunteers/{id}            → Update volunteer
└── DELETE /volunteers/{id}            → Delete volunteer

👔 SUPERVISORS (Protected)
├── GET    /supervisors/               → Get all supervisors
├── GET    /supervisors/{id}           → Get specific supervisor
├── POST   /supervisors/               → Create supervisor
├── PUT    /supervisors/{id}           → Update supervisor
└── DELETE /supervisors/{id}           → Delete supervisor

🎓 MENTORS (Protected)
├── GET    /mentors/                   → Get all mentors
├── GET    /mentors/{id}               → Get specific mentor
├── POST   /mentors/                   → Create mentor
├── PUT    /mentors/{id}               → Update mentor
└── DELETE /mentors/{id}               → Delete mentor
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components: AuthPage, AdminDashboard, etc.         │  │
│  │  State Management: useState, useEffect              │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   │                                          │
│                   │ Imports from:                            │
│                   ▼                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Service (src/services/api.ts)                  │  │
│  │  • Ready-made fetch functions                       │  │
│  │  • Automatic token handling                         │  │
│  │  • Error handling                                   │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   │                                          │
└───────────────────┼──────────────────────────────────────────┘
                    │ HTTP Fetch with Bearer Token
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│               BACKEND (FastAPI)                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Routes (app/api/v1/endpoints/)                │  │
│  │  • auth.py - Authentication                        │  │
│  │  • interns.py - Intern CRUD                        │  │
│  │  • volunteers.py - Volunteer CRUD                  │  │
│  │  • supervisors.py - Supervisor CRUD                │  │
│  │  • mentors.py - Mentor CRUD                        │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   │                                          │
│                   ▼                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Security & Auth (app/core/security.py)            │  │
│  │  • Verify JWT tokens                               │  │
│  │  • Hash passwords                                  │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   │                                          │
│                   ▼                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Database Layer (SQLAlchemy, Pydantic)             │  │
│  │  • Models: User, Intern, Volunteer, Supervisor      │  │
│  │  • Schemas: Validation & serialization             │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   │                                          │
└───────────────────┼──────────────────────────────────────────┘
                    │ SQL Queries
                    │
                    ▼
        ┌─────────────────────────┐
        │  PostgreSQL Database    │
        │  Tables:                │
        │  • users                │
        │  • interns              │
        │  • volunteers           │
        │  • supervisors          │
        │  • mentors              │
        └─────────────────────────┘
```

---

## 🛠️ Tech Stack Overview

```
FRONTEND
├─ React 19.2.4 (UI Framework)
├─ TypeScript (Type Safety)
├─ Vite (Build Tool)
├─ Tailwind CSS (Styling)
└─ Fetch API (HTTP Requests)

BACKEND
├─ FastAPI (Web Framework)
├─ Python 3.10+ (Language)
├─ SQLAlchemy (ORM)
├─ Pydantic (Validation)
├─ bcrypt (Password Hashing)
├─ python-jose (JWT)
└─ uvicorn (ASGI Server)

DATABASE
└─ PostgreSQL 12+ (Database)

SECURITY
├─ JWT Tokens (Auth)
├─ Bcrypt Hashing (Passwords)
├─ CORS Middleware (Cross-Origin)
└─ Bearer Token (API Auth)
```

---

## 📊 Architecture Pattern

```
CLEAN ARCHITECTURE
│
├── Models (SQLAlchemy)
│   └── Define database structure
│
├── Schemas (Pydantic)
│   └── Define request/response validation
│
├── API Endpoints (FastAPI Routes)
│   └── Handle HTTP requests
│
├── Security (JWT, Passwords)
│   └── Handle authentication & authorization
│
├── Database Layer
│   └── Execute queries
│
└── Frontend Service
    └── Consume API endpoints
```

---

## ✨ Key Features

```
✅ Authentication
   • Email/Password Registration
   • Login with JWT Token
   • Protected Endpoints

✅ CRUD Operations
   • Create, Read, Update, Delete for 4 resource types
   • Validation at every step

✅ Database
   • PostgreSQL with proper relationships
   • Auto-migration (tables created on startup)

✅ Security
   • JWT authentication
   • Bcrypt password hashing
   • CORS enabled

✅ API Documentation
   • Swagger UI at /docs
   • ReDoc at /redoc

✅ Code Quality
   • Type hints everywhere
   • Clean separation of concerns
   • Error handling
   • No design changes to frontend
```

---

## 🚀 Startup Sequence

```
1️⃣  START PostgreSQL Database
    └─ Built into your system / Docker container

2️⃣  START Backend Server
    └─ Terminal: cd Backend && python main.py
    └─ Creates tables automatically
    └─ Running on: http://localhost:8000

3️⃣  START Frontend Dev Server
    └─ Terminal: cd Frontend/src && npm run dev
    └─ Running on: http://localhost:5173

4️⃣  OPEN Browser
    └─ Visit: http://localhost:5173
    └─ Register/Login
    └─ Test features!

5️⃣  (OPTIONAL) TEST API
    └─ Visit: http://localhost:8000/docs
    └─ Interactive API documentation
```

---

## 📍 Important Files You Touch

```
When Building:
├── Backend/app/api/v1/endpoints/*.py     ← Modify routes here
├── Backend/app/models/__init__.py        ← Define new models here
├── Backend/app/schemas/__init__.py       ← Define validation here
└── Backend/main.py                       ← Add middleware here

When Integrating:
├── Frontend/src/services/api.ts          ← Already created for you!
├── Frontend/src/components/*.tsx         ← Update to use API
└── Frontend/src/App.tsx                  ← Remains unchanged

When Configuring:
├── Backend/.env                          ← Database URL, secrets
└── Both: http://localhost:PORT           ← Your servers
```

---

## 📚 Documentation Map

```
START HERE
    │
    ├─→ README.md (Overview)
    │       │
    │       ├─→ QUICK_START.md (Get Running)
    │       │
    │       ├─→ SETUP_AND_RUN_GUIDE.md (Detailed Setup)
    │       │       │
    │       │       ├─→ DATABASE_SCHEMA.md (Understand Data)
    │       │       │
    │       │       └─→ API_DOCUMENTATION.md (API Reference)
    │       │
    │       ├─→ FRONTEND_INTEGRATION_GUIDE.md (Use API)
    │       │       │
    │       │       └─→ COMPONENT_INTEGRATION_EXAMPLES.md (Code Examples)
    │       │
    │       ├─→ IMPLEMENTATION_SUMMARY.md (What Was Built)
    │       │
    │       └─→ VERIFICATION_CHECKLIST.md (Verify All)
```

---

**You now have a complete, documented, ready-to-run platform! 🎉**
