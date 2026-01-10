import { Mail, Phone, MapPin, Facebook, X, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const handleSocialClick = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    };
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <footer
      className="text-white py-12 md:py-16"
      style={{ backgroundColor: 'var(--dark-blue)' }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="mb-4">ShieldGuard</h4>
            <p className="text-gray-400 mb-4">
              Digital platform for modern freight transportation
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick('facebook')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </button>
              <button
                onClick={() => handleSocialClick('twitter')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <X size={20} />
              </button>
              <button
                onClick={() => handleSocialClick('linkedin')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </button>
              <button
                onClick={() => handleSocialClick('instagram')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/road-transportation" className="text-gray-400 hover:text-white transition-colors">
                  Road Transportation
                </Link>
              </li>
              <li>
                <Link to="/warehouse-logistics" className="text-gray-400 hover:text-white transition-colors">
                  Warehouse Logistics
                </Link>
              </li>
              <li>
                <Link to="/international-shipping" className="text-gray-400 hover:text-white transition-colors">
                  International Shipping
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="text-gray-400 hover:text-white transition-colors">
                  Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Team
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { }}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Partners
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contacts">
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-400">
                <a href='https://wa.me/message/T2WKXBUB4BB4O1' className='flex'>
                  <Phone size={18} className="mr-3 mt-1 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                  <span>+1 (512) 560-0649</span>
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <Mail size={18} className="mr-3 mt-1 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                <span>info@findicar.com</span>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                <span>Moscow, 123, Primyrnaya St.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © 2026 Findicar. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button
                onClick={() => { }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => { }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
