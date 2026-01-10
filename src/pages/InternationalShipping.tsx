import { useOutletContext } from "react-router-dom";
import { Globe, CheckCircle, Plane, FileCheck, DollarSign } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function InternationalShipping() {
  const { onContactClick } = useOutletContext<OutletContext>();


  const features = [
    {
      icon: Globe,
      title: "Global Network",
      description: "Shipping to over 200 countries and territories worldwide"
    },
    {
      icon: FileCheck,
      title: "Customs Clearance",
      description: "Expert handling of all customs documentation and procedures"
    },
    {
      icon: Plane,
      title: "Air & Sea Freight",
      description: "Flexible shipping options to meet your timeline and budget"
    },
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Best-in-class pricing with transparent cost structure"
    }
  ];

  const services = [
    "Air Freight Services",
    "Ocean Freight (FCL & LCL)",
    "Customs Brokerage",
    "International Documentation",
    "Cargo Insurance",
    "Door-to-Door Delivery",
    "Freight Forwarding",
    "Trade Compliance"
  ];

  const routes = [
    { from: "North America", to: "Europe", transit: "5-7 days" },
    { from: "Asia", to: "North America", transit: "10-15 days" },
    { from: "Europe", to: "Asia", transit: "12-18 days" },
    { from: "North America", to: "South America", transit: "7-10 days" }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1614568111194-3c251800e81e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVpZ2h0JTIwY29udGFpbmVyJTIwc2hpcHBpbmd8ZW58MXx8fHwxNzY3Mjk1ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="International Shipping"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-4">International Shipping</h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              Seamless global logistics connecting your business to the world
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">International Shipping Excellence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for your cross-border logistics needs
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

      {/* Popular Routes */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-12">Popular Shipping Routes</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((route, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">{route.from}</span>
                  <svg className="w-6 h-6" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-gray-700">{route.to}</span>
                </div>
                <p className="text-sm text-gray-600">Transit Time: {route.transit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Our Services</h2>
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
            <h2 className="mb-4">Ship Internationally Today</h2>
            <p className="text-gray-600 mb-8">
              Get competitive rates for your international shipments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-lg text-white transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <a href="https://t.me/ShieldGuard_Transport_Services">
                  Get a Quote
                </a>
              </button>
              <button
                onClick={onContactClick}
                className="px-8 py-3 rounded-lg border-2 transition-colors"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
