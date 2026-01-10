import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductsDropdown } from "../components/ProductsDropdown";
import { Menu, X, Package } from 'lucide-react';

interface HeaderProps {
  onTrackingClick?: () => void;
  onContactClick: () => void;
}

export function Header({ onTrackingClick, onContactClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleTrackingClick = () => {
    if (onTrackingClick) {
      onTrackingClick();
      setIsMenuOpen(false);
    }
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
      setIsMenuOpen(false);
    }
  };

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold hover:opacity-80 transition-opacity"
              style={{ color: 'var(--primary)' }}
            >
              ShieldGuard
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ProductsDropdown />
            <button
              onClick={() => handleSmoothScroll('advantages')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Advantages
            </button>
            <button
              onClick={() => handleSmoothScroll('about')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </button>
            {/* <button
              onClick={() => handleSmoothScroll('contacts')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contacts
            </button> */}
            <Link
              to="/careers"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Careers
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              className="px-6 py-2.5 rounded-lg text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)' }}
              onClick={handleContactClick}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={handleTrackingClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
              >
                <Package size={20} style={{ color: 'var(--primary)' }} />
                <span>Track Shipment</span>
              </button>
              <button
                onClick={() => handleNavigate('/road-transportation')}
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
              >
                Road Transportation
              </button>
              <button
                onClick={() => handleNavigate('/warehouse-logistics')}
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
              >
                Warehouse Logistics
              </button>
              <button
                onClick={() => handleNavigate('/international-shipping')}
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
              >
                International Shipping
              </button>
              <button
                onClick={() => handleNavigate('/insurance')}
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
              >
                Insurance
              </button>
              {/* <button
                onClick={() => handleSmoothScroll('advantages')}
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
              >
                Advantages
              </button> */}
              <Link
                to="/about-us"
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
              >
                About Us
              </Link>
              {/* <button
                onClick={() => handleSmoothScroll('contacts')}
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
              >
                Contacts
              </button> */}
              {/* <Link
                to="/careers"
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </Link> */}
              <button
                onClick={handleContactClick}
                className="px-6 py-2.5 rounded-lg text-white transition-colors w-full hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Contact Us
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
