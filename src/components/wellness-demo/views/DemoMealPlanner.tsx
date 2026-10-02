"use client";

import { useState } from "react";
import { Check, Plus, ShoppingCart, Trash2 } from "lucide-react";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";
import { formatDateLong, formatTime12h, todayISO } from "@/lib/mealPlanner";
import { DemoWellnessState } from "../useDemoWellnessState";

const TABS = [
  { key: "today", label: "Today" },
  { key: "week", label: "Weekly Plan" },
  { key: "grocery", label: "Grocery List" },
  { key: "prep", label: "Prep Ahead" },
  { key: "progress", label: "30-Day Progress" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function TodayTab({ demo }: { demo: DemoWellnessState }) {
  const { meals, mealStats, setMealName, toggleMealStatus } = demo;
  const today = todayISO();
  const dayMeals = meals.mealsByDate[today] ?? {};
  const slots = [...meals.scheduleSlots].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Today&apos;s Meal Plan</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{formatDateLong(today)}</h2>
          <p className="mt-2 text-ink-500">
            {mealStats.completedToday} of {mealStats.totalToday} meals completed today.
          </p>
        </div>
        <ProgressRing percent={mealStats.dailyPercent} size={84} label="Today" />
      </div>

      <div className="mt-8 space-y-3">
        {slots.map((slot) => {
          const entry = dayMeals[slot.id];
          const completed = entry?.status === "completed";
          return (
            <div key={slot.id} className="card flex items-center gap-4 p-4 sm:p-5">
              <div className="w-20 shrink-0 text-sm font-bold text-ink-700">{formatTime12h(slot.time)}</div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{slot.label}</p>
                <input
                  value={entry?.mealName ?? ""}
                  onChange={(e) => setMealName(today, slot.id, e.target.value)}
                  placeholder="Add meal..."
                  className={`mt-1 w-full border-b border-dashed border-ink-900/15 bg-transparent py-1 text-sm focus:border-brand-500 focus:outline-none ${
                    completed ? "text-ink-400 line-through" : "text-ink-800"
                  }`}
                />
              </div>
              <button
                type="button"
                onClick={() => toggleMealStatus(today, slot.id)}
                aria-label={completed ? "Mark as planned" : "Mark as completed"}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  completed ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 text-transparent"
                }`}
              >
                <Check size={16} strokeWidth={3} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekTab({ demo }: { demo: DemoWellnessState }) {
  const { meals, week, updateSlotTime } = demo;
  const slots = [...meals.scheduleSlots].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div>
      <span className="eyebrow">Your Routine</span>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Weekly Plan</h2>
      <p className="mt-2 text-ink-500">Edit any meal time — it updates instantly.</p>

      <div className="mt-6 card p-6">
        <h3 className="font-display text-base font-bold text-ink-900">Meal Times</h3>
        <div className="mt-4 space-y-2">
          {slots.map((slot) => (
            <div key={slot.id} className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5">
              <span className="flex-1 text-sm font-semibold text-ink-700">{slot.label}</span>
              <input
                type="time"
                value={slot.time}
                onChange={(e) => updateSlotTime(slot.id, e.target.value)}
                className="rounded-lg border border-ink-900/15 bg-white px-2.5 py-1.5 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="grid min-w-[700px] grid-cols-7 gap-3">
          {week.map((date) => {
            const dayMeals = meals.mealsByDate[date] ?? {};
            const isToday = date === todayISO();
            return (
              <div key={date} className={`card p-3.5 ${isToday ? "border-brand-400 bg-brand-50/40" : ""}`}>
                <p className="text-xs font-bold text-ink-700">{formatDateLong(date).split(",")[0]}</p>
                <div className="mt-2 space-y-1.5">
                  {slots.map((slot) => {
                    const entry = dayMeals[slot.id];
                    return (
                      <div key={slot.id} className="text-[11px]">
                        <span className="font-semibold text-ink-500">{formatTime12h(slot.time)}</span>{" "}
                        <span className={entry?.status === "completed" ? "text-ink-400 line-through" : "text-ink-700"}>
                          {entry?.mealName || "—"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ListTab({
  demo,
  list,
  title,
  description,
  placeholder,
}: {
  demo: DemoWellnessState;
  list: "groceryList" | "prepList";
  title: string;
  description: string;
  placeholder: string;
}) {
  const { meals, toggleListItem, addListItem, deleteListItem } = demo;
  const [draft, setDraft] = useState("");
  const items = meals[list];

  return (
    <div>
      <span className="eyebrow">{list === "groceryList" ? "Shopping" : "Get Ahead"}</span>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{title}</h2>
      <p className="mt-2 text-ink-500">{description}</p>

      <div className="mt-6 card p-6">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 ${
                item.done ? "border-brand-300 bg-brand-50" : "border-ink-900/10 bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleListItem(list, item.id)}
                aria-label={item.done ? `Mark "${item.label}" as not done` : `Mark "${item.label}" as done`}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                  item.done ? "border-brand-600 bg-brand-600" : "border-ink-300"
                }`}
              />
              <span className={`flex-1 text-sm ${item.done ? "text-ink-500 line-through" : "text-ink-800"}`}>{item.label}</span>
              <button
                type="button"
                onClick={() => deleteListItem(list, item.id)}
                aria-label={`Delete "${item.label}"`}
                className="flex h-6 w-6 items-center justify-center rounded text-ink-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && draft.trim()) {
                addListItem(list, draft);
                setDraft("");
              }
            }}
            placeholder={placeholder}
            className="flex-1 rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              if (!draft.trim()) return;
              addListItem(list, draft);
              setDraft("");
            }}
            disabled={!draft.trim()}
            aria-label="Add item"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-950 text-white disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressTab({ demo }: { demo: DemoWellnessState }) {
  const { mealStats } = demo;

  return (
    <div>
      <span className="eyebrow">Progress</span>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink-900 sm:text-3xl">30-Day Tracking</h2>
      <p className="mt-2 text-ink-500">How consistently you&apos;ve followed your planned meals.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card flex items-center gap-4 p-5">
          <ProgressRing percent={mealStats.dailyPercent} size={56} />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Today</p>
            <p className="text-sm text-ink-600">
              {mealStats.completedToday}/{mealStats.totalToday} meals
            </p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
            <ShoppingCart size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Current Streak</p>
            <p className="text-lg font-bold text-ink-900">{mealStats.currentStreak} days</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Check size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Best Streak</p>
            <p className="text-lg font-bold text-ink-900">{mealStats.longestStreak} days</p>
          </div>
        </div>
      </div>

      <div className="mt-6 card p-6">
        <h3 className="font-display text-base font-bold text-ink-900">Last 30 Days</h3>
        <div className="mt-5 flex items-end gap-[3px]">
          {mealStats.last30.map((d) => (
            <div
              key={d.date}
              className={`flex-1 rounded-sm ${d.percent > 0 ? "bg-brand-600" : "bg-ink-900/[0.06]"}`}
              style={{ height: Math.max(4, (d.percent / 100) * 56) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DemoMealPlanner({ demo }: { demo: DemoWellnessState }) {
  const [tab, setTab] = useState<TabKey>("today");

  return (
    <div>
      <div className="sticky top-0 z-20 overflow-x-auto border-b border-ink-900/10 bg-cream/95 backdrop-blur">
        <div className="container-page flex gap-1 py-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
                tab === t.key ? "bg-ink-950 text-white" : "text-ink-500 hover:bg-ink-900/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="section-pad !pt-8">
        <div className="container-page">
          {tab === "today" && <TodayTab demo={demo} />}
          {tab === "week" && <WeekTab demo={demo} />}
          {tab === "grocery" && (
            <ListTab
              demo={demo}
              list="groceryList"
              title="Grocery List"
              description="Keep track of what to pick up for the meals you've planned."
              placeholder="Add an item..."
            />
          )}
          {tab === "prep" && (
            <ListTab
              demo={demo}
              list="prepList"
              title="Prep Ahead"
              description="Small tasks you can do today to make tomorrow's meals easier."
              placeholder="Add a prep task..."
            />
          )}
          {tab === "progress" && <ProgressTab demo={demo} />}
        </div>
      </div>
    </div>
  );
}
