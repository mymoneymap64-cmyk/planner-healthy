// Client-safe (no Node-only imports) — mirrors the same constraint as
// mealPlanner.ts / wellnessDashboard.ts.

export type DetoxDay = {
  day: number;
  title: string;
  action: string;
};

export type DigitalDetoxState = {
  completedDays: number[];
  updatedAt: string;
};

export const TOTAL_DETOX_DAYS = 7;

export const DETOX_DAYS: DetoxDay[] = [
  { day: 1, title: "Phone-Free Window", action: "Spend 20 minutes phone-free — no notifications, no checking." },
  { day: 2, title: "Step Outside", action: "Go outside for 15 minutes. No screen, just fresh air." },
  { day: 3, title: "Screen-Free Meal", action: "Eat one full meal today without your phone anywhere nearby." },
  { day: 4, title: "Social Media Break", action: "Take a 30-minute break from social media, whenever suits your day." },
  { day: 5, title: "Walk Without Your Phone in Hand", action: "Take a walk and leave your phone in your pocket or bag the whole time." },
  { day: 6, title: "Swap a Scroll Session", action: "Replace one scroll session with a real-world activity — a hobby, a call, a tidy-up." },
  { day: 7, title: "Build Your Offline Routine", action: "Write down one small offline habit you want to keep going forward." },
];

export function emptyDigitalDetoxState(): DigitalDetoxState {
  return { completedDays: [], updatedAt: new Date().toISOString() };
}

export type DigitalDetoxStats = {
  completedCount: number;
  totalDays: number;
  percent: number;
  currentDay: number | null; // first not-yet-completed day, or null if finished
  isComplete: boolean;
};

export function computeDetoxStats(state: DigitalDetoxState): DigitalDetoxStats {
  const completedCount = state.completedDays.length;
  const currentDay = DETOX_DAYS.find((d) => !state.completedDays.includes(d.day))?.day ?? null;
  return {
    completedCount,
    totalDays: TOTAL_DETOX_DAYS,
    percent: Math.round((completedCount / TOTAL_DETOX_DAYS) * 100),
    currentDay,
    isComplete: completedCount >= TOTAL_DETOX_DAYS,
  };
}
