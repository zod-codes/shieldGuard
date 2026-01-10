import { useOutletContext } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { InfoCards } from '../components/InfoCards';
import { ProductsSection } from '../components/ProductsSection';
import { MapSection } from '../components/MapSection';
import { ServicesSection } from '../components/ServicesSection';
import { TestimonialsSection } from "../components/TestimonialsSection";
import { PartnersSection } from "../components/PartnersSection";
import { CTASection } from '../components/CTASection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

interface OutletContextType {
  onContactClick: () => void;
  onTrackingClick: () => void;
}

export function Home() {
  const { onContactClick, onTrackingClick } = useOutletContext<OutletContextType>();

  return (
    <div className="min-h-screen">
      <Hero onTrackingClick={onTrackingClick} />
      <InfoCards onContactClick={onContactClick} />
      <ProductsSection />
      <MapSection />
      <ServicesSection onContactClick={onContactClick} />
      <TestimonialsSection />
      <PartnersSection />

      {/* CTA for Carriers */}
      <CTASection
        variant="dark"
        title="For Carriers"
        description="Expand your business and get access to thousands of new orders"
        features={[
          "Steady flow of orders",
          "Transparent working conditions",
          "Fast payments",
          "24/7 technical support"
        ]}
        onContactClick={onContactClick}
      />

      {/* CTA for Shippers */}
      <CTASection
        variant="light"
        title="For Shippers"
        description="Simplify the transportation organization process and save time"
        features={[
          "Large base of verified carriers",
          "Competitive prices",
          "Online cargo tracking",
          "Security guarantee"
        ]}
        onContactClick={onContactClick}
      />
      <ContactSection />
      <Footer />
    </div>
  );
}