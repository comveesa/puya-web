import { BUSINESS, BUSINESS_ADDRESS_FULL } from "@/lib/business";

const NAV = [
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "#villas", label: "พูลวิลล่า" },
  { href: "#pricing", label: "ราคา & การจอง" },
  { href: "#gallery", label: "แกลลอรี่" },
  { href: "#location", label: "ที่ตั้ง & แผนที่" },
  { href: "#faq", label: "คำถามที่พบบ่อย" },
];

const SOCIALS = [
  { name: "Facebook", href: BUSINESS.facebook },
  { name: "TikTok", href: BUSINESS.tiktok },
  { name: "LINE", href: BUSINESS.lineUrl, external: true },
];

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-sand">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-white">
              PUYA <span className="font-medium text-sand">Beach Villa</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-sand/75">
              {BUSINESS.tagline} — พูลวิลล่าส่วนตัว 2 หลัง 3 ห้องนอน 3 ห้องน้ำ
              รับได้ถึง 12 คนต่อหลัง สระว่ายน้ำพร้อมสไลเดอร์ จองตรงกับเจ้าของ
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand/60">
              ติดต่อ
            </p>
            <ul className="mt-3 space-y-2 text-sm text-sand/85">
              <li>
                <a href={`tel:${BUSINESS.phoneIntl}`} className="hover:text-white">
                  📞 {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={BUSINESS.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  💬 LINE ID: {BUSINESS.lineId}
                </a>
              </li>
              <li>📍 {BUSINESS_ADDRESS_FULL}</li>
              <li>
                <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-sand/40 hover:text-white">
                  เปิด Google Maps
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand/60">
              ลิงก์ภายใน
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-sand/85">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-4 text-sm">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-sand/60">
          © {new Date().getFullYear()} {BUSINESS.name} · เว็บไซต์จองตรงกับเจ้าของที่พัก —{" "}
          {BUSINESS_ADDRESS_FULL}
        </div>
      </div>
    </footer>
  );
}
