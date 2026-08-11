# TaskFlow

## Overview

TaskFlow is a small full-stack task tracker. A user can create, view, update,
and delete tasks, each with a title, description, and status (`To Do`,
`In Progress`, `Done`). It was built as the Mini Task Tracker take-home
assignment for the ICT Intern – Software Developer role at Amref Health
Africa.

## Features

- Create a task with title, description, and status
- View all tasks in a responsive table (desktop) / card list (mobile)
- Edit a task's title, description, and status
- Delete a task, with a confirmation step
- Search tasks by title/description, and filter by status
- Live summary counts (Total / To Do / In Progress / Completed) computed
  from real backend data
- Inline validation: blank/whitespace-only titles are rejected, both in the
  UI and the API
- Loading, empty, and error states — no blank screens on failure
- Data persists in a SQLite database across restarts

## Technology Stack

**Frontend:** React 18, Vite, Tailwind CSS, the Fetch API
**Backend:** Python, FastAPI, SQLAlchemy, Pydantic
**Database:** SQLite (file-based, auto-created on first run)
**API style:** RESTful JSON over HTTP

## Architecture

```
React frontend (Vite dev server, port 5173)
       ↓  HTTP (fetch, JSON)
FastAPI backend (Uvicorn, port 8000)
       ↓
SQLAlchemy ORM
       ↓
SQLite (taskflow.db)
```

The frontend never touches the database directly and holds no task data of
its own beyond what it fetched — every list, create, update, and delete goes
over HTTP to the FastAPI backend. In development, Vite proxies `/api/*`
requests to `http://127.0.0.1:8000`, so the frontend code just calls
relative paths like `/api/tasks`.

## Project Structure

```
taskflow/
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI app, CORS, startup table creation
│   │   ├── database.py        # SQLAlchemy engine/session setup
│   │   ├── models.py          # Task ORM model
│   │   ├── schemas.py         # Pydantic request/response schemas + validation
│   │   └── routes/
│   │       └── tasks.py       # CRUD endpoints
│   ├── tests/
│   │   └── test_tasks.py      # CRUD + validation tests (pytest)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskSummary.jsx
│   │   │   ├── TaskTable.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   └── Toast.jsx
│   │   ├── services/
│   │   │   └── taskApi.js     # fetch wrapper for the backend API
│   │   ├── utils/
│   │   │   └── formatDate.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js         # dev proxy: /api → http://127.0.0.1:8000
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+ and pip

## Installation

**Backend:**

```bash
cd backend
python -m venv venv

# macOS/Linux
source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

**Frontend:**

```bash
cd frontend
npm install
```

## Running the Application

Run both servers at the same time, in two terminals.

**Terminal 1 — backend** (from `backend/`, with the venv active):

```bash
uvicorn app.main:app --reload
```

This starts the API at `http://127.0.0.1:8000` and creates `taskflow.db`
automatically on first run. Swagger docs are available at
`http://127.0.0.1:8000/docs`.

**Terminal 2 — frontend** (from `frontend/`):

```bash
npm run dev
```

This starts the app at `http://127.0.0.1:5173`. Open that URL in a browser —
the frontend proxies API calls to the backend automatically.

## API Endpoints

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| GET    | `/api/tasks`         | List tasks (supports `search`, `status_filter` query params) |
| GET    | `/api/tasks/{id}`    | Get a single task                    |
| POST   | `/api/tasks`         | Create a task                        |
| PUT    | `/api/tasks/{id}`    | Update a task (partial update)       |
| DELETE | `/api/tasks/{id}`    | Delete a task                        |
| GET    | `/api/health`        | Health check                         |

Valid `status` values: `To Do`, `In Progress`, `Done`.

## Validation

- **Title required:** enforced both client-side (inline error in the form)
  and server-side (Pydantic validator on `TaskCreate`/`TaskUpdate`)
- **Whitespace-only titles rejected:** titles are trimmed before the
  required check, so `"   "` is treated the same as an empty string
- **Status must be valid:** the API rejects any status outside
  `To Do` / `In Progress` / `Done` with a 422 and a clear message
- **Not found handling:** GET/PUT/DELETE on a missing task returns 404
- All validation errors return a flat `{"detail": "..."}` message that the
  frontend surfaces directly to the user

## Design Decisions

- **React** was used for the frontend because the assignment's UI direction
  (sidebar, header, filterable table, modals) maps naturally onto small,
  reusable components, and it's the stack I'm most productive in.
- **FastAPI** was used for the backend because it gives free request
  validation and interactive Swagger docs from the same Pydantic models
  used for business logic, with very little boilerplate.
- **SQLite** was used as the "bonus" real database option the assignment
  calls out. It needs no server or configuration — the file is created
  automatically — while still giving genuine persistence across restarts,
  which in-memory storage would not.

## Assumptions / Scope

- Authentication, user accounts, and permissions were intentionally left
  out — the assignment scopes this as a single-user tool and explicitly
  asks not to add auth.
- "My Tasks" and "All Tasks" both point at the same task list, since the
  assignment has no concept of task ownership; the sidebar exists for the
  planner-style layout the brief asked for. "Settings" is a visual-only nav
  entry, as the brief allows.
- The task list is fully loaded from the backend and then filtered/searched
  client-side for responsiveness; the underlying data still always comes
  from the API, never from mock/hardcoded data.

## Testing

Backend tests cover the core CRUD and validation behavior:

```bash
cd backend
pytest
```

This includes: creating a task, rejecting a missing/blank title, rejecting
an invalid status, listing tasks, updating a task's status, deleting a
task, and 404 handling for a nonexistent task.

Manual end-to-end testing performed: create/edit/delete a task, refresh the
browser to confirm persistence, search and filter, submit with a blank
title, and hit the API directly with an invalid status and a nonexistent
task ID — all behaved as expected with no console or server errors.
