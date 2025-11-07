// src/App.jsx
import React, { useState, useMemo } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";
import FilterButtons from "./components/FilterButtons"; 

import menuIcon from "./assets/menu_icon.png";
import searchIcon from "./assets/search_icon.png";
import inboxIcon from "./assets/inbox_icon.png";
import todayIcon from "./assets/calendar_icon.png";
import upcomingIcon from "./assets/upcoming_icon.png";


function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export default function App() {
  const [tasks, setTasks] = useState([
    { id: generateId(), text: "Call Mom", completed: false },
    { id: generateId(), text: "Buy the new issue of Scientific American", completed: false },
    { id: generateId(), text: "Return the textbook to Josie", completed: false },
    { id: generateId(), text: "Buy the new album by Rake", completed: false },
    { id: generateId(), text: "Buy a gift card for Dad", completed: false },
  ]);

  const [filter, setFilter] = useState("all");

  const addTask = (text) => {
    const trimmed = (text || "").trim();
    if (!trimmed) return;
    const newTask = { id: generateId(), text: trimmed, completed: false };
    setTasks((t) => [newTask, ...t]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-wrapper">
      {/* HEADER */}
      <header className="site-header" role="banner">
        <div className="header-inner">
          <button className="menu-btn" aria-label="Open menu">
            <img src={menuIcon} alt="menu icon" />
          </button>

          <div className="quick-find" role="search">
            <label htmlFor="quick-find-input" className="sr-only">Quick find</label>
            <img src={searchIcon} alt="search icon" aria-hidden="true" className="search-icon" />
            <input id="quick-find-input" type="text" placeholder="Quick find" />
          </div>

          <div className="header-right" aria-hidden="true">
            <span className="task-counter">{completedCount}/{tasks.length}</span>
          </div>
        </div>
      </header>


      {/* LAYOUT */}
      <div className="layout">
        <aside className="sidebar" aria-label="Task categories">
          <nav>
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#inbox" className="nav-link nav-active" aria-current="page">
                  <img src={inboxIcon} alt="Inbox" className="nav-icon" aria-hidden="true" />
                  <span className="nav-label">Inbox</span>
                  <span className="nav-count">{tasks.length}</span>
                </a>
              </li>

              <li className="nav-item">
                <a href="#today" className="nav-link">
                  <img src={todayIcon} alt="Today" className="nav-icon" aria-hidden="true" />
                  <span className="nav-label">Today</span>
                  <span className="nav-count">{tasks.filter((t) => !t.completed).length}</span>
                </a>
              </li>

              <li className="nav-item">
                <a href="#upcoming" className="nav-link">
                  <img src={upcomingIcon} alt="Upcoming" className="nav-icon" aria-hidden="true" />
                  <span className="nav-label">Upcoming</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content" role="main">
          <section className="inbox-section" id="inbox">
            <header className="section-header">
              <h1>Inbox</h1>
              <hr className="section-divider" />
            </header>

            {/* Controls row: TaskForm + Filters + Counter */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
              <TaskForm onAddTask={addTask} />
              <FilterButtons filter={filter} setFilter={setFilter} />
              <div style={{ marginLeft: "auto" }}>
                <TaskCounter tasks={tasks} filter={filter} />
              </div>
            </div>

            <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
          </section>

          {/* Hidden placeholders */}
          <section id="today" className="inbox-section" hidden>
            <header className="section-header"><h1>Today</h1><hr className="section-divider" /></header>
            <p className="muted">No items for Today.</p>
          </section>

          <section id="upcoming" className="inbox-section" hidden>
            <header className="section-header"><h1>Upcoming</h1><hr className="section-divider" /></header>
            <p className="muted">No upcoming items.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
