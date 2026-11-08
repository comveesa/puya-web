import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "PUYA Beach Villa | พูลวิลล่าริมทะเล อ.เทพา จ.สงขลา",
  description:
    "พูลวิลล่าสัญชาติไทยแบบมินิมอลติดชายหาด อ.เทพา จ.สงขลา มีสระว่ายน้ำและสไลเดอร์น้ำ เหมาะกับครอบครัวและกลุ่มเพื่อน จอง/สอบถามผ่าน Facebook, TikTok และ Line",
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
