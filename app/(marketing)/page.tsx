import { MarketingNav } from '@/components/marketing/nav';
import { Hero } from '@/components/marketing/hero';
import { Problem } from '@/components/marketing/problem';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Features } from '@/components/marketing/features';
import { Integrations } from '@/components/marketing/integrations';
import { MetricsTicker } from '@/components/marketing/metrics-ticker';
import { Testimonials } from '@/components/marketing/testimonials';
import { Pricing } from '@/components/marketing/pricing';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { Footer } from '@/components/marketing/footer';

export const metadata = {
  title: 'Resolve — Revenue Enforcement for Sales Teams',
  description:
    'Resolve monitors every lead in your CRM in real time, flagging missed calls, slow follow-ups, and broken sales processes before they cost you revenue.',
  openGraph: {
    title: 'Resolve — Stop Losing Revenue to Slow Follow-Up',
    description:
      'Real-time lead monitoring and alerts for sales managers. Connects to GoHighLevel, HubSpot, and Salesforce.',
    type: 'website',
  },
};

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <MarketingNav />
      <Hero />
      <MetricsTicker />
      <Problem />
      <HowItWorks />
      <Features />
      <Integrations />
      <Testimonials />
      <Pricing />
      <CtaBanner />
      <Footer />
    </div>
  );
}
