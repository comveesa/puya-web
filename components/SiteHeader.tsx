import { BUSINESS } from "@/lib/business";
import { BookLineButton } from "./BookingCta";

const NAV = [
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "#villas", label: "วิลล่า" },
  { href: "#pool", label: "สระว่ายน้ำ" },
  { href: "#pricing", label: "ราคา" },
  { href: "#gallery", label: "แกลเลอรี" },
  { href: "#location", label: "ที่ตั้ง" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur-md ring-1 ring-black/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#home" className="text-lg font-bold tracking-wide text-ink">
          PUYA <span className="font-medium text-stone-500">Beach Villa</span>
        </a>
        <nav aria-label="เมนูหลัก" className="hidden gap-7 text-sm text-stone-600 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="font-medium transition hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <BookLineButton size="md" />
        </div>
        <a
          href="#pricing"
          className="rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-ink md:hidden"
        >
          ดูราคา
        </a>
      </div>
    </header>
  );
}
