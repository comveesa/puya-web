/** หัวเรื่องของแต่ละ section — ใช้ซ้ำได้ทั้งพื้นสว่าง/มืด (eyebrow เส้นบางตาม mockup B) */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  tone = "light",
  reveal = false,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** ใส่ data-reveal ให้ block นี้ fade-up ตอนเลื่อนเข้าจอ (เปิดเฉพาะที่ ScrollReveal ใช้งาน) */
  reveal?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl";
  return (
    <div className={alignCls} {...(reveal ? { "data-reveal": true } : {})}>
      <p
        className={`flex items-center gap-3.5 text-xs font-semibold uppercase tracking-[0.28em] ${
          align === "center" ? "justify-center" : ""
        } ${tone === "dark" ? "text-sand/70" : "text-stone-600"}`}
      >
        <span aria-hidden className="h-px w-11 shrink-0 bg-current opacity-60" />
        {eyebrow}
        <span aria-hidden className="h-px w-11 shrink-0 bg-current opacity-60" />
      </p>
      <h2
        className={`mt-4 text-4xl font-semibold leading-snug md:text-5xl ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {desc ? (
        <p className={`mt-4 leading-relaxed ${tone === "dark" ? "text-sand/80" : "text-stone-600"}`}>
          {desc}
        </p>
      ) : null}
    </div>
  );
}
