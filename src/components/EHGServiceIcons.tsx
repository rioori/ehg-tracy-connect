import { Building2, Utensils, Car, Waves } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Hotels & Resort",
    description: "Luxury accommodations"
  },
  {
    icon: Utensils,
    title: "Restaurant & Bars", 
    description: "Fine dining experiences"
  },
  {
    icon: Car,
    title: "Travel Services",
    description: "Complete travel assistance"
  },
  {
    icon: Waves,
    title: "La Spa",
    description: "Wellness and relaxation"
  }
];

export const EHGServiceIcons = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {services.map((service, index) => (
        <div key={index} className="bg-card rounded-lg p-6 text-center shadow-[var(--shadow-soft)] border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
          <div className="bg-ehg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <service.icon className="h-8 w-8 text-ehg-gold" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
      ))}
    </div>
  );
};