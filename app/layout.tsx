import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

/**
 * URL โดเมนหลัก — ตั้งค่าผ่าน env ได้ (ตอนเปลี่ยน custom domain
 * ใส่ NEXT_PUBLIC_SITE_URL=https://โดเมนใหม่ ใน Vercel แค่จุดเดียว)
 */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://puya-web-three.vercel.app";

/** Title ใส่คีย์เวิร์ดหลักครบ: พูลวิลล่าเทพา / ติดทะเล / สงขลา */
const TITLE =
  "Puya Beach Villa พูลวิลล่าเทพา ติดทะเล สงขลา พูลวิลล่า 2 หลังริมหาดส่วนตัว";

/** Meta description — 155 ตัวอักษร (เกณฑ์ ≤160) คีย์เวิร์ดหลัก + จุดเด่น + ช่องทางจอง */
const DESCRIPTION =
  "พูลวิลล่าเทพาติดทะเล สงขลา 2 หลังริมหาดส่วนตัว 3 ห้องนอน รับ 12 คน สระว่ายน้ำ+สไลเดอร์ คาราโอเกะ BBQ จองตรงเจ้าของ โทร 092-861-3745";

const OG_IMAGE = {
  url: "/images/img1928.webp",
  width: 1200,
  height: 630,
  alt: "สระว่ายน้ำส่วนตัวและสไลเดอร์น้ำของ Puya Beach Villa พูลวิลล่าเทพาติดทะเล สงขลา",
};

export async function generateMetadata({
  /* หน้าเว็บเดี่ยว (one-page) ใช้ base metadata ตัวเดียว — เผื่อต่อยอดหน้าอื่นในอนาคต */
}: {
  params?: Promise<Record<string, string>>;
}): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE),
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
      "พูลวิลล่าเทพา",
      "พูลวิลล่าสงขลา",
      "พูลวิลล่าเทพาติดทะเล",
      "พูลวิลล่าสงขลาติดทะเล",
      "พูลวิลล่าติดทะเล เทพา",
      "พูลวิลล่าเทพา สงขลา",
      "ที่พักเทพา สงขลา",
      "บ้านพักติดทะเลเทพา",
      "พูลวิลล่า 12 คน สงขลา",
      "ที่พักริมทะเลสงขลา",
    ],
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    applicationName: "Puya Beach Villa",
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: SITE,
      siteName: "Puya Beach Villa",
      type: "website",
      locale: "th_TH",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [OG_IMAGE.url],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} ${prompt.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
