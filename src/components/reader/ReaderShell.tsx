import Link from "next/link";
import { ReactNode } from "react";

export default function ReaderShell({ token, children }: { token: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-50">
      <header className="border-b border-ink-900/10 bg-white">
        <div className="container-page flex items-center justify-between gap-3 py-4">
          <Link href={`/reader/${token}`} className="flex min-w-0 shrink items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink-950 font-display text-sm font-black text-white">
              N
            </span>
            <span className="truncate font-display text-sm font-bold text-ink-900">HealthyGuide Reader</span>
          </Link>
          <Link
            href={`/access/${token}`}
            className="shrink-0 text-xs font-semibold text-ink-500 hover:text-brand-700"
          >
            <span className="hidden sm:inline">Back to My Purchases</span>
            <span className="sm:hidden">My Purchases</span>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
