import Image from "next/image";
import { CheckCircle2, Circle } from "lucide-react";

/**
 * Entirely fictional demo data for the landing page's dashboard mockups —
 * never wired to any real order/token. Real cover images are used purely
 * for visual authenticity; no real customer progress is shown anywhere on
 * this public page.
 */
const DEMO_PRODUCTS = [
  { title: "Mental Wellness Guide", cover: "/products/02-mental-wellness/cover.png", percent: 62 },
  { title: "Sleep & Recovery Handbook", cover: "/products/06-sleep-recovery/cover.png", percent: 40 },
  { title: "Healthy Eating Guide", cover: "/products/07-healthy-eating/cover.png", percent: 85 },
];

const DEMO_CHECKLIST = [
  { label: "Read a section today", done: true },
  { label: "Used one tool from the guide", done: true },
  { label: "Checked in with how I'm feeling", done: false },
];

const DEMO_NOTE =
  "Felt calmer after the evening wind-down routine — worth repeating this week.";

type Variant = "laptop" | "phone" | "showcase";

const BADGE_SIZE: Record<Variant, string> = {
  laptop: "right-2 top-2 px-2 py-0.5 text-[7px] sm:right-3 sm:top-3 sm:text-[9px]",
  phone: "right-1.5 top-1.5 px-1.5 py-0.5 text-[5px]",
  showcase: "right-3 top-3 px-3 py-1 text-[10px] sm:right-4 sm:top-4 sm:text-xs",
};

const EYEBROW_SIZE: Record<Variant, string> = {
  laptop: "text-[8px] sm:text-[10px]",
  phone: "text-[6px]",
  showcase: "text-[11px] sm:text-sm",
};

const HEADLINE_SIZE: Record<Variant, string> = {
  laptop: "text-[11px] sm:text-sm",
  phone: "text-[8px]",
  showcase: "text-xl sm:text-2xl",
};

export default function DemoDashboardUI({ variant = "laptop" }: { variant?: Variant }) {
  const isPhone = variant === "phone";
  const isShowcase = variant === "showcase";

  return (
    <div
      className={`relative flex h-full w-full flex-col bg-ink-50 ${
        isPhone ? "p-2" : isShowcase ? "p-5 sm:p-8" : "p-3 sm:p-4"
      }`}
    >
      <span
        className={`absolute z-10 rounded-full bg-gold-400 font-bold uppercase tracking-wide text-ink-950 shadow ${BADGE_SIZE[variant]}`}
      >
        Preview
      </span>

      <p className={`font-bold uppercase tracking-wide text-brand-600 ${EYEBROW_SIZE[variant]}`}>
        My Wellness Journey
      </p>
      <p className={`mt-0.5 font-display font-bold text-ink-900 ${HEADLINE_SIZE[variant]}`}>
        Overall Progress: 64%
      </p>
      <div
        className={`mt-1.5 w-full overflow-hidden rounded-full bg-ink-900/[0.08] ${
          isPhone ? "h-1" : isShowcase ? "h-2.5" : "h-1.5"
        }`}
      >
        <div className="h-full rounded-full bg-brand-600" style={{ width: "64%" }} />
      </div>

      <div
        className={`mt-2.5 grid gap-1.5 ${
          isPhone ? "grid-cols-1" : "grid-cols-3 sm:gap-2.5"
        } ${isShowcase ? "mt-6 gap-4" : ""}`}
      >
        {(isPhone ? DEMO_PRODUCTS.slice(0, 2) : DEMO_PRODUCTS).map((p) =>
          isPhone ? (
            <div key={p.title} className="flex items-center gap-1.5 rounded-md bg-white p-1 shadow-sm">
              <div className="relative h-5 w-4 shrink-0 overflow-hidden rounded-sm">
                <Image src={p.cover} alt="" fill className="object-cover" sizes="20px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[6px] font-bold text-ink-800">{p.title}</p>
                <div className="mt-0.5 h-0.5 w-full overflow-hidden rounded-full bg-ink-900/[0.08]">
                  <div className="h-full rounded-full bg-gold-400" style={{ width: `${p.percent}%` }} />
                </div>
              </div>
            </div>
          ) : (
            <div
              key={p.title}
              className={`rounded-md bg-white shadow-sm ${isShowcase ? "rounded-xl p-3" : "p-1.5 sm:rounded-lg sm:p-2"}`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded">
                <Image src={p.cover} alt="" fill className="object-cover" sizes="140px" />
              </div>
              <p
                className={`mt-1 line-clamp-1 font-bold text-ink-800 ${
                  isShowcase ? "text-xs sm:text-sm" : "text-[6px] sm:text-[8px]"
                }`}
              >
                {p.title}
              </p>
              <div
                className={`mt-1 w-full overflow-hidden rounded-full bg-ink-900/[0.08] ${
                  isShowcase ? "h-1.5" : "h-1"
                }`}
              >
                <div className="h-full rounded-full bg-gold-400" style={{ width: `${p.percent}%` }} />
              </div>
            </div>
          )
        )}
      </div>

      <div
        className={`rounded-md bg-white shadow-sm ${
          isPhone ? "mt-2 p-1.5" : isShowcase ? "mt-6 rounded-xl p-4" : "mt-2 p-1.5 sm:mt-3 sm:rounded-lg sm:p-2.5"
        }`}
      >
        <p
          className={`font-bold uppercase tracking-wide text-ink-400 ${
            isPhone ? "text-[5px]" : isShowcase ? "text-xs" : "text-[7px] sm:text-[8px]"
          }`}
        >
          Today&apos;s Checklist
        </p>
        <div className={`mt-1 space-y-0.5 ${isShowcase ? "mt-3 space-y-2" : ""}`}>
          {DEMO_CHECKLIST.slice(0, isPhone ? 2 : 3).map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 text-ink-700 ${
                isPhone ? "text-[5px]" : isShowcase ? "text-sm" : "text-[7px] sm:text-[8px]"
              }`}
            >
              {item.done ? (
                <CheckCircle2 size={isPhone ? 6 : isShowcase ? 16 : 8} className="shrink-0 text-brand-600" />
              ) : (
                <Circle size={isPhone ? 6 : isShowcase ? 16 : 8} className="shrink-0 text-ink-300" />
              )}
              <span className="line-clamp-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {!isPhone && (
        <div
          className={`rounded-md bg-white shadow-sm ${
            isShowcase ? "mt-6 rounded-xl p-4" : "mt-2 p-1.5 sm:mt-2.5 sm:rounded-lg sm:p-2.5"
          }`}
        >
          <p
            className={`font-bold uppercase tracking-wide text-ink-400 ${
              isShowcase ? "text-xs" : "text-[7px] sm:text-[8px]"
            }`}
          >
            Personal Notes
          </p>
          <p
            className={`mt-1 italic leading-snug text-ink-500 ${
              isShowcase ? "mt-2 text-sm" : "line-clamp-2 text-[7px] sm:text-[8px]"
            }`}
          >
            &ldquo;{DEMO_NOTE}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
