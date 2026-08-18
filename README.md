# EventOn

> Unlocking the Experience. 

EventOn is an full-stack event management platform designed to seamlessly connect three key roles: **Users** (attendees), **Organizers** (creators), and **Venue Owners** (hosts). 

EventOn glassmorphism layouts, and smooth micro-animations. It's not just an app; it's a dynamic stage for your experiences.

---

## 🚀 The Stack

EventOn is built to be blazing fast, type-safe, and visually stunning across all devices.

**Frontend:**
- **React 19** (Hooks, Context API)
- **Vite** (Next-gen frontend tooling)
- **Tailwind CSS v4** (Utility-first styling, glassmorphism, dynamic gradients)
- **React Router v7** (Role-based layouts, protected routes)
- **Lucide React** (Clean, modern SVG iconography)

**Backend:**
- **Node.js & Express 5** (Fast, unopinionated web framework)
- **Sequelize ORM** (Promise-based Node.js ORM)
- **MySQL2** (Relational database)
- **JWT & bcrypt** (Secure authentication & password hashing)
- **express-validator** (API payload validation)

---

## ✨ Features

- **Role-Based Architecture:** Dedicated, authenticated layouts and dashboards for `Admin`, `Organizer`, `Owner`, and `User`.
- **Flawless Dark/Light Mode:** Global theme context that automatically adapts gradients, text, and component contrast.
- **Smart Loading States:** Perfectly centered, non-blocking dot-loaders ensuring a smooth user experience during API fetches.
- **Secure Authentication Flow:** Cookie/JWT-based session management with protected routes for authenticated access.

---

## 🛠️ Getting Started

### 1. Database Setup
Make sure you have MySQL running. Create a database named `event` (or update your `.env` to match your local setup).

### 2. Backend Initialization
```bash
cd backend
npm install
npm start
```
*Note: The backend uses Node's native `--watch` and `--env-file` flags, so make sure you are running Node v20.6.0+.*

### 3. Frontend Initialization
```bash
cd frontend
npm install
npm run dev
```

---
- **Floating Lid:** Users (Access & Discovery)
- **Glowing Core:** The Event itself—radiating from the exact point where all three converge.
