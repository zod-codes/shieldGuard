import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Logistics Manager",
      company: "Global Freight Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 5,
      text: "Findicar has revolutionized our shipping operations. The real-time tracking and reliable service have made our logistics seamless. Highly recommended!"
    },
    {
      name: "Michael Chen",
      position: "Operations Director",
      company: "Express Cargo Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      rating: 5,
      text: "The platform is intuitive and the customer support is exceptional. We've reduced our shipping costs by 30% while improving delivery times."
    },
    {
      name: "Emily Rodriguez",
      position: "Supply Chain Head",
      company: "Continental Logistics",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 5,
      text: "Working with Findicar has been a game-changer. Their network of carriers is extensive and the booking process is incredibly efficient."
    },
    {
      name: "David Thompson",
      position: "CEO",
      company: "Swift Transport Co.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 5,
      text: "Best logistics platform we've used. The analytics and reporting features help us make data-driven decisions for our business."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies worldwide for reliable freight transportation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow relative"
            >
              <Quote 
                size={40} 
                className="absolute top-4 right-4 opacity-10"
                style={{ color: 'var(--primary)' }}
              />
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill="currentColor"
                    style={{ color: '#FFA500' }}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="text-sm mb-0">{testimonial.name}</h4>
                  {/* <p className="text-sm text-gray-600">{testimonial.position}</p> */}
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
