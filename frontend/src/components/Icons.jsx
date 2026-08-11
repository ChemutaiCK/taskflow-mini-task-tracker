// Small hand-rolled icon set in the lucide visual style (24x24, stroke-based).
// Kept local instead of adding the lucide-react dependency, since the
// project didn't already depend on an icon library.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconHome({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

export function IconListChecks({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="m3 7 1.5 1.5L7 6" />
      <path d="m3 13 1.5 1.5L7 12" />
      <path d="M11 7h10" />
      <path d="M11 13h10" />
      <path d="M11 19h10" />
      <path d="m3 19 1.5 1.5L7 18" />
    </svg>
  );
}

export function IconLayers({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

export function IconSettings({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

export function IconLogout({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function IconSearch({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function IconBell({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M6 8a6 6 0 0 1 12 0c0 4.5 2 5.5 2 5.5H4S6 12.5 6 8Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function IconChevronDown({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconX({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function IconPlus({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconClipboardList({ className }) {
  return (
    <svg className={className} {...base}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Z" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
      <path d="M9 19h4" />
    </svg>
  );
}

export function IconCircleDot({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconClock({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function IconCheckCircle({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function IconInbox({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M4 12h4l2 3h4l2-3h4" />
      <path d="M5.5 5h13l1.5 7v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7l1.5-7Z" />
    </svg>
  );
}

export function IconAlertCircle({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export function IconRefreshCw({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M21 12a9 9 0 0 0-15.3-6.4L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 15.3 6.4L21 16" />
      <path d="M21 21v-5h-5" />
    </svg>
  );
}

export function IconPencil({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function IconTrash({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
