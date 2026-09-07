# CareerFlow AI

## 🚀 Live Demo

| Platform | URL |
|----------|-----|
| **Frontend** | [https://careerflow-ai-sigma.vercel.app](https://careerflow-ai-sigma.vercel.app) |
| **Backend API** | [https://careerflow-ai-jhgm.onrender.com](https://careerflow-ai-jhgm.onrender.com) |
| **GitHub Repository** | [https://github.com/8309h/careerflow-ai](https://github.com/8309h/careerflow-ai) |

---

## 📌 Project Overview

### The Problem
Job hunting is overwhelming. Applicants face multiple challenges:
- Tracking applications across multiple platforms
- Customizing cover letters for each role
- Assessing resume compatibility with job descriptions
- Preparing for interviews with relevant guidance
- Managing application status and communication

### The Solution
**CareerFlow AI** is an all-in-one intelligent job management platform that leverages Google Gemini AI to:
- **Streamline job applications** with centralized tracking
- **Generate personalized cover letters** tailored to job descriptions
- **Analyze ATS compatibility** and provide optimization suggestions
- **Prepare for interviews** with AI-powered question generation and guidance
- **Manage resumes** securely and reuse across tools

### Why CareerFlow AI?
- **⏱️ Saves Time**: Automate cover letter writing and ATS analysis
- **🎯 Increases Success Rate**: AI-powered interview prep and resume optimization
- **📊 Data-Driven Insights**: Track applications, monitor status, and manage notes
- **🔒 Secure & Private**: JWT authentication with MongoDB encryption
- **🚀 Production Ready**: Deployed and scalable architecture

### Target Users
- **Job Seekers**: Active applicants looking to streamline their job search
- **Career Changers**: Professionals transitioning to new industries
- **Entry-Level Candidates**: Recent graduates needing guidance and interview prep
- **Experienced Professionals**: High-volume job applicants managing multiple applications

### Key Business Value
- Reduce job search time by 40-60%
- Improve interview preparation quality
- Increase application success rate with ATS optimization
- Centralized dashboard for application tracking
- Premium AI features (future monetization opportunity)

---

## 🎯 Key Features

### 🔐 Authentication & Security
- ✅ JWT-based authentication with secure token management
- ✅ Google OAuth 2.0 integration for seamless login
- ✅ Protected routes and role-based access control
- ✅ Secure password hashing and validation
- ✅ Session management and token refresh

### 💼 Job Management
- ✅ Browse jobs from multiple sources (Jooble, RemoteOK)
- ✅ Save jobs for later viewing
- ✅ Apply to jobs directly through the platform
- ✅ Track applied jobs with timestamps
- ✅ External job application tracking
- ✅ Advanced job filtering and search
- ✅ Pagination for seamless browsing

### 📋 Application Tracking System
- ✅ Real-time application status management
- ✅ Track application progression (Applied → Interview → Offered → Rejected)
- ✅ Add and manage notes for each application
- ✅ Application history with timestamps
- ✅ One-click resume upload for applications
- ✅ Custom field tracking

### 🤖 AI-Powered Features

#### Cover Letter Generator
- 🎨 Generate personalized cover letters from job descriptions
- 📄 Resume-aware generation for contextual content
- ✏️ Edit and customize generated letters
- 📋 Template management
- 🔄 Regenerate with different styles

#### ATS Resume Checker
- 📊 Resume-only ATS analysis
- 🎯 Resume + Job Description comprehensive analysis
- ⭐ ATS Score calculation (0-100)
- 🔍 Skill gap analysis with actionable insights
- 💡 Improvement suggestions and recommendations
- 🎓 Keyword optimization guidance
- 📈 Formatting analysis

#### AI Interview Preparation
- 🧠 Experience summary + JD-based question generation
- 💬 Technical questions with suggested answers
- 🗣️ Behavioral questions with STAR method guidance
- 👔 HR questions and preparation tips
- 📌 Focus areas and preparation roadmap
- 🎬 Mock interview scenario building
- 📝 Answer suggestions with best practices

---
## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React.js** | UI Library | 18.x |
| **Vite** | Build Tool | 4.x+ |
| **React Router** | Client-side Routing | 6.x |
| **Axios** | HTTP Client | 1.x |
| **Context API** | State Management | Native |
| **CSS Modules** | Styling | Native |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime | 18.x+ |
| **Express.js** | Web Framework | 4.x |
| **JWT** | Authentication | For Token Management |
| **Google OAuth** | Social Authentication | OAuth 2.0 |
| **Multer** | File Upload | For Resume Upload |

### Database
| Technology | Purpose |
|-----------|---------|
| **MongoDB Atlas** | NoSQL Database |
| **Mongoose** | ODM (Object Data Modeling) |

### AI & APIs
| Service | Purpose |
|---------|---------|
| **Google Gemini API** | AI-powered content generation |
| **Jooble API** | Job listings |
| **RemoteOK API** | Remote job listings |

### Deployment & DevOps
| Platform | Service |
|----------|---------|
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |
| **MongoDB Atlas** | Database hosting |
| **Google Cloud** | OAuth & Gemini API |

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│               React.js + Vite + Context API                 │
│                                                             │
│  UI Components | Pages | Services | Authentication          │
└────────────────────────────┬────────────────────────────────┘
                             │
                         HTTPS / REST
                             │
                           Axios
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND / API LAYER                      │
│                    Node.js + Express.js                     │
│                                                             │
│  Routes → Middleware → Controllers → Services              │
│                                                             │
│  JWT Authentication | Google OAuth | CORS                  │
│  Validation | Error Handling | Business Logic              │
└──────────────┬───────────────┬───────────────┬──────────────┘
               │               │               │
               ↓               ↓               ↓
        ┌────────────┐  ┌────────────┐  ┌──────────────┐
        │ MongoDB    │  │ Gemini API │  │ Resume/File  │
        │ Atlas      │  │            │  │ Storage      │
        │            │  │ AI Features│  │              │
        └────────────┘  └────────────┘  └──────────────┘
               │
               │
               ↓
       ┌──────────────────────┐
       │   EXTERNAL JOB APIs  │
       │                      │
       │ Jooble API           │
       │ RemoteOK API         │
       └──────────────────────┘

       AUTHENTICATION
       └── Google OAuth
```

### Data Flow

```
         User Login
             ↓
      JWT Token Generation / Google OAuth
             ↓
      Access Protected Resources
             ↓
      ┌─────────────────────────┐
      │  Job Management         │
      │  Application Tracking   │
      │  Resume Management      │
      └──────────┬──────────────┘
                 ↓
         ┌──────────────────┐
         │  AI Services     │
         ├──────────────────┤
         │ • Cover Letter   │
         │ • ATS Checker    │
         │ • Interview Prep │
         └────────┬─────────┘
                  ↓
            Gemini API
```

---

## 📁 Project Structure

### Overall Structure
```
careerflow-ai/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context API (Auth, Jobs, Theme)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service calls
│   │   ├── App.jsx         # Main App component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── package.json        # Dependencies
│   └── vite.config.js      # Vite configuration
│
├── server/                 # Express.js Backend Server
│   ├── controllers/        # Business logic controllers
│   ├── routes/             # API routes
│   ├── models/             # MongoDB schemas
│   ├── services/           # Business services
│   ├── middleware/         # Express middleware
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   ├── uploads/            # File uploads storage
│   ├── server.js           # Server entry point
│   └── package.json        # Dependencies
│
├── .gitignore              # Git ignore rules
├── README.md               # This file
└── LICENSE                 # License file
```

### Client Structure Details
```
client/src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Navbar.jsx          # Main navigation bar
│   ├── Sidebar.jsx         # Sidebar navigation
│   ├── Layout.jsx          # Main layout wrapper
│   ├── JobCard.jsx         # Job listing card
│   ├── ApplicationTrackerCard.jsx
│   ├── AIToolsSection.jsx  # AI features section
│   ├── AuthForm.jsx        # Login/Register form
│   ├── GoogleAuthButton.jsx
│   ├── FilterSidebar.jsx   # Job filters
│   ├── SearchBar.jsx       # Search functionality
│   ├── Loader.jsx          # Loading indicator
│   └── ... (other components)
│
├── pages/
│   ├── About.jsx           # About page
│   ├── AIHub.jsx           # AI tools hub
│   ├── ATSChecker.jsx      # ATS analysis page
│   ├── CoverLetterGenerator.jsx
│   ├── Dashboard.jsx       # Main dashboard
│   ├── InterviewPrep.jsx   # Interview preparation
│   └── ... (other pages)
│
├── context/
│   ├── AuthContext.jsx     # Authentication state
│   ├── JobContext.jsx      # Job listings state
│   └── ThemeContext.jsx    # Theme management
│
├── hooks/
│   ├── useAuth.js          # Authentication hook
│   ├── useFetch.js         # Data fetching hook
│   └── useForm.js          # Form handling hook
│
└── services/
    └── api.js              # Centralized API calls
```

### Server Structure Details
```
server/
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── jobController.js         # Job management logic
│   ├── applicationController.js # Application tracking
│   ├── aiController.js          # AI features logic
│   └── savedController.js       # Saved jobs logic
│
├── routes/
│   ├── authRoutes.js            # /api/auth/*
│   ├── jobRoutes.js             # /api/jobs/*
│   ├── applicationRoutes.js     # /api/applications/*
│   ├── aiRoutes.js              # /api/ai/*
│   └── savedRoutes.js           # /api/saved/*
│
├── models/
│   ├── User.js                  # User schema
│   ├── Job.js                   # Job schema
│   ├── Application.js           # Application schema
│   └── SavedJob.js              # Saved job schema
│
├── services/
│   ├── jobService.js            # Job fetching & management
│   ├── applicationService.js    # Application business logic
│   ├── atsService.js            # ATS analysis logic
│   ├── geminiService.js         # Gemini API integration
│   ├── interviewService.js      # Interview prep logic
│   └── remoteOkService.js       # RemoteOK integration
│
├── middleware/
│   ├── authMiddleware.js        # JWT verification
│   ├── authorize.js             # Role-based authorization
│   ├── errorHandler.js          # Error handling
│   ├── errorMiddleware.js       # Error middleware
│   └── uploadMiddleware.js      # File upload handling
│
├── config/
│   └── db.js                    # MongoDB connection
│
└── utils/
    └── pdfParser.js             # PDF parsing for resume
```

---

## 🔧 Environment Variables

### Backend Environment Variables (`.env`)

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/careerflow-ai

# Authentication
JWT_SECRET=your_jwt_secret_key_here_min_32_characters
JWT_EXPIRATION=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback

# Frontend URL (CORS)
FRONTEND_URL=https://careerflow-ai-sigma.vercel.app

# Google Gemini API
GEMINI_API_KEY=your_google_gemini_api_key

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Email Service (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend Environment Variables (`.env`)

```env
# API Configuration
VITE_API_URL=https://careerflow-ai-jhgm.onrender.com

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Environment
VITE_ENV=production
```

### Backend `.env.example`
```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/careerflow-ai

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=7d

GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

FRONTEND_URL=http://localhost:5173

GEMINI_API_KEY=your_google_gemini_api_key

MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

### Frontend `.env.example`
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
VITE_ENV=development
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** v18.x or higher ([Download](https://nodejs.org/))
- **npm** v9.x or higher (comes with Node.js)
- **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas))
- **Google Cloud** account for APIs ([Sign up](https://cloud.google.com/))
- **Git** ([Download](https://git-scm.com/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/8309h/careerflow-ai.git
cd careerflow-ai
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Configure environment variables
# Edit .env and add your credentials:
# - MONGO_URI
# - JWT_SECRET
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - GEMINI_API_KEY
# - FRONTEND_URL (http://localhost:5173 for local development)

# Start development server
npm start

# Or use nodemon for auto-reload
npm run dev
```

### Step 3: Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Configure environment variables
# Edit .env and add:
# - VITE_API_URL=http://localhost:5000
# - VITE_GOOGLE_CLIENT_ID

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://careerflow-ai-jhgm.onrender.com/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Google OAuth Login
```http
POST /api/auth/google
Content-Type: application/json

{
  "token": "google_id_token"
}

Response (200):
{
  "success": true,
  "token": "jwt_token",
  "user": { ... }
}
```

### Jobs Endpoints

#### Get All Jobs
```http
GET /api/jobs?page=1&limit=10&search=react&location=remote
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "job123",
      "title": "React Developer",
      "company": "Tech Corp",
      "location": "Remote",
      "salary": "$80,000 - $120,000",
      "description": "We are looking for...",
      "source": "jooble",
      "url": "https://example.com/jobs/react-developer"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 245
  }
}
```

#### Save Job
```http
POST /api/jobs/save
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobId": "job123"
}

Response (201):
{
  "success": true,
  "message": "Job saved successfully",
  "data": { ... }
}
```

#### Get Saved Jobs
```http
GET /api/jobs/saved
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [ ... ]
}
```

### Applications Endpoints

#### Create Application
```http
POST /api/applications
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobId": "job123",
  "jobTitle": "React Developer",
  "company": "Tech Corp",
  "appliedDate": "2024-01-15",
  "status": "applied"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "app123",
    "jobId": "job123",
    "status": "applied",
    "notes": [],
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

#### Update Application Status
```http
PUT /api/applications/{applicationId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "interview",
  "notes": "First round interview scheduled for Jan 20"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Get All Applications
```http
GET /api/applications
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [ ... ]
}
```

### Resume Endpoints

#### Upload Resume
```http
POST /api/resume/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
file: [resume.pdf]

Response (201):
{
  "success": true,
  "data": {
    "filename": "user123_resume_2024.pdf",
    "url": "/uploads/resumes/user123_resume_2024.pdf",
    "uploadedAt": "2024-01-15T10:00:00Z"
  }
}
```

### AI Features Endpoints

#### Generate Cover Letter
```http
POST /api/ai/cover-letter
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobDescription": "We are looking for a React Developer...",
  "resumeText": "John Doe - React Developer with 5 years...",
  "style": "professional" // or "creative", "friendly"
}

Response (200):
{
  "success": true,
  "data": {
    "coverLetter": "Dear Hiring Manager,\n\nI am writing to express my interest in...",
    "generatedAt": "2024-01-15T10:00:00Z"
  }
}
```

#### ATS Resume Analysis
```http
POST /api/ai/ats-check
Authorization: Bearer {token}
Content-Type: application/json

{
  "resumeText": "John Doe - React Developer...",
  "jobDescription": "Looking for React Developer with..."
}

Response (200):
{
  "success": true,
  "data": {
    "atsScore": 78,
    "keywordMatch": {
      "matched": ["React", "JavaScript", "Node.js"],
      "missing": ["TypeScript", "GraphQL"]
    },
    "suggestions": [
      "Add more quantifiable achievements",
      "Include relevant keywords from job description"
    ],
    "analysis": {
      "formattingScore": 85,
      "contentScore": 75,
      "keywordScore": 72
    }
  }
}
```

#### Generate Interview Questions
```http
POST /api/ai/interview-prep
Authorization: Bearer {token}
Content-Type: application/json

{
  "experienceSummary": "5 years as React developer...",
  "jobDescription": "Looking for React Developer...",
  "interviewType": "technical" // or "behavioral", "hr"
}

Response (200):
{
  "success": true,
  "data": {
    "questions": [
      {
        "question": "How would you optimize React component rendering?",
        "suggestedAnswer": "...",
        "focusArea": "Performance optimization"
      }
    ],
    "focusAreas": ["Performance", "State Management"],
    "preparationTips": ["...]"
  }
}
```

---

4. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGO_URI=<from MongoDB Atlas>
   JWT_SECRET=<generate random key>
   GOOGLE_CLIENT_ID=<from Google Cloud>
   GOOGLE_CLIENT_SECRET=<from Google Cloud>
   GOOGLE_REDIRECT_URI=https://careerflow-ai-jhgm.onrender.com/api/auth/google/callback
   FRONTEND_URL=https://careerflow-ai-sigma.vercel.app
   GEMINI_API_KEY=<from Google Cloud>
   ```

4. Add Environment Variables:
   ```
   VITE_API_URL=https://careerflow-ai-jhgm.onrender.com
   VITE_GOOGLE_CLIENT_ID=<from Google Cloud>
   ```

5. Deploy

### Production URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://careerflow-ai-sigma.vercel.app |
| **Backend** | https://careerflow-ai-jhgm.onrender.com |
| **API Docs** | https://careerflow-ai-jhgm.onrender.com/api/docs |
| **GitHub** | https://github.com/8309h/careerflow-ai |

---

## 🗓️ Future Roadmap

### Phase 2: Enhanced Job Aggregation
- [ ] Multi-source job aggregation (LinkedIn, Indeed, Glassdoor)
- [ ] Advanced filtering by salary, company size, tech stack
- [ ] Job recommendation engine based on profile
- [ ] Real-time job alerts

### Phase 3: AI Enhancements
- [ ] AI Mock Interview with video recording
- [ ] Real-time interview feedback
- [ ] Skill gap analysis and learning path recommendations
- [ ] Resume optimization suggestions with before/after comparison
- [ ] Cover letter templates and style variations

### Phase 4: Analytics & Insights
- [ ] Career analytics dashboard
- [ ] Application success rate tracking
- [ ] Salary trend analysis
- [ ] Industry insights and market data
- [ ] Personal brand analytics

### Phase 5: Premium Features
- [ ] Premium AI features (unlimited cover letters, advanced interview prep)
- [ ] LinkedIn profile integration
- [ ] Email notification system
- [ ] Calendar integration for interview scheduling
- [ ] Reference management system

### Phase 6: Community & Networking
- [ ] Peer review system for resumes and cover letters
- [ ] Career mentor network
- [ ] Discussion forums
- [ ] Case study sharing
- [ ] Company reviews integration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/careerflow-ai.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Write meaningful commit messages
   - Test your changes locally

4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues

### Code Standards

- Use ES6+ syntax
- Follow existing file naming conventions
- Add comments for complex logic
- Keep components modular and reusable
- Write meaningful commit messages

### Reporting Issues

Found a bug? Please create an issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

---

## 👤 About Author

**Harshal Wagh**  
Associate Software Engineer

### Skills
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React.js](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=flat-square&logo=mongodb&logoColor=white)

### Connect
- **GitHub**: [@8309h](https://github.com/8309h)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

---

## 🙏 Acknowledgments

- **Google Gemini API** for AI capabilities
- **MongoDB Atlas** for database hosting
- **Render** for backend hosting
- **Vercel** for frontend hosting
- **Jooble & RemoteOK** for job listings

---

### Resources
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Google Gemini API](https://ai.google.dev)

---

<div align="center">

**Made with ❤️ by Harshal Wagh**

⭐ If you find this project helpful, please star it on GitHub! ⭐

[GitHub](https://github.com/8309h/careerflow-ai) | [Live Demo](https://careerflow-ai-sigma.vercel.app) | [Report Bug](https://github.com/8309h/careerflow-ai/issues)

</div>
