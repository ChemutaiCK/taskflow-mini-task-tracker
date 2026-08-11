import StatusBadge from "./StatusBadge";
import TaskCard from "./TaskCard";
import { formatDate } from "../utils/formatDate";

export default function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-subtle md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-ink/50">
              <th className="px-4 py-3 font-medium">Task</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const isDone = task.status === "Done";
              return (
                <tr key={task.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                  <td className={`px-4 py-3 font-medium ${isDone ? "text-ink/50 line-through" : "text-ink"}`}>
                    {task.title}
                  </td>
                  <td className={`max-w-xs truncate px-4 py-3 ${isDone ? "text-ink/40" : "text-ink/70"}`}>
                    {task.description || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-4 py-3 text-ink/60">{formatDate(task.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3 font-medium">
                      <button onClick={() => onEdit(task)} className="text-primary hover:text-primary-dark">
                        Edit
                      </button>
                      <button onClick={() => onDelete(task)} className="text-red-600 hover:text-red-700">
                        Delete
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
