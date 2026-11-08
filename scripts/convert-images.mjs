/**
 * แปลงรูปใน images/ (HEIC + JPG) → public/images/*.webp สำหรับเว็บ
 * รันด้วย: npm run convert
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import convertHEIC from "heic-convert";

const SRC_DIR = path.resolve(process.cwd(), "images");
const OUT_DIR = path.resolve(process.cwd(), "public", "images");

const MAX_WIDTH = 1600; // ความกว้างสูงสุดพอสำหรับ hero/แกลเลอรี
const QUALITY = 78; // คุณภาพ webp

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function outName(file) {
  const base = path.basename(file, path.extname(file));
  return `${base.toLowerCase().replace(/[^a-z0-9]/g, "")}.webp`;
}

async function main() {
  await ensureDir(OUT_DIR);
  const files = (await fs.readdir(SRC_DIR)).filter((f) =>
    /\.(heic|jpe?g|png)$/i.test(f),
  );
  if (files.length === 0) {
    console.log("ไม่พบรูปใน images/");
    return;
  }

  let done = 0;
  for (const file of files) {
    const srcPath = path.join(SRC_DIR, file);
    const ext = path.extname(file).toLowerCase();
    let buffer;

    if (ext === ".heic") {
      const input = await fs.readFile(srcPath);
      buffer = await convertHEIC({
        buffer: input, // Buffer ของไฟล์ HEIC
        format: "JPEG", // ผ่าน JPEG ก่อน แล้วค่อย encode เป็น webp ด้วย sharp
        quality: 0.92,
      });
    } else {
      buffer = await fs.readFile(srcPath);
    }

    const image = sharp(buffer).rotate(); // rotate() อ่าน EXIF orientation ให้อัตโนมัติ
    const meta = await image.metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      image.resize({ width: MAX_WIDTH });
    }
    await image.webp({ quality: QUALITY }).toFile(path.join(OUT_DIR, outName(file)));
    done++;
    console.log(`✔ ${file} → ${outName(file)}`);
  }

  console.log(`\nแปลงสำเร็จ ${done}/${files.length} รูป → public/images/`);
}

main().catch((err) => {
  console.error("แปลงรูปไม่สำเร็จ:", err);
  process.exit(1);
});
