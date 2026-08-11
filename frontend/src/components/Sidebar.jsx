import {
  IconHome,
  IconListChecks,
  IconLayers,
  IconSettings,
  IconLogout,
} from "./Icons";

const NAV_ITEMS = [
  { label: "Dashboard", icon: IconHome, active: true },
  { label: "My Tasks", icon: IconListChecks, active: false },
  { label: "All Tasks", icon: IconLayers, active: false },
];

const BOTTOM_ITEMS = [
  { label: "Settings", icon: IconSettings },
  { label: "Logout", icon: IconLogout },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-border bg-surface md:flex">
      
      {/* Main navigation */}
      <nav className="flex flex-col gap-1.5 px-4 py-5">
        
        {/* Navigation label */}
        <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-secondary">
          Workspace
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "bg-primary text-white shadow-sm"
                  : "text-ink-secondary hover:bg-background hover:text-ink"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 transition-transform duration-200 ${
                  !item.active
                    ? "group-hover:scale-105"
                    : ""
                }`}
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom navigation */}
      <nav className="flex flex-col gap-1.5 border-t border-border px-4 py-5">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="group flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-ink-secondary transition-all duration-200 hover:bg-background hover:text-ink"
            >
              <Icon className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:scale-105" />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}