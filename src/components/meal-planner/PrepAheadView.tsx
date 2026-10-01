"use client";

import { useMealPlanner } from "./useMealPlanner";
import SimpleChecklistView from "./SimpleChecklistView";

export default function PrepAheadView({ planner }: { planner: ReturnType<typeof useMealPlanner> }) {
  return (
    <SimpleChecklistView
      planner={planner}
      list="prepList"
      eyebrow="Get Ahead"
      title="Prep Ahead"
      description="Small tasks you can do today to make tomorrow's meals easier."
      placeholder="Add a prep task..."
    />
  );
}
