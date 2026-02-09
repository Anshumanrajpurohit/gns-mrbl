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
    title: "Honest Guidance",
    description: "We'll tell you what works best for your space and budget—not just what's most expensive. That's how we do business.",
  },
  {
    icon: Users,
    title: "Family-Owned Values",
    description: "Every customer is treated like family. Your home matters to us as much as it matters to you.",
  },
  {
    icon: Award,
    title: "Quality Over Everything",
    description: "Every slab is personally checked. We never compromise—whether it's granite for a kitchen or marble for a temple.",
  },
  {
    icon: Gem,
    title: "Long-term Relationships",
    description: "We're not here for one sale. Many of our customers come back for their second and third homes.",
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
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">Our Story</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              A Family Business,<br />
              <span className="text-gold">Rooted in Trust</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              For over two decades, Ganpati Marble & Granite has been more than 
              just a stone supplier. We're partners in building the homes, temples, 
              and spaces where life happens.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">How It All Began</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Our Journey</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Ganpati Marble & Granite started with a simple belief: every family 
                  deserves access to quality stone, paired with honest guidance they can trust.
                </p>
                <p>
                  Based at Pilerne Industrial Estate in Saligao, Goa, we began as a 
                  small yard with a big commitment. We source granite, marble, vitrified 
                  tiles, Kota stone, and rough stones directly—and craft custom 
                  Tulsi Vrindavan, temple elements, pillars, steps, and slabs by hand.
                </p>
                <p>
                  Over the years, our reputation grew—not through advertising, but through 
                  the homes, temples, and buildings we helped create. Today, architects, 
                  builders, and families across Goa know us as the place for reliable 
                  stone and honest advice.
                </p>
                <p className="font-medium text-foreground text-lg">
                  "We're not just selling stone—we're helping build spaces where 
                  life, faith, and memories come together."
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
                <p className="text-sm text-primary-foreground/80">Years Serving<br />Goan Families</p>
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
              <p className="text-gold text-sm font-medium mb-6 tracking-wider uppercase">A Message from Our Family</p>
              <blockquote className="font-display text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
                "Every stone that leaves our yard carries our family's reputation. 
                Whether it's a granite kitchen platform or a marble Tulsi Vrindavan—
                we make sure it's the same quality we'd put in our own home."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-gold">G</span>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">The Ganpati Family</p>
                  <p className="text-muted-foreground">Founders, Ganpati Marble & Granite · Pilerne, Goa</p>
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
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">What We Stand For</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Values Guide<br />
              <span className="text-gold">Every Decision</span>
            </h2>
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
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
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
              <img src={showroomImage} alt="Our Stone Yard at Pilerne" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div>
              <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">Visit Us</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Visit Our Yard<br />
                <span className="text-gold">in Pilerne</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Come see our full range of granite, marble, tiles, and custom stone 
                work in person. Walk through slabs, touch the finish, and get honest 
                advice from our team.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                72/2, Pilerne Industrial Estate, Pilerne, Saligao, Goa – 403511
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
            <span className="text-gold">That Lasts</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Whether you're building a new home, renovating, or need custom stone 
            work—we're here to help with quality material and honest guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/products">Explore Materials</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Visit Our Yard</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;
