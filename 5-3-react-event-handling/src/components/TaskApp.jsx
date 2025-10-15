import React, { useState } from "react";
import TaskList from "./TaskList";

export default function TaskApp() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = () => {
    // Prevent empty submissions
    if (!text || text.trim() === "") return;

    const newTask = { id: Date.now(), text: text.trim() };
    setTasks((prev) => [...prev, newTask]);
    setText("");
  };

  
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  
  const handleClearAll = () => {
    // Confirm with the user before clearing all tasks
    if (tasks.length === 0) return;
    const ok = window.confirm("Clear all tasks? This cannot be undone.");
    if (ok) setTasks([]);
  };

  return (
    <section className="card">
      {/*Controlled Input */}
      <div className="inputRow">
        <input
          type="text"
          placeholder="Type a task..."
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button className="btn btn--primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Show current input value (Task 1 requirement) */}
      <p className="currentText">{text}</p>

  {/*Render Task List and Enable Delete */}
  {/*Pass tasks and onDelete */}
  <TaskList tasks={tasks} onDelete={handleDelete} />

      {/*Clear All */}
      <div className="footerRow">
        <button
          className="btn btn--ghost"
          onClick={handleClearAll}
          disabled={tasks.length === 0}
        >
          Clear All
        </button>
      </div>
    </section>
  );
}
