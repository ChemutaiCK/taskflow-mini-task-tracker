import { IconTrash } from "./Icons";

export default function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-surface p-5 shadow-card">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/10 text-danger">
          <IconTrash className="h-5 w-5" />
        </div>
        <h2 className="mt-3 text-base font-semibold text-ink">{title}</h2>
        <p className="mt-1 text-sm text-ink-secondary">{description}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-md border border-border px-3.5 py-1.5 text-sm font-medium text-ink hover:bg-background"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-danger px-3.5 py-1.5 text-sm font-medium text-white hover:bg-danger/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
