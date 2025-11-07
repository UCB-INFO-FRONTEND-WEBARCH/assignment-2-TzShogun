import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <label className="task-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Hidden native checkbox for accessibility */}
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <input
            type="checkbox"
            name="task"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          />
          <span className="custom-checkbox" aria-hidden="true"></span>
        </span>

        <span
          className="task-text"
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#888" : undefined,
          }}
        >
          {task.text}
        </span>
      </div>

      <div>
        <button
          onClick={(e) => { e.preventDefault(); onDelete(task.id); }}
          aria-label={`Delete ${task.text}`}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "6px 8px",
            fontSize: 18,
            color: "#9b9b9b",
            lineHeight: 1
          }}
        >
          ×
        </button>
      </div>
    </label>
  );
}
