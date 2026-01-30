import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Gem, Mountain } from "lucide-react";
import productMarble from "@/assets/product-marble.jpg";
import productGranite from "@/assets/product-granite.jpg";
import marbleTexture from "@/assets/marble-texture.jpg";

const marbleTypes = [
  { name: "Italian Carrara", origin: "Italy", description: "Classic white marble with subtle grey veining—timeless elegance for discerning homes." },
  { name: "Makrana White", origin: "Rajasthan", description: "The same marble used in the Taj Mahal—pure white with unmatched legacy." },
  { name: "Statuario", origin: "Italy", description: "Bold grey veining on pristine white—a statement of luxury and sophistication." },
  { name: "Calacatta", origin: "Italy", description: "Dramatic gold and grey veins—for those who want their floors to be art." },
  { name: "Indian Green", origin: "Rajasthan", description: "Deep forest green with subtle patterns—brings nature's calm indoors." },
  { name: "Rainforest Brown", origin: "India", description: "Warm brown tones with natural veining—perfect for cozy, earthy interiors." },
];

const graniteTypes = [
  { name: "Black Galaxy", origin: "Andhra Pradesh", description: "Sparkling gold flecks on deep black—India's most iconic granite." },
  { name: "Tan Brown", origin: "Telangana", description: "Rich brown with black and grey patterns—warm and versatile." },
  { name: "Steel Grey", origin: "Karnataka", description: "Cool grey with subtle shimmer—modern elegance for contemporary spaces." },
  { name: "Absolute Black", origin: "Karnataka", description: "Pure deep black—minimalist perfection for bold design choices." },
  { name: "Kashmir White", origin: "Tamil Nadu", description: "Soft white with subtle grey and garnet—gentle sophistication." },
  { name: "Colonial White", origin: "Tamil Nadu", description: "Creamy white with grey veining—light and airy for open spaces." },
];

const Products = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Our Collections
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Premium Stone<br />
              <span className="text-gold">For Indian Homes</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              From the quarries of Italy to the mines of Rajasthan—we source 
              only the finest marble and granite, personally selected for 
              beauty, durability, and value.
            </p>
          </div>
        </div>
      </section>

      {/* Marble Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Gem className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    Marble Collection
                  </h2>
                  <p className="text-muted-foreground">Italian & Indian Origins</p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Marble brings timeless elegance to any space. We offer carefully 
                curated varieties from world-renowned quarries—each piece hand-selected 
                for its unique character and quality.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-medium">
                <img 
                  src={productMarble} 
                  alt="Premium Marble" 
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              {marbleTypes.map((marble, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border/50 hover:border-gold/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {marble.name}
                    </h3>
                    <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                      {marble.origin}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {marble.description}
                  </p>
                </div>
              ))}
              <Button variant="elegant" size="lg" className="w-full mt-6" asChild>
                <Link to="/contact">
                  Enquire About Marble
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Granite Section */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 space-y-4">
              {graniteTypes.map((granite, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border/50 hover:border-gold/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {granite.name}
                    </h3>
                    <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                      {granite.origin}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {granite.description}
                  </p>
                </div>
              ))}
              <Button variant="elegant" size="lg" className="w-full mt-6" asChild>
                <Link to="/contact">
                  Enquire About Granite
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    Granite Collection
                  </h2>
                  <p className="text-muted-foreground">Indian Excellence</p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                India produces some of the world's finest granite. We source directly 
                from trusted quarries across the country, ensuring exceptional quality 
                at honest prices.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-medium">
                <img 
                  src={productGranite} 
                  alt="Premium Granite" 
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section 
        className="py-24 md:py-32 relative"
        style={{ backgroundImage: `url(${marbleTexture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-primary/90" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-10 h-10 text-gold mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Our Pricing Promise
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              We believe in honest, transparent pricing. What you see is what you pay—no 
              hidden charges, no inflated quotes. We source directly from quarries, 
              cutting out middlemen to bring you premium quality at fair prices.
            </p>
            <p className="text-gold font-medium text-lg mb-10">
              "Quality stone shouldn't break the bank. We'll always give you our best price upfront."
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Can't Decide?<br />
            <span className="text-gold">Let Us Help</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Choosing the right stone can be overwhelming. Visit our showroom, 
            and we'll guide you through options that match your vision and budget.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="warm" size="lg" asChild>
              <Link to="/contact">Visit Showroom</Link>
            </Button>
            <Button variant="elegant" size="lg" asChild>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
