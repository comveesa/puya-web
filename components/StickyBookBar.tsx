import { BUSINESS } from "@/lib/business";
import { LineIcon } from "./BookingCta";

/** แถบจองติดล่างจอมือถือ — LINE + โทร พร้อมใช้ตลอดเวลา */
export function StickyBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="grid grid-cols-2 gap-px bg-black/10 pb-[env(safe-area-inset-bottom)]">
        <a
          href={BUSINESS.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 items-center justify-center gap-2 bg-[#0A5C33] text-[15px] font-semibold text-white"
        >
          <LineIcon className="h-5 w-5" />
          จองผ่าน LINE
        </a>
        <a
          href={`tel:${BUSINESS.phoneIntl}`}
          className="flex h-14 items-center justify-center gap-2 bg-charcoal text-[15px] font-semibold text-white"
        >
          โทร {BUSINESS.phone}
        </a>
      </div>
    </div>
  );
}
