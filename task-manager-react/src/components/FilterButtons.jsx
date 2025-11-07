import React from "react";

export default function FilterButtons({ filter, setFilter }) {
  const btnStyle = { padding: "6px 10px", borderRadius: 6, cursor: "pointer", border: "1px solid rgba(0,0,0,0.04)" };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        onClick={() => setFilter("all")}
        className={filter === "all" ? "nav-link nav-active" : "nav-link"}
        style={btnStyle}
        aria-pressed={filter === "all"}
      >
        All
      </button>

      <button
        onClick={() => setFilter("active")}
        className={filter === "active" ? "nav-link nav-active" : "nav-link"}
        style={btnStyle}
        aria-pressed={filter === "active"}
      >
        Active
      </button>

      <button
        onClick={() => setFilter("completed")}
        className={filter === "completed" ? "nav-link nav-active" : "nav-link"}
        style={btnStyle}
        aria-pressed={filter === "completed"}
      >
        Completed
      </button>
    </div>
  );
}
