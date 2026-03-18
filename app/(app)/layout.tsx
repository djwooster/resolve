import { Sidebar } from '@/components/layout/sidebar';
import { CallProvider } from '@/components/call/call-context';
import { CallWidget } from '@/components/call/call-widget';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CallProvider>
      <Sidebar />
      <main className="pl-64 min-h-screen">
        {children}
      </main>
      <CallWidget />
    </CallProvider>
  );
}
