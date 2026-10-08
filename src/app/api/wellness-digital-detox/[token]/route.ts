import { NextRequest, NextResponse } from "next/server";
import { requireOrder } from "@/lib/readerAuth";
import { computeDetoxStats } from "@/lib/digitalDetox";
import { getDigitalDetoxState, toggleDetoxDay, resetDigitalDetox } from "@/lib/digitalDetoxStore";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const state = await getDigitalDetoxState(token);
    return NextResponse.json({ state, stats: computeDetoxStats(state) });
  } catch (error) {
    console.error("Failed to load digital detox state:", error);
    return NextResponse.json({ error: "Could not load data." }, { status: 500 });
  }
}

type Action = { type: "toggleDay"; day: number } | { type: "reset" };

function isValidDay(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 7;
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  let action: unknown;
  try {
    action = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!action || typeof action !== "object" || typeof (action as { type?: unknown }).type !== "string") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const a = action as Action;

  try {
    let state;
    switch (a.type) {
      case "toggleDay":
        if (!isValidDay(a.day)) return NextResponse.json({ error: "Invalid action payload." }, { status: 400 });
        state = await toggleDetoxDay(token, a.day);
        break;
      case "reset":
        state = await resetDigitalDetox(token);
        break;
      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    return NextResponse.json({ state, stats: computeDetoxStats(state) });
  } catch (error) {
    console.error("Failed to update digital detox state:", error);
    const message = error instanceof Error ? error.message : "Could not save data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
