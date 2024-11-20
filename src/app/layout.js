import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

// Font definition
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: "Stanford GPA Calculator",
  description: "Calculate your projected GPA based on Stanford's 4.3 scale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
