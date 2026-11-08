import Image from "next/image";

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/PUYA.Beach.Villa",
    emoji: "📘",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@puya.beach.villa",
    emoji: "🎵",
  },
  {
    name: "Line",
    href: "https://line.me/R/ti/p/~puyabeach",
    emoji: "💬",
  },
];

const NAV = [
  { href: "#home", label: "หน้าแรก" },
  { href: "#villa", label: "ที่พัก" },
  { href: "#pool", label: "สระว่ายน้ำ" },
  { href: "#gallery", label: "แกลเลอรี" },
  { href: "#contact", label: "ติดต่อเรา" },
];

function SocialButtons({ size = "md" }: { size?: "md" | "lg" }) {
  const pad = size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm";
  return (
    <div className="flex flex-wrap gap-3">
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${pad} rounded-full bg-white/90 text-slate-900 font-semibold shadow-lg backdrop-blur transition hover:bg-white hover:-translate-y-0.5 inline-flex items-center gap-2`}
        >
          <span aria-hidden>{s.emoji}</span> {s.name}
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#home" className="text-lg font-bold tracking-wide">
            PUYA <span className="text-teal-600">Beach Villa</span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-slate-600 transition hover:text-teal-700"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
          >
            สอบถาม/จอง
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-[100svh] items-end overflow-hidden"
      >
        <Image
          src="/images/img1928.webp"
          alt="ลานสระว่ายน้ำพร้อมสไลเดอร์ ของ PUYA Beach Villa"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-28 md:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
            พูลวิลล่าริมทะเล · อ.เทพา จ.สงขลา
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-6xl">
            พักสบาย ว่ายน้ำสนุก
            <br />
            เห็นทะเลจากตัวบ้าน
          </h1>
          <p className="mt-4 max-w-xl text-slate-200 md:text-lg">
            พูลวิลล่าสไตล์มินิมอลสีขาว 3 ห้องนอน รับได้ถึง 12 คนต่อหลัง
            พร้อมสระว่ายน้ำและสไลเดอร์น้ำ ใกล้ชายหาดทะเลใต้ที่ยังสงบ
          </p>
          <div className="mt-6">
            <SocialButtons size="lg" />
          </div>
        </div>
      </section>

      {/* ที่พัก */}
      <section id="villa" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
          ที่พัก
        </p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
          พูลวิลล่า 1 และ พูลวิลล่า 2
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          ห้องพักทั้ง 2 หลังขนาดและการตกแต่งเหมือนกัน — แต่ละหลังมี{" "}
          <b>3 ห้องนอน 3 ห้องน้ำ</b> รับได้ถึง <b>12 คน</b> ห้องนั่งเล่นโล่งกว้างเชื่อมสระว่ายน้ำ
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/images/img1948.webp",
              alt: "ห้องนอนเตียงแฝดโทนครีม พร้อมหน้าต่างกลม",
              label: "ห้องนอน",
            },
            {
              src: "/images/img1866.webp",
              alt: "ห้องนั่งเล่นโซฟาหนังสีน้ำตาล พร้อมโต๊ะพูลและเคาน์เตอร์ครัว",
              label: "ห้องนั่งเล่น",
            },
            {
              src: "/images/img1870.webp",
              alt: "ห้องนอน 2 เตียงมองเห็นสระว่ายน้ำ",
              label: "มุมพักผ่อน",
            },
          ].map((img) => (
            <figure
              key={img.src}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm font-medium text-slate-600">
                {img.label}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* รายละเอียดห้องนอน */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "🛏️",
              label: "ห้องนอน 1",
              detail: "เตียง 5 ฟุต 2 เตียง (4 คน) ติดสระว่ายน้ำ",
            },
            {
              icon: "🛏️",
              label: "ห้องนอน 2",
              detail: "เตียง 5 ฟุต 2 เตียง (4 คน)",
            },
            {
              icon: "🛏️",
              label: "ห้องนอน 3",
              detail:
                "เตียง 5 ฟุต 2 เตียง (4 คน) ห้องน้ำในตัว ชั้น 2 เห็นวิวทะเล",
            },
          ].map((room) => (
            <div
              key={room.label}
              className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-100"
            >
              <p className="font-semibold text-slate-800">
                <span aria-hidden>{room.icon}</span> {room.label}
              </p>
              <p className="mt-1 text-sm text-slate-600">{room.detail}</p>
            </div>
          ))}
        </div>

        {/* ฟรีทุกการเข้าพัก */}
        <div className="mt-8 rounded-2xl bg-teal-50 p-6">
          <h3 className="font-bold text-slate-800">
            🎁 ฟรีทุกการเข้าพัก
          </h3>
          <ul className="mt-3 grid gap-2 text-slate-700 sm:grid-cols-2">
            <li>✅ ฟรี Wi-Fi</li>
            <li>✅ ฟรี น้ำแข็งในลัง 40 ลิตร</li>
            <li>✅ ฟรี น้ำดื่ม 1 โหล</li>
            <li>✅ ฟรี กาแฟ 12 ซอง</li>
            <li>✅ ฟรี ถ่าน 2 กิโลกรัม</li>
          </ul>
        </div>

        {/* ภายในโครง */}
        <div className="mt-8 rounded-2xl bg-slate-50 p-6">
          <h3 className="font-bold text-slate-800">
            🏠 ภายในและอุปกรณ์ครบพร้อมใช้
          </h3>
          <ul className="mt-3 grid gap-2 text-slate-700 sm:grid-cols-2">
            <li>✅ สระว่ายน้ำส่วนตัว ขนาด 3×6 เมตร + ห่วงยางแฟนซี 🏊🏻‍♂️</li>
            <li>✅ 1 ห้องครัว — อุปกรณ์แยกชุดพุทธและมุสลิม</li>
            <li>✅ 1 ห้องปาร์ตี้ พร้อมสมาร์ท TV 55 นิ้ว 🎺🥁🎤</li>
            <li>✅ ชุดโต๊ะปิ้งย่างเตา BBQ</li>
            <li>✅ โต๊ะพูล 7 ฟุต</li>
            <li>✅ แอร์ทั้งหลัง (ยกเว้นห้องครัว)</li>
            <li>✅ ตู้เย็น หม้อหุงข้าว กาน้ำร้อน</li>
            <li>✅ เตาแก๊ส เตาไมโครเวฟ กะทะ หม้อ ถังน้ำแข็ง</li>
            <li>✅ ชุดช้อนส้อม ถ้วยจานชาม 🍴🍽</li>
            <li>✅ ชุดแก้ว แก้วกาแฟ ☕️</li>
            <li>✅ ชุดมีดทำครัว ที่ปอกผลไม้ 🔪</li>
            <li>✅ ครกตำส้มตำ</li>
          </ul>
        </div>
      </section>

      {/* สระว่ายน้ำ */}
      <section id="pool" className="bg-teal-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
            จุดเด่น
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            สระว่ายน้ำ + สไลเดอร์น้ำ
          </h2>
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/img1897.webp"
                  alt="สไลเดอร์น้ำสีเขียวหยก สู่สระว่ายน้ำสีฟ้า วิวทะเลข้างหลัง"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </figure>
            <div className="space-y-4 text-slate-200">
              <p className="text-lg">
                สระส่วนตัวขนาด 3×6 เมตร พร้อมสไลเดอร์น้ำสีเขียวหยก — เด็ก ๆ สนุก
                เป็นที่สุด ส่วนผู้ใหญ่ผ่อนคลายกับน้ำสระสีฟ้าใส
                โดยมีวิวริมทะเลข้างหลัง
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="font-semibold">🌊 สงบส่วนตัว</p>
                  <p className="text-sm text-slate-400">
                    ชายหาดเงียบสงบ คนน้อย วิวสวย
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="font-semibold">🅿️ จอดรถ</p>
                  <p className="text-sm text-slate-400">
                    มีพื้นที่จอดรถภายใน สะดวกจอด
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="font-semibold">🪟 วิวทะเล</p>
                  <p className="text-sm text-slate-400">
                    ห้องพักและลานโล่ง มองเห็นน้ำทะเลสวย ๆ
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="font-semibold">👨‍👩‍👧 รองรับทุกกลุ่ม</p>
                  <p className="text-sm text-slate-400">
                    เหมาะทั้งแบบครอบครัวและกลุ่มเพื่อน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* แกลเลอรี */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
          แกลเลอรี
        </p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
          ดูภาพจริงของที่พัก
        </h2>
        <div className="mt-10 columns-2 gap-4 md:columns-3 [&>figure]:mb-4">
          {[
            { src: "/images/img3493.webp", alt: "ป้ายไม้ชี้ทางจอดรถและพูลวิลล่า", span: "" },
            { src: "/images/img0616.webp", alt: "สระว่ายน้ำและสไลเดอร์ด้านล่างชายหาด", span: "aspect-[4/3]" },
            { src: "/images/img0859.webp", alt: "ป้ายชื่อ PUYA BEACH VILLA อักษรดำ", span: "" },
            { src: "/images/img1948.webp", alt: "ห้องนอนโทนครีมเตียงแฝดหลายเตียง", span: "aspect-[4/3]" },
            { src: "/images/img1864.webp", alt: "ห้องนั่งเล่นโซฟาและโต๊ะพูล", span: "" },
            { src: "/images/img1869.webp", alt: "ห้องนอนเตียงแฝดมุมราวแขวนเสื้อไม้", span: "aspect-[4/3]" },
            { src: "/images/img1874.webp", alt: "ห้องนอนมองเห็นสระว่ายน้ำและสไลเดอร์", span: "" },
            { src: "/images/img1872.webp", alt: "ผ้าขนหนูจัดมุมบนเตียงพร้อมดอกลีลาวดี", span: "aspect-[4/3]" },
            { src: "/images/img0923.webp", alt: "ด้านหน้าบ้านสไตล์ขาวมินิมอลประดับกระถาง", span: "" },
            { src: "/images/img1209.webp", alt: "สระว่ายน้ำพร้อมวงยางลอยน้ำ", span: "aspect-[4/3]" },
            { src: "/images/img1225.webp", alt: "มุมมองจากด้านบน: วงยางลอยน้ำและปลายสไลเดอร์", span: "" },
            { src: "/images/img1319.webp", alt: "ป้าย PUYA BEACH VILLA เปิดไฟกลางคืน", span: "aspect-[4/3]" },
          ].map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl">
              <div
                className={`relative overflow-hidden ${img.span || "aspect-square"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-300 hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 50vw"
                />
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* ติดต่อเรา */}
      <section id="contact" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
            ติดต่อเรา
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            จองพัก / สอบถาม
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-slate-600">
                ช่องทางติดต่อผ่าน Line โดยตรงที่ <b>puyabeach</b>
                หรือทางโซเชียลตามปุ่มด้านล่าง — สอบถามและจองได้เร็วที่สุด
              </p>
              <SocialButtons size="lg" />
              <a
                href="tel:+66928613745"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-teal-700"
              >
                <span aria-hidden>📞</span> โทร 092-861-3745
              </a>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <iframe
                  title="แผนที่ PUYA Beach Villa"
                  src="https://maps.google.com/maps?q=PUYA%20Beach%20Villa%20%E0%B8%9E%E0%B8%B9%E0%B8%A2%E0%B9%88%E0%B8%B2%20%E0%B8%9A%E0%B8%B5%E0%B8%8A%20%E0%B8%A7%E0%B8%B4%E0%B8%A5%E0%B8%A5%E0%B9%88%E0%B8%B2&z=15&output=embed"
                  className="h-[360px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-sm text-slate-500">
                📍 อำเภอเทพา จังหวัดสงขลา — แผนที่ชี้ตำแหน่งจริงของที่พัก (กดป้ายในแผนที่เพื่อเปิดนำทางใน Google Maps ได้เลย)
              </p>
              <p className="text-sm text-slate-500">
                📞 โทร 092-861-3745 · แผนที่:{" "}
                <a
                  href="https://maps.app.goo.gl/QHRFVZVc4vvrps6d7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline"
                >
                  เปิด Google Maps
                </a>
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/img0937.webp"
                  alt="ทางเดินหน้าบ้านสไตล์ขาวของ PUYA Beach Villa"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center md:px-6">
          <p className="text-lg font-bold">
            PUYA <span className="text-teal-600">Beach Villa</span>
          </p>
          <SocialButtons />
          <p className="text-sm text-slate-500">
            พูลวิลล่าริมทะเล อ.เทพา จ.สงขลา · © {new Date().getFullYear()} PUYA
            Beach Villa
          </p>
        </div>
      </footer>
    </main>
  );
}
