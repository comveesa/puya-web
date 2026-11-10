# PUYA Beach Villa — Premium Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ยกระดับเว็บ PUYA Beach Villa เป็น editorial luxury ตาม mockup แบบ B (hero คงเดิม), เพิ่มฟอร์มวางแผนการเข้าพักที่จบที่ LINE/โทร, แกลลอรี่แบบ collage + หมวด, เมนูมือถือ, scroll reveal และ og:image ที่ถูกต้อง — โดยไม่เสียฟังก์ชัน/เนื้อหา/SEO เดิม

**Architecture:** Next.js 15 App Router (static prerender) + Tailwind v4 · ข้อมูลทั้งหมดอยู่ `lib/business.ts` · logic คิดราคาแยกเป็น pure function ใน `lib/pricing.ts` · interactive pieces เป็น client components ขนาดเล็ก (BookingPlanner, GalleryLightbox, SiteHeader, ScrollReveal) · animation ทำด้วย IntersectionObserver + CSS เท่านั้น

**Tech Stack:** TypeScript, React 19, Tailwind CSS v4, next/font (Prompt + Playfair Display), sharp (devDependency เดิม — ใช้ทำ og image)

**Spec:** `docs/superpowers/specs/2026-11-10-puya-premium-redesign-design.md` (อ่านคู่กันเสมอ) · อ้างอิงภาพ: `.superpowers/brainstorm/mockup-1/content/compare-approaches.html` (แบบ B = เป้าหมายภาพ, hero ใช้แบบ A)

## Global Constraints

- ภาษาไทยเท่านั้นสำหรับข้อความผู้ใช้ (คงสำนวนเดิม: "สไลเดอร์", "แกลลอรี่", "โต๊ะพูล", "พูลวิลล่า 1/2")
- แหล่งข้อมูลธุรกิจเดียว: `lib/business.ts` — ห้าม hardcode ที่อยู่/เบอร์/ราคา/ลิงก์ที่อื่น
- **ห้ามเพิ่ม runtime dependency** — sharp ใช้ได้เฉพาะเป็น devDependency ใน scripts
- ปุ่ม LINE สี `#0A5C33` · contrast ทุกข้อความผ่าน AA ทั้งธีมสว่าง/มืด
- **ห้ามแก้:** H1 hero, meta title/description/keywords, JSON-LD ทั้ง 2 ชุด, ราคา 6,990/7,990, FAQ, ข้อความการตลาดเดิม
- ราคา: อา.-พฤ. ฿6,990 / ศ.-ส. ฿7,990 ต่อหลังต่อคืน · มัดจำ ฿3,000 **ต่อหลัง** (สองหลัง = ฿6,000)
- Gallery ครบ **16 รูป ไม่ตัดใบใด** · alt เดิมคงไว้
- ห้ามรัน `npm run build` ขณะ `npm run dev` เปิดอยู่ (พัง .next)
- ทุก task ก่อน commit: เพิ่มรายการบนสุดของ `last-process.md` (วันที่ + สิ่งที่ทำ + ขั้นถัดไป) · commit ข้อความอังกฤษสั้น · push → Vercel auto-deploy
- First Load JS หลังเสร็จ ≤ ~120 kB (เดิม 108 kB)

## Review Focus

1. **คืนคละวัน (ศ.–จ.)** — ราคาต้องคิดทีละคืน: ศ.+ส.+อา. = 7,990+7,990+6,990 = ฿22,970 ต่อหลัง ไม่ใช่ราคาเดียวทั้งช่วง → ทดสอบใน Task 2 step 3 / Task 3 step 3
2. **จอง "ทั้งสองหลัง"** — สรุปยอดแสดงมัดจำ ฿6,000 และข้อความที่ copy ระบุวิลล่าชัดเจน → ทดสอบใน Task 3 step 3
3. **ปิด JavaScript** — เนื้อหาทุก section และรูปแกลลอรี่ 16 ใบต้องมองเห็น (ห้ามติด opacity:0 ถาวร) → ทดสอบใน Task 6 step 4
4. **prefers-reduced-motion** — ไม่มี animation เล่น, เนื้อหาโชว์ทันที → ทดสอบใน Task 6 step 4
5. **og:image** — ไฟล์เป็น JPEG จริง 1200×630 (ไม่ใช่ webp/สัดส่วน 4:3) เพื่อ FB/LINE/WhatsApp แสดง → ทดสอบใน Task 1 step 3

---

### Task 1: og:image 1200×630 (JPEG จริง)

**Files:**
- Create: `scripts/make-og.mjs`
- Create: `public/images/og-puya.jpg` (ผลจาก script)
- Modify: `app/layout.tsx` (OG_IMAGE + twitter.images)

**Interfaces:**
- Produces: `/images/og-puya.jpg` (1200×630 JPEG q85, crop cover จาก `public/images/img1928.webp`)

- [ ] **Step 1: เขียน `scripts/make-og.mjs`** — ใช้ sharp ตามรูปแบบ `scripts/convert-one.mjs` เดิม: read `public/images/img1928.webp` → `resize(1200, 630, { fit: "cover" })` → `jpeg({ quality: 85 })` → เขียน `public/images/og-puya.jpg`
- [ ] **Step 2: รัน script**

Run: `node scripts/make-og.mjs`
Expected: ไฟล์ `public/images/og-puya.jpg` ถูกสร้าง

- [ ] **Step 3: ตรวจขนาดไฟล์จริง + แก้ `app/layout.tsx`**

Run: `node -e "import('sharp').then(s=>s.default('public/images/og-puya.jpg').metadata()).then(m=>console.log(m.format,m.width,'x',m.height))"`
Expected: `jpeg 1200 x 630`

แก้ `OG_IMAGE` ใน `app/layout.tsx`: url → `/images/og-puya.jpg` (width 1200, height 630, alt เดิม) และ `twitter.images` → `"/images/og-puya.jpg"`

- [ ] **Step 4: build + commit**

Run: `npm run build` → Expected: ผ่าน (static, ไม่มี error)
```bash
git add scripts/make-og.mjs public/images/og-puya.jpg app/layout.tsx
git commit -m "chore: real 1200x630 JPEG og:image"
```

### Task 2: logic คิดราคา — `lib/pricing.ts` (pure functions)

**Files:**
- Create: `lib/pricing.ts`

**Interfaces:**
- Consumes: `BUSINESS` จาก `lib/business.ts` (ราคา 6,990/7,990, lineUrl)
- Produces (Task 3 ใช้):
  - `type VillaChoice = "villa1" | "villa2" | "both"`
  - `VILLA_LABEL: Record<VillaChoice, string>` → `{ villa1: "พูลวิลล่า 1", villa2: "พูลวิลล่า 2", both: "พูลวิลล่า 1 + พูลวิลล่า 2" }`
  - `calcEstimate(checkIn: string, checkOut: string, choice: VillaChoice): { nights: number; total: number; deposit: number } | null` — input `"YYYY-MM-DD"`; `null` ถ้า nights ≤ 0; คิดทีละคืน getDay(): 0(อา),1–4(พฤ) = 6990, 5(ศ),6(ส) = 7990 × จำนวนหลัง (1 หรือ 2); `deposit = 3000 × จำนวนหลัง`
  - `composeLineMessage(args: { choice: VillaChoice; checkIn: string; checkOut: string; guests: number; total: number; deposit: number }): string` — ข้อความไทยหลายบรรทัด: ทักมา + วิลล่า + เช็คอิน/เอาท์ (dd/mm/yyyy) + จำนวนคืน + ผู้เข้าพัก + "ราคาประมาณการ" + "ค่ามัดจำ" + ปิดท้ายขอสอบถามวันว่าง/เงื่อนไข (อ่านเบอร์/LINE จาก BUSINESS)

- [ ] **Step 1: เขียน `lib/pricing.ts` ตาม signature ข้างบน** — ตัวเลขราคาอ่านจาก `BUSINESS.pricing` (ห้าม hardcode ซ้ำ); format วันที่ด้วย Intl th-TH
- [ ] **Step 2: ตรวจ type + build**

Run: `npm run build`
Expected: ผ่าน (type-check ครบ)

- [ ] **Step 3: ตรวจตัวเลข case สำคัญ (Review Focus 1)** — ตรวจจริงที่หน้าเว็บใน Task 3 step 3 (ไม่มี test runner ในโปรเจกต์): วันอ้างอิง พ.ย. 2026 — ศ.13→อา.15 = **2 คืน ฿15,980** · ศ.13→จ.16 = **3 คืน ฿22,970** (ศ.+ส.+อา.)
Expected: (เลื่อนไปตรวจที่ Task 3)

- [ ] **Step 4: commit**

```bash
git add lib/pricing.ts
git commit -m "feat: booking price estimation logic"
```

### Task 3: BookingPlanner — ฟอร์มวางแผนการเข้าพัก (แทน section 12)

**Files:**
- Create: `components/BookingPlanner.tsx`
- Modify: `app/page.tsx` (section `id="booking"` — แทนเนื้อหาเดิมด้วย `<BookingPlanner />`, คง `bg-charcoal` และ image bg + เงาจางเดิมไว้เป็นพื้นหลัง)

**Interfaces:**
- Consumes: `calcEstimate`, `composeLineMessage`, `VILLA_LABEL`, `VillaChoice` จาก `lib/pricing.ts` · `BUSINESS.lineUrl`, `BUSINESS.phoneIntl`, `BUSINESS.phone` จาก `lib/business.ts`
- Produces: `export function BookingPlanner()` — client component ไม่มี props

- [ ] **Step 1: เขียน `components/BookingPlanner.tsx`** — `"use client"` · โครงตาม mockup B (การ์ดซ้ายฟอร์ม/ขวาสรุปบนแถบมืด ในการ์ดขาวขอบ beige, มือถือเรียงแนวตั้ง):
  - เลือกวิลล่า: pill 3 อัน (จาก `VILLA_LABEL`) default `villa1`
  - วันเข้า–ออก: `<input type="date">` 2 ช่อง (native, ไม่เพิ่ม dependency)
  - จำนวนผู้เข้าพัก: stepper −/ค่า/+ (1–24, default 8)
  - แผงสรุป (ธีมมืด): จำนวนคืน, รายการราคา, "ประมาณการ ฿X", "ค่ามัดจำ ฿Y" (คูณจำนวนหลัง), หมายเหตุ "ประมาณการเท่านั้น — เงื่อนไขจริงยืนยันกับเจ้าของ"
  - ปุ่มหลักเขียว `#0A5C33`: "คัดลอกข้อความ & เปิด LINE" → `navigator.clipboard.writeText(composeLineMessage(...))` แล้ว `window.open(BUSINESS.lineUrl, "_blank", "noopener")` + คำกำกับใต้ปุ่ม "กดวางข้อความในแชท LINE เพื่อส่งหาเจ้าของ" · ปุ่มรอง: `tel:` ลิงก์ "โทร 092-861-3745"
  - ตอน estimate เป็น `null` (วันไม่ถูกต้อง): แผงสรุปแสดง "เลือกวันเข้าพักเพื่อดูราคาประมาณการ" · ปุ่ม copy ปิด (disabled)
- [ ] **Step 2: build**

Run: `npm run build`
Expected: ผ่าน · First Load JS ยัง ≤ 120 kB

- [ ] **Step 3: ตรวจบนเว็บจริง (Review Focus 1–2)** — `npm run dev` + browser วันอ้างอิง พ.ย. 2026: (a) ศ.13→อา.15 วิลล่าเดียว = **2 คืน ฿15,980** มัดจำ ฿3,000 (b) ศ.13→จ.16 วิลล่าเดียว = **3 คืน ฿22,970** (คละวัน ศ.+ส.+อา.) (c) ศ.13→อา.15 เลือก "ทั้งสองหลัง" = ฿31,960 **มัดจำ ฿6,000** (d) copy แล้วข้อความใน clipboard ระบุ "พูลวิลล่า 1 + พูลวิลล่า 2", วันที่, จำนวนคืน, ผู้เข้าพัก ครบ (e) ปุ่มเปิด LINE ถูกลิงก์ `~puyabeach`
- [ ] **Step 4: commit**

```bash
git add components/BookingPlanner.tsx app/page.tsx
git commit -m "feat: booking planner form with LINE handoff"
```

### Task 4: แกลลอรี่ — หมวด + collage + preload

**Files:**
- Modify: `lib/business.ts` (เพิ่ม field `category` ทุกรายการใน `gallery`)
- Modify: `components/GalleryLightbox.tsx`

**Interfaces:**
- Consumes: รูปเดิม 16 ใบ
- Produces: `GalleryItem = { src: string; alt: string; category: GalleryCategory }` · `GalleryCategory = "pool" | "bedroom" | "interior" | "seaview"` · `CATEGORY_LABEL: Record<GalleryCategory | "all", string>` = ทั้งหมด / สระ & สไลเดอร์ / ห้องนอน / ครัว & ภายใน / วิวทะเล & บรรยากาศ

- [ ] **Step 1: แก้ `lib/business.ts`** — กำหนด type ตามข้างบน, เพิ่ม `category` ให้ครบ 16 ใบตามเนื้อหา alt (สระ/สไลเดอร์→pool, ห้องนอน/เตียง→bedroom, ครัว/ห้องน้ำ/ผ้าขนหนู→interior, BBQ/วิวทะเล/บ้านมุมกว้าง→seaview) — alt/รูปเดิมห้ามแก้
- [ ] **Step 2: แก้ `components/GalleryLightbox.tsx`**:
  - เพิ่ม state `filter: GalleryCategory | "all"` + แถว pill หมวดเหนือ grid (pill active = charcoal)
  - grid เปลี่ยนจาก masonry เป็น collage ตาม mockup B: `grid grid-cols-2 md:grid-cols-4` + `auto-rows` — **รูปแรกของชุดที่ filter อยู่ span 2×2** (`col-span-2 row-span-2`), ที่เหลือเรียงรอบ; รูปใหญ่มี caption มุมล่างพื้น gradient (คง alt เป็น aria)
  - lightbox เลื่อนเฉพาะ **ชุดที่ filter อยู่** (filtered array) — พฤติกรรมเดิม (keyboard/swipe/ESC/lock scroll/ARIA/นับ n/จำนวน) คงครบ โดยนับจากชุด filtered
  - preload: ทุกครั้ง `index` เปลี่ยน → `new Image().src` ของภาพก่อน–หลังในชุด filtered
- [ ] **Step 3: build + ตรวจ static HTML**

Run: `npm run build` แล้วเช็ค HTML ใน `.next/server/app/index.html`: `grep -c "<img" ` หรือนับรูปแกลลอรี่
Expected: build ผ่าน · รูปแกลลอรี่ครบ **16 ใบ** ใน static HTML (filter ทำที่ client หลัง hydrate)

- [ ] **Step 4: ตรวจ browser** — pill กรองถูกชุด, รูปแรก span 2×2 ทุกหมวด, lightbox วนเฉพาะชุด, swipe/keyboard ยังทำงาน, preload เห็นภาพโหลดไว้
- [ ] **Step 5: commit**

```bash
git add lib/business.ts components/GalleryLightbox.tsx
git commit -m "feat: gallery categories, collage layout, lightbox preload"
```

### Task 5: restyle ทั้งไซต์ — editorial luxury (แบบ B) + Playfair Display

**Files:**
- Modify: `app/layout.tsx` (เพิ่ม Playfair_Display จาก next/font: subsets ["latin"], weight ["400","600"], variable `--font-display` — ใส่ใน body className)
- Modify: `app/globals.css` (เพิ่ม `.font-display { font-family: var(--font-display), serif; }` + utility ตัวเลข tabular)
- Modify: `app/page.tsx` (ทุก section ยกเว้น hero)

**Interfaces:**
- Produces: คลาส `.font-display` ใช้กับตัวเลขราคา/สถิติ/วลีอังกฤษประดับ

- [ ] **Step 1: เพิ่มฟอนต์ + utility** — แก้ `layout.tsx` และ `globals.css` ตามข้างบน (Prompt คงเดิมทั้งหมด, ข้อความไทยไม่ใช้ display font)
- [ ] **Step 2: restyle ตาม mockup B (`.superpowers/brainstorm/mockup-1/content/compare-approaches.html`)** — หัวใจของแต่ละจุด:
  - **Eyebrow ใหม่:** เส้นบางยาว ~44px สองข้างข้อความ (จาก `SectionHeading` — รองรับ align left/center/dark)
  - **Typography:** หัว section ใหญ่ขึ้น 1 ระดับ, whitespace มากขึ้น (padding section ~96–112px บนจอใหญ่)
  - **การ์ดวิลล่า/ห้องนอน:** กรอบเส้น hairline (border beige) แทน ring เงาเท่านั้น, มุมน้อยลง (rounded-xl–2xl)
  - **Pricing:** ตาราง boutique — การ์ดคู่ชนกันแชร์ขอบ (grid 2 คอลัมน์, ขอบ beige), วันธรรมดาพื้นขาว / ศ.-ส. พื้น charcoal ตัว sand, ราคาใหญ่ `.font-display` ~52px, รายการ "รวมในราคา" ใต้ราคาคั่นเส้นบาง (เนื้อหาจาก freebies/capacity เดิม)
  - **Hero ห้ามแตะ** (คง markup/ข้อความเดิมทุกอย่าง)
  - **จังหวะสี:** คงจังหวะเดิม (สลับ white/sand/charcoal ตามโครงปัจจุบัน)
  - Footer/CTA ชุดเดิมปรับระยะ+ฟอนต์ให้เข้าชุด
- [ ] **Step 3: build + ตรวจ contrast**

Run: `npm run build`
Expected: ผ่าน · ตรวจตาบน dev: ตัว sand บน charcoal และ stone-600 บนขาวผ่าน AA, ปุ่ม LINE ยัง `#0A5C33`

- [ ] **Step 4: ตรวจ static HTML กัน SEO หาย** — grep ใน `.next/server/app/index.html`: H1 เดิม 1 อัน, title/desc, `6,990`, `7,990`, `092-861-3745`, `~puyabeach`, JSON-LD 2 ชุด
- [ ] **Step 5: commit**

```bash
git add app/layout.tsx app/globals.css app/page.tsx
git commit -m "style: premium editorial redesign per approved mockup"
```

### Task 6: scroll reveal + data-reveal ทุก section

**Files:**
- Create: `components/ScrollReveal.tsx`
- Modify: `app/globals.css` (reveal styles)
- Modify: `app/page.tsx` (ใส่ `<ScrollReveal />` ก่อน `</main>` + attribute `data-reveal` บน block หลักของทุก section)

**Interfaces:**
- Produces: `export function ScrollReveal()` — client component ไม่มี props · CSS ผูกกับ `html.has-reveal [data-reveal]`

- [ ] **Step 1: เขียน `components/ScrollReveal.tsx`** — `"use client"` · `useEffect`: เพิ่ม class `has-reveal` ให้ `<html>`, `querySelectorAll("[data-reveal]")` → IntersectionObserver (threshold ~0.15) เพิ่ม class `is-visible` เมื่อเข้าจอแล้ว unobserve · cleanup ครบ
- [ ] **Step 2: CSS ใน `globals.css`**:
```css
.has-reveal [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
.has-reveal [data-reveal].is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .has-reveal [data-reveal] { opacity: 1; transform: none; transition: none; }
}
```
  (ไม่มี `has-reveal` = JS ยังไม่ hydrate/ไม่มี JS → ทุกอย่างมองเห็น: no-JS safe)
- [ ] **Step 3: ใส่ `data-reveal` ใน `page.tsx`** — บนหัว section + block ใหญ่ 1–2 ชิ้นต่อ section (ไม่ใส่บน hero)
- [ ] **Step 4: ตรวจ (Review Focus 3–4)** — dev + browser: scroll ลงแล้ว fade-up ทีละ block · DevTools ปิด JS แล้ว reload = เนื้อหาทุก section + รูป 16 ใบมองเห็นครบ · Emulate `prefers-reduced-motion: reduce` = โชว์ทันทีไม่มี animation
- [ ] **Step 5: build + commit**

Run: `npm run build` → ผ่าน
```bash
git add components/ScrollReveal.tsx app/globals.css app/page.tsx
git commit -m "feat: scroll reveal with reduced-motion and no-JS safety"
```

### Task 7: เมนูมือถือ hamburger

**Files:**
- Modify: `components/SiteHeader.tsx`

**Interfaces:**
- Consumes: `NAV` เดิม, `BookLineButton`
- Produces: `SiteHeader` เป็น `"use client"` (signature component ไม่เปลี่ยน)

- [ ] **Step 1: แก้ `SiteHeader.tsx`** — `"use client"` · จอ < lg แสดงปุ่ม hamburger (inline SVG ตาม convention ของโปรเจกต์ — ไม่เพิ่ม dependency) แทนปุ่ม "ดูราคา" · เปิด panel dropdown ใต้ header (bg white, ring, เงา): ลิงก์ NAV ครบ + `BookLineButton` · ล็อก body scroll ตอนเปิด · ปิดเมื่อกดลิงก์/กด X/กดนอก panel · ปุ่มมี `aria-expanded`/`aria-controls`, panel `role="dialog"` ไม่จำเป็น (ใช้ nav ปกติ + `aria-label`) · จอ ≥ lg คงเมนูแนวนอนเดิมทุกอย่าง
- [ ] **Step 2: ตรวจ browser** — 390px: hamburger เปิด/ปิด, ลิงก์พาไป anchor ถูก section (scroll-padding-top เดิมยังกัน header บัง), scroll lock ปิดคืนหลังปิดเมนู · 1440px: หน้าตาเดิมไม่เปลี่ยน
- [ ] **Step 3: build + commit**

Run: `npm run build` → ผ่าน
```bash
git add components/SiteHeader.tsx
git commit -m "feat: mobile hamburger menu"
```

### Task 8: QA รวบยอด + อัปเดตเอกสารโปรเจกต์

**Files:**
- Modify: `last-process.md`, `agent.md` (หัวข้อ 3 — สถานะงานรอบนี้)
- Modify: `.gitignore` (เพิ่ม `.superpowers/`)

**Interfaces:** ไม่มี — งานตรวจและเอกสาร

- [ ] **Step 1: QA เต็มรอบบน prod build** — ปิด dev server ก่อน → `npm run build` → `npm start`:
  - Lighthouse (mobile + desktop): Accessibility 100 · Best Practices 100 · SEO ≥ 94 · Performance ไม่ต่ำกว่าเดิมอย่างมีนัยสำคัญ
  - Static HTML checklist ครบ (H1/title/desc/JSON-LD×2/เบอร์/~puyabeach/ราคา/รูปแกลลอรี่ 16)
  - ตรวจตา 390px + 1440px ทุก section · ฟอร์มจอง case ทุกแบบ (ธรรมดา/สุดสัปดาห์/คละ/สองหลัง มัดจำ 6,000)
  - แชร์ทดสอบ og:image (Facebook Sharing Debugger หรือดู meta ใน HTML)
- [ ] **Step 2: อัปเดตเอกสาร** — `.gitignore` เพิ่ม `.superpowers/` · `last-process.md` (สรุปรอบ Premium Overhaul) · `agent.md` หัวข้อ 1/3 (ธีม editorial luxury + ฟอร์มจอง flow A + section 12 ใหม่)
- [ ] **Step 3: commit + push**

```bash
git add .gitignore last-process.md agent.md
git commit -m "docs: premium overhaul wrap-up"
git push origin main
```
Expected: Vercel auto-deploy · ตรวจหน้าเว็บจริงหลัง deploy 1 รอบ
