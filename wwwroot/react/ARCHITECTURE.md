# Component Architecture Diagram

## Application Structure

```
App (Main Container)
├── Header
│   ├── Title & Logo
│   ├── User Welcome Message
│   └── Logout Button
│
├── Navigation
│   ├── Kanban Board Tab
│   └── Dashboard Tab (Admin Only)
│
└── Main Content
    ├── KanbanBoard Page
    │   ├── KanbanBoard (Logic Container)
    │   │   ├── TaskFilter (Admin Only)
    │   │   │   └── User Dropdown
    │   │   │
    │   │   ├── KanbanColumn (To Do)
    │   │   │   └── TaskCard[]
    │   │   │       ├── Title
    │   │   │       ├── Description
    │   │   │       ├── Priority Badge
    │   │   │       ├── Assignee Info
    │   │   │       ├── Estimated Hours
    │   │   │       └── Due Date
    │   │   │
    │   │   ├── KanbanColumn (In Progress)
    │   │   │   └── TaskCard[]
    │   │   │
    │   │   ├── KanbanColumn (Done)
    │   │   │   └── TaskCard[]
    │   │   │
    │   │   └── TaskModal (Create/Edit)
    │   │       ├── Title Input
    │   │       ├── Description Input
    │   │       ├── Priority Select
    │   │       ├── Status Select
    │   │       ├── Assignee Select
    │   │       ├── Estimated Hours Input
    │   │       ├── Due Date Input
    │   │       ├── Save Button
    │   │       └── Delete Button (Admin)
    │   │
    │   └── Create Task Button (Admin Only)
    │
    └── Dashboard Page
        ├── StatCard (Total Tasks)
        ├── StatCard (To Do)
        ├── StatCard (In Progress)
        ├── StatCard (Done)
        ├── Completion Percentage Circle
        ├── Priority Breakdown Chart
        │   ├── Low Progress Bar
        │   ├── Medium Progress Bar
        │   └── High Progress Bar
        └── Assignee Breakdown
            ├── Progress Bar[] (per assignee)
            └── Task Count
```

## Data Flow

```
Authentication
    ↓
localStorage.getItem("user")
    ↓
App Component
    ├── Check User Role (Admin/Developer)
    ├── Render Navigation (conditionally)
    └── Render Pages
        ↓
    KanbanBoard Page
        ├── Load Tasks (GET /api/tasks or /api/tasks/my/:userId)
        ├── Load Users (GET /api/users)
        ├── Render Columns
        ├── Handle Drag & Drop
        ├── Handle Create/Edit/Delete
        └── Update Backend (PUT, POST, DELETE)

    Dashboard Page
        ├── Load All Tasks (GET /api/tasks)
        ├── Calculate Statistics
        └── Render Charts & Cards
```

## Component Responsibilities

### Page Components (pages/)
- `KanbanBoard.jsx` - Wrapper for Kanban board
- `Dashboard.jsx` - Analytics and reporting

### Layout Components (components/)
- `Header.jsx` - Top navigation and user info
- `Navigation.jsx` - Page tab switching

### Feature Components (components/)
- `KanbanBoard.jsx` - Main Kanban logic and state
- `KanbanColumn.jsx` - Individual column with drag-drop
- `TaskCard.jsx` - Task display
- `TaskModal.jsx` - Form for creating/editing
- `TaskFilter.jsx` - Filter UI

### Dashboard Components (components/)
- `Dashboard.jsx` - Main dashboard
- `StatCard.jsx` - Reusable stat card
- `TasksChart.jsx` - Chart component (placeholder)

## State Management

```
App
├── currentPage: 'kanban' | 'dashboard'
├── currentUser: { id, name, role }
└── loading: boolean

KanbanBoard
├── tasks: Task[]
├── users: User[]
├── filteredTasks: Task[]
├── selectedUserId: string
├── showModal: boolean
├── editingTask: Task | null
└── loading: boolean

Dashboard
├── tasks: Task[]
├── users: User[]
├── stats: {
│   totalTasks,
│   todoCount,
│   inProgressCount,
│   doneCount,
│   byPriority: { Low, Medium, High },
│   byAssignee: { [name]: count },
│   completionPercentage
│}
└── loading: boolean
```

## Props Flowing Through Components

```
App
├─ Header
│  ├─ currentUser: User
│  └─ onLogout: () => void
│
├─ Navigation
│  ├─ currentPage: string
│  └─ setCurrentPage: (page) => void
│
├─ KanbanBoard (Page)
│  └─ currentUser: User
│     └─ KanbanBoard (Component)
│        ├─ currentUser: User
│        └─ KanbanColumn (x3)
│           ├─ title: string
│           ├─ columnId: string
│           ├─ tasks: Task[]
│           ├─ onTaskClick: (task) => void
│           └─ onDropTask: (id, status) => void
│              └─ TaskCard
│                 ├─ task: Task
│                 └─ onClick: () => void
│
└─ Dashboard
   └─ currentUser: User
      ├─ StatCard (x4)
      │  ├─ title: string
      │  ├─ value: number
      │  ├─ color: string
      │  └─ icon: string
      └─ Analytics Charts
```

## Component Communication

1. **Event Handlers**: Child → Parent via props
   - `onTaskClick` - Open task for editing
   - `onDropTask` - Update task status
   - `onSave` - Save form data
   - `onDelete` - Delete task

2. **Props Drilling**: Parent → Child
   - `tasks`, `users` passed down
   - User role for conditional rendering

3. **localStorage**: Global state
   - User object accessed directly
   - Used for authentication check

## Drag & Drop Flow

```
TaskCard (draggable)
    ↓ ondragstart
drag(event) - Stores task data
    ↓
KanbanColumn (drop zone)
    ↓ ondrop
handleDrop(event)
    ↓
onDropTask(taskId, newStatus)
    ↓
API PUT request to update backend
    ↓
Reload tasks from server
```

## API Call Sequence

### Initial Load
1. App mounts → Check localStorage for user
2. If user exists → Render pages
3. KanbanBoard mounted → Load tasks + Load users
4. Dashboard mounted → Load all tasks

### Create Task
1. User clicks "Create Task" button
2. TaskModal opens with empty form
3. User fills form → Click Save
4. POST /api/tasks
5. Reload tasks (GET request)

### Update Task
1. User clicks task card
2. TaskModal opens with task data
3. User updates fields → Click Update
4. PUT /api/tasks/:id
5. Reload tasks

### Drag & Drop
1. User drags task to new column
2. handleDrop processes drop zone
3. Task status updated locally
4. PUT /api/tasks/:id with new status
5. Reload tasks

### Delete Task
1. User opens task modal
2. Admin sees delete button
3. Confirmation dialog
4. DELETE /api/tasks/:id
5. Reload tasks
