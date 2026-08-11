import { Search, Bell, ChevronDown } from "lucide-react";

export default function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-6 border-b border-border bg-surface px-6">
      
      {/* Brand */}
      <div className="flex shrink-0 items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-sm">
          T
        </div>

        <span className="text-[15px] font-semibold tracking-tight text-ink">
          TaskFlow
        </span>
      </div>

      {/* Search */}
      <div className="mx-auto w-full max-w-xl">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className="h-10 w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-ink placeholder:text-ink-secondary transition-all focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-5">
        
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-secondary transition-colors hover:bg-background hover:text-ink"
        >
          <Bell className="h-[18px] w-[18px]" />

          {/* Notification indicator */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-background"
          aria-label="Open profile menu"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-dark text-xs font-semibold text-white">
            CK
          </div>

          <ChevronDown className="hidden h-4 w-4 text-ink-secondary sm:block" />
        </button>

      </div>
    </header>
  );
}