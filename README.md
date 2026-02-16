# 🎓 Amaliyot Ofisi Platform

A complete platform for managing internships, volunteers, supervisors, and mentors with user authentication.

## 📂 Project Structure

```
Amaliyot ofisi uchun/
├── Backend/                          # FastAPI Backend with PostgreSQL
│   ├── app/
│   │   ├── api/v1/endpoints/        # API endpoints (auth, interns, volunteers, supervisors, mentors)
│   │   ├── core/                    # Configuration & security (JWT, passwords)
│   │   ├── db/                      # Database setup
│   │   ├── models/                  # SQLAlchemy ORM models
│   │   └── schemas/                 # Pydantic request/response schemas
│   ├── main.py                      # FastAPI app entry point
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment template
│   └── README.md                    # Backend documentation
│
├── Frontend/                         # React + TypeScript + Vite
│   └── src/
│       ├── services/
│       │   └── api.ts              # ✨ NEW! API service for backend communication
│       ├── components/              # React components
│       ├── App.tsx                 # Main app component
│       └── ...                     # Other frontend files (unchanged!)
│
├── QUICK_START.md                  # ⚡ Get running in 5 minutes
├── SETUP_AND_RUN_GUIDE.md         # 📖 Complete setup instructions
├── API_DOCUMENTATION.md            # 📚 Full API reference
├── FRONTEND_INTEGRATION_GUIDE.md   # 🔗 How to use API in frontend
└── DATABASE_SCHEMA.md              # 🗄️ Database structure
```

---

## ⚙️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Security**: bcrypt password hashing

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Build Tool**: Tailwind CSS

---

## 🚀 Quick Start

Want to get running immediately? Follow **QUICK_START.md**

For detailed instructions, see **SETUP_AND_RUN_GUIDE.md**

---

## 📋 Features

### ✅ Authentication
- User registration with email/password
- User login with JWT tokens
- Token-based API access
- Automatic token expiration (30 minutes)
- Password hashing with bcrypt

### ✅ User Management (Future)
- User profiles
- Role-based access control

### ✅ Intern Management
- View all interns
- Create new interns
- Update intern details (status, progress, etc.)
- Delete interns

### ✅ Volunteer Management
- View all volunteers
- Create new volunteer records
- Update volunteer information
- Delete volunteers

### ✅ Supervisor Management
- View all supervisors
- Create supervisor profiles
- Update supervisor information
- Delete supervisors

### ✅ Mentor Management
- View all mentors
- Create mentor profiles
- Update mentor information
- Delete mentors

---

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (Protected)

### Interns
- `GET /api/v1/interns/` - Get all interns
- `POST /api/v1/interns/` - Create intern (Protected)
- `GET /api/v1/interns/{id}` - Get specific intern
- `PUT /api/v1/interns/{id}` - Update intern (Protected)
- `DELETE /api/v1/interns/{id}` - Delete intern (Protected)

### Volunteers, Supervisors, Mentors
Similar CRUD operations available for each resource.

**Full API documentation**: See `API_DOCUMENTATION.md`

---

## 🔐 Architecture

### Clean Code Principles
- **Separation of Concerns**: Models, Schemas, Routes
- **Reusable Components**: Api service layer for frontend
- **DRY (Don't Repeat Yourself)**: Common utilities
- **Type Safety**: TypeScript + Pydantic validation

### Security
- JWT authentication for protected routes
- Bcrypt password hashing
- CORS middleware enabled
- Environment variables for secrets

---

## 📊 Database

Uses PostgreSQL with the following tables:
- `users` - User accounts
- `interns` - Intern records
- `volunteers` - Volunteer records
- `supervisors` - Supervisor profiles
- `mentors` - Mentor profiles

See `DATABASE_SCHEMA.md` for full schema details.

---

## 🛠️ Installation

### Prerequisites
- Python 3.10+
- Node.js 16+
- PostgreSQL 12+

### Backend Setup
```bash
cd Backend
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # macOS/Linux
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd Frontend/src
npm install
```

See `SETUP_AND_RUN_GUIDE.md` for detailed steps.

---

## 🏃 Running

### Backend
```bash
cd Backend
venv\Scripts\activate
python main.py
# Running at http://localhost:8000
```

### Frontend
```bash
cd Frontend/src
npm run dev
# Running at http://localhost:5173
```

### Database
PostgreSQL must be running. Create database:
```bash
createdb -U postgres amaliyot_ofisi
```

---

## 📖 Documentation

1. **QUICK_START.md** - Get it running in 5 minutes
2. **SETUP_AND_RUN_GUIDE.md** - Comprehensive setup & running guide
3. **API_DOCUMENTATION.md** - Complete API reference with examples
4. **FRONTEND_INTEGRATION_GUIDE.md** - How to use API in React components
5. **DATABASE_SCHEMA.md** - Database structure and relationships

---

## 🔗 Frontend Integration

The frontend has a ready-to-use API service file at:
```
Frontend/src/services/api.ts
```

This file provides functions for all backend operations:
```javascript
import { loginUser, getInterns, createIntern } from './services/api';

// Example:
const interns = await getInterns();
const newIntern = await createIntern({...});
```

See `FRONTEND_INTEGRATION_GUIDE.md` for details.

---

## 🧪 Testing

### Interactive API Testing
Visit Swagger UI at: `http://localhost:8000/docs`

### Manual Testing with cURL
```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","username":"testuser","password":"pass123"}'

# Get interns
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/v1/interns/
```

---

## 📁 Environment Setup

Create `.env` file in Backend folder:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/amaliyot_ofisi
SECRET_KEY=your-secret-key-change-in-production
DEBUG=True
```

Copy from `.env.example` as template.

---

## 🎨 Frontend Design

✅ **No design changes made**
- All HTML structure preserved
- All CSS classes maintained
- Layout remains identical
- Only JavaScript API integration added

---

## 🚀 Deployment

### Backend (Production)
```bash
# Use environment secrets
# Set DEBUG=False in .env
# Use strong SECRET_KEY
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 main:app
```

### Frontend (Production)
```bash
npm run build
# Output in dist/ folder
# Deploy to any static hosting
```

---

## 🤝 Contributing

1. Follow the existing code structure
2. Use type hints (TypeScript/Python)
3. Write clear error messages
4. Test before committing
5. Keep frontend design intact

---

## ❓ Troubleshooting

### Backend Issues
- **psycopg2 error**: `pip install psycopg2-binary`
- **Port 8000 in use**: Use different port with `--port 8001`
- **Database connection error**: Check PostgreSQL is running

### Frontend Issues
- **CORS errors**: Ensure backend is running on port 8000
- **API service not found**: Check file path `src/services/api.ts`

See `SETUP_AND_RUN_GUIDE.md#troubleshooting` for more.

---

## 📝 License

This project is provided as-is for educational and commercial use.

---

## 📞 Support

For issues or questions:
1. Check the relevant documentation file
2. Review API docs at http://localhost:8000/docs
3. Check error messages in console/terminal

---

## 🎉 You're All Set!

Your platform is ready to run. Follow **QUICK_START.md** to begin!

**Happy coding! 🚀**
