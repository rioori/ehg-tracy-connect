import { MapPin, Star, Utensils, Waves, Dumbbell, Car } from "lucide-react";

const portfolioData = [
  {
    city: "Hanoi",
    hotels: [
      {
        name: "La Siesta Classic Ma May",
        address: "94 Ma May St., Hoan Kiem Ward",
        opened: "November 13, 2014",
        rooms: 65,
        facilities: ["Restaurant", "Sky Bar", "Gym", "Spa"],
        awards: "#1 hotel in Vietnam (2016, 2018, 2019, 2020)",
        type: "classic"
      },
      {
        name: "La Siesta Classic Hang Thung", 
        address: "21 Hang Thung St., Hoan Kiem Ward",
        opened: "July 15, 2023",
        rooms: 70,
        facilities: ["Restaurant", "Gym", "Spa"],
        type: "classic"
      },
      {
        name: "La Siesta Premium Hang Be",
        address: "27 Hang Be St., Hoan Kiem Ward", 
        opened: "April 13, 2019",
        rooms: 50,
        facilities: ["Restaurant", "Sky Bar", "Spa"],
        type: "premium"
      },
      {
        name: "La Siesta Premium Lakeside",
        address: "Lakeside District",
        facilities: ["Restaurant", "Spa", "Lake View"],
        type: "premium"
      }
    ]
  },
  {
    city: "Ho Chi Minh City",
    hotels: [
      {
        name: "La Siesta Premium Saigon",
        facilities: ["Restaurant", "Sky Bar", "Spa", "Pool"],
        type: "premium"
      },
      {
        name: "La Siesta Premium Saigon Central", 
        facilities: ["Restaurant", "Business Center", "Spa"],
        type: "premium"
      }
    ]
  },
  {
    city: "Hoi An - Da Nang",
    hotels: [
      {
        name: "La Siesta Hoi An Resort & Spa",
        facilities: ["Resort", "Spa", "Beach Access", "Multiple Restaurants"],
        type: "resort"
      }
    ]
  }
];

const getFacilityIcon = (facility: string) => {
  switch (facility.toLowerCase()) {
    case 'restaurant':
    case 'multiple restaurants':
      return <Utensils className="h-4 w-4" />;
    case 'sky bar':
      return <Star className="h-4 w-4" />;
    case 'spa':
      return <Waves className="h-4 w-4" />;
    case 'gym':
      return <Dumbbell className="h-4 w-4" />;
    case 'pool':
    case 'beach access':
      return <Waves className="h-4 w-4" />;
    default:
      return <Car className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'premium':
      return 'bg-ehg-navy text-white';
    case 'resort':
      return 'bg-ehg-green text-white';
    default:
      return 'bg-ehg-green text-white';
  }
};

export const EHGPortfolio = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-ehg-cream to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Experience Elegance Hospitality Group
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Chat with Tracy to discover our premium hotels, restaurants, spa services, and travel assistance.
            Your gateway to exceptional hospitality experiences across Vietnam.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioData.map((location) => (
            <div key={location.city} className="bg-card rounded-lg p-6 shadow-[var(--shadow-soft)] border border-border">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-ehg-gold" />
                <h3 className="text-xl font-semibold text-foreground">{location.city}</h3>
              </div>
              
              <div className="space-y-4">
                {location.hotels.map((hotel, index) => (
                  <div key={index} className="border-l-4 border-ehg-gold pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground leading-tight">{hotel.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(hotel.type)}`}>
                        {hotel.type.charAt(0).toUpperCase() + hotel.type.slice(1)}
                      </span>
                    </div>
                    
                    {hotel.address && (
                      <p className="text-sm text-muted-foreground mb-2">{hotel.address}</p>
                    )}
                    
                    {hotel.rooms && (
                      <p className="text-sm text-muted-foreground mb-2">{hotel.rooms} rooms</p>
                    )}
                    
                    {hotel.awards && (
                      <div className="bg-ehg-gold/10 rounded p-2 mb-2">
                        <p className="text-xs text-ehg-gold-dark font-medium">{hotel.awards}</p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {hotel.facilities.map((facility, facilityIndex) => (
                        <div key={facilityIndex} className="flex items-center gap-1 bg-muted rounded-full px-2 py-1">
                          {getFacilityIcon(facility)}
                          <span className="text-xs font-medium text-muted-foreground">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};