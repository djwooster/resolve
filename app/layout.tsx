import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/sidebar';
import { CallProvider } from '@/components/call/call-context';
import { CallWidget } from '@/components/call/call-widget';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Resolve — Revenue Enforcement',
  description: 'Real-time lead enforcement and revenue protection for high-performance sales teams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0A0A0B] text-white antialiased`}>
        <CallProvider>
          <Sidebar />
          <main className="pl-64 min-h-screen">
            {children}
          </main>
          <CallWidget />
        </CallProvider>
      </body>
    </html>
  );
}
