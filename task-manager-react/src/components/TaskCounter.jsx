import React, { useMemo } from "react";

export default function TaskCounter({ tasks = [], filter = "all" }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  const filteredCount = useMemo(() => {
    if (filter === "active") return active;
    if (filter === "completed") return completed;
    return total;
  }, [filter, total, completed, active]);

  if (filter === "all") {
    return <div className="task-counter" aria-live="polite">{total} tasks</div>;
  }
  return <div className="task-counter" aria-live="polite">{filteredCount} of {total} tasks</div>;
}
