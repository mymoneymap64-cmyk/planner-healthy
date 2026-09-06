import Image from "next/image";

// Real pages rendered from the actual Mental Wellness planner PDF — the
// same structure (cover + daily page + habit tracker + weekly reflection)
// every planner in the library ships with. Percentages are tuned the same
// way as the homepage hero stack: each piece's full box, including its
// rotation overhang, stays safely inside the container.
const PAGES = [
  { src: "/mockups/planner/daily.png", alt: "Daily planning page from the included planner", className: "left-[6%] top-[2%] w-[40%] rotate-[-7deg] z-10", ratio: 1347 / 522 },
  { src: "/mockups/planner/habit.png", alt: "Habit tracker page from the included planner", className: "left-[48%] top-[6%] w-[38%] rotate-[5deg] z-20", ratio: 1347 / 418 },
  { src: "/mockups/planner/reflection.png", alt: "Weekly reflection page from the included planner", className: "left-[26%] top-0 w-[40%] rotate-[-2deg] z-[15]", ratio: 1347 / 418 },
];

export default function PlannerMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="pt-[90%]" />
      <div className="absolute inset-0">
        {PAGES.map((p) => (
          <div
            key={p.src}
            className={`absolute overflow-hidden rounded-lg border border-ink-900/10 bg-white shadow-lift ${p.className}`}
            style={{ aspectRatio: p.ratio }}
          >
            <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="200px" />
          </div>
        ))}

        <div
          className="absolute left-[18%] top-[34%] z-30 w-[62%] overflow-hidden rounded-lg border border-ink-900/10 bg-white shadow-lift"
          style={{ aspectRatio: 1347 / 820 }}
        >
          <Image
            src="/mockups/planner/cover.png"
            alt="Cover of the included wellness planner"
            fill
            className="object-cover"
            sizes="220px"
          />
        </div>
      </div>
    </div>
  );
}
