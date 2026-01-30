import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import productMarble from "@/assets/product-marble.jpg";
import productGranite from "@/assets/product-granite.jpg";
import marbleTexture from "@/assets/marble-texture.jpg";

const collections = [
  {
    title: "Premium Marble",
    subtitle: "Italian & Indian Origins",
    description: "From Italian Carrara to Indian Makrana—curated marble collections that define luxury.",
    image: productMarble,
    link: "/products",
  },
  {
    title: "Durable Granite",
    subtitle: "Timeless Strength",
    description: "Black Galaxy, Tan Brown, and more—granite that withstands generations with grace.",
    image: productGranite,
    link: "/products",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
            Our Stone Collections
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Premium Quality,<br />
            <span className="text-gold">Honest Prices</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We source directly from the finest quarries, ensuring you get 
            the best quality at fair prices—no middlemen, no markups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {collections.map((collection, index) => (
            <Link
              key={index}
              to={collection.link}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-gold/30 shadow-soft hover:shadow-medium transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-gold text-sm font-medium mb-2">{collection.subtitle}</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {collection.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all">
                  View Collection <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom Craftsmanship Banner */}
        <div 
          className="relative rounded-2xl overflow-hidden"
          style={{ backgroundImage: `url(${marbleTexture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-primary/85" />
          <div className="relative p-8 md:p-12 lg:p-16 text-center">
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Custom Design & Craftsmanship
            </h3>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Have a unique vision? Our master craftsmen bring decades of experience 
              to create bespoke stone solutions—from intricate temple designs to 
              modern kitchen countertops.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/craftsmanship">
                Explore Our Craftsmanship
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
