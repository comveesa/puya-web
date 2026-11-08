import { BUSINESS } from "@/lib/business";
import type { ReactNode } from "react";

/** เปลี่ยนโทนของปุ่มตามพื้นหลังส่วนที่วาง */
export type Tone = "light" | "dark";
export type Size = "md" | "lg";

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function LineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function BaseButton({
  href,
  external,
  children,
  className,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
  className: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold shadow transition hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </a>
  );
}

export function BookLineButton({ tone = "light", size = "md" }: { tone?: Tone; size?: Size }) {
  return (
    <BaseButton
      href={BUSINESS.lineUrl}
      external
      className={`${SIZES[size]} bg-[#0A5C33] text-white shadow-md hover:brightness-110`}
    >
      <LineIcon className="h-5 w-5" />
      จองผ่าน LINE
    </BaseButton>
  );
}

export function BookPhoneButton({ tone = "light", size = "md" }: { tone?: Tone; size?: Size }) {
  return (
    <BaseButton
      href={`tel:${BUSINESS.phoneIntl}`}
      className={
        tone === "light"
          ? `${SIZES[size]} bg-white text-ink ring-1 ring-charcoal/25 hover:ring-charcoal/60`
          : `${SIZES[size]} bg-white text-ink hover:bg-sand`
      }
    >
      <PhoneIcon className="h-4 w-4" />
      โทร {BUSINESS.phone}
    </BaseButton>
  );
}

/** ชุด CTA จอง: LINE + โทรศัพท์ (ใช้ซ้ำหลาย section) */
export function BookingCta({ tone = "light", size = "lg" }: { tone?: Tone; size?: Size }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <BookLineButton tone={tone} size={size} />
      <BookPhoneButton tone={tone} size={size} />
    </div>
  );
}
