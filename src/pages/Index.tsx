import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { HeroSection } from '@/components/sections/HeroSection';

import { MapSection } from '@/components/sections/MapSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import { CTASection } from '@/components/sections/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        {/* Decorative gold diagonal divider between Hero and Map */}
        <div className="relative h-20 overflow-hidden bg-gradient-to-b from-charcoal-dark to-navy-dark">
          <div className="absolute inset-0">
            <svg className="w-full h-full border" preserveAspectRatio="none" viewBox="0 0 1440 80">
              <polygon points="0,0 1440,60 1440,80 0,80" fill="hsl(var(--navy-dark))" />
              <line x1="0" y1="0" x2="1440" y2="60" stroke="hsl(var(--gold))" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <MapSection />
        {/* Decorative gold diagonal divider between Map and Services */}
        <div className="relative h-20 overflow-hidden bg-gradient-to-b from-charcoal-dark to-navy-dark">
          <div className="absolute inset-0">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 80">
              <polygon points="0,0 1440,60 1440,80 0,80" fill="hsl(var(--navy-dark))" />
              <line x1="0" y1="0" x2="1440" y2="60" stroke="hsl(var(--gold))" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <ServicesSection />
        <AdvantagesSection />
        <ResultsSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>);

};

export default Index;