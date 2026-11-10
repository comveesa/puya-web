"use client";

import { useEffect } from "react";

/**
 * Scroll reveal แบบไม่เพิ่ม dependency — enhancement เท่านั้น
 * - เพิ่ม class `has-reveal` บน <html> เมื่อ hydrate แล้วเท่านั้น → ถ้า JS ไม่ทำงาน เนื้อหาแสดงปกติ
 * - ทุก block ที่มี data-reveal จะ fade-up ครั้งเดียวเมื่อเลื่อนเข้าจอ (threshold 0.15)
 * - เคารพ prefers-reduced-motion (ดู CSS ใน globals.css)
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-reveal");

    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    items.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("has-reveal");
    };
  }, []);

  return null;
}
