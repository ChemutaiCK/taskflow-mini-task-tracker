import { useState } from "react";
import { IconX } from "./Icons";

const STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

export default function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const isEditing = Boolean(initialTask);

  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? ""
  );
  const [status, setStatus] = useState(initialTask?.status ?? "To Do");
  const [titleError, setTitleError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError("Task title is required.");
      return;
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      status,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-card">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              {isEditing ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-sm text-ink-secondary">
              {isEditing
                ? "Update the details of this task."
                : "Add a new task and keep your work organized."}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-secondary transition-colors hover:bg-background hover:text-ink"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="space-y-5 px-6 py-6">

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Task title
                <span className="ml-1 text-danger">*</span>
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);

                  if (titleError) {
                    setTitleError("");
                  }
                }}
                placeholder="e.g. Prepare project report"
                autoFocus
                className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-ink placeholder:text-ink-secondary transition-all focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  titleError
                    ? "border-danger focus:border-danger"
                    : "border-border focus:border-primary"
                }`}
              />

              {titleError && (
                <p className="mt-1.5 text-xs font-medium text-danger">
                  {titleError}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add more details about this task..."
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-ink placeholder:text-ink-secondary transition-all focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Status
                <span className="ml-1 text-danger">*</span>
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-ink transition-all focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-border bg-background/50 px-6 py-4">

            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-background"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Task"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}