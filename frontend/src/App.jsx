import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskSummary from "./components/TaskSummary";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";
import Toast from "./components/Toast";
import { IconPlus, IconRefreshCw, IconInbox, IconAlertCircle } from "./components/Icons";
import { fetchTasks, createTask, updateTask, deleteTask } from "./services/taskApi";

const STATUS_OPTIONS = ["All Statuses", "To Do", "In Progress", "Done"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loadState, setLoadState] = useState("loading"); // loading | ready | error

  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [searchTerm, setSearchTerm] = useState("");

  const [formMode, setFormMode] = useState(null); // null | "create" | task object being edited
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);
  const [toast, setToast] = useState(null);

  async function loadTasks() {
    setLoadState("loading");
    try {
      const data = await fetchTasks();
      setTasks(data);
      setLoadState("ready");
    } catch (error) {
      setLoadState("error");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function showToast(message, variant = "success") {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 2500);
  }

  const counts = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "To Do").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      done: tasks.filter((t) => t.status === "Done").length,
    }),
    [tasks]
  );

  const visibleTasks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesStatus = statusFilter === "All Statuses" || task.status === statusFilter;
      const matchesSearch =
        !term ||
        task.title.toLowerCase().includes(term) ||
        (task.description || "").toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [tasks, statusFilter, searchTerm]);

  async function handleCreateOrUpdate(payload) {
    setIsSubmitting(true);
    try {
      if (formMode === "create") {
        await createTask(payload);
        showToast("Task created.");
      } else {
        await updateTask(formMode.id, payload);
        showToast("Task updated.");
      }
      setFormMode(null);
      await loadTasks();
    } catch (error) {
      showToast(error.message || "Unable to save task.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDelete() {
    const task = taskPendingDelete;
    setTaskPendingDelete(null);
    try {
      await deleteTask(task.id);
      showToast("Task deleted.");
      await loadTasks();
    } catch (error) {
      showToast(error.message || "Unable to delete task.", "error");
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Overview header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Overview
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-ink">Welcome Back, Cynthia</h1>
                <p className="mt-1 text-sm text-ink-secondary">
                  Here&rsquo;s what&rsquo;s happening with your tasks.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="hidden items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-secondary sm:flex">
                  <IconRefreshCw className="h-3.5 w-3.5" />
                  Updated just now
                </span>
                <button
                  onClick={() => setFormMode("create")}
                  className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  <IconPlus className="h-4 w-4" />
                  New Task
                </button>
              </div>
            </div>

            <TaskSummary counts={counts} />

            {/* Tasks card */}
            <div className="rounded-lg border border-border bg-surface shadow-subtle">
              <div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-ink">Tasks</h2>
                  {loadState === "ready" && (
                    <p className="mt-0.5 text-xs text-ink-secondary">
                      Showing {visibleTasks.length} of {tasks.length} tasks
                    </p>
                  )}
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-48"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-5">
                {loadState === "loading" && (
                  <p className="py-10 text-center text-sm text-ink-secondary">Loading tasks...</p>
                )}

                {loadState === "error" && (
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-danger/10 text-danger">
                      <IconAlertCircle className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-ink">Something went wrong</p>
                    <p className="mt-1 text-sm text-ink-secondary">We couldn&rsquo;t load your tasks.</p>
                    <button
                      onClick={loadTasks}
                      className="mt-4 rounded-md border border-border px-3.5 py-1.5 text-sm font-medium text-ink hover:bg-background"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {loadState === "ready" && visibleTasks.length === 0 && (
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconInbox className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-ink">
                      {tasks.length === 0 ? "No tasks yet" : "No tasks found"}
                    </p>
                    <p className="mt-1 text-sm text-ink-secondary">
                      {tasks.length === 0
                        ? "Create your first task to start organizing your work."
                        : "Try a different search term or status filter."}
                    </p>
                  </div>
                )}

                {loadState === "ready" && visibleTasks.length > 0 && (
                  <TaskTable
                    tasks={visibleTasks}
                    onEdit={(task) => setFormMode(task)}
                    onDelete={(task) => setTaskPendingDelete(task)}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {formMode && (
        <TaskForm
          initialTask={formMode === "create" ? null : formMode}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setFormMode(null)}
          isSubmitting={isSubmitting}
        />
      )}

      {taskPendingDelete && (
        <ConfirmDialog
          title="Delete this task?"
          description="This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskPendingDelete(null)}
        />
      )}

      {toast && <Toast message={toast.message} variant={toast.variant} />}
    </div>
  );
}
