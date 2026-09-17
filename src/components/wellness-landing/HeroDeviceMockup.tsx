import DemoDashboardUI from "@/components/wellness-landing/DemoDashboardUI";

/**
 * Laptop + phone composite, built the same way LibraryHeroStack/PlannerMockup
 * are — a padding-based aspect spacer plus percentage-positioned children —
 * so it scales fluidly at any width instead of relying on fixed pixels.
 */
export default function HeroDeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg animate-scaleIn">
      <div className="pt-[76%]" />
      <div className="absolute inset-0">
        {/* Laptop */}
        <div className="absolute left-0 top-0 w-[84%] transition-transform duration-500 hover:-translate-y-1">
          <div className="overflow-hidden rounded-t-lg border-[3px] border-b-0 border-ink-800 bg-ink-950 shadow-lift sm:rounded-t-xl sm:border-[5px]">
            <div className="flex items-center gap-1 bg-ink-900 px-2 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </div>
            <div className="aspect-[16/10] w-full overflow-hidden">
              <DemoDashboardUI variant="laptop" />
            </div>
          </div>
          <div className="h-[3.5%] w-full rounded-b-md bg-ink-800 sm:rounded-b-lg" />
          <div className="mx-auto h-[2%] w-[36%] rounded-b-md bg-ink-700" />
        </div>

        {/* Phone, overlapping bottom-right */}
        <div className="absolute bottom-0 right-0 w-[28%] transition-transform duration-500 hover:-translate-y-1 sm:w-[25%]">
          <div className="overflow-hidden rounded-[1rem] border-[3px] border-ink-800 bg-ink-950 shadow-lift sm:rounded-[1.35rem] sm:border-[5px]">
            <div className="aspect-[9/19] w-full overflow-hidden">
              <DemoDashboardUI variant="phone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
