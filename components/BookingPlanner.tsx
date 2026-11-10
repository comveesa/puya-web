"use client";

import { useMemo, useState } from "react";
import { BUSINESS } from "@/lib/business";
import {
  calcEstimate,
  composeLineMessage,
  VILLA_COUNT,
  VILLA_LABEL,
  type VillaChoice,
} from "@/lib/pricing";
import { LineIcon } from "./BookingCta";

const CHOICES: VillaChoice[] = ["villa1", "villa2", "both"];

/**
 * ฟอร์มวางแผนการเข้าพัก — เลือกวิลล่า/วันที่/จำนวนคน แล้วเรียบเรียงข้อความให้
 * ลูกค้า "คัดลอกข้อความ + เปิด LINE" (LINE บัญชีบุคคลใส่ข้อความล่วงหน้าทาง URL ไม่ได้)
 * การจองยังจบที่การคุยกับเจ้าของโดยตรง — ราคาบนหน้าเว็บเป็น "ประมาณการ" เท่านั้น
 */
export function BookingPlanner() {
  const [choice, setChoice] = useState<VillaChoice>("villa1");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(8);
  const [copied, setCopied] = useState(false);

  const estimate = useMemo(
    () => calcEstimate(checkIn, checkOut, choice),
    [checkIn, checkOut, choice],
  );

  const handleSend = async () => {
    if (!estimate) return;
    const message = composeLineMessage({
      choice,
      checkIn,
      checkOut,
      guests,
      estimate,
    });
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      // clipboard ใช้ไม่ได้ (เช่น http) — เปิด LINE ให้ต่อได้เลย
    }
    window.open(BUSINESS.lineUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold leading-snug text-white md:text-5xl">
        พร้อมจองพูลวิลล่าเทพา ติดทะเลสงขลา
      </h2>
      <p className="mt-4 text-sand/85 md:text-lg">
        เลือกวิลล่าและวันที่ — ระบบเรียบเรียงข้อความให้พร้อม คัดลอกแล้วส่งหาเจ้าของผ่าน LINE ได้ทันที
      </p>

      <div className="mx-auto mt-10 grid overflow-hidden rounded-2xl border border-beige bg-white text-left md:grid-cols-[1.3fr_1fr]">
        {/* ฟอร์ม */}
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-semibold text-ink">เลือกการเข้าพักของคุณ</h3>

          <fieldset className="mt-6">
            <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
              วิลล่า
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {CHOICES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setChoice(c)}
                  aria-pressed={choice === c}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    choice === c
                      ? "border-charcoal bg-charcoal text-white"
                      : "border-beige text-stone-600 hover:border-charcoal/40"
                  }`}
                >
                  {VILLA_LABEL[c]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
              วันเข้าพัก — วันออก
            </legend>
            <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
              <label className="rounded-xl border border-beige px-4 py-2.5 text-sm text-ink">
                <span className="block text-[11px] tracking-wide text-stone-500">
                  วันเช็คอิน
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-0.5 w-full bg-transparent outline-none"
                  aria-label="วันเช็คอิน"
                />
              </label>
              <label className="rounded-xl border border-beige px-4 py-2.5 text-sm text-ink">
                <span className="block text-[11px] tracking-wide text-stone-500">
                  วันเช็คเอาท์
                </span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-0.5 w-full bg-transparent outline-none"
                  aria-label="วันเช็คเอาท์"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
              จำนวนผู้เข้าพัก
            </legend>
            <div className="mt-2.5 inline-flex items-center gap-4 rounded-full border border-beige px-3 py-1.5">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                aria-label="ลดจำนวนผู้เข้าพัก"
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-stone-600 transition hover:bg-sand"
              >
                −
              </button>
              <span className="min-w-14 text-center text-sm font-semibold text-ink">
                {guests} คน
              </span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(24, g + 1))}
                aria-label="เพิ่มจำนวนผู้เข้าพัก"
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-stone-600 transition hover:bg-sand"
              >
                +
              </button>
            </div>
          </fieldset>
        </div>

        {/* สรุปยอด */}
        <div className="flex flex-col justify-center bg-charcoal p-6 text-sand md:p-8">
          {estimate ? (
            <>
              <div className="flex justify-between text-sm text-sand/85">
                <span>ราคา {estimate.nights} คืน × {VILLA_COUNT[choice]} หลัง</span>
                <b className="font-semibold text-white">฿{estimate.total.toLocaleString("th-TH")}</b>
              </div>
              <div className="mt-3 flex justify-between border-t border-sand/25 pt-3 text-base">
                <span>ประมาณการทั้งหมด</span>
                <b className="text-2xl font-semibold text-white">
                  ฿{estimate.total.toLocaleString("th-TH")}
                </b>
              </div>
              <div className="mt-2 flex justify-between text-sm text-sand/85">
                <span>ค่ามัดจำ ({BUSINESS.depositPerVilla.toLocaleString("th-TH")} บาท × {VILLA_COUNT[choice]} หลัง)</span>
                <b className="font-semibold text-white">฿{estimate.deposit.toLocaleString("th-TH")}</b>
              </div>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-sand/80">
              เลือกวันเช็คอิน–เช็คเอาท์เพื่อดูราคาประมาณการ
            </p>
          )}

          <button
            type="button"
            onClick={handleSend}
            disabled={!estimate}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#0A5C33] px-6 py-3.5 text-sm font-semibold text-white shadow transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LineIcon className="h-5 w-5" />
            คัดลอกข้อความ &amp; เปิด LINE
          </button>
          <p className="mt-2.5 text-center text-xs leading-relaxed text-sand/65">
            {copied
              ? "✔ คัดลอกแล้ว — กดวางในแชท LINE เพื่อส่งหาเจ้าของ"
              : "ราคาเป็นประมาณการ — เงื่อนไขจริงยืนยันกับเจ้าของในแชท"}
          </p>

          <a
            href={`tel:${BUSINESS.phoneIntl}`}
            className="mt-4 text-center text-sm font-medium text-white underline decoration-sand/40 underline-offset-4 transition hover:decoration-sand"
          >
            หรือโทร {BUSINESS.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
