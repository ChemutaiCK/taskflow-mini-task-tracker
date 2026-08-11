import StatusBadge from "./StatusBadge";
import { IconPencil, IconTrash } from "./Icons";
import { formatDate } from "../utils/formatDate";

export default function TaskCard({ task, onEdit, onDelete }) {
  const isDone = task.status === "Done";

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-subtle">
      <div className="flex items-start justify-between gap-3">
        <h3 className={`text-sm font-semibold ${isDone ? "text-ink-secondary line-through" : "text-ink"}`}>
          {task.title}
        </h3>
        <StatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className={`mt-1.5 text-sm ${isDone ? "text-ink-secondary/70" : "text-ink-secondary"}`}>
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-ink-secondary">{formatDate(task.created_at)}</span>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary hover:bg-primary/10 hover:text-primary"
          >
            <IconPencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary hover:bg-danger/10 hover:text-danger"
          >
            <IconTrash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
