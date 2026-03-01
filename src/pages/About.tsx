import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight } from "lucide-react";
import { companyDetails, ownerHighlights, craftsmanshipTimeline, processSteps } from "@/data/content";
import showroomImg from "@/assets/showroom.jpg";

const About = () => (
  <div className="bg-background">
    <Helmet>
      <title>Our Story | Ganpati Marble Goa | Temple Crafting & Luxury Stone</title>
      <meta
        name="description"
        content="Meet Vishan Singh Rajpurohit and the Ganpati Marble Goa family — crafting marble, granite, and temple stone across Goa for over two decades."
      />
    </Helmet>

    {/* Hero */}
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Our Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              A Family Business<br />
              <span className="text-gold">Rooted in Trust</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Vishan Singh Rajpurohit built Ganpati Marble Goa from a single-yard 
              operation at Pilerne into Goa's most trusted partner for marble, 
              granite, temple crafting, and custom stone. Every slab is inspected 
              personally; every Tulsi Vrindavan is hand-finished with devotion.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-card rounded-xl px-5 py-4 shadow-soft border border-border/50">
                <p className="font-display text-3xl font-bold text-gold">{companyDetails.experienceYears}+</p>
                <p className="text-muted-foreground text-sm mt-1">Years crafting in Goa</p>
              </div>
              <div className="bg-card rounded-xl px-5 py-4 shadow-soft border border-border/50">
                <p className="font-display text-3xl font-bold text-gold">{companyDetails.templesCrafted}+</p>
                <p className="text-muted-foreground text-sm mt-1">Temples & Tulsi Mandirs</p>
              </div>
              <div className="bg-card rounded-xl px-5 py-4 shadow-soft border border-border/50">
                <p className="font-display text-3xl font-bold text-gold">{companyDetails.projectsDelivered}+</p>
                <p className="text-muted-foreground text-sm mt-1">Projects delivered</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="warm" size="lg" asChild>
                <Link to="/contact">Plan a Visit <ArrowRight className="w-5 h-5" /></Link>
              </Button>
              <Button variant="elegant" size="lg" asChild>
                <a href={`tel:${companyDetails.phoneHref}`}>{companyDetails.phone}</a>
              </Button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lifted aspect-[4/3]">
            <img
              src={companyDetails.heroImage}
              alt="Ganpati Marble Goa stone yard"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-gold text-xs font-medium tracking-wider uppercase mb-1">Meet the Owner</p>
              <h3 className="font-display text-2xl font-bold text-primary-foreground">{companyDetails.owner}</h3>
              <p className="text-primary-foreground/80 text-sm">Founder & Master Fabricator</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Owner Quote */}
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary rounded-2xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-gold/5 blur-2xl" />
            <Quote className="w-12 h-12 text-gold/30 mb-6" />
            <p className="font-display text-2xl md:text-3xl text-primary-foreground leading-relaxed mb-8">
              "We built temples, kitchens, and resort lobbies the same way: precise 
              foundations, honest material guidance, and finishes that last a decade 
              in Goa's coastal climate."
            </p>
            <div>
              <p className="text-gold font-medium tracking-wider uppercase text-sm">{companyDetails.owner}</p>
              <p className="text-primary-foreground/70 text-sm mt-1">Founder, Ganpati Marble Goa</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Values / Owner Highlights */}
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
            Craft First, Commerce Later
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Hands-On Leadership<br />
            <span className="text-gold">You Can Call Directly</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Vishan is on-site for template checks, granite selections, and temple 
            detailing. The team has grown, but the promise remains unchanged.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ownerHighlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:border-gold/30 hover:shadow-medium transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-6">
                <highlight.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{highlight.title}</h3>
              <p className="text-muted-foreground">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Milestones
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              How We've Grown<br />
              <span className="text-gold">Over 24 Years</span>
            </h2>
            <div className="space-y-8">
              {craftsmanshipTimeline.map((item, index) => (
                <div key={index} className="relative border-l-2 border-border pl-8">
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gold" />
                  <p className="text-gold text-xs font-medium tracking-wider uppercase mb-1">{item.year}</p>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              How We Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              Process Built Around<br />
              <span className="text-gold">Respect for Stone</span>
            </h2>
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Showroom Invitation */}
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gold/10 blur-2xl" />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Come See Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Visit the Yard at<br />
              <span className="text-gold">Pilerne, Goa</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Walk through hundreds of slabs, see Tulsi mandirs in progress, 
              and speak directly with Vishan about your project.
            </p>
            <p className="text-primary-foreground/70 text-sm mb-8">
              {companyDetails.address}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get Directions & Contact
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lifted">
              <img
                src={showroomImg}
                alt="Ganpati Marble Goa showroom"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
