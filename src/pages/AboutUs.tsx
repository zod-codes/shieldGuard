import { useOutletContext } from "react-router-dom";
import { Target, Eye, Award, Users, TrendingUp, Globe } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function AboutUs() {
  const { onContactClick } = useOutletContext<OutletContext>();


  const stats = [
    { value: "15+", label: "Years of Experience" },
    { value: "10K+", label: "Happy Clients" },
    { value: "50+", label: "Countries Served" },
    { value: "500+", label: "Partner Carriers" }
  ];

  const values = [
    {
      icon: Target,
      title: "Customer Focus",
      description: "We put our customers at the heart of everything we do, delivering exceptional service and support."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every shipment, every interaction, and every solution we provide."
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Our success is built on collaboration, trust, and the collective expertise of our team."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously evolve our technology and processes to stay ahead in the logistics industry."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "With a worldwide network, we connect businesses across borders and continents."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We believe in honest communication and clear pricing with no hidden fees."
    }
  ];

  const timeline = [
    {
      year: "2009",
      title: "Founded",
      description: "Shield Guard was established with a vision to revolutionize freight transportation."
    },
    {
      year: "2012",
      title: "National Expansion",
      description: "Expanded operations to cover all 50 states with a network of trusted carriers."
    },
    {
      year: "2015",
      title: "International Growth",
      description: "Launched international shipping services, connecting businesses globally."
    },
    {
      year: "2018",
      title: "Technology Platform",
      description: "Introduced our advanced digital platform for real-time tracking and management."
    },
    {
      year: "2021",
      title: "Warehouse Network",
      description: "Opened 50+ warehouse facilities across North America for integrated logistics."
    },
    {
      year: "2026",
      title: "Industry Leader",
      description: "Recognized as a top logistics provider serving 10,000+ businesses worldwide."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center" style={{ backgroundColor: 'var(--dark-blue)' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">About Shield Guard</h1>
            <p className="text-white text-lg md:text-xl opacity-90 mb-8">
              Connecting businesses worldwide with reliable, efficient, and innovative logistics solutions since 2009.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl mb-2" style={{ color: 'var(--primary)' }}>
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Our Story</h2>
            <div className="space-y-6 text-gray-700 text-lg">
              <p>
                Founded in 2009, Shield Guard began with a simple yet powerful vision: to transform the way businesses approach freight transportation. What started as a small operation with a handful of trucks has grown into one of the most trusted logistics platforms in the industry.
              </p>
              <p>
                Our founders recognized that businesses needed more than just transportation—they needed a partner who understood the complexities of modern supply chains. From day one, we've been committed to providing not just services, but solutions that drive real business value.
              </p>
              <p>
                Today, Shield Guard serves over 10,000 businesses across 50+ countries, managing millions of shipments annually. Our success is built on the trust of our clients, the dedication of our team, and our unwavering commitment to excellence in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <div
                className="w-16 h-16 mx-auto md:mx-0 mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
              >
                <Target size={32} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To empower businesses of all sizes with world-class logistics solutions that are reliable, efficient, and accessible. We believe every shipment matters, and we're dedicated to delivering excellence on every route.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div
                className="w-16 h-16 mx-auto md:mx-0 mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
              >
                <Eye size={32} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be the global leader in digital logistics, connecting businesses seamlessly across borders through innovative technology and unparalleled service. We envision a future where shipping is effortless and transparent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div
                    className="w-14 h-14 mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                  >
                    <Icon size={28} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h4 className="mb-3">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-24 md:w-32">
                    <div
                      className="inline-block px-4 py-2 rounded-lg text-white font-semibold"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1 ml-6 md:ml-8">
                    <h4 className="mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
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
            <h2 className="mb-4">Join Us on Our Journey</h2>
            <p className="text-gray-600 mb-8">
              Whether you're looking to ship your products or join our team, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button 
                className="px-8 py-3 rounded-lg text-white transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Get Started
              </button> */}
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
