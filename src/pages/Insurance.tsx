import { useOutletContext } from "react-router-dom";
import { Shield, CheckCircle, DollarSign, Clock, Award } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function Insurance() {
  const { onContactClick } = useOutletContext<OutletContext>();


  const features = [
    {
      icon: Shield,
      title: "Comprehensive Coverage",
      description: "Full protection against loss, damage, and delays"
    },
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Affordable premiums with flexible payment options"
    },
    {
      icon: Clock,
      title: "Quick Claims",
      description: "Fast and efficient claims processing"
    },
    {
      icon: Award,
      title: "Trusted Provider",
      description: "Backed by top-rated insurance carriers"
    }
  ];

  const coverageTypes = [
    {
      title: "All-Risk Coverage",
      description: "Comprehensive protection for all types of cargo",
      features: [
        "Loss or damage from any external cause",
        "Theft and pilferage",
        "Natural disasters",
        "Accidents during transport"
      ]
    },
    {
      title: "Named Perils Coverage",
      description: "Protection against specific risks",
      features: [
        "Fire and explosion",
        "Collision and overturning",
        "Earthquake and flood",
        "Customizable coverage options"
      ]
    },
    {
      title: "Liability Coverage",
      description: "Protection for carrier liability",
      features: [
        "Third-party liability",
        "Cargo liability",
        "Customs and duties protection",
        "Legal expense coverage"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-4">Cargo Insurance</h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              Protect your shipments with comprehensive insurance coverage
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose Our Insurance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Peace of mind for every shipment with industry-leading coverage
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

      {/* Coverage Types */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-12">Coverage Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coverageTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-8">
                <h3 className="mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-3">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle size={20} style={{ color: 'var(--primary)' }} className="mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  1
                </div>
                <h4 className="mb-2">Get a Quote</h4>
                <p className="text-gray-600">Provide shipment details and receive instant quote</p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  2
                </div>
                <h4 className="mb-2">Purchase Policy</h4>
                <p className="text-gray-600">Complete simple online application and payment</p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  3
                </div>
                <h4 className="mb-2">Ship Protected</h4>
                <p className="text-gray-600">Your cargo is covered from pickup to delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Protect Your Shipment Today</h2>
            <p className="text-gray-600 mb-8">
              Get an instant quote and secure your cargo in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-lg text-white transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <a href="https://t.me/ShieldGuard_Transport_Services">
                  Get Insurance Quote
                </a>
              </button>
              <button
                onClick={onContactClick}
                className="px-8 py-3 rounded-lg border-2 transition-colors"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
