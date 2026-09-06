export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div
      className={`mx-auto max-w-2xl ${align === "center" ? "text-center" : "text-left mx-0"}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${dark ? "bg-white/10 text-gold-300" : ""}`}>{eyebrow}</span>
      )}
      <h2
        className={`mt-4 font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-balance text-base leading-relaxed sm:text-lg ${
            dark ? "text-ink-300" : "text-ink-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
