"use client";

import { useMealPlanner } from "./useMealPlanner";
import SimpleChecklistView from "./SimpleChecklistView";

export default function GroceryListView({ planner }: { planner: ReturnType<typeof useMealPlanner> }) {
  return (
    <SimpleChecklistView
      planner={planner}
      list="groceryList"
      eyebrow="Shopping"
      title="Grocery List"
      description="Keep track of what to pick up for the meals you've planned."
      placeholder="Add an item..."
    />
  );
}
