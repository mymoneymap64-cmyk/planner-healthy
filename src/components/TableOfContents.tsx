import { List } from "lucide-react";
import { BlogSection } from "@/lib/types";
import { slugifyHeading } from "@/lib/blog";

export default function TableOfContents({ sections }: { sections: BlogSection[] }) {
  const top = sections.filter((s) => s.level === 2);
  if (top.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="card p-5 sm:p-6">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-400">
        <List size={15} /> In this article
      </p>
      <ol className="mt-3 space-y-2">
        {top.map((s) => (
          <li key={s.heading}>
            <a
              href={`#${slugifyHeading(s.heading)}`}
              className="text-sm font-medium text-ink-600 hover:text-brand-700"
            >
              {s.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
