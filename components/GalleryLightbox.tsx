"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type GalleryCategory = "pool" | "bedroom" | "interior" | "seaview";

type GalleryItem = { src: string; alt: string; category: GalleryCategory };

export const CATEGORY_LABEL: Record<GalleryCategory | "all", string> = {
  all: "ทั้งหมด",
  pool: "สระ & สไลเดอร์",
  bedroom: "ห้องนอน",
  interior: "ครัว & ภายใน",
  seaview: "วิวทะเล & บรรยากาศ",
};

const FILTERS: Array<GalleryCategory | "all"> = ["all", "pool", "bedroom", "interior", "seaview"];

/** รับทั้ง array ปกติและ readonly (BUSINESS.gallery เป็น as const) */
function toMutable(images: readonly GalleryItem[]): GalleryItem[] {
  return images.map((img) => ({ src: img.src, alt: img.alt, category: img.category }));
}

/**
 * แกลลอรี่ + Lightbox Premium Minimal (แบบ collage ตาม mockup B)
 * - ปุ่มหมวดกรองรูป (ทั้งหมด/สระ/ห้องนอน/ภายใน/วิวทะเล) — lightbox เลื่อนเฉพาะชุดที่กรองอยู่
 * - Grid collage: รูปแรกของชุด span 2×2 พร้อม caption มุมล่าง (alt ยังเป็น aria)
 * - คลิก thumbnail → เปิดภาพใหญ่กลางจอ (พื้นดำโปร่ง) · ปิด (X) · ลูกศร · นับลำดับ · caption
 * - Keyboard ← → ESC · Swipe ซ้าย/ขวาบนมือถือ · คลิกพื้นนอกภาพปิด
 * - ล็อก scroll ขณะเปิด · ARIA dialog + จัดการ focus · preload ภาพก่อน–หลัง
 */
export function GalleryLightbox({ images }: { images: readonly GalleryItem[] }) {
  const gallery = useMemo(() => toMutable(images), [images]);
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)),
    [gallery, filter],
  );
  const count = filtered.length;

  const applyFilter = (f: GalleryCategory | "all") => {
    setFilter(f);
    setIndex(null); // กัน index ค้างจากชุดเดิม (เช่นตอน animation ปิดยังไม่จบ)
    setShow(false);
  };

  const step = useCallback(
    (d: 1 | -1) => setIndex((v) => (v === null ? null : (v + d + count) % count)),
    [count],
  );
  const open = (i: number) => {
    setIndex(i);
    setShow(true);
  };
  const close = () => setShow(false);

  const isOpen = index !== null;
  const img = index !== null ? filtered[index] : null;

  /* Keyboard: ESC ปิด · ← → เลื่อนภาพ */
  useEffect(() => {
    if (!isOpen || !show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, show, step]);

  /* ล็อก scroll ตัวหน้าเว็บ + focus ปุ่มปิดทันทีที่เปิด */
  useEffect(() => {
    if (!isOpen || !show) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, show]);

  /* Preload ภาพก่อน–หลังในชุดที่กรองอยู่ (เลื่อนดูแล้วภาพพร้อม) */
  useEffect(() => {
    if (index === null || count === 0) return;
    for (const d of [-1, 1] as const) {
      const neighbour = filtered[(index + d + count) % count];
      const pre = document.createElement("img");
      pre.src = neighbour.src;
    }
  }, [index, filtered, count]);

  /* ภาพที่กำลังปิด (animation จบ → ค่อย unmount) */
  const handleAnimEnd = useCallback(() => {
    if (!show) setIndex(null);
  }, [show]);

  return (
    <div>
      {/* ปุ่มหมวด — pill ขอบ beige, active พื้น charcoal ตาม mockup B */}
      <div
        role="group"
        aria-label="กรอกรูปแกลลอรี่ตามหมวด"
        className="mt-10 flex flex-wrap justify-center gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => applyFilter(f)}
            aria-pressed={filter === f}
            className={`cursor-pointer rounded-full border px-[18px] py-2 text-[13px] font-medium transition ${
              filter === f
                ? "border-charcoal bg-charcoal text-white"
                : "border-beige text-stone-600 hover:border-charcoal/40"
            }`}
          >
            {CATEGORY_LABEL[f]}
          </button>
        ))}
      </div>

      {/* Collage grid — รูปแรกของชุด span 2×2 + caption, ที่เหลือเรียงรอบ */}
      <div className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:auto-rows-[150px] md:gap-2.5">
        {filtered.map((thumb, i) => {
          const isBig = i === 0;
          return (
            <figure
              key={thumb.src}
              className={`group relative overflow-hidden rounded-md ${
                isBig ? "col-span-2 row-span-2" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`ขยายภาพที่ ${i + 1} จาก ${count}: ${thumb.alt}`}
                className="block h-full w-full cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-charcoal/60"
              >
                <div className={`relative ${isBig ? "h-full min-h-[240px] md:min-h-0" : "h-[120px] md:h-full"}`}>
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes={isBig ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    loading="lazy"
                  />
                  {isBig && (
                    <p
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3 pt-9 text-left text-[12.5px] leading-relaxed text-white line-clamp-2"
                    >
                      {thumb.alt}
                    </p>
                  )}
                </div>
              </button>
            </figure>
          );
        })}
      </div>

      {/* Lightbox */}
      {isOpen && img && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="แกลลอรี่ภาพถ่ายขนาดใหญ่"
          onClick={close}
          onAnimationEnd={handleAnimEnd}
          className={`fixed inset-0 z-[100] flex h-dvh flex-col bg-black/90 backdrop-blur-sm ${
            show ? "lb-fade" : "lb-fade-out"
          }`}
        >
          {/* ปิด (X) */}
          <button
            type="button"
            ref={closeRef}
            onClick={close}
            aria-label="ปิดหน้าต่างภาพ"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/90 backdrop-blur transition hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-white/70 md:right-6 md:top-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* เวทีภาพ — คลิกตัวภาพไม่ปิดหน้าต่าง + รองรับ swipe */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              const t = e.changedTouches[0];
              touch.current = { x: t.clientX, y: t.clientY };
            }}
            onTouchEnd={(e) => {
              const t = e.changedTouches[0];
              const dx = t.clientX - (touch.current?.x ?? 0);
              const dy = t.clientY - (touch.current?.y ?? 0);
              if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
                step(dx < 0 ? 1 : -1);
              }
              touch.current = null;
            }}
          >
            {/* Previous */}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="ภาพก่อนหน้า"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/90 backdrop-blur transition hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-white/70 md:left-5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
              </svg>
            </button>

            {/* ภาพใหญ่ — object-contain คงสัดส่วนจริง ไม่บิดเบี้ยว */}
            <figure key={img.src} className="lb-zoom relative h-full w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 86vw, (min-width: 640px) 74vw, 62vw"
                priority
                draggable={false}
              />
            </figure>

            {/* Next */}
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="ภาพถัดไป"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/90 backdrop-blur transition hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-white/70 md:right-5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Caption + นับลำดับ (นับจากชุดที่กรองอยู่) */}
          <div className="shrink-0 pb-6 pt-3 text-center sm:pb-7" onClick={(e) => e.stopPropagation()}>
            {img.alt && (
              <p className="mx-auto max-w-2xl px-6 text-sm leading-relaxed text-white/80">
                {img.alt}
              </p>
            )}
            <p className="mt-1.5 text-[13px] tabular-nums text-white/55">
              {index + 1} / {count}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
