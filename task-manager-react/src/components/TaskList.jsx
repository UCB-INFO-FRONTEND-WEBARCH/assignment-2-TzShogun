import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return <p className="muted">No tasks to show.</p>;
  }

  return (
    <ul className="tasks-list" aria-label="Tasks">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
