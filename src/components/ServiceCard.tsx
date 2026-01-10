interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  icon: React.ReactNode;
  onContactClick?: () => void;
}

export function ServiceCard({ 
  title, 
  description, 
  features, 
  imageUrl, 
  imagePosition = 'right',
  icon,
  onContactClick 
}: ServiceCardProps) {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${imagePosition === 'left' ? 'lg:grid-flow-dense' : ''}`}>
          {/* Content */}
          <div className={imagePosition === 'left' ? 'lg:col-start-2' : ''}>
            <div 
              className="w-16 h-16 mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
            >
              {icon}
            </div>
            <h3 className="mb-4">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" 
                    style={{ color: 'var(--primary)' }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={onContactClick}
              className="px-8 py-3 rounded-lg text-white transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Contact Us
            </button>
          </div>

          {/* Image */}
          <div className={imagePosition === 'left' ? 'lg:col-start-1 lg:row-start-1' : ''}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
