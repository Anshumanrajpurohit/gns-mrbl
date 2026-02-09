import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Utensils, Sparkles, TrendingUp, Bath, Building, Flower2, Columns3 } from "lucide-react";
import poojaRoom from "@/assets/pooja-room.jpg";
import staircaseLuxury from "@/assets/staircase-luxury.jpg";
import kitchenGranite from "@/assets/kitchen-granite.jpg";
import livingFlooring from "@/assets/living-flooring.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";

const craftingServices = [
  {
    icon: Flower2,
    title: "Tulsi Vrindavan Crafting",
    description: "Hand-crafted Tulsi Vrindavan in premium marble—a sacred centerpiece for your home. We shape each piece with devotion, ensuring traditional proportions and lasting beauty.",
    features: ["Pure Makrana & Italian marble", "Traditional & modern designs", "Custom sizes & detailing", "Hand-polished sacred finish"],
    image: poojaRoom,
  },
  {
    icon: Columns3,
    title: "Temple Stone Work & Pillars",
    description: "Custom pillars, deity platforms, temple flooring, and architectural stone elements. Each piece is precision-cut and hand-finished to honour tradition.",
    features: ["Temple pillars & columns", "Deity platforms & plinths", "Custom carved elements", "Traditional motif options"],
    image: staircaseLuxury,
  },
  {
    icon: TrendingUp,
    title: "Custom Steps & Staircases",
    description: "Grand staircases and precision-cut steps in marble or granite. Anti-slip finishes, custom edge profiles, and matching landings—built to impress and last.",
    features: ["Custom step designs & sizes", "Anti-slip finish options", "Edge profile choices", "Matching risers & landings"],
    image: staircaseLuxury,
  },
  {
    icon: Utensils,
    title: "Kitchen Platforms & Countertops",
    description: "Durable granite platforms that handle the heat and demands of Indian cooking. Precision-cut, properly sealed, and built to serve your family for decades.",
    features: ["Heat & stain resistant granite", "Integrated sink cutouts", "Custom edge profiles", "Proper sealing & finishing"],
    image: kitchenGranite,
  },
  {
    icon: Home,
    title: "Flooring & Wall Cladding",
    description: "Premium marble and granite flooring with custom patterns, borders, and mirror-polished finishes. We also do interior and exterior wall cladding.",
    features: ["Custom patterns & borders", "Mirror polished finish", "Wall cladding options", "Seamless installation"],
    image: livingFlooring,
  },
  {
    icon: Bath,
    title: "Bathroom & Vanity Tops",
    description: "Complete bathroom stone solutions—from floor-to-ceiling marble to custom vanity tops. Waterproof installation and spa-like finishes.",
    features: ["Waterproof installation", "Custom vanity tops", "Shower wall panels", "Floor-to-ceiling options"],
    image: galleryBathroom,
  },
];

const applications = [
  { title: "Homes & Apartments", description: "Flooring, kitchen platforms, staircases, pooja rooms, and interior stone work." },
  { title: "Temples & Spiritual Spaces", description: "Tulsi Vrindavan, deity platforms, temple pillars, and sacred marble work." },
  { title: "Villas & Bungalows", description: "Grand staircases, premium flooring, custom cladding, and luxury stone elements." },
  { title: "Hotels & Resorts", description: "Large-scale supply, lobby flooring, bathroom vanities, and pool-side stone." },
  { title: "Commercial & Industrial", description: "Office lobbies, retail flooring, showroom surfaces, and high-traffic stone solutions." },
];

const processSteps = [
  { step: "01", title: "Consultation", description: "Share your needs—we'll recommend the right stone for your space and budget." },
  { step: "02", title: "Material Selection", description: "Visit our yard to see and touch actual slabs. We help you compare options honestly." },
  { step: "03", title: "Measurement", description: "Our team visits your site for precise measurements, ensuring perfect fit." },
  { step: "04", title: "Crafting & Finishing", description: "Your stone is cut, shaped, polished, and finished by skilled hands with precision." },
  { step: "05", title: "Installation", description: "Professional installation by experienced teams. We don't leave until it's right." },
];

const Craftsmanship = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Crafting & Custom Stone Work
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Stone Shaped by<br />
              <span className="text-gold">Skilled Hands</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              From Tulsi Vrindavan to temple pillars, kitchen platforms to grand 
              staircases—we craft stone with precision, care, and respect for tradition. 
              Every piece is hand-finished, not mass-produced.
            </p>
          </div>
        </div>
      </section>

      {/* Crafting Services */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              What We Craft
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Custom Stone Work<br />
              <span className="text-gold">Done Right</span>
            </h2>
          </div>

          <div className="space-y-20">
            {craftingServices.map((service, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-lifted">
                    <img src={service.image} alt={service.title} className="w-full aspect-[4/3] object-cover" />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="elegant" asChild>
                    <Link to="/contact">
                      Discuss Your Project
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Who We Serve
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Stone Solutions for<br />
              <span className="text-gold">Every Space</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:border-gold/30 transition-all duration-300">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{app.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              How We Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              From Vision to<br />
              <span className="text-gold">Finished Stone</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our process is designed to make your stone journey smooth and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:border-gold/30 transition-all duration-300 relative"
              >
                <span className="font-display text-4xl font-bold text-gold/20 absolute top-4 right-4">
                  {step.step}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 mt-8">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Have a Custom Project?<br />
            <span className="text-gold">Let's Talk Stone</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Custom Tulsi Vrindavan, temple work, or precision slabs—share your 
            idea and we'll help you bring it to life with care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/gallery">See Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Craftsmanship;
