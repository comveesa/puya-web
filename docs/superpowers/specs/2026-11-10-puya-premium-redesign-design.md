# PUYA Beach Villa — Premium Overhaul Design Doc

> วันที่: 2026-11-10 · สถานะ: รออนุมัติ
> ทิศทางยืนยันแล้วจาก mockup เทียบสองแนวใน browser — ผู้ใช้เลือก **แบบ B (Premium Overhaul) ทั้งไซต์ ยกเว้น hero คงแบบปัจจุบัน (แบบ A)**
> 📎 อ้างอิงภาพ: ไฟล์ mockup เทียบสองแนวเก็บที่ `.superpowers/brainstorm/mockup-1/content/compare-approaches.html` (แบบ B + hero แบบ A = เป้าหมายภาพของงานนี้; ผู้สร้างเปิดไฟล์นี้เทียบได้)

---

## 1. ความตั้งใจและเหตุผล

เว็บ PUYA Beach Villa (one-page ภาษาไทย, Next.js 15 + Tailwind 4, deploy Vercel) ทำโครง SEO และฟังก์ชันครบแล้ว แต่ภาพรวมยัง "แบน" — ไม่มีการเคลื่อนไหว, hierarchy ของการ์ดเท่ากันหมด, เมนูมือถือไม่มี, แกลลอรี่เป็นตารางเท่ากันหมด และการจองยังเป็นแค่ปุ่ม LINE/โทรที่ลูกค้าต้องคิดประโยคเอง

เจ้าของเว็บ (ผู้ใช้) ต้องการ 5 เป้าหมาย: ① UX/UI ดู Premium ② SEO แข็งขึ้น ③ รองรับมือถือ+เดสก์ท็อป ④ แกลลอรี่+ระบบจองดีขึ้น ⑤ **รักษาฟังก์ชันเดิมทั้งหมด**

## 2. เป้าหมาย (Goals)

1. เปลี่ยนภาษาภาพทั้งไซต์เป็น editorial luxury ตาม mockup แบบ B — **ยกเว้น hero ที่คงโครงและเนื้อหาเดิมทุกอย่าง** (มีแต่ scroll animation เบา ๆ เพิ่ม)
2. เมนู hamburger บนมือถือ (ปัจจุบัน nav โผล่เฉพาะจอ ≥1024px)
3. Scroll reveal animation แบบไม่เพิ่ม dependency
4. แกลลอรี่: แท็กหมวด + layout แบบ collage (รูปใหญ่นำ) + lightbox preload ภาพข้างเคียง
5. ฟอร์มวางแผนการเข้าพัก: เลือกวิลล่า/วันที่/จำนวนคน → คิดราคาประมาณการ + มัดจำ → ปุ่ม "คัดลอกข้อความ & เปิด LINE" (การจองยังจบที่ LINE/โทร — ไม่มี backend)
6. แก้ og:image: สร้าง JPEG 1200×630 จริง (ปัจจุบันชี้ webp สัดส่วน 4:3 และประกาศขนาดไม่ตรง — บางแพลตฟอร์มแชร์แล้วรูปหาย)
7. รักษาทุกฟังก์ชัน/ข้อมูล/เนื้อหาเดิม

## 3. ไม่เป้าหมาย (Non-goals) และสิ่งที่ถือเป็นความล้มเหลว (Anti-goals)

- **ไม่ทำ**ระบบจองจริง/ฐานข้อมูล/Supabase — ผู้ใช้เลือก "แบบ A" ของระบบจอง (จบที่ LINE/โทร) อย่างชัดเจน
- **ไม่แก้** ข้อความการตลาด, ข้อมูลธุรกิจ, ราคา, FAQ, H1, meta title/description, keywords, JSON-LD เดิม
- **ไม่เพิ่ม** JS library ภายนอก (framer-motion, GSAP, Swiper ฯลฯ)
- **ไม่แต่ง**รีวิว/คะแนน (กติกาเจ้าของใน agent.md)
- Anti-goal: contrast ตกต่ำกว่า AA, Lighthouse ต่ำกว่าเดิม, เนื้อหา SEO ใน static HTML หาย, First Load JS เกิน ~120 kB

## 4. ข้อจำกัด (Constraints)

- จาก `agent.md`: ภาษาไทยเท่านั้น · `lib/business.ts` เป็นแหล่งข้อมูลเดียว · LINE เป็นบัญชีบุคคล (`~puyabeach` — ใส่ข้อความ prefill ใน URL ไม่ได้) · ห้ามรัน `npm run build` ขณะ dev server เปิด · commit เป็นก้อนเล็กตามหน้างาน + อัปเดต `last-process.md` ทุกครั้ง
- ปุ่ม LINE ใช้เขียวเข้ม `#0A5C33` ตามเดิม (contrast AA)
- ฟอนต์หลัก Prompt (next/font) — เพิ่มได้อีกฟอนต์เดียวสำหรับตัวเลข/ภาษาอังกฤษประดับ
- Deploy: push → Vercel auto

## 5. แนวทางที่พิจารณา (Approaches)

| แนวทาง | สรุป | ผลการตัดสินใจ |
|---|---|---|
| A — Refinement | โครง/โทนเดิม + animation + เมนูมือถือ + แท็กแกลลอรี่ | ตอบ "Premium" ได้ครึ่งเดียว — ถูกทับด้วย B |
| B — Premium Overhaul | editorial luxury: typography ใหญ่, ตารางราคา boutique, แกลลอรี่ collage, ฟอร์มวางแผน | ✅ เลือก (hero คงแบบ A ตาม mockup) |
| ไลบรารี animation | framer-motion/GSAP | ❌ เพิ่มน้ำหนัก JS โดยไม่จำเป็น ขัดเป้าหมาย ⑤ |
| ระบบจองจริง + Supabase | ปฏิทินวันว่าง + เก็บจอง | ❌ ผู้ใช้เลือก flow A; เลื่อนเป็น phase ถ้าอนาคตต้องการ |

## 6. ส่วนที่ผู้ใช้ตัดสิน (as decided)

- แนวทาง B ทั้งไซต์, hero คงแบบปัจจุบัน — ตัดสินจาก mockup จริงใน browser (2026-11-10)
- ระบบจอง = flow A (ฟอร์มช่วยจอง จบที่ LINE/โทร ไม่มี backend)

## 7. ส่วนที่เป็นข้อเสนอของ agent (my calls — โปรดตรวจตอนอ่าน)

1. **ฟอร์มวางแผนการเข้าพัก** แทนที่ section 12 "Final CTA" เดิม (anchor `#booking` คงเดิม) — ปุ่ม LINE/โทรเดิมยังอยู่ครบในฟอร์ม จำนวน section ยังเป็น 12 โครง SEO ไม่เปลี่ยน
2. **ฟอนต์เสริม** Playfair Display (next/font, subset latin, น้ำหนัก 400/600) — ใช้เฉพาะตัวเลขราคา/ตัวเลขสถิติ/วลีอังกฤษประดับ ตาม mockup B; ข้อความไทยทั้งหมดยัง Prompt
3. **หมวดแกลลอรี่** 5 ปุ่ม: ทั้งหมด / สระ & สไลเดอร์ / ห้องนอน / ครัว & ภายใน / วิวทะเล & บรรยากาศ — เพิ่ม field `category` ใน `BUSINESS.gallery` (alt เดิมคงไว้เพื่อ SEO) · **รูปครบทั้ง 16 ใบ ไม่ตัดใบใด** — collage ใช้ img1928 นำ 2×2 แล้วอีก 15 ใบเรียงรอบ; ตอนเลือกหมวด แสดงเฉพาะรูปหมวดนั้น และ lightbox เลื่อนเฉพาะชุดที่ filter ค้างอยู่
4. **รูปนำ collage** = img1928 (รูปเดียวกับ hero) เต็ม 2×2 พร้อม caption
5. **สูตรคิดราคาในฟอร์ม**: นับทีละคืน — อา.-พฤ. ฿6,990 / ศ.-ส. ฿7,990 (ต่อหลัง) × จำนวนหลังที่เลือก; **มัดจำ = ฿3,000 × จำนวนหลัง** (เลือกทั้งสองหลัง = ฿6,000); แสดงคำว่า "ประมาณการ" กันความคลาดเคลื่อน (กันเงื่อนไขเรทพิเศษที่ระบบไม่รู้)
6. **UX ส่ง LINE**: ปุ่มเดียว 2 คำสั่ง — `navigator.clipboard` ข้อความสำเร็จรูป (วิลล่า/วันที่/คืน/คน/ราคาประมาณการ) + `window.open(lineUrl)`; มีคำกำกับ "กดวางในแชท LINE" เพราะบัญชีบุคคล prefill ไม่ได้ · **ฟอร์มไม่บังคับกฎการจอง** (ขั้นต่ำจำนวนคืน/จองล่วงหน้า) — ประมาณการทุกกรณีที่วันถูกต้อง (เช็คเอาท์ > เช็คอิน) แล้วให้เจ้าของยืนยันเงื่อนไขจริงใน LINE ตามกติกา "คุยเจ้าของโดยตรง"
   - ✅ **ยืนยันจากเจ้าของแล้ว (2026-11-10):** มัดจำ ฿3,000 **ต่อหลัง** — เลือก "ทั้งสองหลัง" มัดจำรวม ฿6,000
7. **og:image ใหม่**: `public/images/og-puya.jpg` (1200×630, crop จาก img1928) สร้างด้วย script ใหม่ `scripts/make-og.mjs` (sharp มีอยู่แล้ว) + แก้ `app/layout.tsx` (OG/Twitter ชี้ไฟล์ใหม่, ขนาดตรงจริง)
8. **Scroll reveal**: ตัว IntersectionObserver ตัวเดียว (client component เล็ก) ผ่าน data-attribute; CSS opacity/translate; เคารพ `prefers-reduced-motion`; ถ้า JS ไม่ทำงานเนื้อหาต้องมองเห็นปกติ (no-JS safe)
9. **เมนูมือถือ**: แก้ `SiteHeader` เพิ่มปุ่ม hamburger (< lg) เปิด panel เมนูเดียวกับ NAV + ปุ่มจอง; ล็อก scroll ตอนเปิด; ไม่เพิ่ม dependency
10. **Lightbox preload**: ตอนเปิดภาพ ให้ preload ภาพก่อน/หลังด้วย `new Image().src` — ไฟล์ `GalleryLightbox.tsx` เดิม (ไม่เปลี่ยนพฤติกรรมอื่น: keyboard/swipe/ARIA/lazy คงเดิม)
11. **จังหวะสี section** ตาม mockup B: hero (มืด) → About (สว่าง) → Villas (sand) → Bedrooms (สว่าง) → Pool (มืด) → Facilities (sand) → Pricing (สว่าง) → Gallery (สว่าง) → Reviews (sand) → Location (สว่าง) → FAQ (สว่าง) → Booking form (มืด)

## 8. สิ่งที่ปล่อยให้ผู้สร้างตัดสิน (left to builder)

- class Tailwind เฉพาะจุด, timing/easing ของ animation, จุด crop ของ og image, การจัดไฟล์ component ใหม่ (แยก BookingPlanner ออกจาก page.tsx หรือไม่), ลำดับ tag หมวดของรูปแต่ละใบ (ตาม alt ที่มี)

## 9. เกณฑ์ตรวจรับ (QA gates)

1. `npm run build` ผ่าน (static prerender) · First Load JS ≤ ~120 kB
2. Lighthouse (prod build): Accessibility 100 · Best Practices 100 · SEO ≥ 94 · Performance ไม่ต่ำกว่าเดิมอย่างมีนัยสำคัญ
3. Static HTML ยังมีครบ: H1 เดิม, title/desc, JSON-LD 2 ชุด, เบอร์ 092-861-3745, `~puyabeach`, ราคา 6,990/7,990
4. ทดสอบตา: มือถือ 390px + desktop 1440px ทุก section · ธีมสว่าง/มืด contrast ผ่าน AA
5. ปิด JS แล้วเนื้อหาทุก section ยังมองเห็น (reveal เป็น enhancement เท่านั้น)
6. ฟอร์มจอง: คิดราคาถูกต้องทั้งแบบธรรมดา/สุดสัปดาห์/คละ, ข้อความที่ copy ครบและอ่านง่าย, ปุ่มเปิด LINE ถูกลิงก์

## 10. นอกขอบเขต (out of scope)

Backend/ฐานข้อมูล · Google Search Console/Bing/Analytics (เจ้าของทำ off-site ตามแผนเดิม) · custom domain · งานรีวิว Maps

## 11. ขนาดงานโดยประมาณ

แตะไฟล์เดิม ~6 (`page.tsx`, `layout.tsx`, `globals.css`, `SiteHeader`, `GalleryLightbox`, `lib/business.ts`) + ไฟล์ใหม่ ~4 (BookingPlanner, Reveal, make-og.mjs, og-puya.jpg) — เป็นงานระดับโปรเจกต์ย่อย ทำได้ในรอบเดียว แบ่ง commit ตามหน้างาน
