import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Golden Crown Casino',
  description: 'Experience the thrill of premium online gaming',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#1A1A1A]`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navigation>{children}</Navigation>
        </ThemeProvider>
      </body>
    </html>
  );
}