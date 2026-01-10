import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, GraduationCap, CheckCircle } from 'lucide-react';

interface OutletContext {
  onContactClick: () => void;
}

export function SoftwareEngineer() {
  const { onContactClick } = useOutletContext<OutletContext>();
    const navigate = useNavigate();
  
    const handleBack = () => {
      navigate('/careers');
    };
  
    const handleApply = () => {
      onContactClick();
    };



  const responsibilities = [
    "Design, develop, and maintain our logistics platform and internal applications",
    "Build scalable APIs and microservices to support freight operations",
    "Collaborate with product managers and stakeholders to define technical requirements",
    "Write clean, maintainable code following best practices and coding standards",
    "Participate in code reviews and provide constructive feedback to team members",
    "Debug and resolve technical issues across the full stack",
    "Implement automated testing and contribute to CI/CD pipelines",
    "Optimize application performance and database queries",
    "Stay current with emerging technologies and recommend improvements"
  ];

  const qualifications = [
    "Bachelor's degree in Computer Science, Engineering, or related field (or equivalent experience)",
    "3+ years of professional software development experience",
    "Strong proficiency in JavaScript/TypeScript and React",
    "Experience with Node.js and building RESTful APIs",
    "Solid understanding of relational databases (PostgreSQL, MySQL)",
    "Familiarity with cloud platforms (AWS, Azure, or GCP)",
    "Experience with Git version control and agile development practices",
    "Strong problem-solving skills and attention to detail",
    "Excellent communication and collaboration abilities"
  ];

  const benefits = [
    "Competitive salary: $100,000 - $140,000 based on experience",
    "Equity/stock options",
    "Comprehensive health, dental, and vision insurance",
    "401(k) with generous company match",
    "Flexible work arrangements (hybrid available)",
    "Professional development budget",
    "Latest tech equipment and tools",
    "Relocation assistance available"
  ];

  const faqs = [
    {
      question: "What is the tech stack?",
      answer: "Our primary stack includes React and TypeScript on the frontend, Node.js and Express for backend services, PostgreSQL for our database, and AWS for cloud infrastructure. We use Docker for containerization, GitHub for version control, and Jenkins for CI/CD. We're also exploring modern technologies like GraphQL and serverless architecture for new features."
    },
    {
      question: "What does the engineering team structure look like?",
      answer: "Our engineering team consists of approximately 25 engineers organized into cross-functional squads. Each squad includes frontend and backend engineers, a product manager, and a designer. You'll work on a specific squad focused on areas like customer-facing applications, warehouse management systems, or data analytics. We practice agile methodologies with two-week sprints."
    },
    {
      question: "What is the work-from-home policy?",
      answer: "We offer a hybrid model with flexibility. Most engineers come to our San Francisco office 2-3 days per week for collaboration and team activities. Remote work is available for the remaining days. We're open to discussing more remote arrangements for exceptional candidates, though some on-site presence is preferred for this role."
    },
    {
      question: "What kind of projects will I work on?",
      answer: "Projects range from building new customer-facing features like real-time shipment tracking, to developing internal tools for warehouse operations, to creating data pipelines for analytics. You'll work on both greenfield projects and enhancing existing systems. Recent projects include implementing a new route optimization algorithm and building a mobile app for drivers."
    },
    {
      question: "What opportunities exist for growth and learning?",
      answer: "We invest heavily in engineer development through code reviews, pair programming, tech talks, and conference attendance. Engineers can advance to Senior Engineer, Staff Engineer, or transition into technical leadership or specialized roles (DevOps, Data Engineering). We provide an annual learning budget for courses, conferences, and certifications."
    },
    {
      question: "What is the interview process?",
      answer: "The process includes: (1) Phone screen with a recruiter (30 min), (2) Technical phone interview with an engineer covering algorithms and problem-solving (60 min), (3) Virtual or on-site interviews including coding challenges, system design discussion, and behavioral interviews (4-5 hours total). We typically complete the process within 2-3 weeks and provide timely feedback at each stage."
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
              <h1 className="mb-4">Software Engineer</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <span className="flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  Technology
                </span>
                <span className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Worldwide
                </span>
                <span className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  Full-time
                </span>
                <span className="flex items-center">
                  <DollarSign size={20} className="mr-2" />
                  $100k - $140k + equity
                </span>
              </div>
              <p className="text-lg text-gray-700">
                Build innovative technology that powers modern logistics. Join a talented engineering team using cutting-edge tech to solve complex supply chain challenges and create seamless user experiences.
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
                As a Software Engineer at Findicar, you'll build and maintain the technology platform that powers our logistics operations. From customer-facing applications to internal tools for warehouse and transportation management, your code will directly impact how we move freight and serve customers.
              </p>
              <p className="text-gray-700">
                We're looking for engineers who are passionate about writing quality code, solving complex problems, and working collaboratively. You'll have the opportunity to work with modern technologies, contribute to architectural decisions, and see the real-world impact of your work in the logistics industry.
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
