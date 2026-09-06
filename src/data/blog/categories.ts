import { BlogCategory } from "@/lib/types";

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "healthy-habits",
    name: "Healthy Habits",
    description: "Practical strategies for building habits that actually stick.",
    icon: "Sparkles",
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    description: "Simple, realistic nutrition guidance without extreme dieting.",
    icon: "Apple",
  },
  {
    slug: "meal-planning",
    name: "Meal Planning",
    description: "Grocery lists, meal prep, and planning ahead for busy weeks.",
    icon: "UtensilsCrossed",
  },
  {
    slug: "fitness",
    name: "Fitness",
    description: "Beginner-friendly workouts and exercise guidance.",
    icon: "Dumbbell",
  },
  {
    slug: "walking-movement",
    name: "Walking & Movement",
    description: "Walking plans and simple ways to stay active every day.",
    icon: "Footprints",
  },
  {
    slug: "sleep",
    name: "Sleep",
    description: "Building a sleep routine that supports every other habit.",
    icon: "Moon",
  },
  {
    slug: "mindset",
    name: "Mindset",
    description: "Motivation, discipline, and staying consistent long-term.",
    icon: "Brain",
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    description: "Morning routines, evening routines, and everyday self-care.",
    icon: "Sunrise",
  },
];

export function getCategory(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}
