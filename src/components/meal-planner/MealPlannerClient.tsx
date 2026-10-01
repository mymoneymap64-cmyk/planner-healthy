"use client";

import { useState } from "react";
import { CalendarDays, CheckSquare, ClipboardList, Heart, NotebookPen, ShoppingCart, TrendingUp } from "lucide-react";
import { useMealPlanner } from "./useMealPlanner";
import OnboardingWizard from "./OnboardingWizard";
import TodayView from "./TodayView";
import WeekView from "./WeekView";
import MyMealsView from "./MyMealsView";
import GroceryListView from "./GroceryListView";
import PrepAheadView from "./PrepAheadView";
import ProgressView from "./ProgressView";
import CheckInView from "./CheckInView";
import DashboardLoading from "@/components/wellness-dashboard/DashboardLoading";

const TABS = [
  { key: "today", label: "Today", icon: CalendarDays },
  { key: "week", label: "Weekly Plan", icon: CheckSquare },
  { key: "meals", label: "My Meals", icon: Heart },
  { key: "grocery", label: "Grocery List", icon: ShoppingCart },
  { key: "prep", label: "Prep Ahead", icon: ClipboardList },
  { key: "progress", label: "Progress", icon: TrendingUp },
  { key: "checkin", label: "Check-in", icon: NotebookPen },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function MealPlannerClient({ token }: { token: string }) {
  const planner = useMealPlanner(token);
  const [tab, setTab] = useState<TabKey>("today");

  if (!planner.loaded || !planner.state) {
    return <DashboardLoading label="Loading your meal planner..." />;
  }

  if (!planner.state.setup.onboarded) {
    return <OnboardingWizard dispatch={planner.dispatch} />;
  }

  return (
    <div>
      <div className="sticky top-0 z-20 overflow-x-auto border-b border-ink-900/10 bg-cream/95 backdrop-blur">
        <div className="container-page flex gap-1 py-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
                tab === t.key ? "bg-ink-950 text-white" : "text-ink-500 hover:bg-ink-900/5"
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "today" && <TodayView planner={planner} />}
      {tab === "week" && <WeekView planner={planner} />}
      {tab === "meals" && <MyMealsView planner={planner} />}
      {tab === "grocery" && <GroceryListView planner={planner} />}
      {tab === "prep" && <PrepAheadView planner={planner} />}
      {tab === "progress" && <ProgressView planner={planner} />}
      {tab === "checkin" && <CheckInView planner={planner} />}
    </div>
  );
}
