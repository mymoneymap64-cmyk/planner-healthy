/**
 * Per-product tool configuration for the HealthyGuide Wellness System.
 * Every label here is an organizational self-tracking prompt tied to using
 * the guide the customer already owns — never a health claim, technique,
 * diagnosis, or instruction that isn't already the customer's own guide
 * content. Phase 1 wires up `checklist` and `notes` only; `goals`, `habits`,
 * and `reflection` are typed and registered here as `null` so later phases
 * can fill them in per product without reworking the data shape or the
 * components that read it.
 */

export type ChecklistItemConfig = {
  id: string;
  label: string;
};

export type WellnessToolConfig = {
  checklist: {
    title: string;
    items: ChecklistItemConfig[];
  } | null;
  notes: {
    title: string;
    placeholder: string;
  } | null;
  // Reserved for later phases — intentionally unimplemented in Phase 1.
  goals: { title: string } | null;
  habits: { title: string; unit: string } | null;
  reflection: { title: string } | null;
};

const DEFAULT_TOOLS: WellnessToolConfig = {
  checklist: {
    title: "Reading Checklist",
    items: [
      { id: "read-today", label: "Read a section today" },
      { id: "one-idea", label: "Tried one idea from the guide" },
      { id: "logged-progress", label: "Logged today's progress" },
    ],
  },
  notes: {
    title: "Personal Notes",
    placeholder: "Anything you want to remember...",
  },
  goals: null,
  habits: null,
  reflection: null,
};

const PRODUCT_TOOLS: Record<string, WellnessToolConfig> = {
  "natural-healing-handbook": {
    checklist: {
      title: "Reading & Practice Checklist",
      items: [
        { id: "read-section", label: "Read a section today" },
        { id: "tried-recipe", label: "Tried one recipe or routine from the guide" },
        { id: "noted-what-worked", label: "Noted what worked for me" },
      ],
    },
    notes: { title: "Personal Notes", placeholder: "Anything you want to remember..." },
    goals: null,
    habits: null,
    reflection: null,
  },
  "mental-wellness-guide": {
    checklist: {
      title: "Self-Care Checklist",
      items: [
        { id: "quiet-time", label: "Took a few minutes for myself today" },
        { id: "used-a-tool", label: "Used one tool from the guide" },
        { id: "checked-in", label: "Checked in with how I'm feeling" },
      ],
    },
    notes: { title: "Reflection Notes", placeholder: "How are you feeling today?" },
    goals: null,
    habits: null,
    reflection: null,
  },
  "womens-wellness-guide": {
    checklist: {
      title: "Daily Routine Checklist",
      items: [
        { id: "followed-routine", label: "Followed my routine today" },
        { id: "read-section", label: "Read a section of the guide" },
        { id: "noted-something", label: "Noted something I want to remember" },
      ],
    },
    notes: { title: "Personal Notes", placeholder: "Anything you want to remember..." },
    goals: null,
    habits: null,
    reflection: null,
  },
  "mens-wellness-guide": {
    checklist: {
      title: "Daily Routine Checklist",
      items: [
        { id: "followed-routine", label: "Followed my routine today" },
        { id: "read-section", label: "Read a section of the guide" },
        { id: "logged-progress", label: "Logged today's progress" },
      ],
    },
    notes: { title: "Personal Notes", placeholder: "Anything you want to remember..." },
    goals: null,
    habits: null,
    reflection: null,
  },
  "natural-remedies-herbal-recipes": {
    checklist: {
      title: "Recipe Prep Checklist",
      items: [
        { id: "tried-recipe", label: "Tried one recipe today" },
        { id: "gathered-ingredients", label: "Gathered ingredients for next time" },
        { id: "noted-results", label: "Noted how it turned out" },
      ],
    },
    notes: { title: "Recipe Notes", placeholder: "Favorite recipes, substitutions, results..." },
    goals: null,
    habits: null,
    reflection: null,
  },
  "sleep-recovery-handbook": {
    checklist: {
      title: "Bedtime Routine Checklist",
      items: [
        { id: "wind-down", label: "Followed my wind-down routine" },
        { id: "target-bedtime", label: "Went to bed at my target time" },
        { id: "noted-sleep", label: "Noted how I slept" },
      ],
    },
    notes: { title: "Personal Notes", placeholder: "Anything you want to remember..." },
    goals: null,
    habits: null,
    reflection: null,
  },
  "healthy-eating-guide": {
    checklist: {
      title: "Meal & Grocery Checklist",
      items: [
        { id: "planned-meals", label: "Planned tomorrow's meals" },
        { id: "grocery-list", label: "Checked items off my grocery list" },
        { id: "water-intake", label: "Drank enough water today" },
      ],
    },
    notes: { title: "Meal Notes", placeholder: "Recipes to try, swaps, meal ideas..." },
    goals: null,
    habits: null,
    reflection: null,
  },
};

export function getWellnessTools(slug: string): WellnessToolConfig {
  return PRODUCT_TOOLS[slug] ?? DEFAULT_TOOLS;
}

export function getChecklistItemIds(slug: string): string[] {
  return getWellnessTools(slug).checklist?.items.map((i) => i.id) ?? [];
}
