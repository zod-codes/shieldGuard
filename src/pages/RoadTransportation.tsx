import { useOutletContext } from "react-router-dom";
import { Truck, CheckCircle, Clock, Shield, MapPin } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function RoadTransportation() {
  const { onContactClick } = useOutletContext<OutletContext>();

  const features = [
    {
      icon: Truck,
      title: "Fleet Management",
      description: "Access to a diverse fleet of modern vehicles for all cargo types"
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description: "Round-the-clock service with real-time tracking and updates"
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description: "Comprehensive insurance coverage for all shipments"
    },
    {
      icon: MapPin,
      title: "Nationwide Coverage",
      description: "Extensive network covering all major routes and destinations"
    }
  ];

  const services = [
    "Full Truckload (FTL)",
    "Less Than Truckload (LTL)",
    "Temperature-Controlled Transport",
    "Hazardous Materials Transport",
    "Oversized Cargo Transport",
    "Express Delivery"
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1738507869660-b44ea20ab037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGhpZ2h3YXklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3Mjk1ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Road Transportation"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-4">Road Transportation</h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              Reliable and efficient ground freight solutions for businesses of all sizes
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose Our Road Transportation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Industry-leading service with cutting-edge technology
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

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg">
                  <CheckCircle size={24} style={{ color: 'var(--primary)' }} className="mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Ready to Ship?</h2>
            <p className="text-gray-600 mb-8">
              Get a quote for your road transportation needs today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-lg text-white transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <a href="https://t.me/ShieldGuard_Transport_Services">
                  Request a Quote
                </a>
              </button>
              <button
                onClick={onContactClick}
                className="px-8 py-3 rounded-lg border-2 transition-colors"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
