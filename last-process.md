# last-process.md — บันทึกความคืบหน้าล่าสุด

> 📌 agent ต้องอ่านไฟล์นี้ก่อนเริ่มทำงานทุกครั้ง
> รายการใหม่เพิ่มไว้ด้านบนสุดของส่วน "บันทึกการทำงาน"

## สถานะปัจจุบัน (อ่านก่อน)
- **Phase ปัจจุบัน:** Phase 6 — Maintenance 🔵 (Redesign ครบแล้วทั้งไซต์, deploy จริง)
- **เว็บออนไลน์:** https://puya-web-three.vercel.app
- **เสร็จแล้ว:** Planning ✅ · Design ✅ (รีดีไซน์ Minimal Luxury) · Development ✅ · Testing ✅ · Deploy ✅
- **ขั้นถัดไป:** Phase 6 Growth — Google Search Console + Bing, custom domain, ข้อมูลเช็คอิน/มัดจำ, รีวิว Maps เพิ่ม

---

## บันทึกการทำงาน

### [2026-11-09] (5) ปรับของฟรี: น้ำดื่ม 2 โหล
- เจ้าของยืนยันของฟรีเป็น **น้ำดื่ม 2 โหล** (เดิม 1 โหล) — แก้ครบทั้ง `freebies` (กล่อง "ฟรีทุกการเข้าพัก") และ FAQ "เข้าพักได้อะไรฟรีบ้าง?" (JSON-LD FAQPage อัปเดตเองตาม `FAQ_ITEMS`)

### [2026-11-09] (4) เขียนใหม่คำโปรย section About
- เจ้าของให้ข้อความใหม่: "พักผ่อนสุดชิลที่ Puya Beach Villa พูลวิลล่าสงขลาติดทะเล อำเภอเทพา..." แทนคำโปรย Modern Mediterranean เดิม — ครบคีย์เวิร์ด พูลวิลล่าสงขลาติดทะเล / บ้านพักติดทะเลสงขลา + จุดเด่น (สระสไลเดอร์ ปิ้งย่างซีฟู้ด คาราโอเกะ โต๊ะพูล) + CTA ปิดท้าย

### [2026-11-09] (3) ใช้ชื่อ "พูลวิลล่า 1 / พูลวิลล่า 2" ทั้งเว็บ
- เจ้าของขอใช้ชื่อเต็ม **พูลวิลล่า 1 / พูลวิลล่า 2** (เดิมใช้ "วิลล่า 1/2")
- แก้ครบ: การ์ด VillaCard (หัวหัว H3), SectionHeading "พูลวิลล่าของเรา 2 หลัง ริมทะเล", สถิติ About, เมนู header + footer nav, ข้อความ footer — เข้าช่วย keyword "พูลวิลล่า" ที่เป็นคำค้นของจริงด้วย

### [2026-11-09] (2) SEO Deep-pass ตามเช็กลิสต์บรีฟรอบ 2
- **`generateMetadata`** แทน static `metadata` (App Router ถูกต้อง — next/head เป็นของ Pages Router) · โดเมนอ่านจาก **env `NEXT_PUBLIC_SITE_URL`** พร้อมสลับ custom domain จุดเดียว
- **Title ใหม่** (ตามบรีฟ): "Puya Beach Villa พูลวิลล่าเทพา ติดทะเล สงขลา พูลวิลล่า 2 หลังริมหาดส่วนตัว"
- **Meta description** ตัดใหม่เหลือ **131 ตัวอักษร** (เกณฑ์ ≤160) ครบ keyword หลัก + ราคา/จองตรง
- เพิ่มคีย์เวิร์ด target ใหม่: **พูลวิลล่าสงขลา / พูลวิลล่าสงขลาติดทะเล** (keywords meta + ย่อหน้า About)
- **JSON-LD เพิ่ม `hasMap`** ชี้ Google Maps place (ยืนยันพิกัดต่อ Local Pack)
- คำสะกดผิดดักทราฟฟิก "พุลวิลล่าเทพา / พุลวิลล่าสงขลา": ใส่ใน **alt รูป 2 จุด** (ไม่ลง visible copy เพื่อไม่ให้ลูกค้าเห็น typo จริง — ถ้าเจ้าของอยากได้ในเนื้อหา แจ้งแล้วเปลี่ยนได้)
- Google Maps iframe มีอยู่แล้วใน section Location (ยืนยันครบเกณฑ์แผนที่ฝัง)
- Build ผ่าน → ยืนยัน static HTML มี title/keyword/hasMap/misspell ครบ → push main

### [2026-11-09] เปลี่ยนรูป Villa 1 → IMG_0608
- เจ้าของขอใช้รูป **IMG_0608** (สระ + สไลเดอร์สีส้มหน้าตึกวิลล่าขาว วิวทะเลชัด) แทนที่ในการ์ด Villa 1
- แปลง `IMG_0608.HEIC` → `public/images/img0608.webp` (4032×3024 → กว้าง 1600, quality 78) ด้วยสคริปต์ใหม่ `scripts/convert-one.mjs` (แปลงรายไฟล์ ไม่ต้องรัน convert ทั้งชุด)
- อัปเดต `lib/business.ts` → `villaImages[0]` (รูปเดิม img6708 ยังใช้อยู่ในแกลเลอรี ไม่หายไปไหน)
- Build ผ่าน (static ยืนยัน img0608 ใน HTML แล้ว) → commit `ec0cbd5` push main → Vercel auto-deploy

### [2026-11-08] 🔥 Redesign ใหญ่: 12-section Minimal Luxury + SEO suite ครบชุด
- **ธีมใหม่:** Minimal Luxury / Modern Mediterranean — Clean White / Warm Beige `#e8dfcf` / Sand `#f6f2ea` / Dark Charcoal `#26292e` (token ใน `app/globals.css` @theme)
- **โครงหน้าใหม่ 12 sections** (`app/page.tsx`): Hero (H1 เดียว "พูลวิลล่าเทพา ติดทะเล สงขลา – PUYA Beach Villa") → About → Villa 1&2 → Bedrooms 3 ห้อง → Pool & Water Slide → Facilities → Pricing & Booking (ราคาจริง 6,990/7,990) → Gallery 16 รูป → Reviews (ลิงก์รีวิวจริง Google Maps + FB ไม่แต่งรีวิว) → Location & Maps (iframe + ปุ่มเปิดแผนที่) → FAQ `<details>` → Final CTA
- **Components ใหม่:** `SiteHeader` (fixed + nav), `StickyBookBar` (mobile ล่างจอ: LINE + โทร), `SiteFooter`, `BookingCta` (ปุ่มจอง LINE/โทร ใช้ซ้ำใน 5 sections), `SectionHeading`
- **SEO suite:** metadata ใหม่ (title/description ใส่ keyword หลักครบ 4 ชุด), canonical, OG 1200×630, Twitter card, `app/sitemap.ts` + `app/robots.ts` (200 จริง), JSON-LD **LodgingBusiness** (ที่อยู่จริง 238 หมู่ 7 / พิกัด 6.8772047,100.9557731 / sameAs) + **FAQPage** (ใช้ `FAQ_ITEMS` ตรงกับ FAQ ที่แสดงบนหน้า)
- **`lib/business.ts`** = แหล่งข้อมูลเดียว (ที่อยู่, โทร, LINE ~puyabeach, FB/TikTok, Maps `GgQNT7SHbMB6YrKZA`, ราคา, ของฟรี, ห้องนอน, สิ่งอำนวยความสะดวก 8 ชุด, แกลเลอรี, FAQ)
- ใช้รูปชุดใหม่ img6xxx (ห้องนอนติดสระ img6811, ห้องวิวทะเล img6810, โต๊ะพูลวิวทะเล img6708, ลาน BBQ ริมทะเล img6757, ห้องอาบน้ำกลางแจ้ง img6742) — ทุกภาพเป็นภาพจริงจากเจ้าของ
- **QA:** `npm run build` ผ่าน (static, First Load JS ~108 kB) · ทุกข้อความสำคัญยืนยันใน HTML ที่ serve จริง (H1, ~puyabeach, 092-861-3745, 6,990/7,990, JSON-LD สองชุด) · Browser ทดสอบ: ไม่มี console error · **Lighthouse: Accessibility 100 / Best Practices 100 / SEO 83** (SEO ติดแค่ "ไม่มี meta description" ซึ่งเป็น **false alarm ของ dev mode** — ยืนยัน HTML จริงมี meta description สองรอบ)
- **แก้ contrast ตาม Lighthouse:** eyebrow `text-stone-500`→`text-stone-600`, ปุ่ม LINE `#06C755`→เขียวเข้ม **`#0A5C33`** (เขียว LINE สด+ตัวอักษรขาวผ่าน contrast ไม่ได้), ครบทุกจุดแล้ว
- **ลิงก์ Maps เปลี่ยน** `QHRFVZVc4vvrps6d7` → `GgQNT7SHbMB6YrKZA` (ชี้ place เดียวกัน แต่ใช้ลิงก์หลักตาม Master Task)
- ⚠️ เกร็ดเทคนิค: **ห้ามรัน `npm run build` ขณะ `npm run dev` เปิดอยู่** — cache `.next` พัง ("Cannot find module './770.js'"), วิธีแก้ = kill โปรเซส port 3000 → ลบ `.next` → restart
- commit `ee41dfd` push สู่ main → Vercel auto-deploy
- **ต่อไป:** ลงทะเบียน Google Search Console + Bing · custom domain · ข้อมูลเช็คอิน/เงื่อนไขมัดจำ (FAQ + fine print) · รีวิว Maps เพิ่ม

### [2026-11-08] ใส่ข้อมูลจริงครบรอบ: เบอร์โทร + รายละเอียดวิลล่า 3 ห้องนอน
- เพิ่มปุ่มโทร **092-861-3745** (tel:+66928613745) ในหน้าติดต่อ + ลิงก์เปิด Google Maps
- หน้า **ที่พัก** แทนข้อความ generic ด้วยข้อมูลจริงจากเจ้าของ:
  - หัวเรื่อง: 3 ห้องนอน 3 ห้องน้ำ รับ 12 คน/หลัง (ทั้ง hero, meta description, OG)
  - การ์ด 3 ห้อง: ห้อง 1–3 เตียง 5 ฟุต 2 เตียง (ห้อง 1 ติดสระ / ห้อง 3 ห้องน้ำในตัว ชั้น 2 วิวทะเล)
  - กล่อง "ฟรีทุกการเข้าพัก": Wi-Fi, น้ำแข็ง 40 ล., น้ำดื่ม 1 โหล, กาแฟ 12 ซอง, ถ่าน 2 กก.
  - กล่อง "ภายในและอุปกรณ์ครบ": ครัวแยกชุดพุทธ/มุสลิม, ห้องปาร์ตี้+TV 55", BBQ, โต๊ะพูล 7 ฟุต, สระ 3×6 ม.+ห่วงยาง, แอร์เว้นครัว, เครื่องครัวครบ, ครกตำ
- อัปเดต hero (12 คนต่อหลัง) + สระว่ายน้ำ (ขนาด 3×6 ม.)
- อัปเดต `agent.md`: ข้อมูลที่ได้แล้ว/ที่ยังขาด (เหลือราคา)
- ⚠️ ยังไม่ได้ใส่ **ราคา** — รอจากเจ้าของ

### [2026-11-08] Deploy ขึ้น Vercel สำเร็จ + แก้แผนที่ใช้ตำแหน่งจริง + proofread ข้อความไทย
- **เว็บขึ้นออนไลน์แล้ว:** https://puya-web-three.vercel.app (เจ้าของสมัคร Vercel + import repo สำเร็จ, auto-deploy จาก GitHub)
- หมายเหตุ: subdomain `puya-web.vercel.app` ถูกโปรเจกต์อื่นยึดก่อน จึงได้ชื่อ `puya-web-three`
- อัปเดต `metadataBase` ใน `app/layout.tsx` เป็นโดเมนจริง (ให้ OG image ตอนแชร์ทำงานถูก)
- **แผนที่หน้าติดต่อ** เปลี่ยนจากพิกัดระดับอำเภอ → ตำแหน่งจริงของที่พัก (Google Maps place "PUYA Beach Villa พูย่า บีช วิลล่า" @ 6.8772047, 100.9557731 — resolve จากลิงก์ maps.app.goo.gl ที่เจ้าของให้)
- Proofread ข้อความไทยใน `page.tsx` แล้วแก้คำผิด/แปลก ๆ หลายจุด: "ของห้องพักทั้ง 2 หลัง"→"ห้องพักทั้ง 2 หลัง", "ขอโทรทัศน์ ที่พักถันสะดวก"→"มีโทรทัศน์ พักผ่อนได้เต็มที่", "คุ้นเคุ้น"→"สนุก", "ชายหาดซิชชันกรรมาร"→"ชายหาดเงียบสงบ", "มองขึ้นน้ำทะเล"→"มองเห็นน้ำทะเล", "ดอกลีลาวัด"→"ดอกลีลาวดี", "ดูภาพจริง ของหลังโครง"→"ดูภาพจริงของที่พัก", "ทีมต้องการข้อมูลด้วยเยี่ยม"→"สอบถามและจองได้เร็วที่สุด", ปรับ alt รูปแกลเลอรีเป็นข้อความสื่อความหมาย
- Build ผ่าน → push → Vercel deploy อัตโนมัติ

### [2026-11-08] แก้ลิงก์ Line ให้ทำงานจริง
- ปัญหา: กดปุ่ม Line ในเว็บแล้วแอป Line ขึ้น "ข้อผิดพลาด — ไม่สามารถเปิดเพื่อนได้"
- สาเหตุ: `puyabeach` เป็น **Line ID แบบบัญชีบุคคล** ต้องใช้รูปแบบ `line.me/R/ti/p/~puyabeach` (รูปแบบ `@puyabeach` ใช้กับ Official Account เท่านั้น)
- ผมทดลอง fetch ลิงก์ `~puyabeach` แล้วจริงสำเร็จ (แสดง QR เพิ่มเพื่อน)
- แก้: `app/page.tsx` (ปุ่ม Line + ข้อความหน้าติดต่อ) และ `agent.md` (บันทึกรูปแบบลิงก์ถูกต้อง)
- ⚠️ ให้เจ้าของทดสอบกดปุ่ม Line อีกครั้งบนมือถือยืนยันว่าเปิดแอป Line ได้จริง

### [2026-11-08] สร้างหน้าเว็บเสร็จ (one-page) + แปลงรูปครบ
- ติดตั้ง Next.js 15.5 + Tailwind v4 (ไม่ใช้ create-next-app เพราะโฟลเดอร์มี `images/` อยู่), ผล build: First Load JS 108 kB (เบามาก)
- สคริปต์ `scripts/convert-images.mjs` (sharp + heic-convert) แปลงรูป **38/38 รูป** HEIC/JPG → `public/images/*.webp` (กว้าง ≤1600px, quality 78)
- ตัดหน้าเว็บ `app/page.tsx` ครบ 4 ส่วน + nav sticky + footer:
  1. **Hero** — รูป img1928 (ลานสระ+สไลเดอร์เต็มหน้าจอ) + ปุ่ม Facebook/TikTok/Line
  2. **ที่พัก** — พูลวิลล่า 1/2 (ตกแต่งเหมือนกัน): รูปห้องนอน img1948, ห้องนั่งเล่น img1866, มุมพัก img1870 + bullet จุดเด่นในบ้าน
  3. **สระว่ายน้ำ** — สไลเดอร์น้ำ (img1897) + จุดเด่น 4 ข้อ
  4. **แกลเลอรี** — 12 รูป (ป้ายไม้, ป้าย PUya, ห้อง, สระ, ป้ายไฟกลางคืน img1319 ฯลฯ)
  5. **ติดต่อเรา** — ปุ่มโซเชียล 3 ช่องทาง + Google Maps ระดับ อ.เทพา (รอพิกัดแม่นจากเจ้าของ)
- ใส่ Open Graph (image = img1928) ให้แชร์บน Facebook/Line สวย + metadataBase ชั่วคราว = https://puya-web.vercel.app (แก้ตอนมีโดเมนจริง)
- Font ไทย: Prompt (next/font) รัน dev server:
- รัน `npm run dev` สำเร็จ → preview ได้ที่ **http://localhost:3000**
- commit สำเร็จและ push ขึ้น `comveesa/puya-web` (รวมรูป webp 38 ไฟล์)
- **ขั้นถัดไป:** รอฟีดแบ็กเจ้าของ → responsive test → Vercel deploy

### [2026-11-08 (เช้า)] เริ่มโปรเจกต์ + จัดระเบียบทุกอย่าง
- สร้าง `agent.md` (คู่มือ SDLC ทั้งหมด) และ `last-process.md` (ไฟล์นี้)
- สร้าง `README.md`, `.gitignore` (ยกเว้น `images/` ต้นฉบับ)
- สร้าง repo GitHub `comveesa/puya-web` (public) + push จสอง commit แรก
- เครื่องมือ: git 2.43, Node v22.18, npm 10.9, gh CLI 2.96 (ล็อกอิน `comveesa` แล้ว)

### ข้อมูลอ้างอิงล่าสุดของโปรเจกต์
- เว็บ one-page ภาษาไทย: Hero → ที่พัก → สระว่ายน้ำ → แกลเลอรี → ติดต่อเรา
- พูลวิลล่า 1 / พูลวิลล่า 2 — ตกแต่งและขนาดเหมือนกัน (วิลล่าจึงนำเสนอรวมหน้าเดียว)
- ป้ายเข้าโครงที่ถูกต้อง: **จอดรถ / พูลวิลล่า 1 / พูลวิลล่า 2** (ใช้รูป img3493)
- เชื่อมโซเชียล: Facebook · TikTok (@puya.beach.villa) · Line (@puyabeach)
- Deploy เป้าหมาย: Vercel (เชื่อม GitHub `comveesa` หลังเจ้าของสมัคร/ยืนยัน)

### รอข้อมูลจากเจ้าของ
- เบอร์โทรศัพท์ติดต่อ (ยังไม่ได้ใส่ในเว็บ)
- พิกัด/ลิงก์ Google Maps แม่นยำ (ตอนนี้ใช้แผนที่ชี้ อ.เทพา คร่าว ๆ)
- รายละเอียดพัก: จำนวนห้องนอน/เตียงต่อหลัง/จำนวนคนสูงสุด/ราคา (ตอนนี้ใช้ข้อความ generic ตามรูป)
