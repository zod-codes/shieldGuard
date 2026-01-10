interface CTASectionProps {
  title: string;
  description: string;
  features: string[];
  variant?: 'dark' | 'light';
  onContactClick?: () => void;
}

export function CTASection({ title, description, features, variant = 'dark', onContactClick }: CTASectionProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={`py-16 md:py-24 ${isDark ? 'text-white' : 'bg-gray-50'}`}
      style={isDark ? { backgroundColor: 'var(--dark-blue)' } : {}}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="mb-4">{title}</h2>
              <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {description}
              </p>

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
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div
              className="p-8 md:p-10 rounded-2xl"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <h3 className="text-white mb-4">Start Today</h3>
              <p className="text-white opacity-90 mb-6">
                Contact us and get access to all platform features
              </p>
              <button
                onClick={onContactClick}
                className="w-full bg-white px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
