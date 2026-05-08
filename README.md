# EventOn (formerly Eventora)

> Unlocking the Experience. 

EventOn is an ultra-premium, full-stack event management platform designed to seamlessly connect three key roles: **Users** (attendees), **Organizers** (creators), and **Venue Owners** (hosts). 

Built with a focus on world-class UI/UX, EventOn features a mathematically perfect 3D isometric design language, stunning glassmorphism layouts, and smooth micro-animations. It's not just an app; it's a dynamic stage for your experiences.

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
- **Ultra-Premium Visual Identity:** Custom 3D isometric SVG iconography, dynamic glowing mesh backgrounds, and floating glass-panel UI.
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

## 🎨 The "Unlocking the Experience" Logo
EventOn's logo is a custom, mathematically-perfect 3D isometric structure. 
- **Left Wall:** Venue Owners (The Foundation)
- **Right Wall:** Organizers (The Structure)
- **Floating Lid:** Users (Access & Discovery)
- **Glowing Core:** The Event itself—radiating from the exact point where all three converge.
