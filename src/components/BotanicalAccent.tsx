/**
 * A single lightweight, hand-drawn botanical branch — purely decorative,
 * used sparingly in section corners to echo the brand's natural-wellness
 * tone. Always `pointer-events-none` and `aria-hidden` so it never sits
 * above or interferes with real text, links or buttons.
 */
export default function BotanicalAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
    >
      <path
        d="M10 190C40 150 50 100 30 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30 120C50 110 65 95 68 75"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="68" rx="22" ry="11" transform="rotate(-35 78 68)" fill="currentColor" />
      <path
        d="M22 85C42 80 58 68 63 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="70" cy="44" rx="20" ry="10" transform="rotate(-25 70 44)" fill="currentColor" />
      <path
        d="M16 150C36 145 50 133 55 115"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="62" cy="110" rx="19" ry="9.5" transform="rotate(-30 62 110)" fill="currentColor" />
    </svg>
  );
}
