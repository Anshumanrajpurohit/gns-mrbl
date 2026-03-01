import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { companyDetails, servicesPageSections, serviceOptions } from "@/data/content";

const Services = () => (
  <div className="bg-background">
    <Helmet>
      <title>Services | Marble, Granite, Temple Crafting & Custom Stone | Ganpati Marble Goa</title>
      <meta
        name="description"
        content="Marble and granite installation, temple crafting, vitrified tile work, Kota stone, and custom stone fabrication by Ganpati Marble Goa at Pilerne, Goa."
      />
    </Helmet>

    {/* Page Hero */}
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
            What We Deliver
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            From Temples to<br />
            <span className="text-gold">Turnkey Villas</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Supply, fabrication, and installation under one roof. Share your drawings 
            and we will craft marble, granite, vitrified tiles, Kota stone, and custom 
            carved elements with the same care we put into our own spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="warm" size="lg" asChild>
              <Link to="/contact">
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="elegant" size="lg" asChild>
              <a href={`tel:${companyDetails.phoneHref}`}>Talk to Vishan</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Popular Enquiries Strip */}
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {serviceOptions.map((service) => (
            <Link
              key={service}
              to={`/contact?service=${encodeURIComponent(service)}`}
              className="bg-card rounded-full px-6 py-2.5 text-sm font-medium text-foreground border border-border/50 hover:border-gold/50 hover:text-gold shadow-soft transition-all duration-300"
            >
              {service}
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
            Our Expertise
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Every Stone,<br />
            <span className="text-gold">Every Application</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From sacred temple carvings to resort lobby flooring—our in-house 
            teams handle the full scope of stone work.
          </p>
        </div>

        <div className="space-y-12">
          {servicesPageSections.map((section, index) => (
            <div
              key={section.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              <div className={`rounded-2xl overflow-hidden shadow-lifted aspect-[4/3] ${index % 2 === 1 ? "[direction:ltr]" : ""}`}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={index % 2 === 1 ? "[direction:ltr]" : ""}>
                <p className="text-gold text-sm font-medium mb-3 tracking-wider uppercase">
                  {section.badge}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {section.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  {section.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-sm font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="elegant" asChild>
                  <Link to={`/contact?service=${encodeURIComponent(section.title)}`}>
                    Enquire About This
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Installation Promise */}
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Full-Scope Execution
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Site-Ready Teams<br />
              <span className="text-gold">For Goa's Climate</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our crews arrive with templates, polishers, sealants, and finishing kits 
              built for humid coastal weather. We coordinate with architects, builders, 
              and MEP teams so that stone work completes on time.
            </p>
            <Button variant="warm" size="lg" asChild>
              <Link to="/contact">
                Discuss Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-soft border border-border/50">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">Execution Checklist</h3>
            <ul className="space-y-5">
              {[
                "Moisture-tested screeds before laying slabs",
                "Edge profiling, groove cutting & nosing done in-house",
                "Diamond polishing & sealing after installation",
                "Detailed care guide handed over on completion",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Dark CTA */}
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gold/10 blur-2xl" />
      <div className="container mx-auto px-4 relative text-center">
        <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
          Begin Your Project
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          Share Your Drawings,<br />
          <span className="text-gold">We Prep the Stone</span>
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
          Email us your floor plans or temple sketches. We respond within 24 hours 
          with material suggestions, timelines, and transparent costing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Start an Enquiry
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="heroOutline" size="xl" asChild>
            <a href={`mailto:${companyDetails.email}`}>Send Drawings</a>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Services;
