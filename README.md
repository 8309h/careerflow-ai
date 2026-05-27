# careerflow-ai

Full stack mental model for your AI Job Tracker
This is the complete architecture view, feature by feature, with why each layer exists and how the pieces work together.

1. Frontend ↔ Backend communication
What currently happens
The React app uses Axios through api.js
It sends requests to backend endpoints like:
POST /api/auth/signup
POST /api/auth/login
GET /api/jobs
POST /api/jobs
GET /api/saved
POST /api/saved
Why this layer exists
The frontend is the user interface.
It should never directly access the database.
It asks the backend for information and trusts it to enforce rules.
Example flow
User opens Jobs page
Frontend triggers jobService.getJobs(token)
Axios sends GET http://localhost:5000/api/jobs with Authorization header
Backend receives request, authenticates user, queries MongoDB
Backend returns JSON job list
Frontend renders job cards
2. How MongoDB fits into the architecture
Role of MongoDB
MongoDB is the app’s persistent storage
It stores:
Users
Job records
Saved jobs
future AI metadata, user settings, etc.
Where it is configured
db.js
process.env.MONGO_URI or fallback mongodb://127.0.0.1:27017/careerflow-ai
What it stores
Job collection with fields like:
title
company
status
location
notes
user
SavedJob collection for saved roles
User collection for auth
Why MongoDB is used
Flexible schema for job fields
Works well with JSON-style data
Good for rapid iteration and production scaling
3. Where job data should live
In a real production app
Job data belongs in the database, not in React state permanently
React state is temporary UI state
MongoDB is the source of truth
In this project
The source of truth is:
Job.js on the backend
JobContext.jsx caches it for UI
When the user refreshes, frontend reloads job data from backend again
4. Static data → live RemoteOK API data
Current status
The current app uses your own backend + MongoDB data
It is not yet pulling remote job listings from RemoteOK
How it becomes live later
Backend gets a new service to call RemoteOK API
It fetches fresh job listings
It normalizes the remote format to your local schema
It stores or caches that normalized data
Frontend consumes it from your backend like any other API
Why this is a good design
Your frontend stays unchanged
The backend becomes the adapter
Backend hides RemoteOK-specific fields and formats
5. API flow through the system
Simple text architecture
Frontend UI
⬇ Axios/HTTP
Backend route
⬇ Middleware
Controller
⬇ Model
MongoDB
⬆ Response

Example: Jobs page
Dashboard.jsx
calls useJobContext()
JobContext calls jobService.getJobs(token)
jobService calls backend API
backend route jobRoutes.js matches /api/jobs
authMiddleware verifies JWT
jobController.getJobs() queries Job.find({ user: req.user.id })
data returns as JSON
frontend sets jobs state and renders
6. How authentication works
Frontend
User signs up or logs in
Auth service sends credentials to backend
Backend returns:
token
user object
Frontend saves this state in AuthContext
Frontend persists it in localStorage
Backend
authRoutes.js defines auth paths
authController.js handles signup/login
Passwords are hashed with bcryptjs
JWT tokens are signed with jsonwebtoken
Backend sends the token back to the client
Protected pages
AppRoutes.jsx has ProtectedRoute
If user is not logged in, redirect to /login
If user is logged in, allow access to /jobs, /saved, etc.
Summary
AuthContext stores login state
localStorage keeps user logged in on refresh
Authorization: Bearer <token> is sent on each protected API call
backend middleware reads the token and attaches req.user
7. How saved jobs work
What saved jobs are
A separate feature from regular job tracking
Saved jobs are a “bookmark” or “favorites” collection
Backend
savedRoutes.js
savedController.js
SavedJob.js
API endpoints
GET /api/saved
POST /api/saved
DELETE /api/saved/:id
Example flow
User clicks “Save job” on a job detail
Frontend calls savedService.addSavedJob(payload, token)
Backend protects request with auth
Controller adds a SavedJob record linked to req.user.id
Frontend refreshes saved jobs list or shows confirmation
8. How Context API works in this project
Context roles
AuthContext
holds user, token, login, signup, logout
shares authentication state across all components
JobContext
loads and stores jobs
provides loading/error states
provides addJob
ThemeContext
stores light/dark theme
toggles theme globally
Why Context exists
Avoids prop drilling
Keeps global state co-located
Makes auth and jobs available anywhere in the tree
Example usage
useAuth() returns auth state
useJobContext() returns job list and loading state
9. How search and filtering work
Current project
There is no built-in search/filter implementation yet
The architecture supports adding it easily
How it should work
Keep the full job list in state
Keep filter/search terms in state
Use useMemo to compute filtered results
Render the filtered list
Why use useMemo
Avoid re-filtering on every render
Only recalculate when job list or query changes
Example pattern
10. How React hooks like useMemo, useCallback, useRef are used
useMemo
memoizes computed values
useful for search/filter results
avoids repeated expensive calculations
useCallback
memoizes functions
useful when passing callbacks to child components
prevents child re-renders when function identity changes
useRef
stores mutable values without causing re-renders
access DOM nodes directly
keep stable values across render cycles
In production
You would use them for performance
Example:
useMemo for filtered job arrays
useCallback for event handlers passed to many job cards
useRef for form field focus, or debouncing input
11. How backend controllers, routes, models, and services interact
Responsibility of each layer
routes/

define URL paths and methods
connect URL to controller functions
controllers/

contain request-handling logic
parse input, call models, return JSON
models/

define data shape in MongoDB
handle schema validation and relationships
services/ (optional)

contain business rules / reusable logic
keep controllers thin
in a production app, services make controllers easier to maintain
In this project
jobRoutes.js maps /api/jobs to controller actions
jobController.js performs DB queries through Job model
authRoutes.js maps signup/login to auth controller
authController.js creates users and tokens
authMiddleware.js protects routes
12. How data normalization works for RemoteOK API
What normalization means
RemoteOK data will have its own field names
Your app has its own schema
Normalization maps remote fields into your schema
Example
RemoteOK might return:

Your app expects:

title
company
location
status
notes
Normalization process
Fetch remote jobs
Map remote fields:
position -> title
location -> location
company -> company
Standardize status values
Save only what your app needs
Why this is important
Keeps your backend API stable
Lets your UI stay the same even if RemoteOK changes
Makes your database consistent
13. How localStorage works here
Purpose
Persist auth state between browser refreshes
Persist theme choice
In this project
AuthContext stores { user, token } to localStorage
ThemeContext stores current theme to localStorage
Why this matters
If the user refreshes, the app still knows they are logged in
Without it, refresh would require re-login
14. How AI features will integrate later
Future AI architecture
AI will be a new backend feature
Example features:
resume improvement
job summary generation
smart job matching
interview question suggestions
How it fits
Frontend sends user/job data to backend
Backend calls AI provider (e.g. OpenAI, Azure OpenAI, local model)
Backend normalizes AI response
Frontend displays AI advice in UI
Why backend handles AI
Keeps API keys secure
Allows request shaping and caching
Lets you add business logic around AI
15. How deployment will work
Production structure
Frontend deployed as static assets
Vercel, Netlify, AWS S3 + CloudFront
Backend deployed as API service
Render, Heroku, AWS ECS, DigitalOcean App Platform
Database hosted separately
MongoDB Atlas, self-hosted MongoDB, or managed MongoDB service
Key deployment concerns
Use environment variables for secrets
Enable CORS only for your frontend origin
Use HTTPS
Use production DB URI, not local file system
Build frontend once, serve static files or proxy to backend
16. Exact request-response lifecycle
Step-by-step for a protected page
User enters /jobs
React Router loads the jobs page component
JobContext runs useEffect
Frontend calls GET /api/jobs with JWT token
Backend route /api/jobs receives request
authMiddleware reads Authorization header
JWT is verified
req.user is populated
Controller queries MongoDB:
Job.find({ user: req.user.id })
MongoDB returns documents
Backend sends JSON back
Frontend receives jobs
React state updates
UI rerenders with job cards
Step-by-step for login
User submits /login
Frontend sends POST /api/auth/login
Backend verifies credentials
Backend returns token + user
Frontend stores auth state in Context and localStorage
User is redirected to /jobs
17. Complete production mental model
Frontend is the browser experience
React handles routes, pages, forms, state
Context shares global state
Axios talks to backend APIs
localStorage preserves login and theme
Backend is the secure API layer
Express receives requests
Routes determine endpoints
Controllers enforce rules
Middleware handles auth and errors
Models interact with MongoDB
Database is the data store
MongoDB stores structured documents
It is the source of truth
Backend controls read/write access
External APIs are suppliers
RemoteOK or AI providers are external systems
Backend fetches from them
Backend normalizes and serves the data to frontend
Why this is scalable
Clear responsibilities keep each layer separate
UI stays stable even when backend changes
Backend can add new data sources without frontend changes
Database is centralized and secure
Auth is reusable across pages
Future AI can be added as a new backend service
Final architecture diagram (text)
If you want, I can next map this explanation to the exact files in your project and show the minimal changes needed to make search/filtering and RemoteOK work end-to-end.

Raptor mini (Preview) • 1x