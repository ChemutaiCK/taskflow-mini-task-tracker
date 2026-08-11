const NAV_ITEMS = [
  { label: "My Tasks", active: true },
  { label: "All Tasks", active: false },
  { label: "Settings", active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:block">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
              item.active
                ? "bg-secondary text-primary-dark"
                : "text-ink/70 hover:bg-slate-50 hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
