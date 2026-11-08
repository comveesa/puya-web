/** หัวเรื่องของแต่ละ section — ใช้ซ้ำได้ทั้งพื้นสว่าง/มืด */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const alignCls = align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl";
  return (
    <div className={align === "center" ? alignCls : alignCls /* left จัดซ้ายเอง */}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.22em] ${
          tone === "dark" ? "text-sand/70" : "text-stone-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-3xl font-semibold leading-snug md:text-4xl ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {desc ? (
        <p className={`mt-3 leading-relaxed ${tone === "dark" ? "text-sand/80" : "text-stone-600"}`}>
          {desc}
        </p>
      ) : null}
    </div>
  );
}
