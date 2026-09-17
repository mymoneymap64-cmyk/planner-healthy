"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import ProductCover from "@/components/ProductCover";
import FavoriteButton from "@/components/wellness-dashboard/FavoriteButton";
import { formatDateLong } from "@/lib/wellnessDashboard";

export default function FavoritesPageClient({ token, products }: { token: string; products: Product[] }) {
  const { state, loaded, dispatch } = useWellnessDashboard(token);

  if (!loaded || !state) {
    return <div className="section-pad text-center text-sm text-ink-400">Loading your favorites...</div>;
  }

  const favoriteGuides = products.filter((p) => state.favorites.guides.includes(p.slug));
  const favoriteChecklists = state.checklists.filter((c) => state.favorites.checklists.includes(c.id));
  const favoriteNotes = state.journal.filter((n) => state.favorites.notes.includes(n.id));

  const nothingYet = favoriteGuides.length + favoriteChecklists.length + favoriteNotes.length === 0;

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <span className="eyebrow">Saved For You</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Favorites</h1>
        <p className="mt-2 text-ink-500">Guides, checklists, and notes you&apos;ve marked as favorites.</p>

        {nothingYet && (
          <p className="mt-10 text-sm text-ink-400">
            Nothing saved yet — tap the heart icon on any guide, checklist, or note to add it here.
          </p>
        )}

        {favoriteGuides.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-bold text-ink-900">Guides</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {favoriteGuides.map((product) => (
                <div key={product.slug} className="overflow-hidden rounded-xl border border-ink-900/10 bg-white">
                  <div className="relative">
                    <ProductCover product={product} className="aspect-[3/4] w-full" />
                    <div className="absolute right-2 top-2">
                      <FavoriteButton
                        active
                        onToggle={() => dispatch({ type: "toggleFavorite", kind: "guides", id: product.slug })}
                      />
                    </div>
                  </div>
                  <Link
                    href={`/wellness/${token}/${product.slug}`}
                    className="block p-2.5 text-center text-xs font-bold text-ink-800 hover:text-brand-700"
                  >
                    {product.categoryLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {favoriteChecklists.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-bold text-ink-900">Checklists</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteChecklists.map((checklist) => {
                const completed = checklist.items.filter((i) => i.done).length;
                return (
                  <div key={checklist.id} className="card flex items-center justify-between p-4">
                    <div>
                      <p className="font-display text-sm font-bold text-ink-900">{checklist.title}</p>
                      <p className="text-xs text-ink-500">
                        {completed} of {checklist.items.length} completed
                      </p>
                    </div>
                    <Link
                      href={`/wellness/${token}/checklists/${checklist.id}`}
                      className="text-xs font-bold text-brand-700 hover:underline"
                    >
                      Open
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {favoriteNotes.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-bold text-ink-900">Notes</h2>
            <div className="mt-4 space-y-3">
              {favoriteNotes.map((note) => (
                <Link
                  key={note.id}
                  href={`/wellness/${token}/notes`}
                  className="card block p-4 hover:border-brand-300"
                >
                  <p className="text-xs text-ink-400">{formatDateLong(new Date(note.createdAt))}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-700">{note.body}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
