import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, GraduationCap, CheckCircle } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function LogisticsCoordinator() {
  const { onContactClick } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/careers');
  };

  const handleApply = () => {
    onContactClick();
  };


  const responsibilities = [
    "Coordinate daily freight operations across multiple carriers and shipping routes",
    "Monitor shipment status and proactively resolve any delays or issues",
    "Communicate with carriers, drivers, and customers to ensure smooth operations",
    "Optimize transportation routes to maximize efficiency and reduce costs",
    "Maintain accurate records of all shipments and documentation",
    "Collaborate with warehouse teams to ensure timely pickup and delivery",
    "Track and analyze key performance indicators (KPIs) for continuous improvement",
    "Respond to customer inquiries and provide shipment updates"
  ];

  const qualifications = [
    "Bachelor's degree in Logistics, Supply Chain Management, Business, or related field",
    "2+ years of experience in logistics coordination or freight operations",
    "Strong knowledge of transportation modes and freight documentation",
    "Excellent organizational and multitasking abilities",
    "Proficiency in logistics software and Microsoft Office Suite",
    "Outstanding communication and problem-solving skills",
    "Ability to work in a fast-paced environment and handle pressure",
    "Familiarity with DOT regulations and compliance requirements (preferred)"
  ];

  const benefits = [
    "Competitive salary range: $55,000 - $70,000 annually",
    "Comprehensive health, dental, and vision insurance",
    "401(k) retirement plan with company match",
    "Paid time off and holidays",
    "Professional development and training opportunities",
    "Career advancement pathways",
    "Flexible work arrangements"
  ];

  const faqs = [
    {
      question: "What does a typical day look like for a Logistics Coordinator?",
      answer: "A typical day involves monitoring active shipments, coordinating with carriers and drivers, resolving any transportation issues, optimizing routes, updating customers on delivery status, and collaborating with warehouse and sales teams. You'll be juggling multiple tasks while ensuring all freight moves smoothly and on time."
    },
    {
      question: "What opportunities for advancement exist in this role?",
      answer: "Logistics Coordinators have excellent growth potential at Findicar. Many of our coordinators advance to Senior Coordinator, Operations Manager, or specialized roles in supply chain optimization within 2-3 years. We invest in our people through training programs and mentorship."
    },
    {
      question: "What software systems will I be using?",
      answer: "You'll work with our proprietary logistics management platform, as well as industry-standard tools like TMS (Transportation Management Systems), WMS (Warehouse Management Systems), and Microsoft Office Suite. We provide comprehensive training on all systems."
    },
    {
      question: "Is this position fully on-site or are there remote options?",
      answer: "This is primarily an on-site position at our New York office to facilitate real-time coordination with our operations team. However, we offer flexibility for occasional remote work and have flexible scheduling options available."
    },
    {
      question: "What makes Findicar a great place to work as a Logistics Coordinator?",
      answer: "Findicar offers a collaborative environment where your contributions directly impact our success. You'll work with cutting-edge logistics technology, receive ongoing professional development, and be part of a team that values innovation and excellence. Plus, our turquoise culture emphasizes work-life balance and employee wellbeing."
    },
    {
      question: "How soon can I expect to hear back after applying?",
      answer: "We review applications on a rolling basis and typically respond within 5-7 business days. Qualified candidates will be contacted for an initial phone screening, followed by 2-3 rounds of interviews including a practical assessment."
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
              <h1 className="mb-4">Logistics Coordinator</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <span className="flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  Operations
                </span>
                <span className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  New York, NY
                </span>
                <span className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  Full-time
                </span>
                <span className="flex items-center">
                  <DollarSign size={20} className="mr-2" />
                  $55k - $70k
                </span>
              </div>
              <p className="text-lg text-gray-700">
                Join our dynamic operations team to coordinate and optimize freight operations across multiple carriers and routes. This role is perfect for detail-oriented professionals who thrive in fast-paced logistics environments.
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
                As a Logistics Coordinator at Findicar, you'll be at the heart of our operations, ensuring freight moves efficiently from origin to destination. You'll work with a talented team to coordinate shipments, communicate with carriers and customers, and continuously improve our logistics processes.
              </p>
              <p className="text-gray-700">
                This position offers an excellent opportunity to grow your career in logistics while working with modern technology and industry-leading practices. You'll gain exposure to various transportation modes and develop skills that are highly valued in the supply chain industry.
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
              <h3 className="mb-4">Benefits & Perks</h3>
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
