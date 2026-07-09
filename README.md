# 🚀 PromptHive — AI Prompt Sharing & Marketplace Platform

A modern full-stack AI Prompt Sharing & Marketplace platform where users can discover, create, bookmark, review, report, and manage AI prompts for tools like ChatGPT, Gemini, Claude, Midjourney, and more.

The platform includes secure authentication, role-based access control, premium subscriptions, analytics dashboards, prompt moderation, backend search/filtering, and a responsive SaaS-inspired interface.

---

## 🌐 Live Project

🔗 **Live Site:** [View Live Site](https://prompt-hive-gamma.vercel.app)


### Source Code


- Client: [View Client Repo](https://github.com/HSBHasib/PromptHive-A10)
- Server: [View Server Repo](https://github.com/HSBHasib/PromptHive-Server-A10)

---

# 📸 Project Demo
<img width="1376" height="768" alt="promptHive1" src="https://github.com/user-attachments/assets/ad535306-54f1-4a19-8b02-a80607793a59" />

---

# 🛠️ Technologies Used

## Frontend
- Next.js (App Router)
- JavaScript
- Tailwind CSS
- HeroUI
- Framer Motion
- Recharts
- React Hot Toast
- React Icons

## Backend
- Node.js
- Express.js

## Authentication & Security
- BetterAuth
- Google OAuth
- JWT
- Role-Based Access Control (RBAC)
- Middleware Protected APIs

## Database
- MongoDB Atlas
- MongoDB Aggregation Pipeline

## Payment
- Stripe

## Image Hosting
- ImgBB API

---

# ✨ Core Features

## 🔐 Authentication & Authorization
- BetterAuth authentication
- Google Sign-In
- JWT protected APIs
- Role-Based Access Control
- Persistent login sessions

## 🤖 AI Prompt Marketplace
- Browse public prompts
- Search prompts by title, tags, or AI tool
- Backend filtering & sorting
- Pagination
- Prompt details page
- Copy prompt functionality
- Bookmark prompts
- Review & rating system
- Report prompts

## 💎 Premium Subscription
- Stripe one-time payment
- Lifetime Premium access
- Premium-only prompts
- Unlimited prompt creation
- Premium dashboard access

## 👤 User Dashboard
- Add prompts
- Edit prompts
- Delete prompts
- Prompt analytics
- Saved prompts
- My reviews
- Profile management
- Upgrade to Premium

## 🎨 Creator Dashboard
- Creator analytics
- Prompt growth charts
- Copy analytics
- Bookmark analytics
- Prompt management
- CRUD operations

## 👑 Admin Dashboard
- User management
- Role management
- Prompt moderation
- Approve / Reject prompts
- Feature prompts
- Report management
- Payment management
- Platform analytics

## 📊 Analytics
- Total users
- Total prompts
- Total reviews
- Total copies
- Revenue analytics
- MongoDB aggregation
- Recharts visualizations

## ⚡ Additional Features
- Backend pagination
- Backend search
- Backend filtering
- Backend sorting
- Responsive UI
- Loading states
- Skeleton loaders
- Form validation
- Custom error handling
- 404 Page
- Production-ready deployment

---

# 📦 Major Dependencies

### Frontend

- next
- react
- tailwindcss
- @heroui/react
- framer-motion
- react-hot-toast
- recharts
- react-icons
- axios
- react-hook-form
- stripe-js

### Backend

- express
- mongodb
- better-auth
- jsonwebtoken
- stripe
- cors
- dotenv
- multer
- imgbb uploader
- cookie-parser

---

# ⚙️ Environment Variables

## Client (.env.local)

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_IMGBB_API_KEY=
```

## Server (.env)

```env
PORT=
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
IMGBB_API_KEY=
CLIENT_URL=
```

---

# 🚀 Run Locally

## 1. Clone the repositories

### Client

```bash
git clone https://github.com/HSBHasib/PromptHive-A10.git
```

### Server

```bash
git clone https://github.com/HSBHasib/PromptHive-Server-A10.git
```

---

## 2. Install dependencies

### Client

```bash
cd PromptHive-A10
npm install
```

### Server

```bash
cd PromptHive-Server-A10
npm install
```

---

## 3. Configure environment variables

Create the required `.env` files using the variables listed above.

---

## 4. Start the backend

```bash
nodemon index.js // (Download nodemon - [https://www.npmjs.com/package/nodemon]) 
```

---

## 5. Start the frontend

```bash
npm run dev
```

---

## 6. Open the application

```
http://localhost:3000
```

---

# 🎯 Learning Outcomes

During this project, I gained practical experience with:

- BetterAuth authentication
- JWT authorization
- Role-Based Access Control
- Stripe payment integration
- MongoDB Aggregation Pipeline
- Dashboard architecture
- Server-side search/filtering
- Backend pagination
- REST API design
- Production deployment
- Data relationship optimization
- Middleware-based security
- SaaS application architecture

---

# 🚀 Future Improvements

- Email notifications
- AI-powered prompt recommendations
- Prompt version history
- Team collaboration
- Creator verification
- Subscription management
- Dark/Light theme preferences
- AI prompt collections

---

# 🔗 Resources
### Live Project
[View Live Project](https://prompt-hive-gamma.vercel.app)

### Client Repository
Client: [View Client Repo](https://github.com/HSBHasib/PromptHive-A10)

### Server Repository
Server: [View Server Repo](https://github.com/HSBHasib/PromptHive-Server-A10)

---

## 👨‍💻 Developed By
**Hasibur Rahman**
* Frontend & Full Stack Developer
* GitHub: [Hasibur_Rahman_Github](https://github.com/HSBHasib)
