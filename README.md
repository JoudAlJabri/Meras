# Meras 🌱

Meras is a web-based mentorship platform that connects high school students (**Explorers**) with university student mentors (**Guides**) through micro-challenges, a career compass quiz, and booking sessions. Built with React on the frontend and Node.js + Express + MongoDB on the backend.

---

## 🎬 How to Use Meras
https://drive.google.com/drive/folders/1_4-dq46EUWHUmpY_kcrXZMSn0T-nVlbQ


---

## 👥 Team

| Name | Role |
|------|------|
| Joud Aljabri | Frontend + Backend |
| Jana Alkahlan | Frontend + Backend |
| Dana Alsawad | Frontend + Backend |
| Lamees Alharbi | Frontend + Backend |

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Explorer | harbilamees86@gmail.com | Ll11223344 |
| Guide | s202242700@kfupm.edu.sa | 12345678 |
| Admin | admin@gmail.com | admin123 |


---

## 🚀 Features

### 🧭 Explorer
- Dashboard to track progress and activity
- Browse and complete micro-challenges by major
- Compass Quiz (RIASEC-based) to discover recommended majors — results saved to profile
- View and book sessions with mentors
- Submit challenge solutions (file upload, text, or canvas drawing)
- Save challenges for later
- Manage personal profile and settings

### 🎓 Guide (Mentor)
- Create and publish micro-challenges via Task Wizard
- Grade explorer submissions (stars + feedback)
- Set weekly availability for booking
- View mentor directory and profile
- Manage guide profile and settings

### 🛠️ Admin
- Approve or reject guide registrations
- Manage users and platform content
- View announcements, office hours, earnings dashboard
- Taxonomy management (universities, majors)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React + Vite | UI framework and dev server |
| React Router | Client-side routing |
| Bootstrap + CSS | Styling and layout |
| React Icons | Icon library |
| Recharts | Data visualization |
| react-sketch-canvas | Canvas drawing in workspace |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Server runtime |
| Express.js | Web framework and routing |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB ODM (models and schemas) |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| multer | File upload handling |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |
| nodemon | Auto-restart during development |

---

## ⚙️ Environment Variables

Create a `.env` file inside the `meras-backend/` folder with the following:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/meras
JWT_SECRET=your_jwt_secret_here
PORT=5001
```


---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/JoudAlJabri/Meras.git
cd Meras
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd meras-backend
npm install
```

### 4. Set up environment variables
```bash
# Inside meras-backend/
cp .env.example .env
# Then fill in your MONGO_URI and JWT_SECRET
```

---

## ▶️ Running the Project

### Start the backend (Terminal 1)
```bash
cd meras-backend
node server.js
```
You should see:
```
Server running on port 5001
MongoDB connected
```

### Start the frontend (Terminal 2)
```bash
cd Meras
npm run dev
```
Then open: `http://localhost:5173`

---

## 📁 Project Structure

```
Meras/
├── src/
│   ├── api/                  # API layer (fetch calls to backend)
│   │   ├── auth.js
│   │   └── challenges.js
│   ├── components/           # Reusable UI components
│   ├── context/              # AuthContext (JWT + session management)
│   ├── layouts/              # Role-based layouts (Explorer, Guide, Admin)
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── explorer/
│   │   └── guide/
│   └── App.jsx
│
├── meras-backend/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Route handler logic
│   ├── middleware/            # Auth + role middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express route definitions
│   ├── seed/                 # Challenge seed data
│   ├── uploads/              # Uploaded files (submissions, transcripts)
│   └── server.js             # App entry point
│
├── vite.config.js            # Vite + proxy config
└── package.json
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication
All protected routes require a Bearer token in the header:
```
Authorization: Bearer <token>
```

---

### 🔐 Auth Routes `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register a new user (explorer or guide) |
| POST | `/auth/login` | Public | Login and receive JWT token |
| GET | `/auth/me` | Protected | Get current logged-in user |

**POST /auth/register — Example Request:**
```json
{
  "name": "Sara Ahmed",
  "email": "sara@example.com",
  "password": "password123",
  "role": "explorer"
}
```

**POST /auth/register — Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc123...",
    "name": "Sara Ahmed",
    "email": "sara@example.com",
    "role": "explorer"
  }
}
```

---

### 🧩 Challenge Routes `/api/challenges`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/challenges` | Public | Get all challenges (supports `?major=` and `?difficulty=` filters) |
| GET | `/challenges/:id` | Public | Get a single challenge by ID |
| GET | `/challenges/guide/:guideId` | Guide | Get all challenges by a specific guide |
| POST | `/challenges` | Guide | Create a new challenge |
| PUT | `/challenges/:id` | Guide | Update a challenge |
| DELETE | `/challenges/:id` | Guide/Admin | Delete a challenge |
| POST | `/challenges/:id/complete` | Explorer | Mark challenge as completed |
| POST | `/challenges/:id/save` | Explorer | Save/bookmark a challenge |
| DELETE | `/challenges/:id/save` | Explorer | Remove a saved challenge |

**GET /challenges?major=Computer Science — Example Response:**
```json
{
  "challenges": [
    {
      "_id": "64abc123...",
      "title": "Build a Simple Calculator",
      "major": "Computer Science",
      "mentorName": "Rana Abdullah",
      "difficulty": "Beginner",
      "timeEstimate": 30,
      "tags": ["Investigative", "Conventional"]
    }
  ]
}
```

---

### 📤 Submission Routes `/api/submissions`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/submissions` | Explorer | Submit a challenge solution (file/text/canvas) |
| PATCH | `/submissions/:id/grade` | Guide | Grade a submission (stars + feedback) |
| GET | `/submissions/guide/:guideId` | Guide/Admin | Get all submissions for a guide's challenges |
| GET | `/submissions/explorer/:explorerId` | Explorer/Admin | Get all submissions by an explorer |
| GET | `/submissions/:id` | Protected | Get a single submission by ID |

**POST /submissions — Example Request (text submission):**
```json
{
  "challengeId": "64abc123...",
  "submissionType": "text",
  "textAnswer": "My solution is..."
}
```

**PATCH /submissions/:id/grade — Example Request:**
```json
{
  "stars": 4,
  "feedback": "Great work! Consider improving your variable naming."
}
```

---

### 👤 User Routes `/api/users`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/users/mentors` | Public | Get all approved guides (supports `?major=` and `?university=` filters) |
| GET | `/users/mentors/:id` | Public | Get a single mentor profile + their published challenges |
| PUT | `/users/:id/availability` | Guide | Update weekly availability slots |
| POST | `/users/:id/quiz-results` | Explorer | Save Compass Quiz recommended majors |
| GET | `/users/me/saved-challenges` | Explorer | Get saved challenges |
| GET | `/users/me/dashboard` | Explorer | Get dashboard summary |
| PATCH | `/users/me/settings` | Explorer | Update explorer profile |
| PATCH | `/users/me/guide-settings` | Guide | Update guide profile |

**GET /users/mentors — Example Response:**
```json
{
  "mentors": [
    {
      "_id": "64abc123...",
      "name": "Rana Abdullah",
      "major": "Software Engineering",
      "university": "KFUPM",
      "skills": ["Python", "Web Dev"],
      "rating": 4.8,
      "guideStatus": "approved"
    }
  ]
}
```

---

### 🔑 Admin Routes `/api/admin`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/admin/users` | Admin | Get all users |
| PATCH | `/admin/users/:id/approve` | Admin | Approve a guide |
| POST | `/admin/announcements` | Admin | Create an announcement |
| POST | `/admin/taxonomy/universities` | Admin | Add a university |
| POST | `/admin/taxonomy/majors` | Admin | Add a major |

---

## 🧪 Testing APIs

All APIs were tested using **Postman** before frontend integration.

**Steps to test:**
1. Start the backend: `node server.js`
2. Open Postman
3. POST to `/api/auth/login` with valid credentials to get a token
4. Add `Authorization: Bearer <token>` header to protected requests
5. Send requests to the desired endpoints

---

## 🔒 Security

- Passwords are hashed using **bcryptjs** before storing
- JWT tokens expire after **7 days**
- Protected routes verify tokens via `authMiddleware`
- Role-based access enforced via `roleMiddleware`
- Sensitive data excluded from responses (passwords never returned)
- `.env` file excluded from git via `.gitignore`

---

## ⚠️ Known Limitations

- Booking system uses hardcoded time slots (not yet dynamically pulled from guide availability)
- Email verification is implemented but email delivery depends on SMTP configuration
- Canvas submissions save as PNG files locally (no cloud storage yet)
- Admin approval of guides must be done manually via database or admin dashboard

---

## 📌 Future Improvements

- Real-time chat between explorers and guides
- Cloud file storage (AWS S3 or Cloudinary) for submissions
- Push notifications for bookings and grading
- Mobile app version
- Advanced analytics for admins
- Payment integration for premium sessions