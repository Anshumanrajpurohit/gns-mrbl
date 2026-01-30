import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Award, Gem, Quote } from "lucide-react";
import marbleTexture from "@/assets/marble-texture.jpg";
import showroomImage from "@/assets/showroom.jpg";

const values = [
  {
    icon: Heart,
    title: "Built on Honesty",
    description: "We believe in transparent pricing and honest advice. We'll never sell you something you don't need.",
  },
  {
    icon: Users,
    title: "Family Values",
    description: "We treat every customer like family. Your home is as important to us as our own.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "Every stone is personally inspected. We never compromise on quality—ever.",
  },
  {
    icon: Gem,
    title: "Long-term Relationships",
    description: "We're not here for one sale. We're here to be your trusted partner for life.",
  },
];

const OurStory = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Our Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              A Family Business,<br />
              <span className="text-gold">Rooted in Trust</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              For over two decades, Ganpati Marble & Granite has been more than 
              just a stone supplier—we're partners in building the homes where 
              Indian families create their most precious memories.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
                How It All Began
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Journey
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Ganpati Marble & Granite began with a simple belief: every family 
                  deserves access to beautiful, quality stone for their homes, 
                  paired with honest guidance they can trust.
                </p>
                <p>
                  Founded in 2004 at Pilerne Industrial Estate, we started as a 
                  small showroom with a big heart. Our founder believed that 
                  the stone business should be about relationships, not 
                  just transactions.
                </p>
                <p>
                  Over the years, word spread—not through flashy advertisements, 
                  but through the recommendations of satisfied families. Today, 
                  we're proud to have been part of over 2000 homes across Goa.
                </p>
                <p className="font-medium text-foreground text-lg">
                  "We're not just selling stone—we're helping build homes where 
                  memories are made."
                </p>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div
                className="aspect-[4/5] rounded-2xl bg-cover bg-center shadow-lifted"
                style={{ backgroundImage: `url(${marbleTexture})` }}
              />
              <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-8 rounded-xl shadow-warm">
                <p className="font-display text-4xl font-bold text-gold">20+</p>
                <p className="text-sm text-primary-foreground/80">Years of Serving<br />Indian Families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Owner's Message */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft border border-border/50 relative">
              <Quote className="w-16 h-16 text-gold/20 absolute top-8 right-8" />
              <p className="text-gold text-sm font-medium mb-6 tracking-wider uppercase">
                A Message from Our Family
              </p>
              <blockquote className="font-display text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
                "Every stone that leaves our showroom carries our family's 
                reputation. That's why we personally ensure that what reaches 
                your home is exactly what we'd put in our own."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-gold">G</span>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    The Ganpati Family
                  </p>
                  <p className="text-muted-foreground">
                    Founders, Ganpati Marble & Granite
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Values Guide<br />
              <span className="text-gold">Every Decision</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              These aren't just words on a wall—they guide every 
              interaction, every recommendation, every stone we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:border-gold/30 transition-all duration-300 flex gap-6"
              >
                <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
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

      {/* Showroom Section */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lifted">
              <img 
                src={showroomImage} 
                alt="Our Showroom" 
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
                Visit Us
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Experience Our<br />
                <span className="text-gold">Showroom</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Words and images can only show so much. We invite you to visit 
                our showroom in Pilerne—walk through our collection, touch the 
                stone, and let us help you find the perfect match for your home.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our team is always ready to answer your questions, share honest 
                advice, and make your stone selection journey enjoyable and 
                stress-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="warm" size="lg" asChild>
                  <Link to="/contact">Get Directions</Link>
                </Button>
                <Button variant="elegant" size="lg" asChild>
                  <a href="tel:+919876543210">Call Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Let's Build Something<br />
            <span className="text-gold">Beautiful Together</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Whether you're starting a new home or renovating, we're here to help 
            with honest advice and quality stone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/products">Explore Collections</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Visit Our Showroom</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;
