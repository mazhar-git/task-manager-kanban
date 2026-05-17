# React Task Manager

A modern React-based task management application with Kanban board and dashboard analytics.

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Header.jsx       # Application header with user info
│   ├── Navigation.jsx   # Navigation tabs
│   ├── KanbanBoard.jsx  # Main Kanban board logic
│   ├── KanbanColumn.jsx # Individual Kanban column
│   ├── TaskCard.jsx     # Task card component
│   ├── TaskModal.jsx    # Task creation/editing modal
│   ├── TaskFilter.jsx   # Task filtering UI
│   ├── StatCard.jsx     # Dashboard stat card
│   └── TasksChart.jsx   # Charts for dashboard
├── pages/               # Page components
│   ├── KanbanBoard.jsx  # Kanban page
│   └── Dashboard.jsx    # Dashboard page with analytics
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles

```

## Features

### Kanban Board
- Drag and drop tasks between columns (To Do, In Progress, Done)
- Create, edit, and delete tasks
- Filter tasks by assignee (Admin only)
- Task priorities and status management
- Estimated hours and due date tracking

### Dashboard
- Total tasks count
- Tasks by status breakdown
- Completion percentage visualization
- Tasks by priority breakdown
- Tasks by assignee breakdown

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## API Endpoints

The app connects to: `https://localhost:7222/api`

- `GET /tasks` - Get all tasks
- `GET /tasks/my/:userId` - Get user's tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /users` - Get all users

## Technologies

- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide Icons
