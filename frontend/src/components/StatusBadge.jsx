const STYLES = {
  "To Do": "bg-slate-100 text-ink-secondary border-border",
  "In Progress": "bg-warning/10 text-warning border-warning/25",
  Done: "bg-success/10 text-success border-success/25",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || STYLES["To Do"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
