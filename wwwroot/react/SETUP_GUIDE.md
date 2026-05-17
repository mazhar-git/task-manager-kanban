# React Task Manager - Setup Guide

## Overview

This is a complete React conversion of your Kanban board HTML page with an additional Dashboard feature for analytics and reporting.

## Directory Structure

```
wwwroot/
├── react/                    # New React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Root component
│   │   ├── main.jsx         # Entry point
│   │   ├── index.css        # Global styles
│   │   └── App.css          # App styles
│   ├── index.html           # HTML template
│   ├── package.json         # Dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind config
│   ├── postcss.config.js    # PostCSS config
│   └── README.md            # Project documentation
├── index.html               # Original HTML (keep for reference)
├── index2.html              # Your Kanban board HTML
└── login.html               # Login page
```

## Installation & Setup

### Step 1: Install Dependencies
```bash
cd wwwroot/react
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Step 3: Build for Production
```bash
npm run build
```

Output will be in `dist/` folder.

## Component Architecture

### Core Components

**Header.jsx**
- Displays app title and user information
- Logout button

**Navigation.jsx**
- Kanban Board and Dashboard tabs
- Role-based visibility (Dashboard only for Admin)

**KanbanBoard.jsx**
- Main container for the Kanban board
- Handles task loading and state management
- Manages modal for creating/editing tasks
- Filter functionality for admins

**KanbanColumn.jsx**
- Individual column (To Do, In Progress, Done)
- Drag & drop support
- Task count display

**TaskCard.jsx**
- Individual task card
- Priority color coding
- Assigned user, estimated hours, due date display

**TaskModal.jsx**
- Form for creating/editing tasks
- Delete button (Admin only)
- Priority, status, and assignee selection

**TaskFilter.jsx**
- Dropdown to filter tasks by user
- Admin only feature

### Dashboard Components

**Dashboard.jsx**
- Statistics cards (Total, To Do, In Progress, Done)
- Completion percentage circular progress
- Priority breakdown chart
- Tasks by assignee breakdown

**StatCard.jsx**
- Reusable stat card component
- Color-coded by type

## Key Features

### Kanban Board
✅ Drag and drop between columns
✅ Create tasks (Admin only)
✅ Edit/Delete tasks (Admin only)
✅ Filter by assignee (Admin only)
✅ Task priorities (Low, Medium, High)
✅ Estimated hours and due dates

### Dashboard
✅ Total tasks count
✅ Task status breakdown
✅ Completion percentage visualization
✅ Priority distribution
✅ Assignee workload distribution

### Authentication
✅ Checks localStorage for user
✅ Redirects to login.html if not authenticated
✅ Role-based UI rendering (Admin vs Developer)

## API Integration

The application connects to your .NET 8 backend at:
```
https://localhost:7222/api
```

### Endpoints Used:
- `GET /tasks` - All tasks
- `GET /tasks/my/:userId` - Current user's tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /users` - All users

## Styling

- **Tailwind CSS**: All UI components use Tailwind
- **Color Scheme**: Dark theme (slate-900 background)
- **Icons**: Lucide React icons
- **Responsive**: Mobile-first design with breakpoints

## State Management

The app uses React hooks for state:
- `useState`: Component state
- `useEffect`: Side effects (API calls)
- `axios`: HTTP requests

No Redux or Context API needed for this scope. Consider adding them if you scale up.

## Environment Setup

The Vite config includes a proxy for API calls:
```javascript
proxy: {
  '/api': {
    target: 'https://localhost:7222',
    changeOrigin: true,
  }
}
```

This allows you to call `/api/tasks` instead of the full URL during development.

## Deployment

### Option 1: Serve from .NET Backend
1. Build React app: `npm run build`
2. Copy `dist/` folder contents to `wwwroot/`
3. Update your Program.cs to serve static files

### Option 2: Separate React App
1. Deploy React app to Vercel, Netlify, or similar
2. Update API_URL in the code to your backend endpoint
3. Configure CORS in your .NET backend

## Troubleshooting

### Port Conflicts
If port 5173 is in use:
```bash
npm run dev -- --port 3000
```

### CORS Issues
Ensure your .NET backend allows CORS for localhost:5173

### API Connection Issues
- Check that backend is running on https://localhost:7222
- Verify SSL certificates are properly configured
- Check browser console for detailed error messages

## Future Enhancements

Consider adding:
- Redux or Zustand for complex state
- React Query for advanced caching
- TypeScript for type safety
- Unit tests (Jest, Vitest)
- E2E tests (Cypress, Playwright)
- Real-time updates (WebSockets)
- Dark/Light theme toggle
- Advanced filtering and search

## Support

For issues or questions, check:
1. Browser console for errors
2. Network tab for API calls
3. Component props and state
4. Tailwind CSS documentation
