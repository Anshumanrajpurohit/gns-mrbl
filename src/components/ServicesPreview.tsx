import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import productMarble from "@/assets/product-marble.jpg";
import productGranite from "@/assets/product-granite.jpg";

const services = [
  {
    title: "Premium Marble",
    description: "Italian Carrara, Makrana White, and exotic marble varieties for elegant interiors.",
    image: productMarble,
    link: "/products",
  },
  {
    title: "Durable Granite",
    description: "Black Galaxy, Tan Brown, and quality granite for countertops and flooring.",
    image: productGranite,
    link: "/products",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quality Stone, Honest Service
          </h2>
          <p className="text-muted-foreground text-lg">
            From supply to custom crafting, we're with you at every step of your home journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-soft hover:shadow-medium transition-all duration-500"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-primary-foreground/80 mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom Services */}
        <div className="bg-stone rounded-2xl p-8 md:p-12 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-stone-foreground mb-4">
            Custom Design & Crafting
          </h3>
          <p className="text-stone-foreground/80 text-lg max-w-2xl mx-auto mb-6">
            Have a unique vision? Our craftsmen create custom staircases, flooring patterns, 
            countertops, and more—tailored exactly to your home.
          </p>
          <Button variant="default" size="lg" asChild>
            <Link to="/products">
              See Our Craftsmanship
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
