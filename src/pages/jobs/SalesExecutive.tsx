import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, GraduationCap, CheckCircle } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function SalesExecutive() {
  const { onContactClick } = useOutletContext<OutletContext>();
    const navigate = useNavigate();
  
    const handleBack = () => {
      navigate('/careers');
    };
  
    const handleApply = () => {
      onContactClick();
    };


  const responsibilities = [
    "Develop and execute sales strategies to acquire new logistics clients",
    "Build and maintain strong relationships with key decision-makers",
    "Conduct needs assessments and present customized logistics solutions",
    "Negotiate contracts and close deals to meet and exceed sales targets",
    "Manage the entire sales cycle from prospecting to contract signing",
    "Collaborate with operations teams to ensure smooth customer onboarding",
    "Maintain accurate sales pipeline and forecasting in CRM system",
    "Attend industry events, trade shows, and networking opportunities",
    "Stay current on industry trends and competitive landscape"
  ];

  const qualifications = [
    "Bachelor's degree in Business, Marketing, or related field",
    "3+ years of B2B sales experience, preferably in logistics or transportation",
    "Proven track record of meeting or exceeding sales quotas",
    "Strong understanding of logistics services and supply chain solutions",
    "Excellent communication, presentation, and negotiation skills",
    "Self-motivated with strong business acumen and strategic thinking",
    "Proficiency in CRM software (Salesforce preferred)",
    "Ability to travel up to 30% for client meetings and events",
    "Valid driver's license required"
  ];

  const benefits = [
    "Base salary: $60,000 - $80,000 plus uncapped commission",
    "Realistic OTE (On-Target Earnings): $100,000 - $150,000",
    "Company vehicle or car allowance",
    "Comprehensive health, dental, and vision insurance",
    "401(k) with company match",
    "Sales incentive trips and recognition programs",
    "Professional development and sales training"
  ];

  const faqs = [
    {
      question: "What does the commission structure look like?",
      answer: "We offer a competitive base salary plus uncapped commission on all new business. Commission rates are tiered based on performance, with accelerators for exceeding quota. Top performers consistently earn $120K-$150K+ annually. We also offer quarterly bonuses for exceptional performance and annual sales incentive trips."
    },
    {
      question: "What is the typical sales cycle for logistics services?",
      answer: "Our average sales cycle ranges from 30-90 days depending on account size and complexity. You'll work on a mix of transactional deals and strategic accounts. We provide lead generation support, marketing resources, and a strong brand reputation to help shorten sales cycles."
    },
    {
      question: "What kind of support will I receive?",
      answer: "You'll have access to a dedicated sales operations team, marketing support, proposal templates, pricing tools, and technical experts who assist with RFP responses. Our CRM system provides comprehensive pipeline management, and you'll receive ongoing training on products, industry trends, and sales techniques."
    },
    {
      question: "What is the territory or account structure?",
      answer: "This Los Angeles-based position covers the Southern California region with potential for territory expansion based on performance. You'll focus on mid-market and enterprise accounts across various industries. We use a territory model that protects your accounts and rewards relationship building."
    },
    {
      question: "What makes a successful sales executive at Findicar?",
      answer: "Our top performers are consultative sellers who take time to understand client needs and build long-term relationships. They're persistent but professional, tech-savvy, and comfortable navigating complex B2B sales processes. Success requires strong organization, follow-through, and the ability to collaborate with operations teams."
    },
    {
      question: "What is the interview process?",
      answer: "After initial application review, candidates complete a phone screening with HR, followed by a virtual interview with the Sales Director. Finalists are invited for an in-person interview including a sales presentation exercise and meetings with the regional VP. We typically complete the process within 2-3 weeks."
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
              <h1 className="mb-4">Sales Executive</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <span className="flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  Sales
                </span>
                <span className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Los Angeles, CA
                </span>
                <span className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  Full-time
                </span>
                <span className="flex items-center">
                  <DollarSign size={20} className="mr-2" />
                  $60k - $80k base + commission
                </span>
              </div>
              <p className="text-lg text-gray-700">
                Drive business growth by developing client relationships and delivering customized logistics solutions. This high-impact sales role offers uncapped earning potential and the opportunity to represent an industry leader.
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
                As a Sales Executive at Findicar, you'll be on the front lines of our growth, bringing innovative logistics solutions to businesses throughout Southern California. This role combines strategic selling, relationship building, and consultative problem-solving to help companies optimize their supply chains.
              </p>
              <p className="text-gray-700">
                We're looking for driven sales professionals who are passionate about building long-term client partnerships and have the persistence to close complex B2B deals. Your success will be measured not just in revenue, but in the quality of relationships you build and the value you deliver to clients.
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
