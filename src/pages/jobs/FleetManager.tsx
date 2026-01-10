import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, GraduationCap, CheckCircle } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function FleetManager() {
  const { onContactClick } = useOutletContext<OutletContext>();
    const navigate = useNavigate();
  
    const handleBack = () => {
      navigate('/careers');
    };
  
    const handleApply = () => {
      onContactClick();
    };



  const responsibilities = [
    "Manage and oversee a fleet of 100+ commercial vehicles and equipment",
    "Optimize route planning and dispatching to maximize efficiency and minimize costs",
    "Ensure compliance with DOT, FMCSA, and all applicable transportation regulations",
    "Implement and maintain preventive maintenance programs for fleet vehicles",
    "Monitor fuel consumption, vehicle utilization, and other key performance metrics",
    "Recruit, train, and manage relationships with drivers and owner-operators",
    "Oversee safety programs and ensure adherence to company safety standards",
    "Negotiate contracts with maintenance vendors and fuel suppliers",
    "Analyze fleet data to identify opportunities for operational improvements",
    "Manage fleet budget and control operating costs"
  ];

  const qualifications = [
    "Bachelor's degree in Logistics, Business, or related field (or equivalent experience)",
    "5+ years of fleet management or transportation operations experience",
    "Strong knowledge of DOT regulations, HOS rules, and compliance requirements",
    "Experience managing diverse fleet types (Class 8 tractors, straight trucks, etc.)",
    "Proficiency with fleet management software and GPS tracking systems",
    "Proven ability to optimize routes and reduce operational costs",
    "Strong leadership and driver relations skills",
    "Excellent analytical and problem-solving abilities",
    "CDL license preferred but not required",
    "Experience with ELD systems and telematics platforms"
  ];

  const benefits = [
    "Competitive salary: $75,000 - $95,000 annually",
    "Performance bonuses based on fleet efficiency metrics",
    "Comprehensive health, dental, and vision insurance",
    "401(k) retirement plan with company match",
    "Company vehicle provided",
    "Paid time off and holidays",
    "Professional development opportunities",
    "Relocation assistance available"
  ];

  const faqs = [
    {
      question: "What does the fleet consist of?",
      answer: "Our Dallas fleet includes approximately 100-120 power units (Class 8 tractors, straight trucks, and sprinter vans) plus 150+ trailers of various types. We operate both company-owned vehicles and work with owner-operators. The fleet serves regional and long-haul routes throughout Texas and neighboring states."
    },
    {
      question: "What are the typical work hours and on-call expectations?",
      answer: "This is a salaried position with typical hours Monday-Friday, 7 AM - 5 PM. However, fleet management requires flexibility - you may need to respond to breakdown situations, driver emergencies, or operational issues outside normal hours. We use an on-call rotation with other managers to distribute this responsibility fairly."
    },
    {
      question: "What systems and technology will I be working with?",
      answer: "You'll use a comprehensive fleet management system (TMS) integrated with GPS tracking, ELD systems, and maintenance management software. We employ telematics for real-time vehicle monitoring and data analytics. The system provides dashboards for route optimization, fuel management, maintenance scheduling, and compliance tracking."
    },
    {
      question: "What are the biggest challenges in this role?",
      answer: "Key challenges include balancing cost control with service quality, managing the ongoing driver shortage, ensuring regulatory compliance across a large fleet, and optimizing routes in real-time as customer needs change. Success requires strong decision-making, the ability to prioritize multiple demands, and building effective relationships with drivers."
    },
    {
      question: "What opportunities exist for career advancement?",
      answer: "Fleet Managers can advance to Regional Fleet Director overseeing multiple locations, Director of Transportation Operations, or VP of Logistics. We promote from within and value leaders who demonstrate operational excellence and the ability to drive continuous improvement. Many of our senior operations executives have fleet management backgrounds."
    },
    {
      question: "How is performance measured in this role?",
      answer: "We track metrics including fleet utilization rates, cost per mile, on-time delivery performance, safety incidents, vehicle downtime, fuel efficiency, and driver retention. However, we take a balanced approach - recognizing that short-term cost cutting can harm long-term success. We value managers who optimize holistically while maintaining safety and service quality."
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Careers
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="mb-4">Fleet Manager</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <span className="flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  Operations
                </span>
                <span className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Dallas, TX
                </span>
                <span className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  Full-time
                </span>
                <span className="flex items-center">
                  <DollarSign size={20} className="mr-2" />
                  $75k - $95k + bonus
                </span>
              </div>
              <p className="text-lg text-gray-700">
                Lead our Dallas transportation fleet with data-driven optimization and safety-first operations. This strategic role combines logistics expertise, regulatory knowledge, and leadership to ensure efficient and compliant fleet performance.
              </p>
            </div>
            
            <button 
              onClick={handleApply}
              className="px-8 py-3 rounded-lg text-white transition-colors whitespace-nowrap"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Apply for this Position
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Role */}
            <section className="bg-white rounded-xl p-6 md:p-8">
              <h2 className="mb-4">About the Role</h2>
              <p className="text-gray-700 mb-4">
                As Fleet Manager at our Dallas operations center, you'll oversee one of Findicar's largest transportation fleets. This critical role ensures our vehicles operate safely, efficiently, and in full regulatory compliance while managing relationships with drivers and optimizing routes to meet customer commitments.
              </p>
              <p className="text-gray-700">
                We're seeking an experienced fleet professional who combines technical knowledge of transportation regulations with strong leadership skills and analytical capabilities. You'll use modern fleet technology and data analytics to drive continuous improvement while maintaining our commitment to safety and service excellence.
              </p>
            </section>

            {/* Key Responsibilities */}
            <section className="bg-white rounded-xl p-6 md:p-8">
              <h2 className="mb-6">Key Responsibilities</h2>
              <div className="space-y-3">
                {responsibilities.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} style={{ color: 'var(--primary)' }} className="mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Qualifications */}
            <section className="bg-white rounded-xl p-6 md:p-8">
              <h2 className="mb-6">Qualifications</h2>
              <div className="space-y-3">
                {qualifications.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <GraduationCap size={20} style={{ color: 'var(--primary)' }} className="mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Q&A Section */}
            <section className="bg-white rounded-xl p-6 md:p-8">
              <h2 className="mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="mb-2" style={{ color: 'var(--primary)' }}>
                      {faq.question}
                    </h4>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h3 className="mb-4">Benefits & Compensation</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={18} style={{ color: 'var(--primary)' }} className="mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleApply}
                className="w-full mt-6 px-6 py-3 rounded-lg text-white transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Apply Now
              </button>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                Equal Opportunity Employer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
