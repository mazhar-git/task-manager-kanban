# Quick Start - React Task Manager

## What Was Created

Your HTML Kanban board has been converted to a complete React application with:

✅ **Kanban Board Component** - All features from your original HTML
✅ **Dashboard** - Analytics and reporting (Admin only)
✅ **Modular Architecture** - Well-organized components
✅ **Modern Tooling** - Vite, Tailwind CSS, Axios
✅ **Drag & Drop** - Smooth task management
✅ **Responsive Design** - Mobile-friendly layout

## File Structure

```
wwwroot/react/
├── src/
│   ├── components/        ← Reusable UI components
│   ├── pages/            ← Page-level components
│   ├── App.jsx           ← Main app container
│   └── main.jsx          ← App entry point
├── index.html            ← React template
├── package.json          ← Dependencies
└── Configuration files   ← Vite, Tailwind, PostCSS
```

## Getting Started (3 Steps)

### 1️⃣ Install Dependencies
```bash
cd G:\Projects\TaskManagerAPI\wwwroot\react
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```
Opens at: `http://localhost:5173`

### 3️⃣ Build for Production
```bash
npm run build
```
Output: `wwwroot/react/dist/`

## Key Components

| Component | Purpose |
|-----------|---------|
| `App.jsx` | Root component, routing between Kanban & Dashboard |
| `Header.jsx` | User info, logout button |
| `Navigation.jsx` | Tab navigation (Kanban/Dashboard) |
| `KanbanBoard.jsx` | Main Kanban container |
| `KanbanColumn.jsx` | Individual column with drag-drop |
| `TaskCard.jsx` | Task card display |
| `TaskModal.jsx` | Create/Edit task form |
| `Dashboard.jsx` | Analytics & reporting |
| `StatCard.jsx` | Stat display component |

## Features

### Kanban Board
- ✅ Drag tasks between To Do → In Progress → Done
- ✅ Create new tasks (Admin)
- ✅ Edit existing tasks (Admin)
- ✅ Delete tasks (Admin)
- ✅ Filter by assignee (Admin)
- ✅ Set priority, hours, due date
- ✅ Assign to developers

### Dashboard (Admin Only)
- 📊 Total tasks count
- 📝 Tasks by status
- ⏱️ Completion percentage
- 🎯 Priority breakdown
- 👥 Assignee workload

## Authentication

- ✅ Checks localStorage for "user" object
- ✅ Redirects to `/login.html` if not logged in
- ✅ Role-based features (Admin vs Developer)

## API Connection

Connects to your .NET 8 backend:
```
https://localhost:7222/api
```

Uses:
- GET /tasks
- GET /tasks/my/{userId}
- POST /tasks
- PUT /tasks/{id}
- DELETE /tasks/{id}
- GET /users

## Styling

- **Tailwind CSS** - Utility-first CSS
- **Dark Theme** - Professional dark UI
- **Responsive** - Works on mobile, tablet, desktop
- **Icons** - Lucide React icons

## Next Steps

1. Run `npm install` in the react folder
2. Run `npm run dev` to test locally
3. Test all functionality (create, edit, drag-drop)
4. When ready, build with `npm run build`
5. Deploy the `dist/` folder

## Important Notes

⚠️ Make sure your backend is running on `https://localhost:7222`
⚠️ CORS should be enabled for `localhost:5173`
⚠️ Keep your login.html file in wwwroot
⚠️ User object must be stored in localStorage by login page

## Documentation

- `README.md` - Full project documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- Each component has JSX comments explaining purpose

## Support Files

Your original files remain unchanged:
- `/wwwroot/index.html` - Original version
- `/wwwroot/index2.html` - Kanban HTML
- `/wwwroot/login.html` - Login page

Enjoy your new React application! 🚀
