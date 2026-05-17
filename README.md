<div align="center">

# 🚀 Task Manager Kanban System

A full-stack Kanban-based Task Management System built using React, ASP.NET Core Web API, and Microsoft SQL Server.

Modern UI • Backlog Import • Role-Based Access • IIS Deployment Ready

</div>

---

# 📌 Features

## ✅ Authentication & Roles

* Admin and Developer roles
* Role-based task visibility
* Protected admin actions

---

## 📋 Kanban Board

* Drag & drop workflow
* To Do / In Progress / Done columns
* Priority sorting
* User-based filtering
* Duplicate task handling

---

## 📥 Backlog Management

* Excel import support
* Convert backlog items into tasks
* Priority-based sorting
* Agile-ready workflow

---

## 📊 Dashboard

* Task status overview
* Developer task tracking
* Progress visibility

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* Lucide React Icons

## Backend

* ASP.NET Core Web API
* Entity Framework Core
* MSSQL Server

## Deployment

* IIS
* Windows Server 2022

---

# 📁 Project Structure

```bash
TaskManager/
│
├── TaskManagerAPI/      # ASP.NET Core Web API
│
├── react/               # React Frontend
│
├── README.md
│
└── .gitignore
```

---

# ⚙️ Backend Setup

## 1️⃣ Clone Repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

---

## 2️⃣ Configure Database

Update your connection string inside:

```bash
appsettings.json
```

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=TaskManagerDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

---

## 3️⃣ Run Migrations

```bash
dotnet ef database update
```

---

## 4️⃣ Run API

```bash
dotnet run
```

Swagger URL:

```bash
https://localhost:7222/swagger
```

---

# 💻 Frontend Setup

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

# 🚀 Production Build

```bash
npm run build
```

Deploy generated `dist` folder to IIS.

---

# 🌐 IIS Deployment Notes

## React Frontend

Inside:

```bash
vite.config.js
```

Add:

```js
base: '/taskmanager/'
```

---

## API Deployment

Disable WebDAV in IIS to allow:

* PUT requests
* DELETE requests

---

# 📥 Backlog Import Workflow

```text
Excel Import
   ↓
Backlog Page
   ↓
Convert To Task
   ↓
Kanban Board
```

---

# ✨ Future Improvements

* JWT Authentication
* Sprint Management
* Notifications
* Activity Timeline
* Comments & Attachments
* Burndown Charts
* Email Alerts

---

# 📸 Screenshots





---

# 🧠 Key Features Implemented

✅ Excel Backlog Import
✅ Role-Based Access
✅ Task Priority Sorting
✅ Duplicate Task Tracking
✅ IIS Deployment
✅ MSSQL Integration
✅ Kanban Workflow
✅ Backlog → Task Conversion

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built by Mazhar

---

<div align="center">

⭐ If you found this project useful, consider giving it a star on GitHub!

</div>
