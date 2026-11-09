/**
 * One-off: แปลงรูปไฟล์เดียวจาก images/ → public/images/*.webp
 * ใช้: node scripts/convert-one.mjs IMG_0608.HEIC
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import convertHEIC from "heic-convert";

const SRC_DIR = path.resolve(process.cwd(), "images");
const OUT_DIR = path.resolve(process.cwd(), "public", "images");
const MAX_WIDTH = 1600;
const QUALITY = 78;

const file = process.argv[2];
if (!file) {
  console.error("ระบุชื่อไฟล์ เช่น IMG_0608.HEIC");
  process.exit(1);
}

const srcPath = path.join(SRC_DIR, file);
const ext = path.extname(file).toLowerCase();
if (!(await fs.stat(srcPath)).isFile()) {
  console.error(`ไม่พบไฟล์: ${file}`);
  process.exit(1);
}

let buffer;
if (ext === ".heic") {
  const input = await fs.readFile(srcPath);
  buffer = await convertHEIC({ buffer: input, format: "JPEG", quality: 0.92 });
} else {
  buffer = await fs.readFile(srcPath);
}

const image = sharp(buffer).rotate();
const meta = await image.metadata();
console.log(`ขนาดต้นฉบับ: ${meta.width}×${meta.height}`);
if (meta.width && meta.width > MAX_WIDTH) {
  image.resize({ width: MAX_WIDTH });
}
const outName = `${path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9]/g, "")}.webp`;
await image.webp({ quality: QUALITY }).toFile(path.join(OUT_DIR, outName));
console.log(`✔ ${file} → public/images/${outName}`);
