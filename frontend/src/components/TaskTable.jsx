import StatusBadge from "./StatusBadge";
import TaskCard from "./TaskCard";
import { IconPencil, IconTrash } from "./Icons";
import { formatDate } from "../utils/formatDate";

export default function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-lg border border-border bg-surface md:block">
        <table className="w-full text-left text-sm">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Task
              </th>

              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Description
              </th>

              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Status
              </th>

              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Created
              </th>

              <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tasks.map((task) => {
              return (
                <tr
                  key={task.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-background/70"
                >
                  {/* Task */}
                  <td className="px-5 py-4">
                    <div className="max-w-sm">
                      <p className="font-medium text-ink">
                        {task.title}
                      </p>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="max-w-md px-5 py-4">
                    <p
                      className="truncate text-sm text-ink-secondary"
                      title={task.description || ""}
                    >
                      {task.description || "—"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={task.status} />
                  </td>

                  {/* Created */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-secondary">
                    {formatDate(task.created_at)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      {/* Edit */}
                      <button
                        onClick={() => onEdit(task)}
                        aria-label={`Edit ${task.title}`}
                        title="Edit task"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-ink-secondary transition-colors hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                      >
                        <IconPencil className="h-4 w-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(task)}
                        aria-label={`Delete ${task.title}`}
                        title="Delete task"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-ink-secondary transition-colors hover:border-danger/20 hover:bg-danger/10 hover:text-danger"
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
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}