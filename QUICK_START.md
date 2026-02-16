# ⚡ Quick Start (5 minutes)

## 1️⃣ Install Backend (Terminal 1)

```bash
cd Backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

## 2️⃣ Setup Database

```bash
# Create PostgreSQL database
createdb -U postgres amaliyot_ofisi

# Or in psql:
# CREATE DATABASE amaliyot_ofisi;
```

## 3️⃣ Configure Environment

```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env and ensure:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/amaliyot_ofisi
```

## 4️⃣ Run Backend (Terminal 1)

```bash
python main.py
# Backend running at: http://localhost:8000
# API Docs at: http://localhost:8000/docs
```

## 5️⃣ Run Frontend (Terminal 2)

```bash
cd Frontend/src
npm install  # First time only
npm run dev
# Frontend running at: http://localhost:5173
```

## ✅ Done!

Open http://localhost:5173 in your browser.

---

## 🧪 Test it

1. Go to **Auth** page in navigation
2. Register with any email/username/password
3. Login with those credentials
4. Navigate to **Admin** page
5. You'll see mock data from database
6. Try creating/updating/deleting records

---

## 📖 Full Guides

- **Setup & Run Details**: See `SETUP_AND_RUN_GUIDE.md`
- **API Documentation**: See `API_DOCUMENTATION.md`
- **Frontend Integration**: See `FRONTEND_INTEGRATION_GUIDE.md`

---

## 🆘 Issues?

**Backend won't start:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Try: `pip install -r requirements.txt` again

**Frontend won't start:**
- Run `npm install` in Frontend/src
- Try: `npm run dev` again

**CORS errors:**
- Ensure backend is running on port 8000
- Frontend should be on port 5173

That's it! 🚀
