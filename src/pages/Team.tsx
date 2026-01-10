import { Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Team() {
  const leadership = [
    {
      name: "Robert Martinez",
      position: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "With over 20 years in logistics, Robert leads our vision for innovation and growth.",
      linkedin: "#",
      email: "robert.martinez@findicar.com"
    },
    {
      name: "Jennifer Lee",
      position: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Jennifer oversees operations across all regions, ensuring excellence in service delivery.",
      linkedin: "#",
      email: "jennifer.lee@findicar.com"
    },
    {
      name: "David Kim",
      position: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "David drives our digital transformation and platform innovation initiatives.",
      linkedin: "#",
      email: "david.kim@findicar.com"
    },
    {
      name: "Sarah Thompson",
      position: "Chief Financial Officer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "Sarah manages our financial strategy and ensures sustainable business growth.",
      linkedin: "#",
      email: "sarah.thompson@findicar.com"
    }
  ];

  const departments = [
    {
      name: "Operations Team",
      description: "Managing daily logistics operations and ensuring on-time deliveries",
      members: [
        {
          name: "Michael Chen",
          position: "VP of Operations",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        },
        {
          name: "Emily Rodriguez",
          position: "Operations Manager",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
        },
        {
          name: "James Wilson",
          position: "Fleet Coordinator",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        },
        {
          name: "Lisa Anderson",
          position: "Warehouse Supervisor",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      name: "Sales & Customer Success",
      description: "Building relationships and delivering exceptional customer experiences",
      members: [
        {
          name: "Tom Harris",
          position: "VP of Sales",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
        },
        {
          name: "Rachel Green",
          position: "Customer Success Manager",
          image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop"
        },
        {
          name: "Alex Turner",
          position: "Account Executive",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
        },
        {
          name: "Nina Patel",
          position: "Support Specialist",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      name: "Technology & Innovation",
      description: "Building the platform that powers modern logistics",
      members: [
        {
          name: "Chris Johnson",
          position: "Engineering Manager",
          image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop"
        },
        {
          name: "Maya Singh",
          position: "Senior Developer",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
        },
        {
          name: "Kevin Park",
          position: "Product Manager",
          image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop"
        },
        {
          name: "Sophie Davis",
          position: "UX Designer",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center" style={{ backgroundColor: 'var(--dark-blue)' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">Meet Our Team</h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              The talented people behind Findicar, working together to revolutionize logistics
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced leaders guiding our company's vision and strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="group">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                      <a 
                        href={leader.linkedin}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Linkedin size={20} style={{ color: 'var(--primary)' }} />
                      </a>
                      <a 
                        href={`mailto:${leader.email}`}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Mail size={20} style={{ color: 'var(--primary)' }} />
                      </a>
                    </div>
                  </div>
                </div>
                <h4 className="mb-1">{leader.name}</h4>
                <p className="text-sm mb-2" style={{ color: 'var(--primary)' }}>{leader.position}</p>
                <p className="text-gray-600 text-sm">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Teams */}
      {departments.map((department, deptIndex) => (
        <section 
          key={deptIndex} 
          className={`py-16 md:py-24 ${deptIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="mb-4">{department.name}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {department.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {department.members.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="mb-1">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Join Our Team CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Want to Join Our Team?</h2>
            <p className="text-gray-600 mb-8">
              We're always looking for talented individuals who are passionate about logistics and innovation.
            </p>
            <Link
              to="/careers" 
              className="px-8 py-3 rounded-lg text-white transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
