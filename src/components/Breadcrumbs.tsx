import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({
  items,
  dark = false,
}: {
  items: { name: string; href: string }[];
  dark?: boolean;
}) {
  const base = dark ? "text-ink-400" : "text-ink-500";
  const chevron = dark ? "text-ink-600" : "text-ink-300";
  const hover = dark ? "hover:text-gold-300" : "hover:text-brand-700";
  const current = dark ? "text-white" : "text-ink-700";

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className={`flex flex-wrap items-center gap-1.5 ${base}`}>
        <li className="flex items-center gap-1.5">
          <Link href="/" className={`flex items-center gap-1 ${hover}`}>
            <Home size={13} />
            Home
          </Link>
          <ChevronRight size={13} className={chevron} />
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span className={`max-w-[55vw] truncate font-medium sm:max-w-none ${current}`} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={hover}>
                    {item.name}
                  </Link>
                  <ChevronRight size={13} className={chevron} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
