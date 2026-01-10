import { ChevronDown, Truck, Package, Globe, Shield } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  icon: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
  title: string;
  description: string;
  page: string;
}

const PRODUCTS: Product[] = [
  {
    icon: Truck,
    title: "Road Transportation",
    description: "Ground freight solutions",
    page: "/road-transportation"
  },
  {
    icon: Package,
    title: "Warehouse Logistics",
    description: "Storage and fulfillment",
    page: "/warehouse-logistics"
  },
  {
    icon: Globe,
    title: "International Shipping",
    description: "Global freight services",
    page: "/international-shipping"
  },
  {
    icon: Shield,
    title: "Insurance",
    description: "Cargo protection",
    page: "/insurance"
  }
];

export function ProductsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleProductClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Products</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <Link
                key={product.page}
                to={product.page}
                onClick={handleProductClick}
                className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-start space-x-3 no-underline"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                >
                  <Icon size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-0.5">{product.title}</div>
                  <div className="text-sm text-gray-600">{product.description}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
