import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, GraduationCap, CheckCircle } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function WarehouseManager() {
  const { onContactClick } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/careers');
  };

  const handleApply = () => {
    onContactClick();
  };

  const responsibilities = [
    "Oversee all warehouse operations including receiving, storage, and shipping",
    "Lead, train, and develop a team of 20-30 warehouse associates",
    "Implement and maintain safety protocols and ensure OSHA compliance",
    "Optimize inventory management processes and maintain accuracy levels above 99%",
    "Coordinate with logistics and transportation teams for efficient freight flow",
    "Monitor warehouse KPIs and implement continuous improvement initiatives",
    "Manage warehouse budget, equipment maintenance, and facility improvements",
    "Develop and execute staffing plans to meet operational demands",
    "Implement WMS (Warehouse Management System) best practices"
  ];

  const qualifications = [
    "Bachelor's degree in Supply Chain, Logistics, Business Management, or related field",
    "5+ years of warehouse operations experience with 2+ years in a supervisory role",
    "Proven leadership experience managing teams of 15+ employees",
    "Strong knowledge of warehouse management systems and inventory control",
    "Experience with Lean, Six Sigma, or other process improvement methodologies",
    "Excellent problem-solving and decision-making abilities",
    "Proficiency in warehouse safety regulations and OSHA standards",
    "Forklift certification and experience with material handling equipment",
    "Strong communication skills and ability to work cross-functionally"
  ];

  const benefits = [
    "Competitive salary range: $70,000 - $90,000 annually",
    "Performance-based bonuses",
    "Comprehensive health, dental, and vision insurance",
    "401(k) with generous company match",
    "Paid time off and holidays",
    "Leadership development programs",
    "Relocation assistance available"
  ];

  const faqs = [
    {
      question: "What is the warehouse size and team structure?",
      answer: "Our Chicago facility is a 150,000 square foot modern warehouse handling diverse freight. You'll manage a team of 25-35 associates including shift supervisors, inventory specialists, and warehouse workers across multiple shifts. The role reports directly to the Regional Operations Director."
    },
    {
      question: "What are the shift requirements for this management position?",
      answer: "This is a day shift position (Monday-Friday, 7 AM - 4 PM) with occasional evening or weekend hours during peak seasons. You'll be expected to be available for emergency situations and will rotate on-call duties with other managers."
    },
    {
      question: "What warehouse management systems do you use?",
      answer: "We use a modern cloud-based WMS integrated with our TMS and ERP systems. The system includes real-time inventory tracking, automated picking optimization, and comprehensive reporting. Full training is provided, though prior WMS experience is essential."
    },
    {
      question: "What opportunities exist for career growth?",
      answer: "Warehouse Managers can advance to Regional Warehouse Manager, Director of Warehouse Operations, or transition into supply chain leadership roles. We promote from within and invest heavily in leadership development. Many of our senior operations leaders started in warehouse management."
    },
    {
      question: "What makes this warehouse operation unique?",
      answer: "Our facility uses cutting-edge automation technology including automated storage systems and data-driven optimization tools. We emphasize safety, efficiency, and employee development. You'll have the autonomy to implement improvements and the resources to drive meaningful change."
    },
    {
      question: "What is the hiring process timeline?",
      answer: "After application review (5-7 days), qualified candidates complete a phone screening, followed by an on-site visit including facility tour, panel interview with leadership, and a practical assessment. The full process typically takes 2-3 weeks with offers extended shortly after."
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
              <h1 className="mb-4">Warehouse Manager</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <span className="flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  Operations
                </span>
                <span className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Chicago, IL
                </span>
                <span className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  Full-time
                </span>
                <span className="flex items-center">
                  <DollarSign size={20} className="mr-2" />
                  $70k - $90k
                </span>
              </div>
              <p className="text-lg text-gray-700">
                Lead our Chicago warehouse operations with cutting-edge technology and a talented team. This critical leadership role combines strategic planning, team development, and operational excellence to drive results.
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
                As Warehouse Manager at our Chicago facility, you'll oversee all aspects of warehouse operations in one of our largest distribution centers. You'll be responsible for team leadership, operational efficiency, safety compliance, and continuous improvement initiatives that directly impact our ability to serve customers effectively.
              </p>
              <p className="text-gray-700">
                This role offers significant autonomy and the opportunity to implement innovative solutions using modern warehouse technology. You'll work closely with cross-functional teams and have the resources needed to build a high-performing warehouse operation.
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
