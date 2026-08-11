export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between bg-navy px-6 text-white">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-bold">
          T
        </div>
        <span className="text-[15px] font-semibold tracking-tight">TaskFlow</span>
      </div>

      <div className="hidden max-w-sm flex-1 px-8 md:block">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            disabled
            className="w-full rounded-md border border-navy-light bg-navy-light py-1.5 pl-9 pr-3 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-slate-300">
        <button className="hidden hover:text-white sm:block">Help</button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
          CN
        </div>
      </div>
    </header>
  );
}
