const STYLES = {
  "To Do": "bg-slate-50 text-slate-600 border-slate-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Done: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || STYLES["To Do"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}