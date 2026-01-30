import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-indian-marble.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/65 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-gold/10 blur-2xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-4xl animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              Trusted by Indian Families Since 2004
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Where Every Stone<br />
            <span className="text-gold">Tells Your Story</span>
          </h1>

          {/* Subheadline */}
          <p className="text-primary-foreground/85 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            Premium marble and granite for Indian homes, crafted with care. 
            From selection to installation, we bring your vision to life with 
            honesty, quality, and generations of expertise.
          </p>
          
          {/* Service Highlights */}
          <div className="flex flex-wrap gap-4 mb-10 text-primary-foreground/70 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Premium Stone Supply
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Custom Design
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Expert Installation
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/products">
                Explore Collections
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact">
                Visit Our Showroom
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
