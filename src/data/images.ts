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
    // Visually verified: this is a bowl of tomato soup garnished with herbs,
    // served with a side of almonds — not meal-prep containers. It was
    // previously used (under this false description) on 2 published
    // articles and the Wellness System page; all reassigned to
    // `mealPrepAlt`, which genuinely shows prepped meal bowls. Not
    // currently used anywhere.
    alt: "A bowl of creamy tomato soup garnished with herbs, served with a side of almonds",
    filename: "tomato-soup-almonds.jpg",
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
    // Visually verified: this is a close-up of a person's legs and running
    // shoes climbing outdoor concrete steps — not a "sunlit path," despite
    // the key name. The original alt text was inaccurate; corrected here.
    alt: "Close-up of a person's legs and sneakers climbing outdoor concrete steps",
    filename: "outdoor-steps-sneakers.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  walkingAlt: {
    key: "walkingAlt",
    url: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80",
    // Visually verified: this is two cyclists riding road bikes along a
    // coastal road — not walking shoes on a trail. Not currently used by
    // any published page; corrected so it isn't reused under a false
    // description. Needs real walking/running photography before reuse.
    alt: "Two cyclists riding road bikes along a coastal road",
    filename: "cyclists-coastal-road.jpg",
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
    // Visually verified: this is a close-up of a person's legs performing a
    // barbell deadlift on an indoor gym floor — not an outdoor daily-activity
    // scene. Not currently used by any published page; corrected so it isn't
    // reused under a false description.
    alt: "Close-up of a person's legs performing a barbell deadlift on a gym floor",
    filename: "gym-barbell-deadlift.jpg",
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
    // Visually verified: this is a cat asleep under a blanket — not a
    // bedroom scene. Not currently used by any published page; corrected
    // so it isn't reused under a false description. Needs a real
    // human-sleep photo before reuse.
    alt: "A cat curled up asleep, peeking out from under a white blanket",
    filename: "cat-asleep-blanket.jpg",
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
    // Visually verified: this is a silhouette of a person meditating
    // outdoors at sunrise beneath palm trees — not a coffee-and-window
    // scene. Not currently used by any published page; corrected so it
    // isn't reused under a false description.
    alt: "Silhouette of a person meditating outdoors at sunrise, framed by palm trees",
    filename: "sunrise-meditation-silhouette.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  morningRoutineAlt: {
    key: "morningRoutineAlt",
    url: "https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&w=1200&q=80",
    // Visually verified: this is small kraft-paper gift boxes on a white
    // wood surface — not a journaling scene. Still used on the Wellness
    // System page's "receive your personal access link" step, where
    // "something small arriving for you" is a reasonable fit; corrected
    // to accurately describe the actual photo.
    alt: "Small kraft-paper gift boxes tied with string, arranged on a white wood surface",
    filename: "small-gift-boxes-wood-surface.jpg",
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
    // Visually verified: this is an aerial view of a tropical bay with
    // small boats near the coastline — not a notebook. It was previously
    // used (under this false description) on 4 published habit-building
    // articles; all 4 have been reassigned to accurately-described images.
    // Not currently used anywhere. Needs a real notebook/habit-tracking
    // photo before reuse.
    alt: "Aerial view of a tropical bay with small boats near a lush coastline",
    filename: "aerial-tropical-bay-boats.jpg",
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
  personPlanningMorning: {
    key: "personPlanningMorning",
    url: "https://images.unsplash.com/photo-1634749715333-627ef55abbab?auto=format&fit=crop&w=1200&q=80",
    alt: "A woman writing in a notebook beside a cup of coffee in a calm, warmly lit setting",
    filename: "person-planning-notebook-coffee.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash",
  },
  // Self-hosted (public/blog-images/) rather than hotlinked — visually
  // verified against the actual photo before use, per the standing rule in
  // this file: never trust a filename or description without looking.
  habitTrackerNotebook: {
    key: "habitTrackerNotebook",
    url: "/blog-images/habit-tracker-notebook.jpg",
    alt: "An open planner showing a handwritten habit checklist and a colorful dot-grid habit tracker, with felt-tip pens nearby",
    filename: "habit-tracker-notebook.jpg",
    width: 900,
    height: 1200,
    credit: "Unsplash — photo by @contentpixie / Prophsee Journals, free Unsplash License",
  },
  beginnerStretch: {
    key: "beginnerStretch",
    url: "/blog-images/beginner-stretch.jpg",
    alt: "A woman sitting on a yoga mat at home doing a simple seated forward-fold hamstring stretch",
    filename: "beginner-stretch.jpg",
    width: 1200,
    height: 801,
    credit: "Pexels — photo by Pavel Danilyuk, free Pexels License",
  },
  groceryShoppingList: {
    key: "groceryShoppingList",
    url: "/blog-images/grocery-shopping-list.jpg",
    alt: "A handwritten shopping list (milk, bread, cheese, butter, eggs, fruit, tomatoes) on a notepad with a green pen, on a wood table",
    filename: "grocery-shopping-list.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash — photo by Torbjørn Helgesen, free Unsplash License",
  },
};

export function getImage(key: ImageKey): ImageAsset {
  return IMAGE_LIBRARY[key];
}
