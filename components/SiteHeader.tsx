"use client";

import { useEffect, useRef, useState } from "react";
import { BookLineButton } from "./BookingCta";

const NAV = [
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "#villas", label: "พูลวิลล่า" },
  { href: "#pool", label: "สระว่ายน้ำ" },
  { href: "#pricing", label: "ราคา" },
  { href: "#gallery", label: "แกลลอรี่" },
  { href: "#location", label: "ที่ตั้ง" },
];

/**
 * Header — จอ ≥lg: เมนูแนวนอน + ปุ่ม LINE (เหมือนเดิมทุกอย่าง)
 * จอ <lg: ปุ่ม hamburger เปิด panel เมนู (NAV ครบ + ปุ่มจอง)
 *  - ล็อก scroll ตอนเปิด · ปิดเมื่อกดลิงก์/ปุ่ม X/กดนอก panel/กด ESC/ย่อจอกลับ ≥lg
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // ขยายจอกลับ ≥lg — panel ถูก lg:hidden ซ่อน แต่ scroll ต้องปลดด้วย
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

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
        <div className="hidden lg:block">
          <BookLineButton size="md" />
        </div>
        <button
          type="button"
          ref={buttonRef}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition hover:bg-sand lg:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="border-t border-beige bg-white shadow-lg lg:hidden"
        >
          <nav aria-label="เมนูมือถือ" className="mx-auto max-w-6xl px-4 py-4 md:px-6">
            <ul className="grid gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-stone-700 transition hover:bg-sand hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-beige pt-4">
              <BookLineButton size="lg" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
