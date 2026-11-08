import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puya-web-three.vercel.app"),
  title: "PUYA Beach Villa | พูลวิลล่าริมทะเล อ.เทพา จ.สงขลา",
  description:
    "พูลวิลล่าสัญชาติไทยแบบมินิมอลติดชายหาด อ.เทพา จ.สงขลา 3 ห้องนอน 3 ห้องน้ำ รับได้ถึง 12 คน/หลัง มีสระว่ายน้ำ สไลเดอร์น้ำ และห้องปาร์ตี้ในตัว จอง/สอบถามผ่าน Facebook, TikTok และ Line",
  openGraph: {
    title: "PUYA Beach Villa | พูลวิลล่าริมทะเล อ.เทพา จ.สงขลา",
    description:
      "พูลวิลล่าสไตล์มินิมอลสีขาว 3 ห้องนอน 3 ห้องน้ำ รับได้ถึง 12 คน/หลัง พร้อมสระว่ายน้ำและสไลเดอร์น้ำ ใกล้ชายหาดทะเลใต้ อ.เทพา จ.สงขลา",
    images: ["/images/img1928.webp"],
    type: "website",
    locale: "th_TH",
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
