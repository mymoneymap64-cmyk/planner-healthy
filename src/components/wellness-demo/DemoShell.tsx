"use client";

import Link from "next/link";
import { ReactNode } from "react";
import {
  CheckSquare,
  Heart,
  Home,
  Library,
  ListChecks,
  NotebookPen,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";

export type DemoSection = "home" | "library" | "plan" | "meal-planner" | "checklists" | "notes" | "favorites";

const NAV: { key: DemoSection; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "library", label: "My Library", icon: Library },
  { key: "plan", label: "Daily Plan", icon: ListChecks },
  { key: "meal-planner", label: "Meal Planner", icon: UtensilsCrossed },
  { key: "checklists", label: "Checklists", icon: CheckSquare },
  { key: "notes", label: "Notes", icon: NotebookPen },
  { key: "favorites", label: "Favorites", icon: Heart },
];

const MOBILE_TABS: { key: DemoSection; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "library", label: "Library", icon: Library },
  { key: "plan", label: "Plan", icon: ListChecks },
  { key: "meal-planner", label: "Meals", icon: UtensilsCrossed },
  { key: "checklists", label: "Checklists", icon: CheckSquare },
  { key: "notes", label: "Notes", icon: NotebookPen },
  { key: "favorites", label: "Favorites", icon: Heart },
];

/**
 * Visual twin of DashboardShell for the public demo — same look, but
 * section switching is local React state (no routing, no token, no
 * DashboardShell import) so this can never be confused with, or
 * accidentally touch, the real authenticated dashboard.
 */
export default function DemoShell({
  active,
  onNavigate,
  children,
}: {
  active: DemoSection;
  onNavigate: (section: DemoSection) => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream lg:flex">
      <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-ink-950 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-gold-300 lg:hidden">
        Demo / Preview — no account needed
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-900/10 bg-white lg:flex">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink-950 font-display text-sm font-black text-white">
            N
          </span>
          <span className="font-display text-base font-bold text-ink-900">Natural Wellness</span>
        </div>
        <div className="mx-3 mb-4 rounded-lg bg-ink-950 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-gold-300">
          Demo / Preview
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm font-semibold transition-colors ${
                  isActive ? "bg-brand-100 text-brand-800" : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-ink-900/10 px-3 py-4">
          <Link href="/checkout" className="btn-gold w-full justify-center py-2.5 text-sm">
            <ShoppingBag size={15} /> Get the Complete Library
          </Link>
          <Link href="/wellness-system" className="block text-center text-xs font-semibold text-ink-400 hover:text-ink-700">
            Back to Wellness System overview
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 pb-20 lg:pb-0">
        <div className="hidden items-center justify-between gap-2.5 border-b border-ink-900/10 bg-ink-950 px-5 py-3 lg:flex">
          <span className="text-xs font-bold uppercase tracking-wide text-gold-300">Demo / Preview — nothing you do here is saved</span>
          <Link href="/checkout" className="text-xs font-bold text-white hover:text-gold-300">
            Get the Complete Library →
          </Link>
        </div>

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
      <nav className="fixed inset-x-0 bottom-0 z-40 flex overflow-x-auto border-t border-ink-900/10 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        {MOBILE_TABS.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onNavigate(tab.key)}
              className={`flex min-w-[64px] flex-1 flex-col items-center gap-1 px-0.5 py-2.5 text-center text-[9px] font-semibold leading-tight ${
                isActive ? "text-brand-700" : "text-ink-400"
              }`}
            >
              <tab.icon size={17} strokeWidth={isActive ? 2.5 : 2} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
