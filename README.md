# 📋 Personal Task Manager

A simple task management app built with Angular 20 using the standalone component approach, developed through realistic Agile sprints. The project simulates professional development practices using Jira for sprint tracking and Confluence for planning and retrospectives.

> 🚀 Overview
This app allows users to manage their personal to-do list with key features such as creating, updating, searching, and deleting tasks. It introduces real-time UI updates, priority filtering, theming, and task exporting for a polished experience.
---

## 🔧 Features

- ✅ Add new tasks with title and due date
- 📋 View all tasks grouped by status (To Do, In Progress, Done)
- ✏️ Edit existing tasks inline
- 🗑 Delete tasks
- ✔ Mark tasks as complete
- 🔍 Search tasks by title
- 🧶 Remaining task counter
- ⚡ Instant UI refresh using Angular Signals
- 💾 Tasks stored in browser **LocalStorage**
- 📁 Clean, modular architecture using **Angular standalone components**
- 🎨 Priority selection + filtering (Low/Medium/High)
- 🎨 Light/Dark Theme toggle
- 📤 Export tasks to CSV or PDF
- 📅 Tasks sorted by due date

---

## 📂 Tech Stack

- **Frontend**: Angular 20
- **Language**: TypeScript
- **Tooling**: Angular CLI, LocalStorage API
- **Project Management**: Jira + Confluence (Agile/Scrum approach)
- **UI/UX**: Angular Material
- **Storage**: LocalStorageAPI

---

## 🧑‍💻 Getting Started
- 📅 Requirements
  Node.js >= 18
  Angular CLI >= 16

- 📅 Installation
  ```
  git clone https://github.com/enisasaiti/personal-task-manager.git
  cd personal-task-manager
  npm install
  ```
- 🚀 Run Locally
  ```
  npm start
  # or
  ng serve
  ```

---
## 📈 Sprint History

## 🟢 Sprint 1
- ✅ Defined project scope and created Jira backlog
- ✅ Built functional Angular task app (add, list, delete)
- ✅ Connected repo to GitHub and documented in Confluence

## 🟢 Sprint 2
- ✅ Mark task as “Done”
- ✏️ Edit existing tasks
- 🔍 Filter and search tasks
🎨 Improve styling (Angular Material or CSS)

## 🟢 Sprint 3
- ✅ Implemented search by task title
- ✅ Displayed remaining task count
- ✅ Used Angular signals for real-time UI refresh on new task add

## 🟢 Sprint 4
- ✅ Added priority field to task form
- ✅ Integrated Angular Material components and theming
- 🔄 Implemented filtering by priority
- 🎨 Styled form and layout with Material design

##🟢 Sprint 5
- ✅ Color-coded tasks by priority (High, Medium, Low)
- 🌈 Grouped task sections using Material cards
- 🌟 Refactored CSS to support future theming

## 🟢 Sprint 6
- ✅ Sorted tasks by due date within each status
- 📄 Added CSV export functionality
- 🌚 Introduced light/dark mode theme toggle

---
## 🛣️ Roadmap

| Sprint     | Goals                                         | Status         |
|------------|-----------------------------------------------|----------------|
| Sprint 1   | Create task model, add/list/delete tasks      | ✅ Completed    |
| Sprint 2   | Mark tasks as done, edit tasks                | ✅ Completed    |
| Sprint 3   | Search, task counter, auto-refresh            | ✅ Completed    |
| Sprint 4   | UI/UX design with Angular Material or Tailwind| ✅ Completed    |
| Sprint 5   | Filter by priority, sort tasks                | ✅ Completed    |
| Sprint 6   | Export to file (CSV/PDF), sync or share tasks | ✅ Completed    |

---
##📃 Agile Artifacts & Documentation
- [📘 Confluence Documentation](https://saitienisa.atlassian.net/wiki/spaces/~7120208f7e3e8c90b74394bd1e5ab7c2b62747/pages/589826/Personal+Task+Manager+Documentation)
---
  ##💡 Key Learnings
- Practiced full Agile cycle: planning, sprint execution, retrospective
- Learned Angular standalone architecture, signals, and reactive UI patterns
- Improved skills in modular CSS, Angular Material, and exporting data
- Built a complete personal project with real-world documentation
