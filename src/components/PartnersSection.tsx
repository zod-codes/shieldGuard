export function PartnersSection() {
  const partners = [
    { name: "DHL", logo: "DHL" },
    { name: "FedEx", logo: "FedEx" },
    { name: "UPS", logo: "UPS" },
    { name: "Maersk", logo: "Maersk" },
    { name: "DB Schenker", logo: "DB Schenker" },
    { name: "XPO Logistics", logo: "XPO" },
    { name: "DSV", logo: "DSV" },
    { name: "Kuehne+Nagel", logo: "K+N" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our Trusted Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry-leading companies to provide you with the best service
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <div 
                className="text-2xl md:text-3xl font-bold text-gray-300 hover:text-gray-600 transition-colors"
              >
                {partner.logo}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Join our network of over 500+ trusted carriers and logistics partners
          </p>
          <button 
            className="px-8 py-3 rounded-lg text-white transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
}
