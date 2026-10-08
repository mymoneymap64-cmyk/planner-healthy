import { getKv, withLock } from "@/lib/kv";
import { DigitalDetoxState, DETOX_DAYS, emptyDigitalDetoxState } from "@/lib/digitalDetox";

function key(token: string): string {
  return `wellness-digital-detox:${token}`;
}

function lockKey(token: string): string {
  return `lock:wellness-digital-detox:${token}`;
}

export async function getDigitalDetoxState(token: string): Promise<DigitalDetoxState> {
  const stored = await getKv().get<DigitalDetoxState>(key(token));
  return stored ?? emptyDigitalDetoxState();
}

async function save(token: string, state: DigitalDetoxState): Promise<DigitalDetoxState> {
  const next = { ...state, updatedAt: new Date().toISOString() };
  await getKv().set(key(token), next);
  return next;
}

const VALID_DAYS = DETOX_DAYS.map((d) => d.day);

export async function toggleDetoxDay(token: string, day: number): Promise<DigitalDetoxState> {
  return withLock(lockKey(token), async () => {
    if (!VALID_DAYS.includes(day)) throw new Error("Unknown challenge day.");
    const state = await getDigitalDetoxState(token);
    const completedDays = state.completedDays.includes(day)
      ? state.completedDays.filter((d) => d !== day)
      : [...state.completedDays, day];
    return save(token, { ...state, completedDays });
  });
}

export async function resetDigitalDetox(token: string): Promise<DigitalDetoxState> {
  return withLock(lockKey(token), async () => {
    return save(token, emptyDigitalDetoxState());
  });
}
