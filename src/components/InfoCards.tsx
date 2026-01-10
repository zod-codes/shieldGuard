export function InfoCards({ onContactClick }: { onContactClick?: () => void }) {
  const cards = [
    {
      title: "Over 10,000",
      subtitle: "active users",
      description: "The largest freight transportation platform in the region"
    },
    {
      title: "24/7",
      subtitle: "technical support",
      description: "Always ready to help with any questions"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="mb-2" style={{ color: 'var(--primary)' }}>{card.title}</h3>
              <h4 className="mb-3">{card.subtitle}</h4>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}

          {/* CTA Card */}
          <div
            className="p-6 md:p-8 rounded-lg text-white flex flex-col justify-between"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <div>
              <h4 className="mb-3">Join Us</h4>
              <p className="mb-6 opacity-90">Start working more efficiently today</p>
            </div>
            <button
              onClick={onContactClick}
              className="w-full bg-white px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors self-start"
              style={{ color: 'var(--primary)' }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
