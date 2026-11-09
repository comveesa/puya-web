# agent.md — คู่มือการพัฒนาโปรเจกต์ PUYA Beach Villa Website

> ไฟล์นี้ใช้เป็นคู่มือหลักให้ AI agent หรือนักพัฒนาคนใหม่ทำงานต่อจากที่ค้างไว้
> อ่านไฟล์ `last-process.md` ทุกครั้งก่อนเริ่มทำงาน เพื่อดูว่าพัฒนาถึงขั้นตอนไหนแล้ว
> เมื่อทำงานเสร็จแต่ละชิ้น ต้องอัปเดต `last-process.md` ทุกครั้ง

---

## 1. ข้อมูลโปรเจกต์

| รายการ | รายละเอียด |
|---|---|
| ชื่อโปรเจกต์ | PUYA Beach Villa — เว็บไซต์พูลวิลล่าริมทะเล |
| ที่ตั้ง | อำเภอเทพา จังหวัดสงขลา |
| ชื่อโซนที่พัก | จอดรถ, พูลวิลล่า 1, พูลวิลล่า 2 (หลังพัก 2 หลัง ตกแต่งเหมือนกัน) |
| เป้าหมาย | เว็บพรีเซนต์ภาษาไทย ไม่มีระบบจองในเว็บ — นำทางลูกค้าไปติดต่อผ่านโซเชียล |
| ภาษาบนเว็บ | ไทยเท่านั้น |
| ธีม | Minimal Luxury / Modern Mediterranean — Clean White / Warm Beige `#e8dfcf` / Sand `#f6f2ea` / Dark Charcoal `#26292e` (token ใน `app/globals.css` @theme) |

### ช่องทางติดต่อ (ใช้ในเว็บ)
- Facebook: https://www.facebook.com/PUYA.Beach.Villa
- TikTok: https://www.tiktok.com/@puya.beach.villa
- Line: https://line.me/R/ti/p/~puyabeach (Line ID: puyabeach — เป็นบัญชีบุคคล จึงใช้รูปแบบ ~; หากวันหนึ่งสมัคร Line Official Account เปลี่ยนเป็น https://line.me/R/ti/p/@puyabeach)

### ข้อมูลธุรกิจ (แหล่งข้อมูลเดียว: `lib/business.ts`)
> แก้ข้อมูลธุรกิจทุกอย่างที่ไฟล์เดียวนี้ — metadata / JSON-LD / หน้าเว็บ / footer ดึงจากที่เดียวกัน

- ชื่อ: PUYA Beach Villa (Google Maps: "PUYA Beach Villa พูย่า บีช วิลล่า")
- ที่อยู่: 238 หมู่ 7 ตำบลเทพา อำเภอเทพา จังหวัดสงขลา 90150 · พิกัด 6.8772047, 100.9557731
- Google Maps: https://maps.app.goo.gl/GgQNT7SHbMB6YrKZA (ลิงก์หลักจาก Master Task; ลิงก์เก่า QHRFVZVc4vvrps6d7 ชี้ place เดียวกัน)
- โทร 092-861-3745 · LINE ~puyabeach · FB PUYA.Beach.Villa
- วิลล่า 2 หลังเหมือนกัน: 3 ห้องนอน / 3 ห้องน้ำ / รับ 12 คน / สระ 3×6 ม. + สไลเดอร์น้ำ
- **ราคา (ต่อหลัง/ต่อคืน):** อาทิตย์-พฤหัสบดี 6,990 บาท · ศุกร์-เสาร์ 7,990 บาท
- **ค่ามัดจำการจอง:** 3,000 บาท (รายละเอียดเช็คอิน/ช่องทางการจ่าย สอบถามเจ้าของตรงผ่าน LINE หรือโทร)
- รีวิว: **ห้ามแต่งรีวิว/คะแนนเอง** — หน้า Reviews ชี้ลูกค้าไปอ่านรีวิวจริงบน Google Maps + Facebook

### กติกา SEO ที่ผูกไว้กับโค้ด
- H1 เดียว: "พูลวิลล่าเทพา ติดทะเล สงขลา – PUYA Beach Villa" (ใน Hero เท่านั้น)
- Title: "Puya Beach Villa พูลวิลล่าเทพา ติดทะเล สงขลา พูลวิลล่า 2 หลังริมหาดส่วนตัว" (ใน `app/layout.tsx` — ใช้ `generateMetadata` อ่านโดเมนจาก env `NEXT_PUBLIC_SITE_URL`)
- Keyword หลัก: พูลวิลล่าเทพา / พูลวิลล่าเทพาติดทะเล / พูลวิลล่าติดทะเล เทพา / พูลวิลล่าเทพา สงขลา — ใช้เป็นธรรมชาติ ห้าม stuffing
- JSON-LD: LodgingBusiness + FAQPage (FAQ แสดงจริงบนหน้า `<details>` — แก้ FAQ คู่กันที่หน้า + `FAQ_ITEMS`)
- sitemap.xml + robots.txt สร้างอัตโนมัติจาก `app/sitemap.ts` / `app/robots.ts`
- canonical → `https://puya-web-three.vercel.app` (แก้ตรงเดียวใน `app/layout.tsx` หากเปลี่ยนโดเมน)
- Contrast: ปุ่ม LINE ใช้เขียวเข้ม `#0A5C33` (ไม่ใช่ LINE เขียวสด #06C755 เพราะ contrast ขาวไม่ผ่าน AA)

---

## 2. เครื่องมือ (Toolchain)

| เครื่องมือ | บทบาท |
|---|---|
| VS Code + OpenCode | พัฒนาโค้ด |
| Git + GitHub (บัญชี `comveesa`) | เก็บโค้ด, backup |
| Vercel | Deploy เว็บขึ้นอินเทอร์เน็ต |
| Next.js (App Router) + Tailwind CSS | Frontend framework |
| npm (sharp + heic-convert) | แปลงรูป HEIC → WebP |

> หมายเหตุ: ในแผนเดิมมี Supabase แต่เนื่องจากไม่มีระบบจอง/ฟอร์ม จึง**ไม่ใช้ Supabase** อย่างน้อยในเวอร์ชันแรก
> หากอนาคตต้องการระบบจอง/ฟอร์ม ค่อยเพิ่ม Supabase เข้ามาทีหลัง

---

## 3. แผน SDLC และขั้นตอนการทำงาน

### Phase 1: Planning — ✅ เสร็จ
- เก็บความต้องการเรียบร้อย (ดูหัวข้อ 1)

### Phase 2: Analysis & Design — ✅ เสร็จ (รีดีไซน์ปี 2026)
- โครงสร้างใหม่ 12 section ตาม SEO Master Task:
  1. Hero (H1 เดียว + CTA) 2. About 3. Villa 1&2 4. Bedrooms 5. Pool & Water Slide
  6. Facilities 7. Pricing & Booking 8. Gallery 9. Reviews (ลิงก์รีวิวจริง) 10. Location & Maps
  11. FAQ `<details>` 12. Final Booking CTA
- Component แยกใน `components/`: SiteHeader, StickyBookBar, SiteFooter, BookingCta (ปุ่ม LINE/โทร ใช้ซ้ำได้), SectionHeading
- Font: Prompt (next/font, subsets thai+latin)

### Phase 3: Development — ✅ เสร็จ (Redesign 2026-11-08)
- ✅ `lib/business.ts` — ข้อมูลธุรกิจ + รูป + ราคา + FAQ (แหล่งเดียว)
- ✅ หน้า `app/page.tsx` 12 sections ครบ ใช้ข้อมูลจาก lib
- ✅ SEO ครบ: layout metadata (title/desc/OG/Twitter/canonical), `app/sitemap.ts`, `app/robots.ts`, JSON-LD (LodgingBusiness + FAQPage)
- ✅ Sticky mobile booking bar (LINE + โทร) · รูปใหม่ชุด img6xxx นำมาใช้ (ห้องนอนวิวสระ, ลาน BBQ, โต๊ะพูลวิวทะเล)

### Phase 4: Testing — ✅ เสร็จ
- `npm run build` ผ่าน (static prerender, First Load JS ~108 kB)
- Browser ทดสอบจริง + Lighthouse: **Accessibility 100 / Best Practices 100 / SEO 83→94 (dev-mode false alarm เมื่อ prod มี meta description จริง)**
- แก้ contrast ครบ: eyebrow สี stonewash-600, ปุ่ม LINE เขียวเข้ม #0A5C33
- ⚠️ เกร็ด: ห้ามรัน `npm run build` ขณะ `npm run dev` เปิดอยู่ — cache .next พัง (ต้องลบ .next + restart)

### Phase 5: Deployment — ✅ เสร็จ
- Live: https://puya-web-three.vercel.app (auto-deploy จาก main ทุกครั้งที่ push)

### Phase 6: Maintenance — 🔵 ทำต่อเนื่อง
- แผนเพิ่มอันดับต่อจากนี้: ลงทะเบียน Google Search Console + Bing, ติดตั้ง Analytics, เก็บข้อมูล check-in เงื่อนไขมัดจำ, รีวิวถ่ายขึ้น Maps เพิ่ม, custom domain + Share OG image ขนาด 1200×630

---

## 4. โครงสร้างไฟล์ที่วางไว้

```
puya-web/
├── agent.md            ← ไฟล์นี้ (คู่มือ)
├── last-process.md     ← บันทึกความคืบหน้าล่าสุด (อัปเดตทุกครั้ง)
├── README.md
├── .gitignore          ← ปิดไม่ให้ commit: HEIC/JPG ต้นฉบับ, node_modules, .next
├── images/             ← รูปต้นฉบับ 38 รูป (25 HEIC + 13 JPG) — ไม่ commit
├── scripts/            ← สคริปต์แปลงรูป (Node)
├── app/                ← Next.js App Router
├── public/images/      ← รูป .webp ที่แปลงแล้ว (commit ได้)
└── package.json
```

---

## 5. กติกาการทำงานของ agent

1. **อ่าน `last-process.md` ก่อนเริ่มทุกครั้ง**
2. เมื่อทำงานสำเร็จแต่ละชิ้น:
   - อัปเดต `last-process.md` (เพิ่มขั้นตอนใหม่ + วันที่ + สิ่งที่ทำ + ขั้นถัดไป)
   - `git add .` + `git commit` ข้อความภาษาอังกฤษสั้น กระชับ + `git push`
3. หากติดปัญหาที่ต้องถามเจ้าของ (เช่น ราคา, เบอร์โทร) ให้จดไว้ใน `last-process.md` ส่วน "รอข้อมูล"
4. ทุกครั้งเปลี่ยนสถานะ Phase ให้แก้ทั้ง `agent.md` (หัวข้อ 3) และ `last-process.md` ให้ตรงกัน
5. คอมมิตเป็นก้อนเล็ก ๆ ตามหน้างาน ไม่รวมทีเดียวหลายเรื่อง
