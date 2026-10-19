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
  choppingFreshVegetables: {
    key: "choppingFreshVegetables",
    url: "/product-images/chopping-fresh-vegetables.jpg",
    alt: "A person in an apron slicing fresh mushrooms on a wooden cutting board, surrounded by tomatoes, lettuce, lemons and herbs",
    filename: "chopping-fresh-vegetables.jpg",
    width: 1200,
    height: 673,
    credit: "Pexels — photo by Katerina Holmes, free Pexels License",
  },
  homeCanningPantry: {
    key: "homeCanningPantry",
    url: "/product-images/home-canning-pantry.jpg",
    alt: "Rustic wooden pantry shelves lined with rows of home-canned jars of preserved vegetables, pickles and jams",
    filename: "home-canning-pantry.jpg",
    width: 1200,
    height: 800,
    credit: "Unsplash — photo by Ray Shrewsberry, free Unsplash License",
  },
  bakingFreshCake: {
    key: "bakingFreshCake",
    url: "/product-images/baking-fresh-cake.jpg",
    alt: "A person lifting the springform ring off a freshly baked cake, with citrus wedges and linen on the table",
    filename: "baking-fresh-cake.jpg",
    width: 675,
    height: 1200,
    credit: "Pexels — photo by Merve, free Pexels License",
  },
  // Dedicated to the Men's Wellness Guide's About section only — the
  // shared `workouts` key (used elsewhere, e.g. blog articles) stays
  // exactly as it is and is not reassigned here.
  mensWellnessStretch: {
    key: "mensWellnessStretch",
    url: "/product-images/mens-wellness-stretch.jpg",
    alt: "A man in a black t-shirt doing a standing side stretch in a bright, sunlit home living room, with a pair of dumbbells visible on the rug",
    filename: "mens-wellness-stretch.jpg",
    width: 1200,
    height: 800,
    credit: "Pexels — photo by MART PRODUCTION, free Pexels License",
  },
  // Homepage hero only — a woman holding a mug surrounded by lush indoor
  // plants, chosen to match the warm, natural-wellness editorial reference.
  // The soft out-of-focus leaves in the foreground are part of the real
  // photo, not an added graphic overlay.
  womanMugIndoorPlants: {
    key: "womanMugIndoorPlants",
    url: "/blog-images/woman-mug-indoor-plants.jpg",
    alt: "A woman with auburn hair holding a dark ceramic mug, looking down thoughtfully, surrounded by lush green houseplants with soft natural window light",
    filename: "woman-mug-indoor-plants.jpg",
    width: 1280,
    height: 1600,
    credit: "Pexels — photo by Airam Dato-on, free Pexels License",
  },
  // Replaces womanMugIndoorPlants as the homepage hero photo — a genuine
  // landscape-oriented photo (1.5:1) so the wide hero box no longer forces
  // a tight crop into a close-up; the mug, hands, and surrounding plants
  // are all visible without relying on object-position tricks.
  womanMugPlantsLandscape: {
    key: "womanMugPlantsLandscape",
    url: "/blog-images/woman-mug-plants-landscape.jpg",
    alt: "A woman with a short buzz cut sitting on a sofa in a bright, plant-filled living room, drinking from a white mug with her eyes closed, a laptop and open book on her lap",
    filename: "woman-mug-plants-landscape.jpg",
    width: 1800,
    height: 1200,
    credit: "Pexels — photo by Michelle Leman, free Pexels License",
  },
  // Mental Wellness category launch (articles 51–65) — one real, visually
  // verified photo per article rather than reusing the shared generic pool.
  everydayStressDeskStretch: {
    key: "everydayStressDeskStretch",
    url: "/blog-images/everyday-stress-desk-stretch.jpg",
    alt: "A woman at an office desk stretching both arms overhead with her eyes closed, taking a brief break",
    filename: "everyday-stress-desk-stretch.jpg",
    width: 1600,
    height: 2400,
    credit: "Pexels — photo by Darlene Alderson, free Pexels License",
  },
  overwhelmNotebookToDoList: {
    key: "overwhelmNotebookToDoList",
    url: "/blog-images/overwhelm-notebook-to-do-list.jpg",
    alt: "An overhead view of hands writing a 'To Do List' on a notepad next to an open planner showing a September calendar",
    filename: "overwhelm-notebook-to-do-list.jpg",
    width: 1600,
    height: 1067,
    credit: "Pexels — photo by Ahmed (@mutecevvil), free Pexels License",
  },
  breathingExerciseHandOnChest: {
    key: "breathingExerciseHandOnChest",
    url: "/blog-images/breathing-exercise-hand-on-chest.jpg",
    alt: "A woman sitting cross-legged on a sofa with her eyes closed, one hand resting on her chest in a slow-breathing exercise",
    filename: "breathing-exercise-hand-on-chest.jpg",
    width: 1600,
    height: 2400,
    credit: "Pexels — photo by Anna Tarazevich, free Pexels License",
  },
  progressiveMuscleRelaxationMat: {
    key: "progressiveMuscleRelaxationMat",
    url: "/blog-images/progressive-muscle-relaxation-mat.jpg",
    alt: "A woman lying on a green yoga mat with her eyes closed, relaxed, with meditation chimes resting on the floor beside her",
    filename: "progressive-muscle-relaxation-mat.jpg",
    width: 1600,
    height: 1068,
    credit: "Pexels — photo by Arina Krasnikova, free Pexels License",
  },
  journalingRedNotebook: {
    key: "journalingRedNotebook",
    url: "/blog-images/journaling-red-notebook.jpg",
    alt: "A close-up of a woman writing in a red journal with a pen while sitting on a sofa",
    filename: "journaling-red-notebook.jpg",
    width: 1600,
    height: 1067,
    credit: "Pexels — photo by Pixabay, free Pexels License",
  },
  closingLaptopEndOfWorkday: {
    key: "closingLaptopEndOfWorkday",
    url: "/blog-images/closing-laptop-end-of-workday.jpg",
    alt: "A close-up of a hand closing a laptop lid on a clean, minimal desk",
    filename: "closing-laptop-end-of-workday.jpg",
    width: 1600,
    height: 1067,
    credit: "Pexels — photo by Cup of Couple, free Pexels License",
  },
  emotionalCheckInCupOfTea: {
    key: "emotionalCheckInCupOfTea",
    url: "/blog-images/emotional-check-in-cup-of-tea.jpg",
    alt: "A woman in silhouette holding a cup of tea and looking thoughtfully out a window in warm evening light",
    filename: "emotional-check-in-cup-of-tea.jpg",
    width: 1600,
    height: 2400,
    credit: "Pexels — photo by cottonbro studio, free Pexels License",
  },
  decompressTeaBlanketSofa: {
    key: "decompressTeaBlanketSofa",
    url: "/blog-images/decompress-tea-blanket-sofa.jpg",
    alt: "A woman wrapped in a chunky knit blanket on a sofa, sipping from a mug of tea in a cozy room with an exposed brick wall",
    filename: "decompress-tea-blanket-sofa.jpg",
    width: 1600,
    height: 2400,
    credit: "Pexels — photo by Karola G., free Pexels License",
  },
  walkingPathAutumnPark: {
    key: "walkingPathAutumnPark",
    url: "/blog-images/walking-path-autumn-park.jpg",
    alt: "A back view of a woman walking alone down a tree-lined park path in autumn, surrounded by golden foliage",
    filename: "walking-path-autumn-park.jpg",
    width: 1600,
    height: 1997,
    credit: "Pexels — photo by Vinith Prasad, free Pexels License",
  },
  bedsideLampBookWindDown: {
    key: "bedsideLampBookWindDown",
    url: "/blog-images/bedside-lamp-book-wind-down.jpg",
    alt: "A softly lit bedside table with a lamp, an open book, a sleep mask, and a reed diffuser",
    filename: "bedside-lamp-book-wind-down.jpg",
    width: 1600,
    height: 2400,
    credit: "Pexels — photo by cottonbro studio, free Pexels License",
  },
  // Shared CTASection component (homepage, healthy-planner, library index,
  // library/[slug]) — a calm, universal "ready to get started" moment that
  // doesn't tie to any one product.
  readingCozyWindowSeat: {
    key: "readingCozyWindowSeat",
    url: "/blog-images/reading-cozy-window-seat.jpg",
    alt: "A smiling woman reading a book in a cozy window seat, soft daylight coming through the window",
    filename: "reading-cozy-window-seat.jpg",
    width: 1600,
    height: 1067,
    credit: "Pexels — photo by Gary Barnes, free Pexels License",
  },
  // Homepage "How It Works" section — pairs with the Plan step of the
  // Learn/Plan/Apply timeline.
  plannerWritingMarbleDesk: {
    key: "plannerWritingMarbleDesk",
    url: "/blog-images/planner-writing-marble-desk.jpg",
    alt: "A woman writing in a weekly planner at a marble desk, with color swatches scattered nearby",
    filename: "planner-writing-marble-desk.jpg",
    width: 1600,
    height: 2400,
    credit: "Pexels — photo by Karola G., free Pexels License",
  },
  // Homepage "What You Get" section — provided directly by the project
  // owner (not stock photography) to visually show the real ebook +
  // planner + Interactive Wellness System bundle. Features The Natural
  // Healing Handbook's real cover as a representative example; the
  // surrounding section copy and footnote make clear which products this
  // applies to, so this image is never shown as a standalone claim.
  ebookPlannerSystemPromo: {
    key: "ebookPlannerSystemPromo",
    url: "/product-images/ebook-planner-wellness-system-promo.png",
    alt: "The Natural Healing Handbook ebook cover next to a daily planner and weekly planner notebook, with a laptop showing the Interactive Wellness System dashboard, captioned Ebook, Planner, and Interactive Wellness System",
    filename: "ebook-planner-wellness-system-promo.png",
    width: 1536,
    height: 1024,
    credit: "Natural Wellness Library — original project asset",
  },
};

export function getImage(key: ImageKey): ImageAsset {
  return IMAGE_LIBRARY[key];
}
