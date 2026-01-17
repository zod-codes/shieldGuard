import { useOutletContext, useNavigate } from "react-router-dom";
import { Briefcase, Users, TrendingUp, Heart, CheckCircle, MapPin, Clock } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function Careers() {
  const { onContactClick } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Professional development and advancement opportunities"
    },
    {
      icon: Users,
      title: "Great Culture",
      description: "Collaborative environment with talented team members"
    },
    {
      icon: Briefcase,
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options"
    }
  ];

  const positions = [
    {
      title: "Logistics Coordinator",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time",
      description: "Coordinate and optimize freight operations across multiple carriers and routes.",
      link: "logistics-coordinator"
    },
    {
      title: "Warehouse Manager",
      department: "Operations",
      location: "Chicago, IL",
      type: "Full-time",
      description: "Oversee warehouse operations, inventory management, and team leadership.",
      link: "warehouse-manager"
    },
    {
      title: "Sales Executive",
      department: "Sales",
      location: "Los Angeles, CA",
      type: "Full-time",
      description: "Drive business growth by developing client relationships and closing deals.",
      link: "sales-executive"
    },
    {
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Remote",
      type: "Full-time",
      description: "Provide exceptional support to clients and resolve logistics inquiries.",
      link: "customer-support-specialist"
    },
    {
      title: "Software Engineer",
      department: "Technology",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Build and maintain our logistics platform and internal tools.",
      link: "software-engineer"
    },
    {
      title: "Fleet Manager",
      department: "Operations",
      location: "Dallas, TX",
      type: "Full-time",
      description: "Manage transportation fleet, optimize routes, and ensure compliance.",
      link: "fleet-manager"
    }
  ];

  const values = [
    "Innovation and continuous improvement",
    "Customer-first mentality",
    "Integrity and transparency",
    "Teamwork and collaboration",
    "Sustainability and responsibility"
  ];

  const handleApplyClick = (slug: string) => {
    navigate(`/jobs/${slug}`);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center" style={{ backgroundColor: 'var(--dark-blue)' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-4">Join Our Team</h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              Build your career with a leader in logistics and freight transportation
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Work at Shield Guard</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to creating an environment where you can thrive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                  >
                    <Icon size={32} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h4 className="mb-3">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Our Values</h2>
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg">
                  <CheckCircle size={24} style={{ color: 'var(--primary)' }} className="mr-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Open Positions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your next opportunity with us
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {positions.map((position, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <h3 className="mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Briefcase size={16} className="mr-1" />
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApplyClick(position.link)}
                    className="px-6 py-2 rounded-lg text-white transition-colors whitespace-nowrap"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-600">{position.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Don't See the Right Role?</h2>
            <p className="text-gray-600 mb-8">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className='w-full flex gap-8 items-center justify-center'>
              <button
                onClick={onContactClick}
                className="px-8 py-3 rounded-lg text-white transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Submit Your Resume
              </button>
              <input type="file" className='max-w-[35%]' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
