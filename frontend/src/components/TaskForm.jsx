import { useState } from "react";

const STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

export default function TaskForm({ initialTask, onSubmit, onCancel, isSubmitting }) {
  const isEditing = Boolean(initialTask);

  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(initialTask?.description ?? "");
  const [status, setStatus] = useState(initialTask?.status ?? "To Do");
  const [titleError, setTitleError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError("Title is required.");
      return;
    }

    onSubmit({ title: trimmedTitle, description: description.trim(), status });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        <h2 className="text-base font-semibold text-ink">
          {isEditing ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (titleError) setTitleError("");
              }}
              placeholder="e.g. Prepare project report"
              className={`w-full rounded-md border px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                titleError ? "border-red-400" : "border-slate-300"
              }`}
            />
            {titleError && <p className="mt-1 text-xs text-red-600">{titleError}</p>}
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-ink">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add more detail (optional)"
              className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label htmlFor="status" className="mb-1 block text-sm font-medium text-ink">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-ink hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
