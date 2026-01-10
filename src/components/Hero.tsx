import { Package, ArrowRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrackingPopup } from './TrackingPopup';

interface HeroProps {
  onTrackingClick?: () => void;
}

export function Hero({ onTrackingClick }: HeroProps) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTrackingPopup, setShowTrackingPopup] = useState(false);
  const navigate = useNavigate();

  const handleTrack = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setShowTrackingPopup(true);
    }
  }, [trackingNumber]);

  const handleGetStarted = useCallback(() => {
    navigate('/road-transportation');
  }, [navigate]);

  const handleLearnMore = useCallback(() => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleTrackingPage = useCallback(() => {
    if (onTrackingClick) {
      onTrackingClick();
    }
  }, [onTrackingClick]);

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1485575301924-6891ef935dcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Logistics background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-20 md:pt-24">
        <div className="max-w-3xl">
          <h1 className="text-white mb-6">
            Digital Platform
            <br />
            for Freight Transportation
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 opacity-90">
            Modern solution for organizing and managing logistics processes
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="px-8 py-3 rounded-lg text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)' }}
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            {/* Mobile: Tracking Page button */}
            <button
              className="md:hidden px-8 py-3 rounded-lg bg-white text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              onClick={handleTrackingPage}
            >
              <span>Tracking Page</span>
              <ArrowRight size={20} />
            </button>
            {/* Desktop: Learn More button */}
            <button
              className="hidden md:flex px-8 py-3 rounded-lg bg-white text-gray-800 hover:bg-gray-100 transition-colors items-center justify-center gap-2"
              onClick={handleLearnMore}
            >
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tracking Widget - Bottom Right - Hidden on Mobile */}
      <div className="hidden md:block absolute bottom-8 right-4 md:right-8 z-20">
        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-auto max-w-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Package size={20} style={{ color: 'var(--primary)' }} />
            <h4 className="text-gray-800">Track Shipment</h4>
          </div>
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 text-gray-800"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-white transition-colors whitespace-nowrap hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Track
            </button>
          </form>
        </div>
      </div>

      {/* Tracking Popup - Desktop Only */}
      <div className="hidden md:block">
        <TrackingPopup
          isOpen={showTrackingPopup}
          onClose={() => setShowTrackingPopup(false)}
          trackingNumber={trackingNumber || 'FD-2026-001234'}
        />
      </div>
    </section>
  );
}