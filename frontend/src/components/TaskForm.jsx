import { useState } from "react";
import { IconX } from "./Icons";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-ink">
            {isEditing ? "Edit Task" : "Create Task"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-secondary hover:bg-background hover:text-ink"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
              Title <span className="text-danger">*</span>
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
              className={`w-full rounded-md border px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                titleError ? "border-danger" : "border-border focus:border-primary"
              }`}
            />
            {titleError && <p className="mt-1 text-xs text-danger">{titleError}</p>}
          </div>

          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add more detail (optional)"
              className="w-full resize-none rounded-md border border-border px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-ink">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-border px-3.5 py-1.5 text-sm font-medium text-ink hover:bg-background"
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
