"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, ClipboardList, LineChart, UtensilsCrossed, Dumbbell } from "lucide-react";

const TABS = [
  { href: "/program", label: "Program", icon: CalendarCheck },
  { href: "/planner", label: "Planner", icon: ClipboardList },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/meal-plan", label: "Meals", icon: UtensilsCrossed },
  { href: "/workouts", label: "Move", icon: Dumbbell },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/[0.08] bg-cream/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="grid grid-cols-5">
        {TABS.map((tab) => {
          const active = pathname === tab.href || pathname?.startsWith(tab.href + "/");
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-brand-700" : "text-ink-400"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
