import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-marble.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-3xl animate-fade-in-up">
          <p className="text-primary-foreground/80 text-sm md:text-base font-medium mb-4 tracking-wide uppercase">
            Trusted Craftsmanship in Goa
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Building Dreams,<br />
            <span className="text-gold">One Stone at a Time</span>
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            For families building their dream homes, we supply premium marble and granite 
            with care, craftsmanship, and honest guidance you can trust.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="xl" asChild>
              <Link to="/products">
                Explore Our Collection
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact">
                Visit Our Showroom
              </Link>
            </Button>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col sm:flex-row gap-6 text-primary-foreground/80">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
              <span>+91 98765 43210</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Pilerne Industrial Estate, Goa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
