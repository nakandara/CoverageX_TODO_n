# To-Do App

## Setup

### Database (MySQL/XAMPP)
1. Open phpMyAdmin or MySQL CLI and run:
   ```sql
   CREATE DATABASE IF NOT EXISTS todo_db;
   USE todo_db;
   CREATE TABLE IF NOT EXISTS task (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT NOT NULL,
     completed TINYINT(1) DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Backend
1. Go to the backend folder:
   ```bash
   cd backend
   npm install
   node index.js
   ```
   (Server runs on http://localhost:5000)

### Frontend
1. Go to the frontend folder:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   (App runs on http://localhost:5173)

## Features
- Add tasks (title, description)
- List 5 most recent uncompleted tasks
- Mark as done (removes from UI)

## API Endpoints
- `POST /tasks` — Create a new task
- `GET /tasks` — Get 5 most recent uncompleted tasks
- `PATCH /tasks/:id/complete` — Mark a task as completed

## Tech Stack
- Backend: Node.js, Express, MySQL (XAMPP)
- Frontend: React
- Database: MySQL

## Submission
- Push all code to a public GitHub repo
- Add this README
- Share the link 