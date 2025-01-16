import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Echorix - AI-Powered Financial Chat',
  description: 'Real-time market insights and intelligent financial chat platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
