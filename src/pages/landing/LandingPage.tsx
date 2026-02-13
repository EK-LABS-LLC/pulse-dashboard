import { LandingNav } from './LandingNav';
import { Hero } from './Hero';
import { Metrics } from './Metrics';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { Pricing } from './Pricing';
import { DocsCards } from './DocsCards';
import { Cta } from './Cta';
import { Footer } from './Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-neutral-300 antialiased" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <LandingNav />
      <Hero />
      <Metrics />
      <Features />
      <HowItWorks />
      <Pricing />
      <DocsCards />
      <Cta />
      <Footer />
    </div>
  );
}
