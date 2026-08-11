import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskSummary from "./components/TaskSummary";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";
import Toast from "./components/Toast";
import { fetchTasks, createTask, updateTask, deleteTask } from "./services/taskApi";

const STATUS_TABS = ["All", "To Do", "In Progress", "Done"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loadState, setLoadState] = useState("loading"); // loading | ready | error

  const [activeTab, setActiveTab] = useState("All");
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
      const matchesTab = activeTab === "All" || task.status === activeTab;
      const matchesSearch =
        !term ||
        task.title.toLowerCase().includes(term) ||
        (task.description || "").toLowerCase().includes(term);
      return matchesTab && matchesSearch;
    });
  }, [tasks, activeTab, searchTerm]);

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
    <div className="flex h-screen flex-col bg-surface">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <div>
              <h1 className="text-xl font-semibold text-ink">My Tasks</h1>
              <p className="mt-0.5 text-sm text-ink/60">Simple task management for focused work.</p>
            </div>

            <TaskSummary counts={counts} />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-1 rounded-md bg-slate-100 p-1">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-white text-primary-dark shadow-subtle"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setFormMode("create")}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                + Create Task
              </button>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search tasks..."
              className="w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            {loadState === "loading" && (
              <p className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-ink/60">
                Loading tasks...
              </p>
            )}

            {loadState === "error" && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
                <p className="text-sm font-medium text-red-700">Unable to load tasks. Please try again.</p>
                <button
                  onClick={loadTasks}
                  className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Retry
                </button>
              </div>
            )}

            {loadState === "ready" && visibleTasks.length === 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-10 text-center">
                <p className="text-sm font-semibold text-ink">
                  {tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  {tasks.length === 0
                    ? "Create your first task to get started."
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
