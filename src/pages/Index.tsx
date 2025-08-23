import { EHGChatForm } from "@/components/EHGChatForm";
import { EHGPortfolio } from "@/components/EHGPortfolio";
import { EHGServiceIcons } from "@/components/EHGServiceIcons";
import ehgLogo from "@/assets/ehg-logo.png";
import lasiestaOrnament from "@/assets/lasiesta-ornament.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ehg-cream to-background">
      {/* Header */}
      <header className="py-8 px-6">
        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-ehg-gold rounded-lg p-4 shadow-[var(--shadow-elegant)]">
              <img src={ehgLogo} alt="EHG - Elegance Hospitality Group" className="h-12" />
            </div>
          </div>
          <div className="text-center">
            <span className="inline-block bg-ehg-gold text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Premium Hospitality Services
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-ehg-gold mb-4">
                  TRACY AI
                </h1>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  YOUR HOSPITALITY ASSISTANT
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Experience personalized hospitality services with Tracy, your 
                  dedicated AI assistant from Elegance Hospitality Group. Get 
                  instant assistance with bookings, dining reservations, and 
                  travel services.
                </p>
              </div>

              {/* Service Icons */}
              <EHGServiceIcons />
            </div>

            {/* Right Form */}
            <div>
              <EHGChatForm />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <EHGPortfolio />

      {/* Brand Showcase */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-8 mb-8">
            <img src={lasiestaOrnament} alt="La Siesta Ornament" className="h-16 opacity-80" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">LA SIESTA</h2>
              <p className="text-sm text-muted-foreground">LUXURY BOUTIQUE HOTELS</p>
            </div>
            <img src={lasiestaOrnament} alt="La Siesta Ornament" className="h-16 opacity-80" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            From the historic streets of Hanoi's Old Quarter to the vibrant heart of Ho Chi Minh City 
            and the UNESCO heritage town of Hoi An, discover exceptional hospitality experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-ehg-green text-white px-4 py-2 rounded-full text-sm font-medium">Classic Collection</span>
            <span className="bg-ehg-navy text-white px-4 py-2 rounded-full text-sm font-medium">Premium Collection</span>
            <span className="bg-ehg-gold text-white px-4 py-2 rounded-full text-sm font-medium">Resort & Spa</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm opacity-80">
            © 2024 Elegance Hospitality Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
