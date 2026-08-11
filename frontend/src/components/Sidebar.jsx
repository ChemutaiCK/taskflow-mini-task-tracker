import { IconHome, IconListChecks, IconLayers, IconSettings, IconLogout } from "./Icons";

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
    <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-border bg-surface md:flex">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                item.active
                  ? "bg-primary text-white shadow-subtle"
                  : "text-ink-secondary hover:bg-background hover:text-ink"
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <nav className="flex flex-col gap-1 border-t border-border p-4">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-ink-secondary transition-colors hover:bg-background hover:text-ink"
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
