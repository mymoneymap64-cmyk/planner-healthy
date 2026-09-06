import { ImageAsset, ImageKey } from "@/lib/types";

/**
 * Central image library.
 *
 * All URLs point to Unsplash's CDN and are free to use under the Unsplash
 * License. To replace any image with your own photography, swap the `url`
 * (and update `width`/`height` if the aspect ratio changes) — every place
 * in the app that shows this image reads from this one file. The
 * `filename` field is a suggested descriptive filename to use if you
 * download and self-host the replacement image.
 */
export const IMAGE_LIBRARY: Record<ImageKey, ImageAsset> = {
  healthyMeals: {
    key: "healthyMeals",
    url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    alt: "A colorful bowl of fresh salad with leafy greens, tomatoes, and vegetables",
    filename: "healthy-balanced-meal-salad-bowl.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  healthyMealsAlt: {
    key: "healthyMealsAlt",
    url: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80",
    alt: "An overhead view of a balanced plate with vegetables, grains, and protein",
    filename: "balanced-plate-overhead.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  mealPrep: {
    key: "mealPrep",
    url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    alt: "Weekly meal prep containers filled with portioned vegetables, grains, and protein",
    filename: "weekly-meal-prep-containers.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  mealPrepAlt: {
    key: "mealPrepAlt",
    url: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=1200&q=80",
    alt: "Fresh ingredients laid out on a kitchen counter ready for meal preparation",
    filename: "meal-prep-ingredients-counter.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  walking: {
    key: "walking",
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
    alt: "A person walking along a sunlit outdoor path surrounded by trees",
    filename: "outdoor-walking-path.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  walkingAlt: {
    key: "walkingAlt",
    url: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80",
    alt: "Close-up of walking shoes on a paved trail during a beginner walking routine",
    filename: "beginner-walking-shoes-trail.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  workouts: {
    key: "workouts",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    alt: "A beginner performing a simple bodyweight exercise routine at home",
    filename: "beginner-home-bodyweight-workout.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  workoutsAlt: {
    key: "workoutsAlt",
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    alt: "A person in athletic wear moving outdoors as part of a daily activity routine",
    filename: "daily-movement-activity-outdoors.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  hydration: {
    key: "hydration",
    url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=80",
    alt: "A clear glass of water being poured, representing a daily hydration habit",
    filename: "daily-hydration-glass-of-water.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  sleep: {
    key: "sleep",
    url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80",
    alt: "A calm, tidy bedroom with soft natural light representing a restful sleep routine",
    filename: "restful-sleep-bedroom.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  sleepAlt: {
    key: "sleepAlt",
    url: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=1200&q=80",
    alt: "A cozy bed with soft pillows set up for a relaxing evening wind-down",
    filename: "evening-wind-down-bed.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  healthyLifestyle: {
    key: "healthyLifestyle",
    url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    alt: "An assortment of fresh vegetables representing a healthy, balanced lifestyle",
    filename: "fresh-vegetables-healthy-lifestyle.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  healthyLifestyleAlt: {
    key: "healthyLifestyleAlt",
    url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    alt: "Fresh produce arranged on a table representing whole-food nutrition choices",
    filename: "fresh-produce-whole-foods.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  morningRoutine: {
    key: "morningRoutine",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    alt: "A warm cup of coffee on a table beside a sunlit window during a morning routine",
    filename: "calm-morning-coffee-routine.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  morningRoutineAlt: {
    key: "morningRoutineAlt",
    url: "https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&w=1200&q=80",
    alt: "A person journaling and planning their day as part of a morning routine",
    filename: "morning-journaling-planning.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  breakfast: {
    key: "breakfast",
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    alt: "A simple, balanced breakfast plate set on a kitchen table",
    filename: "simple-balanced-breakfast.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  healthyHabits: {
    key: "healthyHabits",
    url: "https://images.unsplash.com/photo-1517971053567-8bde93bc6a58?auto=format&fit=crop&w=1200&q=80",
    alt: "An open notebook used for tracking daily habits and personal goals",
    filename: "daily-habit-tracking-notebook.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  motivation: {
    key: "motivation",
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80",
    alt: "A sunrise over open hills representing a fresh start and renewed motivation",
    filename: "sunrise-fresh-start-motivation.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  motivationAlt: {
    key: "motivationAlt",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    alt: "A scenic mountain path representing the personal journey of consistent progress",
    filename: "mountain-path-personal-progress.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
};

export function getImage(key: ImageKey): ImageAsset {
  return IMAGE_LIBRARY[key];
}
