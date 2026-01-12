import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TrackingPage } from '../components/TrackingPage';
import { ContactModal } from '../components/ContactModal';
import { ScrollToTop } from '../components/Scrolltotop';

export function RootLayout() {
  const [showTrackingPage, setShowTrackingPage] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const location = useLocation();

  const handleContactUs = () => {
    setShowContactModal(true);
  };

  const handleTrackingClick = () => {
    setShowTrackingPage(true);
  };

  const isHomePage = location.pathname === '/';
  const isTrue = true;

  return (
    <div className="min-h-screen">
      <ScrollToTop />

      <Header
        onTrackingClick={() => setShowTrackingPage(true)}
        onContactClick={handleContactUs}
      />

      <Outlet context={{ onContactClick: handleContactUs, onTrackingClick: handleTrackingClick }} />

      {/* Footer for non-home pages */}
      {!isHomePage && <Footer />}

      {/* Mobile Tracking Page */}
      <TrackingPage
        isOpen={isTrue&&showTrackingPage}
        onClose={() => setShowTrackingPage(false)}
      />

      {/* Auth Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  );
}
