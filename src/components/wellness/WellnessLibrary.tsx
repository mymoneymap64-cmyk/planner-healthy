import WellnessProductCard, { WellnessLibraryEntry } from "@/components/wellness/WellnessProductCard";

export default function WellnessLibrary({ token, entries }: { token: string; entries: WellnessLibraryEntry[] }) {
  return (
    <div className="section-pad">
      <div className="container-page">
        <span className="eyebrow">Your Wellness Journey</span>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl">My Wellness Library</h1>
        <p className="mt-2 max-w-xl text-ink-600">
          Open any guide below to read, plan, and track your own progress in one place.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <WellnessProductCard key={entry.product.slug} token={token} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
