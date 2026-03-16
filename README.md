# REST API — Task Manager

A simple CRUD REST API built with Node.js and Express. Manages a task list with full Create, Read, Update, Delete operations.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (optional `?completed=true/false`) |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update title and/or completed status |
| DELETE | `/api/tasks/:id` | Delete a task |

## Setup & Run

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev
```

Server runs on `http://localhost:3000`

## Example Requests

**Create a task:**
```json
POST /api/tasks
{ "title": "Learn Node.js" }
```

**Update a task:**
```json
PUT /api/tasks/1
{ "completed": true }
```

## Tech Stack
Node.js · Express.js
