import React, { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAddTask(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <label htmlFor="new-task" className="sr-only">Add task</label>
      <input
        id="new-task"
        type="text"
        placeholder="Add task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          padding: "8px 10px",
          borderRadius: 6,
          border: "1px solid #e6e6e6",
          minWidth: 260,
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          border: "none",
          background: "var(--red)",
          color: "white",
          cursor: "pointer"
        }}
      >
        Add
      </button>
    </form>
  );
}
