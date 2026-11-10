/**
 * Logic คิดราคาประมาณการและประกอบข้อความจองสำหรับ BookingPlanner
 * ราคา/มัดจำอ่านจาก lib/business.ts เท่านั้น (ห้าม hardcode ซ้ำที่นี่)
 */
import { BUSINESS } from "./business";

export type VillaChoice = "villa1" | "villa2" | "both";

export const VILLA_COUNT: Record<VillaChoice, number> = {
  villa1: 1,
  villa2: 1,
  both: 2,
};

export const VILLA_LABEL: Record<VillaChoice, string> = {
  villa1: "พูลวิลล่า 1",
  villa2: "พูลวิลล่า 2",
  both: "พูลวิลล่า 1 + พูลวิลล่า 2",
};

/** ราคาต่อคืน: อาทิตย์–พฤหัสบดี / ศุกร์–เสาร์ (อ่านจาก BUSINESS.pricing) */
function nightlyRate(date: Date): number {
  const dow = date.getDay(); // 0=อาทิตย์ ... 6=เสาร์
  const weekday = BUSINESS.pricing.find((p) => p.id === "weekday")!.price;
  const weekend = BUSINESS.pricing.find((p) => p.id === "weekend")!.price;
  return dow === 5 || dow === 6 ? weekend : weekday;
}

/** แปลง "YYYY-MM-DD" เป็น Date แบบเวลาท้องถิ่น (กัน timezone เพี้ยนจาก new Date(string)) */
function parseLocalDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

export type Estimate = {
  nights: number;
  total: number;
  deposit: number;
};

/** คิดราคาประมาณการ: นับทีละคืน (ศ.-ส. ราคาสุดสัปดาห์) × จำนวนหลัง — คืน null ถ้าวันไม่ถูกต้อง */
export function calcEstimate(
  checkIn: string,
  checkOut: string,
  choice: VillaChoice,
): Estimate | null {
  const start = parseLocalDate(checkIn);
  const end = parseLocalDate(checkOut);
  if (!start || !end) return null;
  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  if (nights <= 0) return null;
  const villaCount = VILLA_COUNT[choice];
  let total = 0;
  for (let i = 0; i < nights; i++) {
    const night = new Date(start);
    night.setDate(start.getDate() + i);
    total += nightlyRate(night) * villaCount;
  }
  return { nights, total, deposit: BUSINESS.depositPerVilla * villaCount };
}

const thNumber = new Intl.NumberFormat("th-TH");
const thDate = new Intl.DateTimeFormat("th-TH", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** ข้อความสำเร็จรูปสำหรับวางในแชท LINE (ใช้สำนวนกลาง ๆ ไม่ผู้เพศ ให้ลูกค้าส่งได้ทุกคน) */
export function composeLineMessage(args: {
  choice: VillaChoice;
  checkIn: string;
  checkOut: string;
  guests: number;
  estimate: Estimate;
}): string {
  const inDate = parseLocalDate(args.checkIn);
  const outDate = parseLocalDate(args.checkOut);
  return [
    "สวัสดี สนใจจอง PUYA Beach Villa",
    `• วิลล่า: ${VILLA_LABEL[args.choice]}`,
    `• เช็คอิน: ${inDate ? thDate.format(inDate) : args.checkIn}`,
    `• เช็คเอาท์: ${outDate ? thDate.format(outDate) : args.checkOut} (${args.estimate.nights} คืน)`,
    `• ผู้เข้าพัก: ${args.guests} คน`,
    `• ราคาประมาณการ: ${thNumber.format(args.estimate.total)} บาท`,
    `• ค่ามัดจำ: ${thNumber.format(args.estimate.deposit)} บาท`,
    "ขอสอบถามวันว่างและเงื่อนไขการจองด้วย",
  ].join("\n");
}
