/**
 * สร้าง OG image 1200×630 (JPEG) สำหรับแชร์ Facebook/LINE/WhatsApp
 * ใช้: node scripts/make-og.mjs
 * ต้นทาง: public/images/img1928.webp → public/images/og-puya.jpg
 */
import sharp from "sharp";
import path from "node:path";

const SRC = path.resolve(process.cwd(), "public", "images", "img1928.webp");
const OUT = path.resolve(process.cwd(), "public", "images", "og-puya.jpg");

await sharp(SRC)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 85 })
  .toFile(OUT);

console.log(`✔ OG image → public/images/og-puya.jpg (1200×630)`);
