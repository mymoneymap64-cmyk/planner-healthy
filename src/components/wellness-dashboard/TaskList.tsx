"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Check, Plus, Trash2 } from "lucide-react";
import { TaskDef } from "@/lib/wellnessDashboard";

export default function TaskList({
  tasks,
  doneIds,
  onToggle,
  onAdd,
  onDelete,
  onReorder,
}: {
  tasks: TaskDef[];
  doneIds: string[];
  onToggle: (id: string) => void;
  onAdd?: (label: string) => void;
  onDelete?: (id: string) => void;
  onReorder?: (id: string, direction: "up" | "down") => void;
}) {
  const [draft, setDraft] = useState("");

  function submitAdd() {
    const label = draft.trim();
    if (!label || !onAdd) return;
    onAdd(label);
    setDraft("");
  }

  return (
    <div className="space-y-2">
      {tasks.map((task, i) => {
        const done = doneIds.includes(task.id);
        return (
          <div
            key={task.id}
            className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors ${
              done ? "border-brand-300 bg-brand-50" : "border-ink-900/10 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => onToggle(task.id)}
              aria-label={done ? `Mark "${task.label}" as not done` : `Mark "${task.label}" as done`}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                done ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 text-transparent"
              }`}
            >
              <Check size={13} strokeWidth={3} />
            </button>
            <span className={`flex-1 text-sm ${done ? "text-ink-500 line-through" : "text-ink-800"}`}>
              {task.label}
            </span>
            {onReorder && (
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => onReorder(task.id, "up")}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="flex h-6 w-6 items-center justify-center rounded text-ink-400 hover:bg-ink-900/5 disabled:opacity-30"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => onReorder(task.id, "down")}
                  disabled={i === tasks.length - 1}
                  aria-label="Move down"
                  className="flex h-6 w-6 items-center justify-center rounded text-ink-400 hover:bg-ink-900/5 disabled:opacity-30"
                >
                  <ArrowDown size={13} />
                </button>
              </div>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                aria-label={`Delete "${task.label}"`}
                className="flex h-6 w-6 items-center justify-center rounded text-ink-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        );
      })}

      {onAdd && (
        <div className="flex gap-2 pt-1">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitAdd();
              }
            }}
            placeholder="Add a task..."
            className="flex-1 rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={submitAdd}
            disabled={!draft.trim()}
            aria-label="Add task"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-950 text-white disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
