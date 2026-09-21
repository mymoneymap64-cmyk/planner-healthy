"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  CheckSquare,
  Heart,
  HelpCircle,
  Home,
  Library,
  ListChecks,
  NotebookPen,
  Settings,
} from "lucide-react";

const NAV = [
  { key: "home", path: "", label: "Home", icon: Home, exact: true },
  { key: "library", path: "/library", label: "My Library", icon: Library, exact: false },
  { key: "plan", path: "/plan", label: "Daily Plan", icon: ListChecks, exact: false },
  { key: "checklists", path: "/checklists", label: "Checklists", icon: CheckSquare, exact: false },
  { key: "notes", path: "/notes", label: "Notes", icon: NotebookPen, exact: false },
  { key: "favorites", path: "/favorites", label: "Favorites", icon: Heart, exact: false },
];

const BOTTOM_NAV = [
  { path: "/settings", label: "Settings", icon: Settings },
  { path: "/help", label: "Help", icon: HelpCircle },
];

const MOBILE_TABS = [
  { path: "", label: "Home", icon: Home, exact: true },
  { path: "/library", label: "Library", icon: Library, exact: false },
  { path: "/plan", label: "Plan", icon: ListChecks, exact: false },
  { path: "/checklists", label: "Checklists", icon: CheckSquare, exact: false },
  { path: "/notes", label: "Notes", icon: NotebookPen, exact: false },
  { path: "/favorites", label: "Favorites", icon: Heart, exact: false },
  { path: "/settings", label: "Profile", icon: Settings, exact: false },
];

function isActivePath(pathname: string, base: string, path: string, exact: boolean): boolean {
  const target = `${base}${path}`;
  return exact ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
}

export default function DashboardShell({ token, children }: { token: string; children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const base = `/wellness/${token}`;

  return (
    <div className="min-h-screen bg-cream lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-900/10 bg-white lg:flex">
        <Link href={base} className="flex items-center gap-2.5 px-6 py-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink-950 font-display text-sm font-black text-white">
            N
          </span>
          <span className="font-display text-base font-bold text-ink-900">Natural Wellness</span>
        </Link>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const active = isActivePath(pathname, base, item.path, item.exact);
            return (
              <Link
                key={item.key}
                href={`${base}${item.path}`}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  active ? "bg-brand-100 text-brand-800" : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-ink-900/10 px-3 py-4">
          {BOTTOM_NAV.map((item) => {
            const active = isActivePath(pathname, base, item.path, false);
            return (
              <Link
                key={item.path}
                href={`${base}${item.path}`}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  active ? "bg-brand-100 text-brand-800" : "text-ink-500 hover:bg-ink-900/5 hover:text-ink-900"
                }`}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 pb-20 lg:pb-0">
        {/* Mobile top bar */}
        <div className="flex items-center gap-2.5 border-b border-ink-900/10 bg-white px-5 py-4 lg:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink-950 font-display text-sm font-black text-white">
            N
          </span>
          <span className="font-display text-sm font-bold text-ink-900">Natural Wellness</span>
        </div>

        <main>{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-7 border-t border-ink-900/10 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        {MOBILE_TABS.map((tab) => {
          const active = isActivePath(pathname, base, tab.path, tab.exact);
          return (
            <Link
              key={tab.label}
              href={`${base}${tab.path}`}
              className={`flex flex-col items-center gap-1 px-0.5 py-2.5 text-center text-[9px] font-semibold leading-tight ${
                active ? "text-brand-700" : "text-ink-400"
              }`}
            >
              <tab.icon size={17} strokeWidth={active ? 2.5 : 2} />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
