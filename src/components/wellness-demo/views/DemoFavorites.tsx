"use client";

import ProductCover from "@/components/ProductCover";
import FavoriteButton from "@/components/wellness-dashboard/FavoriteButton";
import { formatDateLong } from "@/lib/wellnessDashboard";
import { PRODUCTS, BONUS_PRODUCTS } from "@/data/products";
import { DemoWellnessState } from "../useDemoWellnessState";

export default function DemoFavorites({ demo }: { demo: DemoWellnessState }) {
  const { dashboard, toggleFavorite } = demo;
  const products = [...PRODUCTS, ...BONUS_PRODUCTS];

  const favoriteGuides = products.filter((p) => dashboard.favorites.guides.includes(p.slug));
  const favoriteChecklists = dashboard.checklists.filter((c) => dashboard.favorites.checklists.includes(c.id));
  const favoriteNotes = dashboard.journal.filter((n) => dashboard.favorites.notes.includes(n.id));
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
                      <FavoriteButton active onToggle={() => toggleFavorite("guides", product.slug)} />
                    </div>
                  </div>
                  <p className="p-2.5 text-center text-xs font-bold text-ink-800">{product.categoryLabel}</p>
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
                <div key={note.id} className="card p-4">
                  <p className="text-xs text-ink-400">{formatDateLong(new Date(note.createdAt))}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-700">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
