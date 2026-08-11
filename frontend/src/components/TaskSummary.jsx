const CARDS = [
  { key: "total", label: "Total Tasks" },
  { key: "todo", label: "To Do" },
  { key: "inProgress", label: "In Progress" },
  { key: "done", label: "Completed" },
];

export default function TaskSummary({ counts }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-subtle"
        >
          <p className="text-xs font-medium text-ink/60">{card.label}</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{counts[card.key]}</p>
        </div>
      ))}
    </div>
  );
}
