import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Utensils, Sparkles, TrendingUp, Bath, Building } from "lucide-react";
import poojaRoom from "@/assets/pooja-room.jpg";
import staircaseLuxury from "@/assets/staircase-luxury.jpg";
import kitchenGranite from "@/assets/kitchen-granite.jpg";
import livingFlooring from "@/assets/living-flooring.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";

const applications = [
  {
    icon: Home,
    title: "Living Room Flooring",
    description: "Transform your living space with premium marble flooring that reflects light and creates an airy, luxurious atmosphere.",
    image: livingFlooring,
    features: ["Italian & Indian marble options", "Custom patterns & borders", "Mirror polished finish", "Seamless installation"],
  },
  {
    icon: Utensils,
    title: "Kitchen Countertops",
    description: "Durable granite countertops that handle the demands of Indian cooking while adding elegance to your kitchen.",
    image: kitchenGranite,
    features: ["Heat & stain resistant", "Easy maintenance", "Custom edge profiles", "Integrated sinks available"],
  },
  {
    icon: Sparkles,
    title: "Pooja Rooms & Temples",
    description: "Sacred spaces deserve the purest materials. We craft temple designs with pristine Makrana marble, honoring tradition with perfection.",
    image: poojaRoom,
    features: ["Pure Makrana marble", "Custom deity platforms", "Intricate carving options", "Peaceful aesthetic"],
  },
  {
    icon: TrendingUp,
    title: "Grand Staircases",
    description: "Make an impression with marble staircases that become the centerpiece of your home—elegant, durable, and timeless.",
    image: staircaseLuxury,
    features: ["Custom step designs", "Anti-slip finish options", "Matching railings", "Statement landings"],
  },
  {
    icon: Bath,
    title: "Luxury Bathrooms",
    description: "Create spa-like retreats with floor-to-ceiling marble—from vanity tops to shower walls, we make bathrooms extraordinary.",
    image: galleryBathroom,
    features: ["Waterproof installation", "Wall & floor matching", "Custom vanity tops", "Shower enclosures"],
  },
  {
    icon: Building,
    title: "Commercial Spaces",
    description: "Hotels, offices, and retail spaces—we bring the same care and quality to commercial projects as we do to homes.",
    image: livingFlooring,
    features: ["Large-scale supply", "Project management", "Timeline commitment", "Quality consistency"],
  },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    description: "Share your vision with us. We'll understand your space, preferences, and budget to recommend the perfect stone.",
  },
  {
    step: "02",
    title: "Selection",
    description: "Visit our showroom to see and touch the stone. We'll help you compare options and make an informed choice.",
  },
  {
    step: "03",
    title: "Measurement",
    description: "Our team visits your site for precise measurements, ensuring perfect fit and minimal waste.",
  },
  {
    step: "04",
    title: "Crafting",
    description: "Your stone is cut, shaped, and finished by our skilled craftsmen with attention to every detail.",
  },
  {
    step: "05",
    title: "Installation",
    description: "Professional installation by experienced teams. We don't leave until you're completely satisfied.",
  },
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
              Craftsmanship & Applications
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Stone Solutions for<br />
              <span className="text-gold">Every Space</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              From traditional pooja rooms to modern kitchens—we understand the 
              unique needs of Indian homes and craft stone solutions that blend 
              beauty with functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Where Stone Comes Alive
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Applications for<br />
              <span className="text-gold">Indian Homes</span>
            </h2>
          </div>

          <div className="space-y-20">
            {applications.map((app, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-lifted">
                    <img 
                      src={app.image} 
                      alt={app.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <app.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      {app.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {app.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {app.features.map((feature, i) => (
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

      {/* Process */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              How We Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              From Vision to<br />
              <span className="text-gold">Reality</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our process is designed to make your journey smooth and stress-free. 
              Here's how we bring your stone dreams to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((step, index) => (
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
            Have a Unique Vision?<br />
            <span className="text-gold">Let's Create Together</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Custom projects are our specialty. Share your ideas with us, and 
            we'll help you bring them to life with precision and care.
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
