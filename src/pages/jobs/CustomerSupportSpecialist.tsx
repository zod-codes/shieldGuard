import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, GraduationCap, CheckCircle } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function CustomerSupportSpecialist() {
  const { onContactClick } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/careers');
  };

  const handleApply = () => {
    onContactClick();
  };


  const responsibilities = [
    "Respond to customer inquiries via phone, email, and chat in a timely manner",
    "Track shipments and provide real-time updates to customers",
    "Resolve logistics issues including delays, damaged freight, and billing discrepancies",
    "Coordinate with operations, warehouse, and carrier teams to address customer needs",
    "Document all customer interactions in our CRM system",
    "Process documentation including BOLs, PODs, and shipping paperwork",
    "Escalate complex issues to appropriate departments and follow through to resolution",
    "Identify opportunities to improve customer experience and internal processes",
    "Maintain expert knowledge of company services and logistics procedures"
  ];

  const qualifications = [
    "High school diploma or equivalent (Associate's or Bachelor's degree preferred)",
    "2+ years of customer service experience, preferably in logistics or transportation",
    "Excellent written and verbal communication skills",
    "Strong problem-solving abilities and attention to detail",
    "Ability to remain calm and professional under pressure",
    "Proficiency with CRM software and Microsoft Office Suite",
    "Experience with multi-channel support (phone, email, chat)",
    "Ability to work flexible hours including occasional weekends",
    "Bilingual (English/Spanish) is a plus but not required"
  ];

  const benefits = [
    "Competitive salary: $42,000 - $52,000 annually",
    "100% remote work opportunity",
    "Comprehensive health, dental, and vision insurance",
    "401(k) retirement plan with company match",
    "Paid time off and holidays",
    "Home office stipend for remote setup",
    "Professional development and training programs"
  ];

  const faqs = [
    {
      question: "Is this position fully remote?",
      answer: "Yes! This is a 100% remote position, allowing you to work from anywhere in the United States. We provide a home office stipend to help you set up a comfortable and productive workspace. You'll need reliable high-speed internet and a quiet space for taking calls."
    },
    {
      question: "What are the working hours for this role?",
      answer: "We operate extended customer support hours to serve clients across multiple time zones. This position typically works Monday-Friday with shifts between 7 AM - 7 PM (your local time). Some weekend or holiday coverage may be required on a rotating basis. We offer multiple shift options to accommodate different schedules."
    },
    {
      question: "What kind of training is provided?",
      answer: "New hires complete a comprehensive 2-week training program covering our systems, services, and customer service protocols. You'll learn about logistics terminology, shipment tracking, problem resolution, and our technology platforms. Ongoing training includes product updates, skill development workshops, and access to logistics certifications."
    },
    {
      question: "What metrics are used to measure performance?",
      answer: "We track several key metrics including response time, resolution rate, customer satisfaction scores (CSAT), and quality assurance evaluations. However, we focus on holistic performance - providing excellent service while meeting efficiency goals. We provide regular feedback and coaching to help you succeed."
    },
    {
      question: "What career growth opportunities exist?",
      answer: "Customer Support Specialists can advance to Senior Specialist, Team Lead, Customer Success Manager, or transition into operations coordination roles. We promote from within and provide clear pathways for career development. Many of our customer service leaders started in this role."
    },
    {
      question: "What makes Findicar's customer support team different?",
      answer: "We empower our team members to truly solve problems, not just pass them along. You'll have the authority to make decisions that benefit customers and access to resources across the company. Our culture emphasizes collaboration, continuous improvement, and recognizing outstanding service. Plus, being remote offers great work-life flexibility."
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
              <h1 className="mb-4">Customer Support Specialist</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <span className="flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  Customer Service
                </span>
                <span className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Remote (US)
                </span>
                <span className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  Full-time
                </span>
                <span className="flex items-center">
                  <DollarSign size={20} className="mr-2" />
                  $42k - $52k
                </span>
              </div>
              <p className="text-lg text-gray-700">
                Deliver exceptional customer service from the comfort of your home. Help clients navigate their logistics needs while building a rewarding career in a supportive, remote-first environment.
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
                As a Customer Support Specialist at Findicar, you'll be the friendly voice that customers rely on when they have questions or need assistance with their shipments. This remote role puts you at the center of our customer experience, where your problem-solving skills and empathy directly impact client satisfaction.
              </p>
              <p className="text-gray-700">
                This position is perfect for customer service professionals who enjoy helping people, solving logistics puzzles, and working in a collaborative team environment. You'll gain valuable knowledge of the logistics industry while building relationships with clients across diverse industries.
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
