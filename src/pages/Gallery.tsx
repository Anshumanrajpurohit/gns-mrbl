import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryLiving from "@/assets/gallery-living.jpg";
import galleryStaircase from "@/assets/gallery-staircase.jpg";
import poojaRoom from "@/assets/pooja-room.jpg";
import staircaseLuxury from "@/assets/staircase-luxury.jpg";
import kitchenGranite from "@/assets/kitchen-granite.jpg";
import livingFlooring from "@/assets/living-flooring.jpg";

const galleryItems = [
  {
    src: poojaRoom,
    title: "Tulsi Vrindavan & Temple Work",
    category: "Temple",
    location: "Mapusa, Goa",
    description: "Custom marble Tulsi Vrindavan and temple platform crafted with traditional proportions and hand-polished finish.",
  },
  {
    src: staircaseLuxury,
    title: "Grand Villa Staircase",
    category: "Staircases",
    location: "Porvorim, Goa",
    description: "Italian marble staircase with custom edge profiles and anti-slip treads for a luxury villa.",
  },
  {
    src: kitchenGranite,
    title: "Modern Kitchen Platform",
    category: "Kitchen",
    location: "Panjim, Goa",
    description: "Black Galaxy granite kitchen platform with integrated sink cutout and heat-resistant finish.",
  },
  {
    src: livingFlooring,
    title: "Premium Flooring",
    category: "Flooring",
    location: "Candolim, Goa",
    description: "Spacious villa with cream marble flooring, custom border design, and mirror-polished finish.",
  },
  {
    src: galleryKitchen,
    title: "Resort Kitchen",
    category: "Kitchen",
    location: "Calangute, Goa",
    description: "White marble countertops for a boutique resort kitchen—durable, elegant, and easy to maintain.",
  },
  {
    src: galleryBathroom,
    title: "Luxury Bathroom",
    category: "Bathroom",
    location: "Dona Paula, Goa",
    description: "Complete marble bathroom transformation with vanity top, wall cladding, and waterproof installation.",
  },
  {
    src: galleryStaircase,
    title: "Kota Stone Steps",
    category: "Steps",
    location: "Saligao, Goa",
    description: "Precision-cut Kota stone steps for outdoor staircase—naturally slip-resistant and built to last.",
  },
  {
    src: galleryLiving,
    title: "Hotel Lobby Flooring",
    category: "Commercial",
    location: "Baga, Goa",
    description: "Large-scale granite flooring for a hotel lobby—high-traffic durability with premium finish.",
  },
];

const categories = ["All", "Temple", "Kitchen", "Flooring", "Staircases", "Steps", "Bathroom", "Commercial"];

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">Our Work</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Stone Work That<br />
              <span className="text-gold">Speaks for Itself</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              From temple crafting to hotel lobbies—every project reflects our 
              commitment to quality, precision, and lasting finishes across Goa.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === "All"
                    ? "bg-gold text-gold-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-lifted transition-all duration-500 border border-border/50 hover:border-gold/30"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">{item.category}</span>
                    <span className="text-xs text-muted-foreground">{item.location}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Start<br />
              <span className="text-gold">Your Project?</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
              Visit our yard or call us. We'll help you choose the right stone 
              and craft it to perfection for your space.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+919876543210">Call Now</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
