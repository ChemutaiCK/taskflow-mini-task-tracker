import StatusBadge from "./StatusBadge";
import TaskCard from "./TaskCard";
import { IconPencil, IconTrash } from "./Icons";
import { formatDate } from "../utils/formatDate";

export default function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-background text-xs font-semibold uppercase tracking-wide text-ink-secondary">
              <th className="px-5 py-3 font-semibold">Task</th>
              <th className="px-5 py-3 font-semibold">Description</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Created</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const isDone = task.status === "Done";
              return (
                <tr
                  key={task.id}
                  className="border-b border-border last:border-0 hover:bg-background/60"
                >
                  <td
                    className={`px-5 py-4 font-medium ${
                      isDone ? "text-ink-secondary" : "text-ink"
                    }`}
                  >
                    {task.title}
                  </td>
                  <td className={`max-w-xs truncate px-5 py-4 ${isDone ? "text-ink-secondary/70" : "text-ink-secondary"}`}>
                    {task.description || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-5 py-4 text-ink-secondary">{formatDate(task.created_at)}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}
