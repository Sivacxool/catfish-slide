import type { Metadata } from 'next';
import '../public/fonts/fonts.css';
import './globals.css';
export const metadata: Metadata = {
  title: 'CATFISH — เครื่องฟักไข่ปลาดุกอัจฉริยะ',
  icons: { icon: '/assets/catfish.webp' },
  description: 'ดูแลทุกจุดเริ่มต้นของชีวิต • นวัตกรรมเครื่องฟักไข่ปลาดุก โดยทีม Wongnaieiei',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
