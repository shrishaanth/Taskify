# Taskify — Full-Stack Task Management App

A Kanban-style project management app built with React + TypeScript (frontend) and Node.js + Express + MongoDB (backend).

---

## Project Structure

```
taskify/
├── client/     # React + Vite frontend
└── server/     # Node.js + Express + MongoDB backend
```

---

## Prerequisites

- **Node.js** v18+
- **MongoDB** running locally on port `27017` (or update `MONGODB_URI` in `server/.env`)

---

## Setup & Run

### 1. Backend

```bash
cd server
npm install
# Edit .env if needed (MongoDB URI, JWT secret, port)
npm run dev
```

Server runs on **http://localhost:5000**

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

App runs on **http://localhost:5173**

The Vite dev server proxies all `/api` requests to the backend automatically.

---

## First-Time Use

1. Open **http://localhost:5173**
2. You'll be redirected to the **Login** page
3. Switch to **Register** tab and create an account (choose `Admin` role to create projects)
4. Once logged in, create **Projects** from the sidebar
5. Create **Tasks** using the "+ New Task" button or sidebar button

---

## Features

- **Authentication** — JWT-based login/register with protected routes
- **Kanban Board** — Drag & drop tasks across status columns (Backlog → Done)
- **Projects** — Create and manage projects; each project has its own board
- **Members** — View all workspace members
- **My Tasks** — See tasks assigned to you across all projects
- **Real-time** — Socket.IO events emitted on task create/update/delete (ready for real-time clients)

---

## Environment Variables (`server/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | `mongodb://localhost:27017/taskify` | MongoDB connection string |
| `JWT_SECRET` | `taskify_super_secret_jwt_key_2024` | JWT signing secret |
| `JWT_EXPIRES_IN` | `7d` | Token expiry |
| `NODE_ENV` | `development` | Environment |

---

## API Endpoints

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Get current user |

### Tasks
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/tasks` | Yes | List all tasks (optional `?projectId=`) |
| GET | `/api/tasks/:id` | Yes | Get task |
| POST | `/api/tasks` | Yes | Create task |
| PUT | `/api/tasks/:id` | Yes | Update task |
| DELETE | `/api/tasks/:id` | Yes | Delete task |

### Projects
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/projects` | Yes | List projects |
| GET | `/api/projects/:id` | Yes | Get project |
| POST | `/api/projects` | Admin | Create project |
| PUT | `/api/projects/:id` | Admin | Update project |
| DELETE | `/api/projects/:id` | Admin | Delete project |

### Members
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/members` | Yes | List members |
| GET | `/api/members/:id` | Yes | Get member |
| PUT | `/api/members/:id` | Admin | Update member |
| DELETE | `/api/members/:id` | Admin | Delete member |

### Workspaces
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/workspaces` | Yes | List workspaces |
| POST | `/api/workspaces` | Admin | Create workspace |
