import { IconSearch, IconBell, IconChevronDown } from "./Icons";

export default function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-6 border-b border-border bg-surface px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
          T
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-ink">TaskFlow</span>
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-3 text-sm text-ink placeholder:text-ink-secondary focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative text-ink-secondary hover:text-ink"
        >
          <IconBell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-dark text-xs font-semibold text-white">
            CK
          </div>
          <IconChevronDown className="hidden h-4 w-4 text-ink-secondary sm:block" />
        </div>
      </div>
    </header>
  );
}
