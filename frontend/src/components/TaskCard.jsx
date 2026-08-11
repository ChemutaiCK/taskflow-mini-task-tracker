import StatusBadge from "./StatusBadge";
import { formatDate } from "../utils/formatDate";

export default function TaskCard({ task, onEdit, onDelete }) {
  const isDone = task.status === "Done";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-subtle">
      <div className="flex items-start justify-between gap-3">
        <h3 className={`text-sm font-semibold ${isDone ? "text-ink/50 line-through" : "text-ink"}`}>
          {task.title}
        </h3>
        <StatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className={`mt-1.5 text-sm ${isDone ? "text-ink/40" : "text-ink/70"}`}>
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-ink/50">{formatDate(task.created_at)}</span>
        <div className="flex gap-3 text-sm font-medium">
          <button onClick={() => onEdit(task)} className="text-primary hover:text-primary-dark">
            Edit
          </button>
          <button onClick={() => onDelete(task)} className="text-red-600 hover:text-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
