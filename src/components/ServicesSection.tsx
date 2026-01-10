import { Truck, Package, Plane, Warehouse } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

interface ServicesSectionProps {
  onContactClick?: () => void;
}

export function ServicesSection({ onContactClick }: ServicesSectionProps) {
  const services = [
    {
      title: "Transportation Platform",
      description: "Complete cycle of organizing freight transportation with real-time tracking",
      features: [
        "Online cargo location monitoring",
        "Automatic optimal route selection",
        "Integration with accounting systems",
        "Electronic document management"
      ],
      imageUrl: "https://images.unsplash.com/photo-1668760212038-005816b2981d?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Truck size={32} style={{ color: 'var(--primary)' }} />,
      imagePosition: 'right' as const
    },
    {
      title: "Transportation Management",
      description: "Unified system for managing all types of freight transportation",
      features: [
        "Centralized order management",
        "Analytics and reporting",
        "Fleet management",
        "Route planning"
      ],
      imageUrl: "https://images.unsplash.com/photo-1614568111194-3c251800e81e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVpZ2h0JTIwY29udGFpbmVyJTIwc2hpcHBpbmd8ZW58MXx8fHwxNzY3Mjk1ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <Package size={32} style={{ color: 'var(--primary)' }} />,
      imagePosition: 'left' as const
    },
    {
      title: "TMS / Transportation Management System",
      description: "Professional system for logistics companies",
      features: [
        "Business process automation",
        "Integration with 1C and other systems",
        "Mobile app for drivers",
        "API for integration with external services"
      ],
      imageUrl: "https://images.unsplash.com/photo-1644079446600-219068676743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3MjU2Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <Warehouse size={32} style={{ color: 'var(--primary)' }} />,
      imagePosition: 'right' as const
    },
    {
      title: "Cargo Transit",
      description: "Organizing international transportation with full support",
      features: [
        "Customs clearance",
        "Cargo insurance",
        "Multimodal transportation",
        "Cargo consolidation"
      ],
      imageUrl: "https://images.unsplash.com/photo-1653485385125-31a71e8f4d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHBsYW5lJTIwYWlycG9ydHxlbnwxfHx8fDE3NjcyOTU4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <Plane size={32} style={{ color: 'var(--primary)' }} />,
      imagePosition: 'left' as const
    }
  ];

  return (
    <section id="advantages" className="bg-white">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} onContactClick={onContactClick} />
      ))}
    </section>
  );
}
