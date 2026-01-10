import { Truck, Package, Globe, Shield } from 'lucide-react';

export function ProductsSection() {
  const products = [
    {
      icon: Truck,
      title: "Road Transportation",
      description: "Organizing freight transportation by road across the country"
    },
    {
      icon: Package,
      title: "Warehouse Logistics",
      description: "Managing warehouse operations and cargo storage"
    },
    {
      icon: Globe,
      title: "International Shipping",
      description: "Delivering cargo anywhere in the world with full support"
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description: "Complete insurance protection for your cargo at all stages of delivery"
    }
  ];

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4">Platform Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions for all stages of the logistics process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                >
                  <Icon size={32} style={{ color: 'var(--primary)' }} />
                </div>
                <h4 className="mb-3">{product.title}</h4>
                <p className="text-gray-600">{product.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
