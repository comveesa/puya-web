"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryItem = { src: string; alt: string };

/** รับทั้ง array ปกติและ readonly (BUSINESS.gallery เป็น as const) */
function toMutable(images: readonly GalleryItem[]): GalleryItem[] {
  return images.map((img) => ({ src: img.src, alt: img.alt }));
}

/**
 * แกลลอรี่ + Lightbox Premium Minimal
 * - คลิก thumbnail → เปิดภาพใหญ่กลางจอ (พื้นดำโปร่ง) เลื่อนดูได้ทั้งชุด
 * - ปุ่มปิด (X) มุมขวาบน · ลูกศรซ้าย/ขวา · นับลำดับ · caption ใต้ภาพ
 * - Keyboard ← → ESC · Swipe ซ้าย/ขวาบนมือถือ · คลิกพื้นนอกภาพปิด
 * - ล็อก scroll ตัวหน้าเว็บขณะเปิด · ARIA dialog + จัดการ focus
 */
export function GalleryLightbox({ images }: { images: readonly GalleryItem[] }) {
  const gallery = toMutable(images);
  const [index, setIndex] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = gallery.length;

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
  const img = index !== null ? gallery[index] : null;

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

  /* ภาพที่กำลังปิด (animation จบ → ค่อย unmount) */
  const handleAnimEnd = useCallback(() => {
    if (!show) setIndex(null);
  }, [show]);

  return (
    <div>
      {/* Masonry grid — รูปเดิมทั้งชุด lazy loading เหมือนเดิม */}
      <div className="mt-12 columns-2 gap-4 md:columns-3 [&>figure]:mb-4">
        {gallery.map((thumb, i) => (
          <figure key={thumb.src} className="overflow-hidden rounded-2xl">
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`ขยายภาพที่ ${i + 1} จาก ${count}: ${thumb.alt}`}
              className="group block w-full cursor-zoom-in rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-charcoal/60"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 50vw"
                  loading="lazy"
                />
              </div>
            </button>
          </figure>
        ))}
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

          {/* Caption + นับลำดับ */}
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
