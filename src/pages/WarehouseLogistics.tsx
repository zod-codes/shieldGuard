import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ContactOptionsModal } from "../components/ContactOptionsModal";
import { CheckCircle, BarChart3, Clock, Shield, Warehouse } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function WarehouseLogistics() {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const { onContactClick } = useOutletContext<OutletContext>();

  const features = [
    {
      icon: Warehouse,
      title: "Modern Facilities",
      description: "State-of-the-art warehouses with climate control and security"
    },
    {
      icon: BarChart3,
      title: "Inventory Management",
      description: "Advanced systems for real-time inventory tracking"
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "24/7 surveillance and comprehensive security measures"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Quick order fulfillment and shipping turnaround"
    }
  ];

  const services = [
    "Short-term & Long-term Storage",
    "Cross-Docking Services",
    "Pick & Pack Operations",
    "Inventory Management",
    "Order Fulfillment",
    "Returns Processing",
    "Quality Control",
    "Kitting & Assembly",
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1644079446600-219068676743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3MjU2Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Warehouse Logistics"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-4">Warehouse Logistics</h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              Complete warehousing solutions tailored to your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Warehouse Capabilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced logistics infrastructure for optimal efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                  >
                    <Icon size={32} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h4 className="mb-3">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-2" style={{ color: 'var(--primary)' }}>50+</div>
              <p className="text-gray-600">Warehouse Locations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2" style={{ color: 'var(--primary)' }}>2M+</div>
              <p className="text-gray-600">Sq. Ft. Storage</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2" style={{ color: 'var(--primary)' }}>99.9%</div>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2" style={{ color: 'var(--primary)' }}>24/7</div>
              <p className="text-gray-600">Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Warehouse Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <CheckCircle size={24} style={{ color: 'var(--primary)' }} className="mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Need Warehouse Space?</h2>
            <p className="text-gray-600 mb-8">
              Let's discuss your warehousing requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactOptions(true)}
                className="px-8 py-3 rounded-lg text-white transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Request a Quote
              </button>
              <button
                onClick={onContactClick}
                className="px-8 py-3 rounded-lg border-2 transition-colors"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
              >
                Schedule a Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options Modal */}
      <ContactOptionsModal
        isOpen={showContactOptions}
        onClose={() => setShowContactOptions(false)}
      />
    </div>
  );
}
