"use client";

import { useState } from "react";
import DemoShell, { DemoSection } from "./DemoShell";
import { useDemoWellnessState } from "./useDemoWellnessState";
import DemoHome from "./views/DemoHome";
import DemoLibrary from "./views/DemoLibrary";
import DemoPlan from "./views/DemoPlan";
import DemoMealPlanner from "./views/DemoMealPlanner";
import DemoChecklists from "./views/DemoChecklists";
import DemoNotes from "./views/DemoNotes";
import DemoFavorites from "./views/DemoFavorites";

/**
 * Public, read-only-in-spirit demo of the Wellness System. Everything here
 * runs on local React state seeded with sample data (see
 * useDemoWellnessState) — there is no token, no order, no fetch() call,
 * and nothing is ever persisted. This component tree must never import
 * anything from @/lib/orders, @/lib/kv, @/lib/readerAuth,
 * @/lib/wellnessDashboardStore, or @/lib/mealPlannerStore.
 */
export default function DemoWellnessApp() {
  const [section, setSection] = useState<DemoSection>("home");
  const demo = useDemoWellnessState();

  return (
    <DemoShell active={section} onNavigate={setSection}>
      {section === "home" && <DemoHome demo={demo} />}
      {section === "library" && <DemoLibrary demo={demo} />}
      {section === "plan" && <DemoPlan demo={demo} />}
      {section === "meal-planner" && <DemoMealPlanner demo={demo} />}
      {section === "checklists" && <DemoChecklists demo={demo} />}
      {section === "notes" && <DemoNotes demo={demo} />}
      {section === "favorites" && <DemoFavorites demo={demo} />}
    </DemoShell>
  );
}
