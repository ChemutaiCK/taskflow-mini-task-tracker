import { IconClipboardList, IconCircleDot, IconClock, IconCheckCircle } from "./Icons";

const CARDS = [
  {
    key: "total",
    label: "Total Tasks",
    icon: IconClipboardList,
    accent: "bg-primary/10 text-primary",
    note: "All tasks in TaskFlow",
  },
  {
    key: "todo",
    label: "To Do",
    icon: IconCircleDot,
    accent: "bg-slate-200 text-ink-secondary",
    note: "Not yet started",
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: IconClock,
    accent: "bg-warning/10 text-warning",
    note: "Currently active",
  },
  {
    key: "done",
    label: "Completed",
    icon: IconCheckCircle,
    accent: "bg-success/10 text-success",
    note: "Finished work",
  },
];

export default function TaskSummary({ counts }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="rounded-lg border border-border bg-surface p-5 shadow-subtle"
          >
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                {card.label}
              </p>
              <div className={`flex h-8 w-8 items-center justify-center rounded-md ${card.accent}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-semibold text-ink">{counts[card.key]}</p>
            <p className="mt-1 text-xs text-ink-secondary">{card.note}</p>
          </div>
        );
      })}
    </div>
  );
}
