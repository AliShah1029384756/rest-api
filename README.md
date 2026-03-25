# REST API - Task Manager

![Project](https://img.shields.io/badge/Project-Backend-0ea5e9)
![Framework](https://img.shields.io/badge/Framework-Node.js%20%2B%20Express-16a34a)

## Overview
CRUD REST API built with Node.js and Express to practice backend routing, request validation, and API design.

## Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | List all tasks (optional `?completed=true/false`) |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update task title/completed |
| DELETE | `/api/tasks/:id` | Delete a task |

## Run Locally
```bash
npm install
npm run dev
```

Server: `http://localhost:3000`

## Learning Outcomes
- Implement RESTful endpoints for resource management
- Validate request payloads and return proper status codes
- Structure backend code for maintainability

## Common Mistakes
- Not validating missing `title` fields on create
- Returning inconsistent status codes

## Next Improvements
- Add persistent database support
- Add authentication and protected routes
