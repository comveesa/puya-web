import Image from "next/image";
import { BUSINESS, BUSINESS_ADDRESS_FULL, FAQ_ITEMS } from "@/lib/business";
import { BookingCta, BookLineButton } from "@/components/BookingCta";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyBookBar } from "@/components/StickyBookBar";
import { SiteFooter } from "@/components/SiteFooter";

const HOME_BADGES = [
  "จองตรงกับเจ้าของ",
  `รับ ${BUSINESS.capacity} คน/หลัง`,
  `สระ ${BUSINESS.poolSize} + สไลเดอร์น้ำ`,
];

const VILLA_STATS = [
  { n: "2", label: "หลังวิลล่าส่วนตัว" },
  { n: "3", label: "ห้องนอน · 3 ห้องน้ำ" },
  { n: "12", label: "คนต่อหลัง" },
  { n: "3×6", label: "เมตร สระว่ายน้ำ" },
];

const VILLA_FEATURES = [
  "สระว่ายน้ำส่วนตัว 3×6 ม. + สไลเดอร์น้ำ",
  "ห้องปาร์ตี้ + คาราโอเกะ · สมาร์ท TV 55 นิ้ว",
  "โต๊ะพูล 7 ฟุต",
  "ห้องครัวอุปกรณ์ครบ (แยกชุดพุทธ/มุสลิม)",
  "โซนปิ้งย่าง BBQ ริมวิวทะเล",
  "แอร์ทั้งหลัง (ยกเว้นห้องครัว) · ที่จอดรถ",
];

/** JSON-LD — ข้อมูลธุรกิจจริงเท่านั้น (ไม่มีรีวิว/คะแนนแต่งขึ้น) */
const LODGING_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${BUSINESS.url}/#lodging`,
  name: BUSINESS.nameTh,
  alternateName: BUSINESS.name,
  url: BUSINESS.url,
  image: `${BUSINESS.url}${BUSINESS.heroImage}`,
  telephone: BUSINESS.phoneIntl,
  priceRange: "฿฿",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.subdistrict,
    addressRegion: "สงขลา",
    postalCode: BUSINESS.address.postcode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  sameAs: [BUSINESS.facebook, BUSINESS.tiktok, BUSINESS.lineUrl, BUSINESS.googleMapsUrl],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Private Swimming Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Water Slide", value: true },
    { "@type": "LocationFeatureSpecification", name: "Karaoke", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pool Table", value: true },
    { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
    { "@type": "LocationFeatureSpecification", name: "BBQ Area", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
  ],
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function VillaCard({
  title,
  image,
}: {
  title: string;
  image: { src: string; alt: string };
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="flex grow flex-col p-6 md:p-8">
        <h3 className="text-2xl font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-stone-600">
          3 ห้องนอน · 3 ห้องน้ำ · รับ {BUSINESS.capacity} คน
        </p>
        <ul className="mt-5 space-y-2.5 text-[15px] text-stone-700">
          {VILLA_FEATURES.map((f) => (
            <li key={f} className="flex gap-2.5">
              <span aria-hidden className="mt-1 text-[#0A5C33]">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-stone-600">
          เริ่มต้น{" "}
          <b className="text-lg text-ink">
            ฿{BUSINESS.pricing[0].price.toLocaleString("th-TH")}
          </b>{" "}
          /คืน (อา.–พฤ.)
        </p>
        <a
          href="#pricing"
          className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-ink"
        >
          ดูราคาทั้งหมด →
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="pb-16 md:pb-0">
      <SiteHeader />

      {/* 1) HERO */}
      <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal">
        <Image
          src={BUSINESS.heroImage}
          alt="สระว่ายน้ำส่วนตัว สไลเดอร์น้ำ และบ้านขาวของ PUYA Beach Villa พูลวิลล่าเทพาติดทะเล"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-32 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-beige">
            Thepha · Songkhla
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            พูลวิลล่าเทพา ติดทะเล&nbsp;สงขลา
            <span className="mt-1 block text-2xl font-light text-beige md:text-3xl">
              – PUYA Beach Villa –
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sand/90 md:text-lg">
            บ้านขาวสไตล์มินิมอล 2 หลัง ริมชายหาดเทพา — สระว่ายน้ำส่วนตัว {BUSINESS.poolSize}{" "}
            พร้อมสไลเดอร์น้ำ คาราโอเกะ โต๊ะพูล ห้องครัวครบ และโซน BBQ ริมทะเล
          </p>
          <div className="mt-8">
            <BookingCta tone="dark" />
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5 text-[13px] text-sand/90">
            {HOME_BADGES.map((b) => (
              <li key={b} className="rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/15 backdrop-blur">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2) ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About PUYA"
              title="เกี่ยวกับ PUYA Beach Villa"
              desc={`ที่พักเทพา สงขลา สไตล์ Modern Mediterranean — บ้านขาวเตี้ย ๆ ริมชายหาดตำบลเทพา จังหวัดสงขลา เดินถึงทะเลได้ทันที บรรยากาศเงียบสงบ คนน้อย เหมาะทั้งครอบครัวและกลุ่มเพื่อนที่อยากพักแบบส่วนตัว`}
            />
            <p className="mt-4 max-w-2xl leading-relaxed text-stone-600">
              พูลวิลล่าติดทะเล {BUSINESS.villas} หลัง ขนาดและการตกแต่งเหมือนกันทุกหลัง —
              จองหลังเดียวพักได้ถึง {BUSINESS.capacity} คน หรือจองทั้งสองหลังสำหรับกลุ่มใหญ่
              พร้อมของใช้และอุปกรณ์ครบ ห่วงยางแฟนซี และของฟรีทุกการเข้าพัก
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {VILLA_STATS.map((s) => (
                <div key={s.label} className="rounded-2xl bg-sand px-4 py-5 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-semibold text-ink">{s.n}</dd>
                  <dd className="mt-1 text-xs leading-snug text-stone-600">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="overflow-hidden rounded-3xl ring-1 ring-black/5">
            <div className="relative aspect-[4/5] md:aspect-[3/4]">
              <Image
                src={BUSINESS.aboutImage.src}
                alt={BUSINESS.aboutImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* 3) VILLA 1 & 2 */}
      <section id="villas" className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Villa 1 & Villa 2"
            title="วิลล่าของเรา 2 หลัง ริมทะเล"
            desc="สองหลังขนาดและอุปกรณ์เหมือนกันหมด — เลือกจองหลังเดียว หรือจองทั้งสองหลังพักกันใหญ่ได้ในครั้งเดียว"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            <VillaCard title="วิลล่า 1" image={BUSINESS.villaImages[0]} />
            <VillaCard title="วิลล่า 2" image={BUSINESS.villaImages[1]} />
          </div>
        </div>
      </section>

      {/* 4) BEDROOMS */}
      <section id="bedrooms" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow="Bedrooms"
          title="3 ห้องนอน · 3 ห้องน้ำ · รับ 12 คน"
          desc="ทุกห้องมีเตียง 5 ฟุต 2 เตียง ผ้าปู–ผ้าห่ม–ผ้าขนหนูพร้อมใช้ และแอร์เย็นสบาย"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BUSINESS.rooms.map((room) => (
            <article
              key={room.id}
              className="group overflow-hidden rounded-3xl bg-white ring-1 ring-black/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-ink">{room.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{room.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5) PRIVATE POOL & WATER SLIDE */}
      <section id="pool" className="bg-charcoal py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            tone="dark"
            eyebrow="Private Pool & Water Slide"
            title="สระว่ายน้ำส่วนตัว + สไลเดอร์น้ำ"
            desc={`สระส่วนตัวขนาด ${BUSINESS.poolSize} พร้อมสไลเดอร์น้ำและห่วงยางแฟนซี — เด็ก ๆ สนุกทั้งวัน ผู้ใหญ่ผ่อนคลายกับวิวทะเลด้านหลังบ้าน`}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {BUSINESS.poolImages.map((img) => (
              <figure key={img.src} className="overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <BookingCta tone="dark" />
          </div>
        </div>
      </section>

      {/* 6) FACILITIES */}
      <section id="facilities" className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Facilities"
            title="ครบทุกอย่างสำหรับปาร์ตี้และความสบาย"
            desc="อยากร้องเพลง เล่นบิลเลียด ทำอาหาร หรือย่าง BBQ ริมทะเล — อยู่ที่เดียวจบทุกกิจกรรม"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BUSINESS.facilities.map((f) => (
              <article
                key={f.title}
                className="rounded-3xl bg-white p-6 ring-1 ring-black/5"
              >
                <p className="text-3xl" aria-hidden>
                  {f.icon}
                </p>
                <h3 className="mt-3 font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{f.detail}</p>
              </article>
            ))}
          </div>

          {/* ของฟรีประจำการเข้าพัก */}
          <div className="mt-8 rounded-3xl bg-beige/60 p-6 ring-1 ring-beige md:p-8">
            <h3 className="font-semibold text-ink">🎁 ฟรีทุกการเข้าพัก</h3>
            <ul className="mt-3 flex flex-wrap gap-2.5 text-sm text-stone-800">
              {BUSINESS.freebies.map((item) => (
                <li key={item} className="rounded-full bg-white px-4 py-1.5 ring-1 ring-black/5">
                  ✅ ฟรี {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7) PRICING & BOOKING */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow="Pricing"
          title="ราคาจองตรงกับเจ้าของ — ไม่มีค่าแอป"
          desc="ราคาต่อหลังต่อคืน รวมผู้เข้าพักถึง 12 คน และของฟรีในการเข้าพัก ตรวจสอบวันว่างผ่าน LINE หรือโทรศัพท์"
        />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {BUSINESS.pricing.map((p) => (
            <article
              key={p.id}
              className="flex flex-col items-center rounded-3xl bg-white p-8 text-center ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-600">
                {p.day}
              </p>
              <p className="mt-3 text-4xl font-semibold text-ink">
                ฿{p.price.toLocaleString("th-TH")}
              </p>
              <p className="mt-2 text-sm text-stone-600">ต่อหลัง / ต่อคืน</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-stone-600">
          *จองโดยตัดมัดจำ — รายละเอียดเช็คอิน/ช่องทางการจ่าย สอบถามกับเจ้าของโดยตรงผ่าน LINE
        </p>
        <div className="mt-8">
          <BookingCta />
        </div>
      </section>

      {/* 8) GALLERY */}
      <section id="gallery" className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Gallery"
            title="แกลเลอรีภาพจริงจากบ้าน"
            desc="ทุกภาพถ่ายที่ทำเนาบรรยากาศจริงของ PUYA Beach Villa ตำบลเทพา อำเภอเทพา จังหวัดสงขลา"
          />
          <div className="mt-12 columns-2 gap-4 md:columns-3 [&>figure]:mb-4">
            {BUSINESS.gallery.map((img) => (
              <figure key={img.src} className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9) REVIEWS — ชี้ไปรีวิวจริงบน Google Maps / Facebook ไม่แต่งรีวิวเอง */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow="Reviews"
          title="อ่านรีวิวจริงของผู้เข้าพัก"
          desc="เราไม่นำรีวิวมาเขียนใหม่บนเว็บไซต์ — อ่านรีวิวจริงทั้งหมดจากผู้เข้าพักได้ในช่องทางที่จริงเท่านั้น"
        />
        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3.5 text-sm font-semibold text-white shadow transition hover:bg-ink"
          >
            อ่านรีวิวบน Google Maps
          </a>
          <a
            href={BUSINESS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink ring-1 ring-charcoal/25 shadow transition hover:ring-charcoal/60"
          >
            Facebook {BUSINESS.facebookName}
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-stone-600">
          พบเราบน Google Maps ในชื่อ “{BUSINESS.nameTh}” · {BUSINESS_ADDRESS_FULL}
        </p>
      </section>

      {/* 10) LOCATION & MAPS */}
      <section id="location" className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Location"
            title="ที่ตั้ง & แผนที่นำทาง"
            desc={`${BUSINESS_ADDRESS_FULL} — กดแผนที่เพื่อเปิดนำทางด้วย Google Maps ได้ทันที`}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.5fr]">
            <article className="rounded-3xl bg-white p-8 ring-1 ring-black/5">
              <h3 className="text-lg font-semibold text-ink">PUYA Beach Villa</h3>
              <p className="mt-2 leading-relaxed text-stone-700">{BUSINESS_ADDRESS_FULL}</p>
              <p className="mt-3 text-sm text-stone-600">
                พิกัดจริง: {BUSINESS.geo.lat.toFixed(4)}, {BUSINESS.geo.lng.toFixed(4)}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-ink"
                >
                  🗺️ เปิด Google Maps
                </a>
                <a
                  href={`tel:${BUSINESS.phoneIntl}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-charcoal/25 transition hover:ring-charcoal/60"
                >
                  โทร {BUSINESS.phone}
                </a>
              </div>
            </article>
            <figure className="overflow-hidden rounded-3xl ring-1 ring-black/5">
              <div className="aspect-[16/10] md:aspect-auto md:h-full md:min-h-[420px]">
                <iframe
                  title="แผนที่ Google Maps ของ PUYA Beach Villa ตำบลเทพา จังหวัดสงขลา"
                  src={BUSINESS.mapEmbed}
                  className="h-full min-h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 11) FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow="FAQ"
          title="คำถามที่พบบ่อยก่อนจอง"
          desc="รวมคำตอบจากสิ่งที่ลูกค้าถามบ่อยที่สุด — ถ้ายังไม่ครบทุกข้อสงสัย ถามเจ้าของผ่าน LINE ได้เลย"
        />
        <div className="mt-10 divide-y divide-beige">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2 font-medium text-ink transition group-open:text-[#0A5C33]">
                <h3 className="text-left">{item.q}</h3>
                <span aria-hidden className="shrink-0 text-xl text-stone-600 transition group-open:rotate-45 group-open:text-[#0A5C33]">
                  ＋
                </span>
              </summary>
              <p className="mt-2 pb-2 leading-relaxed text-stone-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 12) FINAL BOOKING CTA */}
      <section id="booking" className="relative overflow-hidden bg-charcoal">
        <Image
          src={BUSINESS.ctaImage.src}
          alt={BUSINESS.ctaImage.alt}
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center md:px-6 md:py-32">
          <h2 className="text-3xl font-semibold leading-snug text-white md:text-5xl">
            พร้อมจองพูลวิลล่าเทพา ติดทะเลสงขลา
          </h2>
          <p className="mt-4 text-sand/85 md:text-lg">
            เช็ควันว่างและปักหมุดวันที่คุณอยากพัก — คุยกับเจ้าของโดยตรงผ่าน LINE หรือโทรศัพท์
          </p>
          <div className="mt-8">
            <BookingCta tone="dark" />
          </div>
          <p className="mt-6 text-sm text-sand/70">
            LINE ID {BUSINESS.lineId} · โทร {BUSINESS.phone}
          </p>
        </div>
      </section>

      <SiteFooter />
      <StickyBookBar />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LODGING_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
    </main>
  );
}
