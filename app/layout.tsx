import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

const SITE = "https://puya-web-three.vercel.app";
const TITLE = "พูลวิลล่าเทพา ติดทะเล สงขลา | PUYA Beach Villa";
const DESCRIPTION =
  "PUYA Beach Villa พูลวิลล่าเทพาติดทะเล แบบส่วนตัว 2 หลัง ริมชายหาดอำเภอเทพา จังหวัดสงขลา — 3 ห้องนอน 3 ห้องน้ำ รับได้ถึง 12 คนต่อหลัง สระว่ายน้ำส่วนตัว 3×6 เมตร พร้อมสไลเดอร์น้ำ คาราโอเกะ โต๊ะพูล ห้องครัวครบอุปกรณ์ และโซน BBQ จองตรงกับเจ้าของ ใช้ต้นทุนน้อยกว่าแอปจอง โทร 092-861-3745";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "พูลวิลล่าเทพา",
    "พูลวิลล่าเทพาติดทะเล",
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
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    siteName: "PUYA Beach Villa",
    type: "website",
    locale: "th_TH",
    images: [
      {
        url: "/images/img1928.webp",
        width: 1200,
        height: 630,
        alt: "สระว่ายน้ำส่วนตัวและสไลเดอร์น้ำของ PUYA Beach Villa พูลวิลล่าเทพาติดทะเล",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/img1928.webp"],
  },
};

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
