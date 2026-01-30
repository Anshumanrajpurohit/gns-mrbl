import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Award, Clock } from "lucide-react";
import marbleTexture from "@/assets/marble-texture.jpg";

const values = [
  {
    icon: Heart,
    title: "Built on Trust",
    description: "Every relationship starts with honesty. We never oversell or push products you don't need.",
  },
  {
    icon: Users,
    title: "Family First",
    description: "We understand the dreams behind every home. Your family's vision is our priority.",
  },
  {
    icon: Award,
    title: "Quality Always",
    description: "From the quarry to your home, we ensure only the finest stones reach your doorstep.",
  },
  {
    icon: Clock,
    title: "Here for Years",
    description: "We've been serving Goa for decades, and we plan to be here for many more.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wide">
              Our Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              A Family Business,<br />
              <span className="text-gold">Built on Trust</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              For over two decades, Ganpati Marble & Granite has been more than just 
              a stone supplier—we're partners in building the homes where Goan families 
              create their most precious memories.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Journey
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ganpati Marble & Granite began with a simple belief: every family 
                  deserves access to beautiful, quality stone for their homes, 
                  paired with honest guidance they can trust.
                </p>
                <p>
                  Founded in Pilerne Industrial Estate, we started as a small 
                  showroom with a big heart. Over the years, word spread—not 
                  through flashy advertisements, but through the recommendations 
                  of satisfied families.
                </p>
                <p>
                  Today, we're proud to have been part of countless homes across 
                  Goa. From cozy kitchens to grand staircases, our stone has 
                  witnessed family dinners, celebrations, and everyday moments 
                  of joy.
                </p>
                <p className="font-medium text-foreground">
                  We're not just selling stone—we're helping build homes where 
                  memories are made.
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="aspect-square rounded-2xl bg-cover bg-center shadow-medium"
                style={{ backgroundImage: `url(${marbleTexture})` }}
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-warm">
                <p className="font-display text-3xl font-bold">20+</p>
                <p className="text-sm text-primary-foreground/80">Years of Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground text-lg">
              Our values aren't just words on a wall—they guide every 
              interaction, every recommendation, every stone we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-soft flex gap-6"
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Let's Build Something Beautiful
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Whether you're starting a new home or renovating, we're here to help 
            with honest advice and quality stone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <Link to="/products">Explore Products</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Visit Our Showroom</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
