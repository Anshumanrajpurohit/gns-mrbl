import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Gem, Mountain, Grid3X3, Layers, Pickaxe } from "lucide-react";
import productMarble from "@/assets/product-marble.jpg";
import productGranite from "@/assets/product-granite.jpg";
import marbleTexture from "@/assets/marble-texture.jpg";

const graniteTypes = [
  { name: "Black Galaxy", origin: "Andhra Pradesh", best: "Kitchen platforms, countertops, flooring in high-traffic areas." },
  { name: "Tan Brown", origin: "Telangana", best: "Kitchen tops, staircase treads, and warm-toned interiors." },
  { name: "Steel Grey", origin: "Karnataka", best: "Modern kitchens, bathroom vanities, commercial flooring." },
  { name: "Absolute Black", origin: "Karnataka", best: "Minimalist kitchens, wall cladding, and bold accent surfaces." },
  { name: "Kashmir White", origin: "Tamil Nadu", best: "Living room flooring, pooja room platforms, and light interiors." },
  { name: "Colonial White", origin: "Tamil Nadu", best: "Open-plan homes, bathrooms, and bright, airy spaces." },
];

const marbleTypes = [
  { name: "Italian Carrara", origin: "Italy", best: "Luxury flooring, bathroom walls, vanity tops, and staircases." },
  { name: "Makrana White", origin: "Rajasthan", best: "Pooja rooms, temple platforms, Tulsi Vrindavan, and sacred spaces." },
  { name: "Statuario", origin: "Italy", best: "Feature walls, lobby flooring, and statement staircases." },
  { name: "Calacatta", origin: "Italy", best: "Luxury kitchen islands, reception counters, and designer interiors." },
  { name: "Indian Green", origin: "Rajasthan", best: "Accent flooring, pillar cladding, and decorative borders." },
  { name: "Rainforest Brown", origin: "India", best: "Exterior walls, rustic interiors, and earthy-themed spaces." },
];

const vitrifiedTiles = [
  { name: "Full Body Vitrified", best: "Heavy foot traffic areas, commercial spaces, outdoor patios." },
  { name: "Glazed Vitrified (GVT)", best: "Living rooms, bedrooms, and residential flooring with pattern options." },
  { name: "Double Charge Vitrified", best: "Lobbies, hotel corridors, and spaces needing extra durability." },
  { name: "Polished Vitrified", best: "Modern apartments, offices, and clean, reflective surfaces." },
];

const otherStones = [
  { name: "Kota Stone", origin: "Rajasthan", best: "Outdoor flooring, pathways, temple courtyards, and staircases. Naturally slip-resistant and extremely durable." },
  { name: "Rough Stone / Rubble", origin: "Local & Imported", best: "Foundation work, compound walls, landscaping, retaining walls, and structural masonry." },
  { name: "Shahabad Stone", origin: "Karnataka", best: "Traditional flooring, temple plinths, and outdoor paving." },
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
              Products & Materials
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Every Material You Need,<br />
              <span className="text-gold">Under One Roof</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Granite, marble, vitrified tiles, Kota stone, and rough stones—sourced 
              directly from quarries and manufacturers. We tell you what works best 
              for your space, not just what's expensive.
            </p>
          </div>
        </div>
      </section>

      {/* Granite Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Granite</h2>
                  <p className="text-muted-foreground">Strength That Lasts Generations</p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                India produces some of the world's finest granite. We supply directly 
                from trusted quarries—ideal for kitchen platforms, flooring, staircases, 
                and any surface that needs to handle daily Indian life.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-medium">
                <img src={productGranite} alt="Premium Granite Slabs" className="w-full aspect-[4/3] object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              {graniteTypes.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border/50 hover:border-gold/30 hover:shadow-soft transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold text-foreground">{item.name}</h3>
                    <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">{item.origin}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed"><span className="font-medium text-foreground">Best for:</span> {item.best}</p>
                </div>
              ))}
              <Button variant="elegant" size="lg" className="w-full mt-6" asChild>
                <Link to="/contact">Enquire About Granite <ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marble Section */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 space-y-4">
              {marbleTypes.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border/50 hover:border-gold/30 hover:shadow-soft transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold text-foreground">{item.name}</h3>
                    <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">{item.origin}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed"><span className="font-medium text-foreground">Best for:</span> {item.best}</p>
                </div>
              ))}
              <Button variant="elegant" size="lg" className="w-full mt-6" asChild>
                <Link to="/contact">Enquire About Marble <ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Gem className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Marble</h2>
                  <p className="text-muted-foreground">Timeless Elegance, Italian & Indian</p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                From Italian Carrara to Rajasthani Makrana—we carry marble for every 
                taste and purpose. Perfect for flooring, pooja rooms, temple work, 
                staircases, and luxury interiors.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-medium">
                <img src={productMarble} alt="Premium Marble Slabs" className="w-full aspect-[4/3] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrified Tiles */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Vitrified Tiles</h2>
                <p className="text-muted-foreground">Modern, Durable, Low Maintenance</p>
              </div>
            </div>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              A practical and beautiful alternative—vitrified tiles offer excellent 
              durability with a wide range of designs. Ideal for apartments, offices, 
              and spaces where maintenance ease matters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vitrifiedTiles.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border/50 hover:border-gold/30 hover:shadow-soft transition-all duration-300">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.name}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm"><span className="font-medium text-foreground">Best for:</span> {item.best}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kota Stone & Rough Stones */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Layers className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Kota Stone & Rough Stones</h2>
                <p className="text-muted-foreground">Raw Strength for Foundation & Outdoors</p>
              </div>
            </div>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Not every surface needs polish—sometimes you need raw strength and natural 
              texture. Our Kota stone and rough stones serve builders, contractors, and 
              homeowners who need reliable material for foundations, pathways, and outdoor use.
            </p>
            <div className="space-y-4">
              {otherStones.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border/50 hover:border-gold/30 hover:shadow-soft transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold text-foreground">{item.name}</h3>
                    <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">{item.origin}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed"><span className="font-medium text-foreground">Best for:</span> {item.best}</p>
                </div>
              ))}
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
              Honest Material Guidance
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              We'll never push an expensive stone when a simpler one works better for your space. 
              Our job is to give you the right material for the right purpose—at a fair price. 
              That's how we've earned trust for over 20 years.
            </p>
            <p className="text-gold font-medium text-lg mb-10">
              "We help you choose right, not just choose expensive."
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Get Material Guidance
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
