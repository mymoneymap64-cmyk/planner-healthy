import { BlogManifestEntry } from "@/lib/types";

/**
 * MASTER LIST — surviving blog articles (44 of the original 50; 6 articles
 * built entirely around the retired 21-Day Transformation product have been
 * unpublished — see article-01/39/40/48/49/50 removal in project history).
 *
 * This is the single source of truth for article number, title, slug,
 * category, and assigned image. Every article data file
 * (src/data/blog/articles/article-NN.ts) must match its entry here
 * exactly on `number`, `slug`, and `category`.
 *
 * Internal link targets used across the blog (use these exact paths):
 *   /library         – the full ebook library grid
 *   /library/[slug]  – an individual product page
 *   /faq             – Frequently Asked Questions
 *   /checkout        – purchase the complete library bundle
 *   /blog/[slug] of any other article below – for related-article cross-links
 */
export const BLOG_MANIFEST: BlogManifestEntry[] = [
  { number: 2, title: "How to Build Healthy Habits That Actually Last", slug: "how-to-build-healthy-habits-that-actually-last", category: "healthy-habits", imageKey: "healthyHabits" },
  { number: 3, title: "21 Simple Healthy Habits to Try", slug: "21-simple-healthy-habits-to-try", category: "healthy-habits", imageKey: "healthyHabits" },
  { number: 4, title: "How to Create a Healthy Morning Routine", slug: "how-to-create-a-healthy-morning-routine", category: "lifestyle", imageKey: "morningRoutine" },
  { number: 5, title: "How to Build a Healthy Evening Routine", slug: "how-to-build-a-healthy-evening-routine", category: "lifestyle", imageKey: "sleepAlt" },
  { number: 6, title: "How Much Water Should You Drink Every Day?", slug: "how-much-water-should-you-drink-every-day", category: "nutrition", imageKey: "hydration" },
  { number: 7, title: "Easy Ways to Drink More Water", slug: "easy-ways-to-drink-more-water", category: "nutrition", imageKey: "hydration" },
  { number: 8, title: "Healthy Meal Planning for Beginners", slug: "healthy-meal-planning-for-beginners", category: "meal-planning", imageKey: "mealPrep" },
  { number: 9, title: "How to Meal Prep for a Busy Week", slug: "how-to-meal-prep-for-a-busy-week", category: "meal-planning", imageKey: "mealPrepAlt" },
  { number: 10, title: "Easy Healthy Meals for Busy People", slug: "easy-healthy-meals-for-busy-people", category: "meal-planning", imageKey: "healthyMealsAlt" },
  { number: 11, title: "Healthy Breakfast Ideas for Busy Mornings", slug: "healthy-breakfast-ideas-for-busy-mornings", category: "nutrition", imageKey: "breakfast" },
  { number: 12, title: "Healthy Lunch Ideas for Beginners", slug: "healthy-lunch-ideas-for-beginners", category: "nutrition", imageKey: "healthyMeals" },
  { number: 13, title: "Healthy Dinner Ideas for a Simple Lifestyle", slug: "healthy-dinner-ideas-for-a-simple-lifestyle", category: "nutrition", imageKey: "healthyMealsAlt" },
  { number: 14, title: "Easy Healthy Snacks to Keep at Home", slug: "easy-healthy-snacks-to-keep-at-home", category: "nutrition", imageKey: "healthyMeals" },
  { number: 15, title: "How to Build a Balanced Plate", slug: "how-to-build-a-balanced-plate", category: "nutrition", imageKey: "healthyMealsAlt" },
  { number: 16, title: "Simple Grocery Shopping Tips for Healthy Eating", slug: "simple-grocery-shopping-tips-for-healthy-eating", category: "meal-planning", imageKey: "mealPrepAlt" },
  { number: 17, title: "Healthy Grocery List for Beginners", slug: "healthy-grocery-list-for-beginners", category: "meal-planning", imageKey: "mealPrep" },
  { number: 18, title: "How to Stop Skipping Breakfast", slug: "how-to-stop-skipping-breakfast", category: "nutrition", imageKey: "breakfast" },
  { number: 19, title: "How to Make Healthy Eating Easier", slug: "how-to-make-healthy-eating-easier", category: "nutrition", imageKey: "healthyLifestyleAlt" },
  { number: 20, title: "Simple Ways to Reduce Processed Foods", slug: "simple-ways-to-reduce-processed-foods", category: "nutrition", imageKey: "healthyLifestyle" },
  { number: 21, title: "Beginner Walking Plan for Better Fitness", slug: "beginner-walking-plan-for-better-fitness", category: "walking-movement", imageKey: "walking" },
  { number: 22, title: "How to Start Exercising When You Are Out of Shape", slug: "how-to-start-exercising-when-you-are-out-of-shape", category: "fitness", imageKey: "workouts" },
  { number: 23, title: "Easy Beginner Exercises You Can Do at Home", slug: "easy-beginner-exercises-you-can-do-at-home", category: "fitness", imageKey: "workouts" },
  { number: 24, title: "Walking vs Running for Beginners", slug: "walking-vs-running-for-beginners", category: "walking-movement", imageKey: "walkingAlt" },
  { number: 25, title: "How to Build a Consistent Workout Routine", slug: "how-to-build-a-consistent-workout-routine", category: "fitness", imageKey: "workoutsAlt" },
  { number: 26, title: "How Many Days a Week Should Beginners Exercise?", slug: "how-many-days-a-week-should-beginners-exercise", category: "fitness", imageKey: "workouts" },
  { number: 27, title: "Simple Stretching Routine for Beginners", slug: "simple-stretching-routine-for-beginners", category: "fitness", imageKey: "workoutsAlt" },
  { number: 28, title: "How to Stay Active During a Busy Day", slug: "how-to-stay-active-during-a-busy-day", category: "walking-movement", imageKey: "walking" },
  { number: 29, title: "How Sleep Affects Your Daily Routine", slug: "how-sleep-affects-your-daily-routine", category: "sleep", imageKey: "sleep" },
  { number: 30, title: "How to Create a Better Sleep Routine", slug: "how-to-create-a-better-sleep-routine", category: "sleep", imageKey: "sleepAlt" },
  { number: 31, title: "Simple Ways to Improve Your Sleep Habits", slug: "simple-ways-to-improve-your-sleep-habits", category: "sleep", imageKey: "sleep" },
  { number: 32, title: "Why Consistency Matters More Than Motivation", slug: "why-consistency-matters-more-than-motivation", category: "mindset", imageKey: "motivation" },
  { number: 33, title: "How to Stay Motivated When You Want to Quit", slug: "how-to-stay-motivated-when-you-want-to-quit", category: "mindset", imageKey: "motivationAlt" },
  { number: 34, title: "How to Get Back on Track After a Bad Day", slug: "how-to-get-back-on-track-after-a-bad-day", category: "mindset", imageKey: "motivation" },
  { number: 35, title: "How to Build Discipline Without Overcomplicating Your Life", slug: "how-to-build-discipline-without-overcomplicating-your-life", category: "mindset", imageKey: "healthyHabits" },
  { number: 36, title: "How to Set Realistic Health Goals", slug: "how-to-set-realistic-health-goals", category: "mindset", imageKey: "motivationAlt" },
  { number: 37, title: "How to Track Your Progress Without Obsessing Over Results", slug: "how-to-track-progress-without-obsessing-over-results", category: "mindset", imageKey: "healthyHabits" },
  { number: 38, title: "How to Create a Sustainable Healthy Lifestyle", slug: "how-to-create-a-sustainable-healthy-lifestyle", category: "lifestyle", imageKey: "healthyLifestyle" },
  { number: 41, title: "Healthy Habits for People With Busy Schedules", slug: "healthy-habits-for-people-with-busy-schedules", category: "healthy-habits", imageKey: "morningRoutineAlt" },
  { number: 42, title: "Simple Self-Care Habits for Everyday Life", slug: "simple-self-care-habits-for-everyday-life", category: "lifestyle", imageKey: "sleepAlt" },
  { number: 43, title: "How to Create a Weekly Wellness Routine", slug: "how-to-create-a-weekly-wellness-routine", category: "lifestyle", imageKey: "healthyLifestyleAlt" },
  { number: 44, title: "How to Prepare for a Healthy Week", slug: "how-to-prepare-for-a-healthy-week", category: "meal-planning", imageKey: "mealPrep" },
  { number: 45, title: "Sunday Reset Routine for a Healthier Week", slug: "sunday-reset-routine-for-a-healthier-week", category: "lifestyle", imageKey: "morningRoutineAlt" },
  { number: 46, title: "Healthy Lifestyle Mistakes Beginners Should Avoid", slug: "healthy-lifestyle-mistakes-beginners-should-avoid", category: "lifestyle", imageKey: "healthyLifestyle" },
  { number: 47, title: "How to Make Healthy Habits Easier to Follow", slug: "how-to-make-healthy-habits-easier-to-follow", category: "healthy-habits", imageKey: "healthyHabits" },
];

export function getManifestEntry(slug: string) {
  return BLOG_MANIFEST.find((m) => m.slug === slug);
}
